using ManagePlan.Core.Models;
using ManagePlan.Service.IServices;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ManagePlan.Controllers
{
    [EnableCors("AllowAll")]
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : Controller
    {
        private readonly IPersonService personService;
        public PersonController(IPersonService personService)
        {
            this.personService = personService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await personService.GetAllPersons();
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var data = await personService.GetPersonById(id);
            if (data == null) return Ok();
            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> Add(Person person)
        {
            await personService.AddPerson(person);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await personService.DeletePerson(id);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Update(Person person)
        {
            await personService.UpdatePerson(person);
            return Ok();
        }

        [HttpGet("idNumber/{idNumber}")]
        public async Task<IActionResult> GetByIdNumberr(string idNumber)
        {
            var data = await personService.GetPersonByIdNumber(idNumber);
            if (data == null) return Ok();
            return Ok(data);
        }
    }
}
