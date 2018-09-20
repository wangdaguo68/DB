using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DB.Test.Model
{
    [Table("MMOrd_New")]
    public class MMOrd_New
    {
        [Key]
        public int DocEntry { get; set; }
        public int DocNum { get; set; }
        public int ObjType { get; set; }
        public decimal? Qty { get; set; }
        public decimal? OpenQty { get; set; }
        public char DocStatus { get; set; }
        public DateTime? DocDate { get; set; }
        public DateTime? CustReleaseDate { get; set; }
        public string WcnID { get; set; }
        public string WcnName { get; set; }
        public string ItemID { get; set; }
        public string ItemName { get; set; }
        public string ItemSpec { get; set; }
        public string NumAtCrd { get; set; }
        public DateTime? FinishedDate { get; set; }
        public DateTime? SchedStart { get; set; }
        public DateTime? SchedEnd { get; set; }
        public DateTime? RealDate { get; set; }
        public DateTime? ReqDate { get; set; }
        public string MoldNum { get; set; }
        public string SchedWcnID { get; set; }
        public string CustCltID { get; set; }
        public string CustCltName { get; set; }
        public decimal? CustPackQty { get; set; }
        public decimal? CustInnerPackQty { get; set; }
        public string DocNum2 { get; set; }
    }
}
