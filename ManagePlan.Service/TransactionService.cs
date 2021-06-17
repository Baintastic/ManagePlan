using ManagePlan.Core.Models;
using ManagePlan.Repository.IRepositories;
using ManagePlan.Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ManagePlan.Service
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository transactionRepository;
        public TransactionService(ITransactionRepository transactionRepository)
        {
            this.transactionRepository = transactionRepository;
        }

        public Task AddTransaction(Transaction transaction)
        {
            return transactionRepository.Add(transaction);
        }

        public Task DeleteTransaction(int id)
        {
            return transactionRepository.Delete(id);
        }

        public Task<IEnumerable<Transaction>> GetAllTransactions()
        {
            return transactionRepository.GetAll();
        }

        public Task<Transaction> GetTransactionById(int id)
        {
            return transactionRepository.GetById(id);
        }

        public Task UpdateTransaction(Transaction transaction)
        {
            return transactionRepository.Update(transaction);
        }

        public Task<IEnumerable<Transaction>> GetTransactionsByAccountId(int accountId)
        {
            return transactionRepository.GetAllByAccountIdAsync(accountId);
        }
    }
}
