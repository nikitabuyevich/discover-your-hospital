import numpy as np
import pandas as pd

df = df.drop(columns=["number_of_completed_surveys_footnote",
                 "survey_response_rate_percent_footnote",
                 "hcahps_answer_description",
                 "hcahps_answer_percent_footnote",
                 "hcahps_linear_mean_value",
                 "phone_number_type",
                 "county_name",
                 "location_address",
                 "location_state",
                 "location_city",
                 "patient_survey_star_rating_footnote",
                 "hcahps_answer_percent",
                 "location_zip"])

def nanizier(x):
    try:
        return {"not applicable" : np.nan}.get(x.lower().strip(), x)
    
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

df_average = pd.merge(rating_mean, 
                      pd.merge(response_rate_mean, survey_num_mean, on='hospital_name', how='inner'),
                      on='hospital_name',
                      how='inner')


df_unique = df[["hospital_name","address","city","state","phone_number","longtitude","latitude"]]

df_unique = df_unique.drop_duplicates().sort_values('hospital_name')

df_final = pd.merge(df_unique, 
                    df_average,
                    on='hospital_name',
                    how='inner')

df_final