using System;

namespace ManagePlan.Core.Models
{
    public class Transaction
    {
        public int Code { get; set; }
        public int Account_Code { get; set; }
        public DateTime Transaction_Date { get; set; }
        public DateTime Capture_Date { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
    }
}
