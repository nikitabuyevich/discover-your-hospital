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
        FROM patientsurveys;";

        public const string GetAllQuestions = @"
        SELECT DISTINCT hcahps_question
        FROM patientsurveys;";

        public const string GetAllRatings = @"
        SELECT location as location_json, hospital_name, address, city, state, zip_code, county_name, phone_number, hcahps_question, patient_survey_star_rating, survey_response_rate_percent
        FROM patientsurveys
        WHERE patient_survey_star_rating NOT LIKE 'Not Applicable' AND patient_survey_star_rating NOT LIKE 'Not Available'";

        public const string GetOverallHospital = @"
        SELECT location as location_json, hospital_name, address, city, state, zip_code, county_name, phone_number, hcahps_question, patient_survey_star_rating, survey_response_rate_percent
        FROM patientsurveys
        WHERE patient_survey_star_rating NOT LIKE 'Not Applicable' AND patient_survey_star_rating NOT LIKE 'Not Available'
        AND hcahps_question = 'Overall hospital rating - star rating';
        ";

        public const string GetDoctorCommunication = @"
        SELECT location as location_json, hospital_name, address, city, state, zip_code, county_name, phone_number, hcahps_question, patient_survey_star_rating, survey_response_rate_percent
        FROM patientsurveys
        WHERE patient_survey_star_rating NOT LIKE 'Not Applicable' AND patient_survey_star_rating NOT LIKE 'Not Available'
        AND hcahps_question = 'Doctor communication - star rating';
        ";

        public const string GetRecommendedHospital = @"
        SELECT location as location_json, hospital_name, address, city, state, zip_code, county_name, phone_number, hcahps_question, patient_survey_star_rating, survey_response_rate_percent
        FROM patientsurveys
        WHERE patient_survey_star_rating NOT LIKE 'Not Applicable' AND patient_survey_star_rating NOT LIKE 'Not Available'
        AND hcahps_question = 'Recommend hospital - star rating';
        ";

        public const string GetSummary = @"
        SELECT location as location_json, hospital_name, address, city, state, zip_code, county_name, phone_number, hcahps_question, patient_survey_star_rating, survey_response_rate_percent
        FROM patientsurveys
        WHERE patient_survey_star_rating NOT LIKE 'Not Applicable' AND patient_survey_star_rating NOT LIKE 'Not Available'
        AND hcahps_question = 'Summary star rating';
        ";

        public const string GetPainManagement = @"
        SELECT location as location_json, hospital_name, address, city, state, zip_code, county_name, phone_number, hcahps_question, patient_survey_star_rating, survey_response_rate_percent
        FROM patientsurveys
        WHERE patient_survey_star_rating NOT LIKE 'Not Applicable' AND patient_survey_star_rating NOT LIKE 'Not Available'
        AND hcahps_question = 'Pain management - star rating';
        ";

        public const string GetDischargeInformation = @"
        SELECT location as location_json, hospital_name, address, city, state, zip_code, county_name, phone_number, hcahps_question, patient_survey_star_rating, survey_response_rate_percent
        FROM patientsurveys
        WHERE patient_survey_star_rating NOT LIKE 'Not Applicable' AND patient_survey_star_rating NOT LIKE 'Not Available'
        AND hcahps_question = 'Discharge information - star rating';
        ";

        public const string GetCareTransition = @"
        SELECT location as location_json, hospital_name, address, city, state, zip_code, county_name, phone_number, hcahps_question, patient_survey_star_rating, survey_response_rate_percent
        FROM patientsurveys
        WHERE patient_survey_star_rating NOT LIKE 'Not Applicable' AND patient_survey_star_rating NOT LIKE 'Not Available'
        AND hcahps_question = 'Care transition - star rating';
        ";

        public const string GetNurseCommunication = @"
        SELECT location as location_json, hospital_name, address, city, state, zip_code, county_name, phone_number, hcahps_question, patient_survey_star_rating, survey_response_rate_percent
        FROM patientsurveys
        WHERE patient_survey_star_rating NOT LIKE 'Not Applicable' AND patient_survey_star_rating NOT LIKE 'Not Available'
        AND hcahps_question = 'Nurse communication - star rating';
        ";

        public const string GetQuietness = @"
        SELECT location as location_json, hospital_name, address, city, state, zip_code, county_name, phone_number, hcahps_question, patient_survey_star_rating, survey_response_rate_percent
        FROM patientsurveys
        WHERE patient_survey_star_rating NOT LIKE 'Not Applicable' AND patient_survey_star_rating NOT LIKE 'Not Available'
        AND hcahps_question = 'Quietness - star rating';
        ";

        public const string GetCleanliness = @"
        SELECT location as location_json, hospital_name, address, city, state, zip_code, county_name, phone_number, hcahps_question, patient_survey_star_rating, survey_response_rate_percent
        FROM patientsurveys
        WHERE patient_survey_star_rating NOT LIKE 'Not Applicable' AND patient_survey_star_rating NOT LIKE 'Not Available'
        AND hcahps_question = 'Cleanliness - star rating';
        ";

        public const string GetStaffResponsiveness = @"
        SELECT location as location_json, hospital_name, address, city, state, zip_code, county_name, phone_number, hcahps_question, patient_survey_star_rating, survey_response_rate_percent
        FROM patientsurveys
        WHERE patient_survey_star_rating NOT LIKE 'Not Applicable' AND patient_survey_star_rating NOT LIKE 'Not Available'
        AND hcahps_question = 'Staff responsiveness - star rating';
        ";

        public const string GetCommunicationAboutMedicines = @"
        SELECT location as location_json, hospital_name, address, city, state, zip_code, county_name, phone_number, hcahps_question, patient_survey_star_rating, survey_response_rate_percent
        FROM patientsurveys
        WHERE patient_survey_star_rating NOT LIKE 'Not Applicable' AND patient_survey_star_rating NOT LIKE 'Not Available'
        AND hcahps_question = 'Communication about medicines - star rating';
        ";
    }
}
