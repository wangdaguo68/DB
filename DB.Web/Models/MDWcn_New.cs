using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DB.Web.Model
{
    [Table("MDWcn_New")]
    public class MDWcn_New
    {
        [Key]
        public string WcnID { get; set; }
        public string WcnName { get; set; }
        public char WcnType { get; set; }
        public string CustWcLoc { get; set; }
        public string CustApsType { get; set; }
        public string Area { get; set; }
    }
}
