using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DB.Web.Models
{
    public class ZZ_Tmp_CEoEE
    {
        //public int Id { get; set; }
        public DateTime DocDate { get; set; }
        public int LPQty { get; set; }
        public int NQty { get; set; }
        public decimal BZCL { get; set; }
        public int YXYX { get; set; }
        public int JHTime { get; set; }
        public int JTKYXTime { get; set; }
    }
    public class DataModel : ZZ_Tmp_CEoEE
    {
        public string Date { get; set; }
        /// <summary>
        /// 前第几周
        /// </summary>
        public int weeknum { get; set; }
    }
    public class ResultData {
        /// <summary>
        /// 良率 LPQTY/(LPQTY+NQTY)
        /// </summary>
        public decimal? Yield { get; set; }
        /// <summary>
        /// 生产效率P YXYX/JHTime
        /// </summary>
        public decimal? P_Efficiency_P { get; set; }
        /// <summary>
        /// 生产效率C YXYX/JTKYXTime
        /// </summary>
        public decimal? P_Efficiency_C { get; set; }
        /// <summary>
        /// 绩效 LPQTY/BZCL
        /// </summary>
        public decimal? Performance { get; set; }
        /// <summary>
        /// OEEC 良率*效率C*绩效
        /// </summary>
        public decimal? OEEC { get; set; }
        /// <summary>
        /// OEEP 良率*效率P*绩效
        /// </summary>
        public decimal? OEEP { get; set; }
        public string Date { get; set; }
        public DateTime? OrderDate { get; set; }
    }
}
