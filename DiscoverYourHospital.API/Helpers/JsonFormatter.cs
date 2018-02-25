using DiscoverYourHospital.API.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Collections.Generic;

namespace DiscoverYourHospital.API.Helpers
{
    public class JsonFormatter
    {
        public static string GetWithoutNulls(IEnumerable<Hcahps> hcahps)
        {
            return JsonConvert.SerializeObject(hcahps,
                            Formatting.None,
                            new JsonSerializerSettings
                            {
                                NullValueHandling = NullValueHandling.Ignore,
                                ContractResolver = new CamelCasePropertyNamesContractResolver()
                            });
        }
    }
}
