using ManagePlan.Core.Models;
using System.Threading.Tasks;

namespace ManagePlan.Repository.IRepositories
{
    public interface IPersonRepository : IGenericRepository<Person>
    {
        Task<Person> GetByIdNumberOrSurnameOrAccountNumber(string idNumber, string surname, string accountNumber);
    }
}
