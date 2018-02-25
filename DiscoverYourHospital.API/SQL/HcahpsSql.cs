using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscoverYourHospital.API.SQL
{
    public static class HcahpsSql
    {
        public const string GetAll = @"
        SELECT patient_survey_id, location as location_json, provider_id, hospital_name, address, city, state, zip_code, county_name, phone_number_type, phone_number, hcahps_measure_id, hcahps_question, hcahps_answer_description, patient_survey_star_rating, patient_survey_star_rating_footnote, hcahps_answer_percent, hcahps_answer_percent_footnote, hcahps_linear_mean_value, number_of_completed_surveys, number_of_completed_surveys_footnote, survey_response_rate_percent, survey_response_rate_percent_footnote,measure_start_date, measure_end_date, location_city, location_address, location_zip, location_state
        FROM patientsurveys
        LIMIT 1;";
    }
}
