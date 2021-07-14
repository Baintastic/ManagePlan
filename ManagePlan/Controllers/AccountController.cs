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
    public class AccountController : Controller
    {
        private readonly IAccountService accountService;
        public AccountController(IAccountService accountService)
        {
            this.accountService = accountService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await accountService.GetAllAccounts();
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var data = await accountService.GetAccountById(id);
            if (data == null) return Ok();
            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> Add(Account product)
        {
            await accountService.AddAccount(product);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await accountService.DeleteAccount(id);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Update(Account product)
        {
            await accountService.UpdateAccount(product);
            return Ok();
        }

        [HttpGet("person/{personId}")]
        public async Task<IActionResult> GetAllByPersonId(int personId)
        {
            var data = await accountService.GetAccountsByPersonId(personId);
            if (data == null) return Ok();
            return Ok(data);
        }

        [HttpGet("accountNumber/{accountNumber}")]
        public async Task<IActionResult> GetByIdNumberr(string accountNumber)
        {
            var data = await accountService.GetAccountByAccountNumber(accountNumber);
            if (data == null) return Ok();
            return Ok(data);
        }
    }
}
