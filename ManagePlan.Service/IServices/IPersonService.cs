using ManagePlan.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ManagePlan.Service.IServices
{
    public interface IPersonService
    {
        Task<Person> GetPersonById(int id);
        Task<IEnumerable<Person>> GetAllPersons();
        Task AddPerson(Person entity);
        Task UpdatePerson(Person entity);
        Task DeletePerson(int id);
        Task<Person> GetPersonByIdNumber(string idNumber);
    }
}
