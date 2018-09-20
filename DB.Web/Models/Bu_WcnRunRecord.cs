using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DB.Web.Model
{
    [Table("Bu_WcnRunRecord")]
    public class Bu_WcnRunRecord
    {
        public int Id { get; set; }
        public string WcnID { get; set; }
        public int StatusId { get; set; }
        public long? SetUpTimeStamp { get; set; }
        public string Class { get; set; }
        public DateTime? OpDate { get; set; }
        public string OpTime { get; set; }
        public int PrcTimeStamp { get; set; }
        public string WorkOrder { get; set; }
        public string DocStatus { get; set; }
    }
}
