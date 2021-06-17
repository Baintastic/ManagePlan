using ManagePlan.Core.Models;
using ManagePlan.Repository.IRepositories;
using ManagePlan.Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ManagePlan.Service
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository accountRepository;
        public AccountService(IAccountRepository accountRepository)
        {
            this.accountRepository = accountRepository;
        }

        public Task AddAccount(Account account)
        {
            return accountRepository.Add(account);
        }

        public Task DeleteAccount(int id)
        {
            return accountRepository.Delete(id);
        }

        public Task<IEnumerable<Account>> GetAllAccounts()
        {
            return accountRepository.GetAll();
        }

        public Task<Account> GetAccountById(int id)
        {
            return accountRepository.GetById(id);
        }
        
        public Task UpdateAccount(Account account)
        {
            return accountRepository.Update(account);
        }

        public Task<IEnumerable<Account>> GetAccountsByPersonId(int personId)
        {
            return accountRepository.GetAllByPersonId(personId);
        }

        public Task<Account> GetAccountByIdNumberOrSurnameOrAccountNumber(string idNumber, string surname, string accountNumber)
        {
            return accountRepository.GetByIdNumberOrSurnameOrAccountNumber(idNumber, surname, accountNumber);
        }
    }
}
