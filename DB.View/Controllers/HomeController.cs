using DB.View.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DB.View.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var data = GetArea_A();
            return View();
        }
        public JsonResult GetArea_A()
        {
            var _db = new MyContext();
            //var data = _db.WSActualTimeDatas.s<WSActualTimeData>("select * from WSActualTimeData").AsQueryable().ToList();
            var data = _db.Database.SqlQuery<WSActualTimeData>("select * from WSActualTimeData").AsQueryable().ToList();
            return Json(data);
        }
    }
}