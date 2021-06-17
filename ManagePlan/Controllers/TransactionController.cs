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
    public class TransactionController : Controller
    {
        private readonly ITransactionService transactionService;
        public TransactionController(ITransactionService transactionService)
        {
            this.transactionService = transactionService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await transactionService.GetAllTransactions();
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var data = await transactionService.GetTransactionById(id);
            if (data == null) return Ok();
            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> Add(Transaction product)
        {
            await transactionService.AddTransaction(product);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await transactionService.DeleteTransaction(id);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Update(Transaction product)
        {
            await transactionService.UpdateTransaction(product);
            return Ok();
        }

        [HttpGet("account/{accountId}")]
        public async Task<IActionResult> GetAllByAccountId(int accountId)
        {
            var data = await transactionService.GetTransactionsByAccountId(accountId);
            return Ok(data);
        }
    }
}
