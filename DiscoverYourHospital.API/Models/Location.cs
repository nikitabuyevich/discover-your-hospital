using System.Collections.Generic;

namespace DiscoverYourHospital.API.Models
{
    public class Location
    {
        public string Type { get; set; }
        public IEnumerable<double> Coordinates { get; set; }
    }
}
