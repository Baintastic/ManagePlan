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
        public async Task<IActionResult> Add(Person product)
        {
            await personService.AddPerson(product);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await personService.DeletePerson(id);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Update(Person product)
        {
            await personService.UpdatePerson(product);
            return Ok();
        }

        //[HttpGet("{idNumber}/{surname}/{accountNumber}")]
        //public async Task<IActionResult> GetByIdNumberOrSurnameOrAccountNumber(string idNumber, string surname, string accountNumber)
        //{
        //    var data = await personService.GetPersonByIdNumberOrSurnameOrAccountNumber(idNumber, surname, accountNumber);
        //    if (data == null) return Ok();
        //    return Ok(data);
        //}
    }
}
