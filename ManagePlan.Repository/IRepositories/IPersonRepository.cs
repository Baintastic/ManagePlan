using ManagePlan.Core.Models;
using System.Threading.Tasks;

namespace ManagePlan.Repository.IRepositories
{
    public interface IPersonRepository : IGenericRepository<Person>
    {
        Task<Person> GetByIdNumber(string idNumber);
    }
}
