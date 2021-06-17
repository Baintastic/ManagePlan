using ManagePlan.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ManagePlan.Repository.IRepositories
{
    public interface ITransactionRepository : IGenericRepository<Transaction>
    {
        Task<IEnumerable<Transaction>> GetAllByAccountIdAsync(int accountId);
    }
}
