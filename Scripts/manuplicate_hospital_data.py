import psycopg2
import sys
import sqlalchemy as sa
import numpy as np
import pandas as pd
import json
import folium

from sodapy import Socrata
from pprint import pprint
from sys import argv

try:
    SQLALCHEMY_DATABASE_URI = '%s+%s://%s:%s@%s:%s/%s' % (DB_TYPE, DB_DRIVER,
                                                          DB_USER, DB_PASS,
                                                          DB_HOST, DB_PORT,
                                                          DB_NAME)

    if len(sys.argv) > 1:
        limit = sys.argv[1]
    else:
        limit = "1000"

    print("Connecting to DB...", end=" ")

    # Create Engine
    ENGINE = sa.create_engine(
        SQLALCHEMY_DATABASE_URI, pool_size=POOL_SIZE, max_overflow=0)

    print("done.")

    print("Selecting data from DB...", end=" ")

    # Convert to Pandas DataFrame
    df = pd.read_sql_table(TABLENAME, ENGINE)

    print("done.")

    df = df.drop(columns=[
        "number_of_completed_surveys_footnote",
        "survey_response_rate_percent_footnote", "hcahps_answer_description",
        "hcahps_answer_percent_footnote", "hcahps_linear_mean_value",
        "phone_number_type", "county_name", "location_address",
        "location_state", "location_city",
        "patient_survey_star_rating_footnote", "hcahps_answer_percent",
        "location_zip"
    ])

    def nanizier(x):
        try:
            return {"not applicable": np.nan}.get(x.lower().strip(), x)

        except AttributeError:
            return x

    df = df.applymap(nanizier).convert_objects(convert_numeric=True)

    df = df.dropna()

    coordinates = [df.get('coordinates') for df in df.location]

    df["longtitude"] = list(zip(*coordinates))[0]
    df["latitude"] = list(zip(*coordinates))[1]

    df = df.drop(columns=["location"])

    def find_mean(variable):
        return df.groupby('hospital_name', as_index=False)[variable].mean()

    rating_mean = find_mean('patient_survey_star_rating')

    survey_num_mean = find_mean('number_of_completed_surveys')

    response_rate_mean = find_mean('survey_response_rate_percent')

    df_average = pd.merge(
        rating_mean,
        pd.merge(
            response_rate_mean,
            survey_num_mean,
            on='hospital_name',
            how='inner'),
        on='hospital_name',
        how='inner')

    df_unique = df[[
        "hospital_name", "address", "city", "state", "phone_number",
        "longtitude", "latitude"
    ]]

    df_unique = df_unique.drop_duplicates().sort_values('hospital_name')

    df_final = pd.merge(df_unique, df_average, on='hospital_name', how='inner')

    print(df_final)

    # Program done
    print("\nProgram finished... exiting.")

except Exception as e:
    print(e)


import folium
import json
import numpy as np
import pandas as pd
import psycopg2

from folium.plugins import MarkerCluster

%matplotlib inline

class MarkerClusterScript(MarkerCluster):
    def __init__(self, data, callback, popup=None):
        from jinja2 import Template
        super(MarkerClusterScript, self).__init__([])
        self._name = 'Script'
        self._data = data
        self._popup = popup
        if callable(callback):
            from flexx.pyscript import py2js
            self._callback = py2js(callback, new_name="callback")
        else:
            self._callback = "var callback = {};".format(_callback)

        self._template = Template(u"""
            {% macro script(this, kwargs) %}
            (function(){
                var data = {{this._data}};
                var map = {{this._parent.get_name()}};
                var cluster = L.markerClusterGroup();
                {{this._callback}}
                
                
                for (var i = 0; i < data.length; i++) {
                    
                    var row = data[i];
                    var marker = callback(row, popup = "names", phone = "phone", rate = "rating", response = "response_rate", address = "address", city = "city", state = "state", link = "link");
                    marker.addTo(cluster);
                }

                cluster.addTo(map);
            })();
            {% endmacro %}
                        """)

def create_marker(row, popup=None):
    """Returns a L.marker object"""
    icon = L.AwesomeMarkers.icon({markerColor: row.color})    
    marker = L.marker(L.LatLng(row.lat, row.lng))
    marker.setIcon(icon)
    
    hospital_info = "<a href=https://google.com/search?q=" + row[link] + " target=blank>" + row[popup].bold() + "</a>"  + \
                    "<br>" + row[address] + \
                    "<br>" + row[city] + " " + row[state] + \
                    "<br>" + row[phone] + \
                    "<br>Patient Survey Rating: " + row[rate] + " out of 5"+ \
                    "<br>Survey Response Rate: " + row[response] + "%"
                    
    
    if popup:
        marker.bindPopup(hospital_info)
    return marker

# nan values throw the JS script
lat = df_final.latitude.values
lng = df_final.longtitude.values
rate = df_final.patient_survey_star_rating.values
response = df_final.survey_response_rate_percent.values
address = df_final.address.values
city =  df_final.city.values
state = df_final.state.values


df_final.phone_number = df_final.phone_number.apply(str)
phone = df_final.phone_number.values
new_phone = []

for i in phone:
    new_phone.append('(' + i[:3] + ') ' + i[3:6] + "-" + i[6:])

# Popups with name strings
popups = df_final.hospital_name.values

link = popups.tolist()
link = [x.replace(" ", "+") for x in link]

# Latitude and longitude dataframe with no nan values
locations = [list(a) for a in zip(lat, lng, popups, rate, response, address, city, state, link, new_phone)]
df_locations = pd.DataFrame(locations, columns=['lat', 'lng', 'names', 'rating', 'response_rate','address','city','state', 'link','phone'])

df_locations = df_locations.round(4)

default_location = [df_final.latitude.mean(),df_final.longtitude.mean()]

map_orgs = folium.Map(location=default_location, zoom_start=4)
MarkerClusterScript(df_locations.to_json(orient="records"), callback=create_marker).add_to(map_orgs)
map_orgs.save("hospital_map.html")

# Set up Notebook

% matplotlib inline

# Standard imports
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

sns.set(style="white")

import statsmodels.formula.api as smf

result = smf.ols(formula = 'patient_survey_star_rating~ survey_response_rate_percent', data=df_final).fit()

result_noi = smf.ols(formula='patient_survey_star_rating~ survey_response_rate_percent -1 ', data=df_final).fit()

ax = sns.regplot('survey_response_rate_percent', 'patient_survey_star_rating', df_final, fit_reg=False)

# We pick points equally spaced from the min to the max
xfpd = pd.DataFrame(np.linspace(0, 100, 50), columns=['survey_response_rate_percent'])

yfi = result.predict(xfpd)
yfi_noi = result_noi.predict(xfpd)

plt.plot(xfpd['survey_response_rate_percent'], yfi, color='red', alpha = 0.5, label='y = mx + b')
plt.plot(xfpd['survey_response_rate_percent'], yfi_noi, color='green', alpha = 0.5, label='y = mx')

ax.set_title('Survey Rating vs Response Rate', fontsize=18)
ax.set_xlabel('Survey Response Rate (%)', fontsize=16)
ax.set_ylabel('Survey Rating (out of 5)', fontsize=16)
ax.set_ylim([0,5])
ax.legend(loc=4)
