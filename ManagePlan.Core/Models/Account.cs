namespace ManagePlan.Core.Models
{
    public class Account
    {
        public int Code { get; set; }
        public int Person_Code { get; set; }
        public string Account_Number { get; set; }
        public decimal Outstanding_Balance { get; set; }
        public bool Is_Closed { get; set; }
    }
}
