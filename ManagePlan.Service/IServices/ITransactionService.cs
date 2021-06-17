using ManagePlan.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ManagePlan.Service.IServices
{
    public interface ITransactionService
    {
        Task AddTransaction(Transaction transaction);
        Task DeleteTransaction(int id);
        Task<IEnumerable<Transaction>> GetAllTransactions();
        Task<Transaction> GetTransactionById(int id);
        Task UpdateTransaction(Transaction transaction);
        Task<IEnumerable<Transaction>> GetTransactionsByAccountId(int accountId);
    }
}
