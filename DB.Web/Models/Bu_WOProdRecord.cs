using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DB.Web.Models
{
    [Table("Bu_WOProdRecord")]
    public class Bu_WOProdRecord
    {
        public int Id { get; set; }
        public string WcnID { get; set; }
        public string WorkOrder { get; set; }
        public DateTime? SetUpTime { get; set; }
        public DateTime? FirstPartTime { get; set; }
        public DateTime? FirstPartOKTime { get; set; }
        public decimal? BadProdQty { get; set; }
        public DateTime? SchedStart { get; set; }
        public DateTime? SchedEnd { get; set; }
        [Column("factStart")]
        public DateTime? FactStart { get; set; }
        [Column("factEnd")]
        public DateTime? FactEnd { get; set; }
        [Column("factEndStamp")]
        public long? FactEndStamp { get; set; }
        [Column("schedQty")]
        public decimal? SchedQty { get; set; }
        public decimal? FactQty { get; set; }
        public long? SetUpTimeStamp { get; set; }
        public string DocStatus { get; set; }
        public string LastopCode { get; set; }
        public DateTime? TestMoldTime { get; set; }
    }
}
