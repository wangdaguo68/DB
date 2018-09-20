using DB.Web.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace DB.Web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// A区
        /// </summary>
        /// <returns></returns>
        public JsonResult GetArea_A()
        {
            using (var _db = new MyContext())
            {
                var data = SqlQuery<WSActualTimeData>(_db, "select * from WSActualTimeData where Area ='A'");
                return Json(data);
            }
        }
        /// <summary>
        /// B区
        /// </summary>
        /// <returns></returns>
        public JsonResult GetArea_B()
        {
            using (var _db = new MyContext())
            {
                var data = SqlQuery<WSActualTimeData>(_db, "select * from WSActualTimeData where Area ='B'");
                return Json(data);
            }
        }
        /// <summary>
        /// C区
        /// </summary>
        /// <returns></returns>
        public JsonResult GetArea_C()
        {
            using (var _db = new MyContext())
            {
                var data = SqlQuery<WSActualTimeData>(_db, "select * from WSActualTimeData where Area ='C'");
                return Json(data);
            }
        }
        /// <summary>
        /// D区
        /// </summary>
        /// <returns></returns>
        public JsonResult GetArea_D()
        {
            using (var _db = new MyContext())
            {
                var data = SqlQuery<WSActualTimeData>(_db, "select * from WSActualTimeData where Area ='D'");
                return Json(data);
            }
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
    }
}
