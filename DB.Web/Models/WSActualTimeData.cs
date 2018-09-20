namespace DB.Web.Models
{
    public class WSActualTimeData
    {
        public string WcnID { get; set; }
        public string WcnName { get; set; }
        public string DocNum2 { get; set; }
        public int Qty { get; set; }
        public int FactQty { get; set; }
        public string Area { get; set; }
        public int StatusId { get; set; }
        public string Status { get; set; }
        public int OEEC { get; set; }
        public int OEEP { get; set; }
        public decimal BadRate { get; set; }
    }
}
