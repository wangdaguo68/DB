﻿using Microsoft.AspNetCore.Mvc;
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
