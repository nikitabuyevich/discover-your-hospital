using Microsoft.AspNetCore.Mvc;
using DiscoverYourHospital.API.Helpers;
using Microsoft.Extensions.Configuration;

namespace DiscoverYourHospital.API.Controllers
{
    [Route("api/[controller]")]
    public class HcahpsController : Controller
    {
        private readonly HCAHPSRepository hcahpsRepository;

        public HcahpsController(IConfiguration configuration)
        {
            hcahpsRepository = new HCAHPSRepository(configuration);
        }

        [HttpGet()]
        public string GetAllRatings()
        {
            return JsonFormatter.GetWithoutNulls(hcahpsRepository.GetAllRatings());
        }

        [HttpGet("overall-hospital")]
        public string GetOverallHospital()
        {
            return JsonFormatter.GetWithoutNulls(hcahpsRepository.GetOverallHospital());
        }

        [HttpGet("doctor-communication")]
        public string GetDoctorCommunication()
        {
            return JsonFormatter.GetWithoutNulls(hcahpsRepository.GetDoctorCommunication());
        }

        [HttpGet("recommended-hospital")]
        public string GetRecommendedHospital()
        {
            return JsonFormatter.GetWithoutNulls(hcahpsRepository.GetRecommendedHospital());
        }

        [HttpGet("summary")]
        public string GetSummary()
        {
            return JsonFormatter.GetWithoutNulls(hcahpsRepository.GetSummary());
        }

        [HttpGet("pain-management")]
        public string GetPainManagement()
        {
            return JsonFormatter.GetWithoutNulls(hcahpsRepository.GetPainManagement());
        }

        [HttpGet("discharge-information")]
        public string GetDischargeInformation()
        {
            return JsonFormatter.GetWithoutNulls(hcahpsRepository.GetDischargeInformation());
        }

        [HttpGet("care-transition")]
        public string GetCareTransition()
        {
            return JsonFormatter.GetWithoutNulls(hcahpsRepository.GetCareTransition());
        }

        [HttpGet("nurse-communication")]
        public string GetNurseCommunication()
        {
            return JsonFormatter.GetWithoutNulls(hcahpsRepository.GetNurseCommunication());
        }

        [HttpGet("quietness")]
        public string GetQuietness()
        {
            return JsonFormatter.GetWithoutNulls(hcahpsRepository.GetQuietness());
        }

        [HttpGet("cleanliness")]
        public string GetCleanliness()
        {
            return JsonFormatter.GetWithoutNulls(hcahpsRepository.GetCleanliness());
        }

        [HttpGet("staff-responsiveness")]
        public string GetStaffResponsiveness()
        {
            return JsonFormatter.GetWithoutNulls(hcahpsRepository.GetStaffResponsiveness());
        }

        [HttpGet("communication-about-medicines")]
        public string GetCommunicationAboutMedicines()
        {
            return JsonFormatter.GetWithoutNulls(hcahpsRepository.GetCommunicationAboutMedicines());
        }
    }
}
