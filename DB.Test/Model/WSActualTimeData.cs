using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB.Test.Model
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
