using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using DB.Web.Models;
using System.Linq;

namespace DB.Web.Controllers
{
    public class HomeController : Controller
    {
        private MyContext _db;
        public HomeController(MyContext db)
        {
            _db = db;
        }
        public IActionResult Index()
        {
            //总数据
            var total = GetReport();
            //过去7天每天数据
            var data_day = total.Where(p => p.DocDate <= DateTime.Now && p.DocDate >= DateTime.Now.AddDays(-7)).ToList();
            //过去4周每周数据
            var data_week = new List<DataModel>();
            for (var i = 0; i < 4; i++) {
                var items = total.Where(p => p.DocDate <= DateTime.Now.AddDays(0 - i * 7) && p.DocDate >= DateTime.Now.AddDays(0 - (i + 1) * 7)).ToList();
                if (items.Any())
                {
                    var item = new DataModel
                    {
                        weeknum = i + 1,
                        LPQty = items.Sum(p => p.LPQty),
                        NQty = items.Sum(p => p.NQty),
                        BZCL = items.Sum(p => p.BZCL),
                        YXYX = items.Sum(p => p.YXYX),
                        JHTime = items.Sum(p => p.JHTime),
                        JTKYZTime = items.Sum(p => p.JTKYZTime),
                    };
                    data_week.Add(item);
                }
                else
                {
                    var item = new DataModel
                    {
                        weeknum = i+1,
                        LPQty = 0,
                        NQty = 0,
                        BZCL = 0,
                        YXYX = 0,
                        JHTime = 0,
                        JTKYZTime = 0,
                    };
                    data_week.Add(item);
                }
            }
            //过去12月每个月数据
            var data_month = new List<DataModel>();
            for (var i = 0; i < 12; i++)
            {
                var year = DateTime.Now.Year;
                var month = DateTime.Now.Month - i - 1;
                if (month <= 0)
                {
                    month = 13 - i;
                    year = year - 1;
                }
                var items = total.Where(p => p.DocDate.Month == month && p.DocDate.Year == year).ToList();
                if (items.Any())
                {
                    var item = new DataModel
                    {
                        DocDate = items[0].DocDate,
                        Date = items[0].DocDate.ToString("yyyy-MM"),
                        LPQty = items.Sum(p => p.LPQty),
                        NQty = items.Sum(p => p.NQty),
                        BZCL = items.Sum(p => p.BZCL),
                        YXYX = items.Sum(p => p.YXYX),
                        JHTime = items.Sum(p => p.JHTime),
                        JTKYZTime = items.Sum(p => p.JTKYZTime),
                    };
                    data_month.Add(item);
                }
                else{
                    var item = new DataModel
                    {
                        DocDate = Convert.ToDateTime(year.ToString() +"-"+ month.ToString() + "-1"),
                        Date = Convert.ToDateTime(year.ToString()+"-"+month.ToString()+"-1").ToString("yyyy-MM"),
                        LPQty = 0,
                        NQty = 0,
                        BZCL = 0,
                        YXYX = 0,
                        JHTime = 0,
                        JTKYZTime = 0,
                    };
                    data_month.Add(item);
                }
                data_month = data_month.OrderBy(p=>p.DocDate).ToList();
            }
            return View();
        }
        /// <summary>
        /// 获取速度配置
        /// </summary>
        /// <returns></returns>
        public JsonResult GetSpeed()
        {

            var data = _db.Speeds.FirstOrDefault();
            return Json(data);

        }
        /// <summary>
        /// 数据
        /// </summary>
        /// <returns></returns>
        public JsonResult GetArea(string area)
        {

            var data = SqlQuery<WSActualTimeData>(_db, string.Format("select * from WSActualTimeData where Area ='{0}'", area));
            return Json(data);
        }
        /// <summary>
        /// 数据
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAreas()
        {

            var data = SqlQuery<WSActualTimeData>(_db, "select * from WSActualTimeData");
            var result = new
            {
                A = data.Where(p => p.Area == "A"),
                B = data.Where(p => p.Area == "B"),
                C = data.Where(p => p.Area == "C"),
                D = data.Where(p => p.Area == "D"),
            };
            return Json(result);

        }
        /// <summary>
        /// A区
        /// </summary>
        /// <returns></returns>
        public JsonResult GetArea_A()
        {
            var data = SqlQuery<WSActualTimeData>(_db, "select * from WSActualTimeData where Area ='A'");
            return Json(data);

        }
        /// <summary>
        /// B区
        /// </summary>
        /// <returns></returns>
        public JsonResult GetArea_B()
        {

            var data = SqlQuery<WSActualTimeData>(_db, "select * from WSActualTimeData where Area ='B'");
            return Json(data);
        }
        /// <summary>
        /// C区
        /// </summary>
        /// <returns></returns>
        public JsonResult GetArea_C()
        {

            var data = SqlQuery<WSActualTimeData>(_db, "select * from WSActualTimeData where Area ='C'");
            return Json(data);

        }
        /// <summary>
        /// D区
        /// </summary>
        /// <returns></returns>
        public JsonResult GetArea_D()
        {

            var data = SqlQuery<WSActualTimeData>(_db, "select * from WSActualTimeData where Area ='D'");
            return Json(data);
        }
        public IEnumerable<ZZ_Tmp_CEoEE> GetReport()
        {
            return SqlQuery<ZZ_Tmp_CEoEE>(_db, "select * from V_ZZ_Tmp_CEoEE order by DocDate");
        }
        /// <summary>
        /// 执行sql不带参数
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="db"></param>
        /// <param name="sql"></param>
        /// <returns></returns>
        private static IList<T> SqlQuery<T>(DbContext db, string sql)
            where T : new()
        {
            //注意：不要对GetDbConnection获取到的conn进行using或者调用Dispose，否则DbContext后续不能再进行使用了，会抛异常
            var conn = db.Database.GetDbConnection();
            try
            {
                conn.Open();
                using (var command = conn.CreateCommand())
                {
                    command.CommandText = sql;
                    var propts = typeof(T).GetProperties();
                    var rtnList = new List<T>();
                    T model;
                    object val;
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            model = new T();
                            foreach (var l in propts)
                            {
                                val = reader[l.Name];
                                if (val == DBNull.Value)
                                {
                                    l.SetValue(model, null);
                                }
                                else
                                {
                                    l.SetValue(model, val);
                                }
                            }
                            rtnList.Add(model);
                        }
                    }
                    return rtnList;
                }
            }
            finally
            {
                conn.Close();
            }
        }
        /// <summary>
        /// 执行sql带参数
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="db"></param>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        private static IList<T> SqlQuery<T>(DbContext db, string sql, params object[] parameters)
            where T : new()
        {
            //注意：不要对GetDbConnection获取到的conn进行using或者调用Dispose，否则DbContext后续不能再进行使用了，会抛异常
            var conn = db.Database.GetDbConnection();
            try
            {
                conn.Open();
                using (var command = conn.CreateCommand())
                {
                    command.CommandText = sql;
                    command.Parameters.AddRange(parameters);
                    var propts = typeof(T).GetProperties();
                    var rtnList = new List<T>();
                    T model;
                    object val;
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            model = new T();
                            foreach (var l in propts)
                            {
                                val = reader[l.Name];
                                if (val == DBNull.Value)
                                {
                                    l.SetValue(model, null);
                                }
                                else
                                {
                                    l.SetValue(model, val);
                                }
                            }
                            rtnList.Add(model);
                        }
                    }
                    return rtnList;
                }
            }
            finally
            {
                conn.Close();
            }
        }
        /// <summary>
        /// 模拟2018年全年数据
        /// </summary>
        private void GenerateData()
        {
            using (var trans = _db.Database.BeginTransaction())
            {
                for (var i = 0; i < 365; i++)
                {
                    var rd = new Random();
                    var lpqty = rd.Next(500000, 999999);
                    var nqty = rd.Next(1000, 9999);
                    decimal bzcl = (lpqty * 100 - rd.Next(1000000, 9999999)) / 100;
                    var yxyx = rd.Next(2500000, 2999999);
                    var jhtime = yxyx + rd.Next(10000, 99999);
                    var jtkyxtime = 3801600;
                    var date = Convert.ToDateTime("2018-01-01").AddDays(i);
                    var model = new ZZ_Tmp_CEoEE
                    {
                        //Id = i + 1,
                        DocDate = date,
                        LPQty = lpqty,
                        NQty = nqty,
                        BZCL = bzcl,
                        YXYX = yxyx,
                        JHTime = jhtime,
                        JTKYZTime = jtkyxtime
                    };
                    //_db.ZZ_Tmp_CEoEEs.Add(model);
                }
                _db.SaveChanges();
                trans.Commit();
            }
        }
    }
}
