using ManagePlan.Repository.IRepositories;
using ManagePlan.Repository.Repositories;
using ManagePlan.Service;
using ManagePlan.Service.IServices;
using Microsoft.Extensions.DependencyInjection;

namespace ManagePlan.Repository
{
    ///<Summary>
    /// Registers interfaces with the implementations to the Service Container 
    ///</Summary>
    public static class ServiceRegistration
    {
        ///<Summary>
        /// Add interfaces with the concrete classes
        ///</Summary>
        public static void AddInfrastructure(this IServiceCollection services)
        {
            services.AddTransient<ITransactionRepository, TransactionRepository>();
            services.AddTransient<IAccountRepository, AccountRepository>();
            services.AddTransient<IPersonRepository, PersonRepository>();
            services.AddTransient<IPersonService, PersonService>();
            services.AddTransient<ITransactionService, TransactionService>();
            services.AddTransient<IAccountService, AccountService>();
        }
    }
}
