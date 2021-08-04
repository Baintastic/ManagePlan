//using Dapper;
//using ManagePlan.Core.Models;
//using ManagePlan.Repository.IRepositories;
//using ManagePlan.Repository.Repositories;
//using Microsoft.Extensions.Configuration;
//using NSubstitute;
//using NUnit.Framework;
//using System.Data;
//using System.Data.SqlClient;

//namespace ManagePlan.Repository.Tests
//{
//    [TestFixture]
//    public class AccountRepositoryTests
//    {
//        private IConfiguration _configuration;
//        private IDbConnection _sqlConnection;

//        [SetUp]
//        public void SetUp()
//        {
//            // initialize here
//            _configuration = Substitute.For<IConfiguration>();
//            _sqlConnection = Substitute.For<IDbConnection>();
//        }

//        [Test]
//        public async System.Threading.Tasks.Task GetAccount_ShouldReturnAccountDetailsAsync()
//        {
//            //Arrange
//            var repository = new AccountRepository(_configuration);

//            //Act
//            var account = new Account
//            {
//                Code = 1,
//                AccountNumber = "12345",
//                OustandingBalance = 100,
//                PersonCode = 1
//            };
//            _configuration.GetConnectionString("DefaultConnection").Returns("Data Source=.;Initial Catalog=ManagePlan;Integrated Security=True;MultipleActiveResultSets=True");

//            // _accountRepository.GetByIdAsync(1).Returns(account);
//           // var sqlConnection = new SqlConnection();
//             _sqlConnection.QuerySingleOrDefaultAsync<Account>("", new { Code = 1 }).Returns(account);
//             var expectedResult = account;
//            var result = await repository.GetById(1);

//            //Assert
//            Assert.AreEqual(expectedResult, result);
//        }


//    }
//}
