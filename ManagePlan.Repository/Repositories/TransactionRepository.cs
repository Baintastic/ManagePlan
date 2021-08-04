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
    public class TransactionRepository : ITransactionRepository
    {
        private readonly IConfiguration configuration;

        public TransactionRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task Add(Transaction entity)
        {
            var sql = "Insert into [dbo].Transactions (account_code, transaction_date, capture_date, amount, description) VALUES (@Account_Code, @Transaction_Date, @Capture_Date, @Amount, @Description)";

            using var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection"));
            connection.Open();
            await connection.ExecuteAsync(sql, entity);
        }

        public async Task Delete(int id)
        {
            var sql = "DELETE FROM [dbo].Transactions WHERE code = @Code";
            using var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection"));
            connection.Open();
            await connection.ExecuteAsync(sql, new { Code = id });
        }

        public async Task<IEnumerable<Transaction>> GetAll()
        {
            var sql = "SELECT * FROM [dbo].Transactions";
            using var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection"));
            connection.Open();
            var result = await connection.QueryAsync<Transaction>(sql);
            return result.ToList();
        }

        public async Task<Transaction> GetById(int id)
        {
            var sql = "SELECT * FROM [dbo].Transactions WHERE code = @Code";
            using var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection"));
            connection.Open();
            var result = await connection.QuerySingleOrDefaultAsync<Transaction>(sql, new { Code = id });
            return result;
        }

        public async Task Update(Transaction entity)
        {
            var sql = "UPDATE [dbo].Transactions SET transaction_date = @Transaction_Date, amount = @Amount, description = @Description WHERE code = @Code";
            using var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection"));
            connection.Open();
            await connection.ExecuteAsync(sql, entity);
        }

        public async Task<IEnumerable<Transaction>> GetAllByAccountIdAsync(int accountId)
        {
            var sql = "SELECT * FROM [dbo].Transactions WHERE account_code = @Account_Code";
            using var connection = new SqlConnection(configuration.GetConnectionString("DefaultConnection"));
            connection.Open();
            var result = await connection.QueryAsync<Transaction>(sql, new { Account_Code = accountId });
            return result.ToList();
        }
    }
}
