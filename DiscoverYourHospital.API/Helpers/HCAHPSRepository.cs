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

        public void Add(Hcahps item)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<Hcahps> FindAll()
        {
            throw new System.NotImplementedException();
        }

        public Hcahps FindByID(int id)
        {
            throw new System.NotImplementedException();
        }

        //public void Add(Product prod)
        //{
        //    using (IDbConnection dbConnection = Connection)
        //    {
        //        string sQuery = "INSERT INTO Products (Name, Quantity, Price)"
        //                        + " VALUES(@Name, @Quantity, @Price)";
        //        dbConnection.Open();
        //        dbConnection.Execute(sQuery, prod);
        //    }
        //}

        public IEnumerable<Hcahps> GetAll()
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                var allHcahps = dbConnection.Query<Hcahps>(HcahpsSql.GetAll);
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

        public void Remove(int id)
        {
            throw new System.NotImplementedException();
        }

        public void Update(Hcahps item)
        {
            throw new System.NotImplementedException();
        }

        //public Product GetByID(int id)
        //{
        //    using (IDbConnection dbConnection = Connection)
        //    {
        //        string sQuery = "SELECT * FROM Products"
        //                       + " WHERE ProductId = @Id";
        //        dbConnection.Open();
        //        return dbConnection.Query<Product>(sQuery, new { Id = id }).FirstOrDefault();
        //    }
        //}

        //public void Delete(int id)
        //{
        //    using (IDbConnection dbConnection = Connection)
        //    {
        //        string sQuery = "DELETE FROM Products"
        //                     + " WHERE ProductId = @Id";
        //        dbConnection.Open();
        //        dbConnection.Execute(sQuery, new { Id = id });
        //    }
        //}

        //public void Update(Product prod)
        //{
        //    using (IDbConnection dbConnection = Connection)
        //    {
        //        string sQuery = "UPDATE Products SET Name = @Name,"
        //                       + " Quantity = @Quantity, Price= @Price"
        //                       + " WHERE ProductId = @ProductId";
        //        dbConnection.Open();
        //        dbConnection.Query(sQuery, prod);
        //    }
        //}
    }
}
