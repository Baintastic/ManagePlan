using Dapper;
using ManagePlan.Core.Models;
using ManagePlan.Repository.IRepositories;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace ManagePlan.Repository.Repositories
{
    public class PersonRepository : IPersonRepository
    {
        private readonly IConfiguration configuration;

        public PersonRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task Add(Person entity)
        {
            var sql = "Insert into [dbo].Persons (name, surname, id_number) VALUES (@Name, @Surname, @Id_Number)";
            using (var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection")))
            {
                connection.Open();
                await connection.ExecuteAsync(sql, entity);
            }
        }

        public async Task Delete(int id)
        {
            var sql = "DELETE FROM [dbo].Persons WHERE code = @Code";
            using (var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection")))
            {
                connection.Open();
                await connection.ExecuteAsync(sql, new { Code = id });
            }
        }

        public async Task<IEnumerable<Person>> GetAll()
        {
            var sql = "SELECT * FROM [dbo].Persons";
            using (var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection")))
            {
                connection.Open();
                var result = await connection.QueryAsync<Person>(sql);
                return result.ToList();
            }
        }

        public async Task<Person> GetById(int id)
        {
            var sql = "SELECT * FROM [dbo].Persons WHERE code = @Code";
            using (var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection")))
            {
                connection.Open();
                var result = await connection.QuerySingleOrDefaultAsync<Person>(sql, new { Code = id });
                return result;
            }
        }

        public async Task Update(Person entity)
        {
            var sql = "UPDATE [dbo].Persons SET name = @Name, surname = @Surname, id_number = @Id_Number WHERE code = @Code";
            using (var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection")))
            {
                connection.Open();
                await connection.ExecuteAsync(sql, entity);
            }
        }

        public async Task<Person> GetByIdNumber(string idNumber)
        {
            var sql = "SELECT * FROM [dbo].Persons p WHERE p.id_number = @Id_Number";
            using (var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection")))
            {
                connection.Open();
                var parameters = new { Id_Number = idNumber };
                var result = await connection.QuerySingleOrDefaultAsync<Person>(sql, parameters);
                return result;
            }
        }

        //public async Task<Person> GetByIdNumberOrSurnameOrAccountNumber(string idNumber, string surname, string accountNumber)
        //{
        //    var sql = "SELECT * FROM [dbo].Persons p " +
        //            "JOIN [dbo].Accounts acc on p.code = acc.person_code " +
        //            "WHERE acc.account_number = @AccountNumber OR p.surname = @Surname OR p.id_number = @Id_Number";
        //    using (var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection")))
        //    {
        //        connection.Open();
        //        var parameters = new { Id_Number = idNumber, Surname = surname, AccountNumber = accountNumber };
        //        var result = await connection.QuerySingleOrDefaultAsync<Person>(sql, parameters);
        //        return result;
        //    }
        //}
    }
}
