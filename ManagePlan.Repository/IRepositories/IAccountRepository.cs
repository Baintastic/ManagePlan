using ManagePlan.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ManagePlan.Repository.IRepositories
{
    public interface IAccountRepository : IGenericRepository<Account>
    {
        Task<IEnumerable<Account>> GetAllByPersonId(int personId);
        Task<Account> GetByIdNumberOrSurnameOrAccountNumber(string idNumber, string surname, string accountNumber);
    }
}
