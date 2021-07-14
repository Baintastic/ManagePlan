using ManagePlan.Core.Models;
using ManagePlan.Repository.IRepositories;
using ManagePlan.Service.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ManagePlan.Service
{
    public class PersonService : IPersonService
    {
        private readonly IPersonRepository personRepository;
        public PersonService(IPersonRepository personRepository)
        {
            this.personRepository = personRepository;
        }

        public Task AddPerson(Person person)
        {
            return personRepository.Add(person);
        }

        public Task DeletePerson(int id)
        {
            return personRepository.Delete(id);
        }

        public Task<IEnumerable<Person>> GetAllPersons()
        {
            return personRepository.GetAll();
        }

        public Task<Person> GetPersonById(int id)
        {
            return personRepository.GetById(id);
        }

        public Task UpdatePerson(Person person)
        {
            return personRepository.Update(person);
        }

        public Task<Person> GetPersonByIdNumber(string idNumber)
        {
            return personRepository.GetByIdNumber(idNumber);
        }
    }
}
