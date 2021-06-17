using ManagePlan.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ManagePlan.Service.IServices
{
    public interface IAccountService
    {
        public Task AddAccount(Account person);
        public Task DeleteAccount(int id);
        public Task<IEnumerable<Account>> GetAllAccounts();
        public Task<Account> GetAccountById(int id);
        public Task UpdateAccount(Account person);
        Task<IEnumerable<Account>> GetAccountsByPersonId(int personId);
        Task<Account> GetAccountByIdNumberOrSurnameOrAccountNumber(string idNumber, string surname, string accountNumber);
    }
}
