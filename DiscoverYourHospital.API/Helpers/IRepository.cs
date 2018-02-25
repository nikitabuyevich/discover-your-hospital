using DiscoverYourHospital.API.Models;
using System.Collections.Generic;

namespace DiscoverYourHospital.API.Helpers
{
    public interface IRepository<T> where T : BaseEntity
    {
        IEnumerable<T> GetAllRatings();
        IEnumerable<T> GetOverallHospital();
        IEnumerable<T> GetDoctorCommunication();
        IEnumerable<T> GetRecommendedHospital();
        IEnumerable<T> GetSummary();
        IEnumerable<T> GetPainManagement();
        IEnumerable<T> GetDischargeInformation();
        IEnumerable<T> GetCareTransition();
        IEnumerable<T> GetNurseCommunication();
        IEnumerable<T> GetQuietness();
        IEnumerable<T> GetCleanliness();
        IEnumerable<T> GetStaffResponsiveness();
        IEnumerable<T> GetCommunicationAboutMedicines();
    }
}
