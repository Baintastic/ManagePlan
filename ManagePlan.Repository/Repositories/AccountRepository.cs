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
    public class AccountRepository : IAccountRepository
    {
        private readonly IConfiguration configuration;

        public AccountRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task Add(Account entity)
        {
            var sql = "Insert into [dbo].Accounts (person_code, account_number, outstanding_balance) VALUES (@Person_Code, @Account_Number, @Outstanding_Balance)";
            using var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection"));
            connection.Open();
            await connection.ExecuteAsync(sql, entity);
        }

        public async Task Delete(int id)
        {
            var sql = "DELETE FROM [dbo].Accounts WHERE code = @Code";
            using var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection"));
            connection.Open();
            await connection.ExecuteAsync(sql, new { Code = id });
        }

        public async Task<IEnumerable<Account>> GetAll()
        {
            var sql = "SELECT * FROM [dbo].Accounts";
            using var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection"));
            connection.Open();
            var result = await connection.QueryAsync<Account>(sql);
            return result.ToList();
        }

        public async Task<Account> GetById(int id)
        {
            var sql = "SELECT * FROM [dbo].Accounts WHERE code = @Code";
            using var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection"));
            connection.Open();
            var result = await connection.QuerySingleOrDefaultAsync<Account>(sql, new { Code = id });
            return result;
        }

        public async Task Update(Account entity)
        {
            var sql = "UPDATE [dbo].Accounts SET account_number = @Account_Number, outstanding_balance = @Outstanding_Balance, is_Closed = @Is_Closed WHERE code = @Code";
            using var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection"));
            connection.Open();
            await connection.ExecuteAsync(sql, entity);
        }

        public async Task<IEnumerable<Account>> GetAllByPersonId(int personId)
        {
            var sql = "SELECT * FROM [dbo].Accounts WHERE person_code = @Person_Code";
            using var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection"));
            connection.Open();
            var result = await connection.QueryAsync<Account>(sql, new { Person_Code = personId });
            return result.ToList();
        }

        public async Task<Account> GetByAccountNumber(string accountNumber)
        {
            var sql = "SELECT * FROM [dbo].Accounts acc WHERE acc.account_number = @AccountNumber";
            using var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection"));
            connection.Open();
            var parameters = new { AccountNumber = accountNumber };
            var result = await connection.QuerySingleOrDefaultAsync<Account>(sql, parameters);
            return result;
        }
    }
}
