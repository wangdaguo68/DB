using DB.Test.Model;
using System;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;

namespace DB.Test
{
    public class Program
    {
        static void Main(string[] args)
        {
            //测试事务内，新增之后查询结果
            var sw = new Stopwatch();
            sw.Start();
            using (var _db = new TestContext())
            {
                //var a = _db.Bu_WOProdRecords.AsNoTracking().ToList();
                //var b = _db.Base_WcnStatuss.AsNoTracking().ToList();
                //var c = _db.MDWcn_News.AsNoTracking().ToList();
                //var d = _db.MMOrd_News.AsNoTracking().ToList();
                //var sqlParms = new object[1];
                //sqlParms[0] = new SqlParameter("@i",6);
                //var item = _db.Database.SqlQuery<object>("exec Proc_ViewDataSource @i", sqlParms).ToList();
                //var item1 = (from p in _db.Bu_WOProdRecords
                //             join q in _db.MDWcn_News on p.WcnID equals q.WcnID into temp1
                //             from m in temp1.DefaultIfEmpty()
                //             join n in _db.MMOrd_News on p.WorkOrder equals n.DocNum2 into temp2
                //             from x in temp2.DefaultIfEmpty()
                //             join y in _db.Bu_WcnRunRecords on p.WcnID equals y.WcnID into temp3
                //             from e in temp3.DefaultIfEmpty()
                //             join f in _db.Base_WcnStatuss on e.StatusId equals f.Id into temp4
                //             from g in temp4.DefaultIfEmpty()
                //             where e.DocStatus == "O" && p.DocStatus == "O"
                //             select new
                //             {
                //                 p.WcnID,
                //                 m.WcnName,
                //                 m.Area,
                //                 DocNum2 = x.DocNum2 ?? "-",
                //                 Qty = (int)(x.Qty ?? 0),
                //                 FactQty = (int)p.FactQty,
                //                 e.StatusId,
                //                 g.Status,
                //                 OEEC = 101,
                //                 OEEP = 89,
                //                 BadRate = (int)(((p.FactQty ?? 0) - (p.BadProdQty ?? 0)) / p.FactQty * 100)
                //             });
                //var item2 = (from p in _db.Bu_WcnRunRecords
                //             join q in _db.MDWcn_News on p.WcnID equals q.WcnID into temp1
                //             from m in temp1.DefaultIfEmpty()
                //             join n in _db.Base_WcnStatuss on p.StatusId equals n.Id into temp2
                //             from x in temp2.DefaultIfEmpty()
                //             where p.DocStatus =="O" && p.StatusId == 1
                //             select new
                //             {
                //                 p.WcnID,
                //                 m.WcnName,
                //                 m.Area,
                //                 DocNum2 = "-",
                //                 Qty = 0,
                //                 FactQty = 0,
                //                 p.StatusId,
                //                 x.Status,
                //                 OEEC = 0,
                //                 OEEP = 0,
                //                 BadRate = 0
                //             });
                //var item3 = item1.Union(item2);
                //var items = (from p in _db.MDWcn_News
                //             join q in item3 on new { p.WcnID } equals new { q.WcnID } into temp
                //             from t in temp.DefaultIfEmpty()
                //             where p.CustWcLoc.Equals("CE") && p.CustApsType.Equals("05")
                //             select p).AsNoTracking().ToList();
                //sw.Stop();
                var data = _db.Database.SqlQuery<WSActualTimeData>("select * from WSActualTimeData").AsQueryable().ToList();
                Console.WriteLine(sw.ElapsedMilliseconds);
                Console.ReadKey();
            }
        }
    }
}
