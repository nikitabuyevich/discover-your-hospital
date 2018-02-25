using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using DiscoverYourHospital.API.Models;
using DiscoverYourHospital.API.Helpers;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

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
 
        // GET api/values
        [HttpGet]
        public IEnumerable<Hcahps> Get()
        {
            return hcahpsRepository.GetAll();
        }
    }
}
