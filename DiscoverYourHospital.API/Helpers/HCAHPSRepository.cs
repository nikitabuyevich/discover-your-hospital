using System.Collections.Generic;
using Dapper;
using System.Data;
using DiscoverYourHospital.API.Models;
using Microsoft.Extensions.Configuration;
using Npgsql;
using DiscoverYourHospital.API.SQL;
using Newtonsoft.Json;

namespace DiscoverYourHospital.API.Helpers
{
    public class HCAHPSRepository : IRepository<Hcahps>
    {
        private string connectionString;
        public HCAHPSRepository(IConfiguration configuration)
        {
            connectionString = configuration.GetValue<string>("DBInfo:ConnectionString");
        }

        internal IDbConnection Connection
        {
            get
            {
                DefaultTypeMap.MatchNamesWithUnderscores = true;
                return new NpgsqlConnection(connectionString);
            }
        }

        public IEnumerable<Hcahps> GetAllRatings()
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                var allHcahps = dbConnection.Query<Hcahps>(HcahpsSql.GetAllRatings);
                foreach (var hcahps in allHcahps)
                {
                    if (!string.IsNullOrEmpty(hcahps.LocationJson))
                    {
                        hcahps.Location = JsonConvert.DeserializeObject<Location>(hcahps.LocationJson);
                    }
                }
                return allHcahps;
            }
        }

        public IEnumerable<Hcahps> GetOverallHospital()
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                var allHcahpsQuestions = dbConnection.Query<Hcahps>(HcahpsSql.GetOverallHospital);
                foreach (var hcahps in allHcahpsQuestions)
                {
                    if (!string.IsNullOrEmpty(hcahps.LocationJson))
                    {
                        hcahps.Location = JsonConvert.DeserializeObject<Location>(hcahps.LocationJson);
                    }
                }
                return allHcahpsQuestions;
            }
        }

        public IEnumerable<Hcahps> GetDoctorCommunication()
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                var allHcahpsQuestions = dbConnection.Query<Hcahps>(HcahpsSql.GetDoctorCommunication);
                foreach (var hcahps in allHcahpsQuestions)
                {
                    if (!string.IsNullOrEmpty(hcahps.LocationJson))
                    {
                        hcahps.Location = JsonConvert.DeserializeObject<Location>(hcahps.LocationJson);
                    }
                }
                return allHcahpsQuestions;
            }
        }

        public IEnumerable<Hcahps> GetRecommendedHospital()
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                var allHcahpsQuestions = dbConnection.Query<Hcahps>(HcahpsSql.GetRecommendedHospital);
                foreach (var hcahps in allHcahpsQuestions)
                {
                    if (!string.IsNullOrEmpty(hcahps.LocationJson))
                    {
                        hcahps.Location = JsonConvert.DeserializeObject<Location>(hcahps.LocationJson);
                    }
                }
                return allHcahpsQuestions;
            }
        }

        public IEnumerable<Hcahps> GetSummary()
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                var allHcahpsQuestions = dbConnection.Query<Hcahps>(HcahpsSql.GetSummary);
                foreach (var hcahps in allHcahpsQuestions)
                {
                    if (!string.IsNullOrEmpty(hcahps.LocationJson))
                    {
                        hcahps.Location = JsonConvert.DeserializeObject<Location>(hcahps.LocationJson);
                    }
                }
                return allHcahpsQuestions;
            }
        }

        public IEnumerable<Hcahps> GetPainManagement()
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                var allHcahpsQuestions = dbConnection.Query<Hcahps>(HcahpsSql.GetPainManagement);
                foreach (var hcahps in allHcahpsQuestions)
                {
                    if (!string.IsNullOrEmpty(hcahps.LocationJson))
                    {
                        hcahps.Location = JsonConvert.DeserializeObject<Location>(hcahps.LocationJson);
                    }
                }
                return allHcahpsQuestions;
            }
        }

        public IEnumerable<Hcahps> GetDischargeInformation()
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                var allHcahpsQuestions = dbConnection.Query<Hcahps>(HcahpsSql.GetDischargeInformation);
                foreach (var hcahps in allHcahpsQuestions)
                {
                    if (!string.IsNullOrEmpty(hcahps.LocationJson))
                    {
                        hcahps.Location = JsonConvert.DeserializeObject<Location>(hcahps.LocationJson);
                    }
                }
                return allHcahpsQuestions;
            }
        }

        public IEnumerable<Hcahps> GetCareTransition()
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                var allHcahpsQuestions = dbConnection.Query<Hcahps>(HcahpsSql.GetCareTransition);
                foreach (var hcahps in allHcahpsQuestions)
                {
                    if (!string.IsNullOrEmpty(hcahps.LocationJson))
                    {
                        hcahps.Location = JsonConvert.DeserializeObject<Location>(hcahps.LocationJson);
                    }
                }
                return allHcahpsQuestions;
            }
        }

        public IEnumerable<Hcahps> GetNurseCommunication()
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                var allHcahpsQuestions = dbConnection.Query<Hcahps>(HcahpsSql.GetNurseCommunication);
                foreach (var hcahps in allHcahpsQuestions)
                {
                    if (!string.IsNullOrEmpty(hcahps.LocationJson))
                    {
                        hcahps.Location = JsonConvert.DeserializeObject<Location>(hcahps.LocationJson);
                    }
                }
                return allHcahpsQuestions;
            }
        }

        public IEnumerable<Hcahps> GetQuietness()
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                var allHcahpsQuestions = dbConnection.Query<Hcahps>(HcahpsSql.GetQuietness);
                foreach (var hcahps in allHcahpsQuestions)
                {
                    if (!string.IsNullOrEmpty(hcahps.LocationJson))
                    {
                        hcahps.Location = JsonConvert.DeserializeObject<Location>(hcahps.LocationJson);
                    }
                }
                return allHcahpsQuestions;
            }
        }

        public IEnumerable<Hcahps> GetCleanliness()
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                var allHcahpsQuestions = dbConnection.Query<Hcahps>(HcahpsSql.GetCleanliness);
                foreach (var hcahps in allHcahpsQuestions)
                {
                    if (!string.IsNullOrEmpty(hcahps.LocationJson))
                    {
                        hcahps.Location = JsonConvert.DeserializeObject<Location>(hcahps.LocationJson);
                    }
                }
                return allHcahpsQuestions;
            }
        }

        public IEnumerable<Hcahps> GetStaffResponsiveness()
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                var allHcahpsQuestions = dbConnection.Query<Hcahps>(HcahpsSql.GetStaffResponsiveness);
                foreach (var hcahps in allHcahpsQuestions)
                {
                    if (!string.IsNullOrEmpty(hcahps.LocationJson))
                    {
                        hcahps.Location = JsonConvert.DeserializeObject<Location>(hcahps.LocationJson);
                    }
                }
                return allHcahpsQuestions;
            }
        }

        public IEnumerable<Hcahps> GetCommunicationAboutMedicines()
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                var allHcahpsQuestions = dbConnection.Query<Hcahps>(HcahpsSql.GetCommunicationAboutMedicines);
                foreach (var hcahps in allHcahpsQuestions)
                {
                    if (!string.IsNullOrEmpty(hcahps.LocationJson))
                    {
                        hcahps.Location = JsonConvert.DeserializeObject<Location>(hcahps.LocationJson);
                    }
                }
                return allHcahpsQuestions;
            }
        }
    }
}
