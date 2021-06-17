using ManagePlan.Core.Models;
using ManagePlan.Repository.IRepositories;
using NSubstitute;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ManagePlan.Service.Tests
{
    [TestFixture]
    public class AccountServiceTests
    {
        private IAccountRepository _accountRepository;

        [SetUp]
        public void SetUp()
        {
            _accountRepository = Substitute.For<IAccountRepository>();
        }

        [Test]
        public async Task GetAccountById_ShouldReturnAccountDetails()
        {
            //Arrange
            var service = new AccountService(_accountRepository);

            //Act
            var account = new Account
            {
                Code = 1,
                AccountNumber = "12345",
                OustandingBalance = 100,
                PersonCode = 1
            };
            _accountRepository.GetById(1).Returns(account); ;
            var expectedResult = account;
            var result = await service.GetAccountById(1);

            //Assert
            Assert.AreEqual(expectedResult, result);
        }

        [Test]
        public async Task GetAllAccounts_ShouldReturnAllAccounts()
        {
            //Arrange
            var service = new AccountService(_accountRepository);

            //Act
            var accounts = new List<Account>
            {
                new Account
                 {
                    Code = 1,
                    AccountNumber = "12345",
                    OustandingBalance = 100,
                    PersonCode = 1
                 },
                 new Account
                 {
                    Code = 2,
                    AccountNumber = "12345",
                    OustandingBalance = 200,
                    PersonCode = 2
                 }
            };

            _accountRepository.GetAll().Returns(accounts); ;
            var expectedResult = accounts;
            var result = await service.GetAllAccounts();

            //Assert
            Assert.AreEqual(expectedResult, result);
        }

        [Test]
        public async Task GetAccountByIdNumberOrSurnameOrAccountNumber_ShouldReturnAccountDetails()
        {
            //Arrange
            var service = new AccountService(_accountRepository);

            //Act
            var account = new Account
            {
                Code = 1,
                AccountNumber = "12345",
                OustandingBalance = 100,
                PersonCode = 1
            };
            _accountRepository.GetByIdNumberOrSurnameOrAccountNumber("123456", "Zungu", "").Returns(account); ;
            var expectedResult = account;
            var result = await service.GetAccountByIdNumberOrSurnameOrAccountNumber("123456", "Zungu", "");

            //Assert
            Assert.AreEqual(expectedResult, result);
        }

        [Test]
        public async Task GetAccountsByPersonId_ShouldReturnAccountsLinkedToPersonId()
        {
            //Arrange
            var service = new AccountService(_accountRepository);

            //Act
            var accounts = new List<Account>
            {
                new Account
                 {
                    Code = 1,
                    AccountNumber = "12345",
                    OustandingBalance = 100,
                    PersonCode = 1
                 },
                 new Account
                 {
                    Code = 2,
                    AccountNumber = "12345",
                    OustandingBalance = 200,
                    PersonCode = 2
                 }
            };

            _accountRepository.GetAllByPersonId(1).Returns(accounts); ;
            var expectedResult = accounts;
            var result = await service.GetAccountsByPersonId(1);

            //Assert
            Assert.AreEqual(expectedResult, result);
        }
    }
}
