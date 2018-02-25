using System;

namespace DiscoverYourHospital.API.Models
{
    public class Hcahps : BaseEntity
    {
        public int? PatientSurveyId { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string CountyName { get; set; }
        public string HcahpsAnswerDescription { get; set; }
        public string HcahpsAnswerPercent { get; set; }
        public string HcahpsLinearMeanValue { get; set; }
        public string HcahpsMeasureId { get; set; }
        public string HcahpsQuestion { get; set; }
        public string HospitalName { get; set; }
        public string LocationJson { get; set; }
        public Location Location { get; set; }
        public string LocationAddress { get; set; }
        public string LocationCity { get; set; }
        public string LocationState { get; set; }
        public DateTime? MeasureEndDate { get; set; }
        public DateTime? MeasureStartDate { get; set; }
        public string NumberOfCompletedSurveys { get; set; }
        public string PatientSurveyStarRating { get; set; }
        public string PhoneNumber { get; set; }
        public string ProviderId { get; set; }
        public string State { get; set; }
        public string SurveyResponseRatePercent { get; set; }
        public string ZipCode { get; set; }
        public string NumberOfCompletedSurveysFootnote { get; set; }
        public string PatientSurveyStarRatingFootnote { get; set; }
        public string SurveyResponseRatePercentFootnote { get; set; }
        public string HcahpsAnswerPercentFootnote { get; set; }
    }
}
