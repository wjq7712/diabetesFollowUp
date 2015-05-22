using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using FollowUp.Models;
using System.Data;
using System.Data.Sql;
using System.Data.SqlClient;


namespace FollowUp.Controllers
{
    public class HomeController : Controller
    {
        SQLservice sqlService = new SQLservice();
        public ActionResult Index()
        {
            return View();
        }
        //
        // GET: /Home/LogOff

        public ActionResult LogOff()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Home");
        }

        //
        // POST: /Home/LogOn

        [HttpPost]
        public ActionResult Index(LogOnModel model)
        {
            if (ModelState.IsValid)
            {
                var sqlStr = "select * from UserAccount where UserName =" + "\'" + model.UserName + "\' AND Password =" + "\'" + model.Password + "\'";
                DataTable dt = new DataTable();
                dt = sqlService.Select(sqlStr);
                if (dt.Rows.Count > 0)
                {
                    FormsAuthentication.SetAuthCookie(model.UserName, true);
                    return RedirectToAction("About", "Home");
                }
                else
                {
                    ModelState.AddModelError("", "用户名或密码错误");
                    return View();
                }
            }
            // If we got this far, something failed, redisplay form
            return View(model);
        }
        public ActionResult About()
        {
            //string sql = string.Format("SELECT distinct [CLEVER_CDR].[dbo].[ImagingExaminationRequest].[RequestorIdentifier]  ,[CLEVER_CDR].[dbo].[ImagingExaminationRequest].[EncounterIdentifier] ,[OrderIdentifier] ,[ExamClass] ,[ExamSubClass]   ,[CLEVER_CDR].[dbo].[ImagingExaminationRequest].[Memo]  ,[Findings] ,[Conclusion]  ,[CLEVER_CDR].[dbo].[ImagingSeries].[Images_ImageDataTime] ,[Images_ImagePath]  FROM [CLEVER_CDR].[dbo].[ImagingExaminationRequest],[CLEVER_CDR].[dbo].[ImagingSeries],[CLEVER_CDR].[dbo].[ImagingExaminationRequest_ExaminationItem],[CLEVER_CDR].[dbo].[ImagingExaminationReport] where [CLEVER_CDR].[dbo].[ImagingExaminationReport].[RequesterOrderIdentifier] = [CLEVER_CDR].[dbo].[ImagingExaminationRequest].RequestorIdentifier and [CLEVER_CDR].[dbo].[ImagingExaminationRequest].RequestorIdentifier =[CLEVER_CDR].[dbo].[ImagingExaminationRequest_ExaminationItem].RequestorIdentifier and [CLEVER_CDR].[dbo].[ImagingSeries].ReceiverOrderIdentifier =[CLEVER_CDR].[dbo].[ImagingExaminationRequest_ExaminationItem].RequestorIdentifier and [CLEVER_CDR].[dbo].[ImagingExaminationRequest].PatientIdentifier='{0}' and [ExamClass]='{1}' and [CLEVER_CDR].[dbo].[ImagingSeries].[Images_ImageDataTime]>'{2}' and [CLEVER_CDR].[dbo].[ImagingSeries].[Images_ImageDataTime]<'{3}'", ID, Testitem, startdate, enddate);

            return View();
        }
        public ActionResult Save(string sqlStr)
        {
            var result = sqlService.Insert(sqlStr);
            if (result == "0")
            {
                return this.Json(new { OK = false, Message = "保存失败" });
            }
            else
            {
                return this.Json(new { OK = true, Message = "保存成功" });
            }
        }
        public ActionResult newPatient(string sqlStr)
        {
            var result = sqlService.Insert(sqlStr);
            if (result == "0")
            {
                return this.Json(new { OK = false, Message = "保存失败" });
            }
            else
            {
                return this.Json(new { OK = true, Message = "保存成功" });
            }
        }
        public ActionResult searchPatient(string userId)
        {
            var template = "select * from Patient where UID='{0}'";
            var sqlStr = String.Format(template, userId);
            var dt = sqlService.Select(sqlStr);
            List<string> patients = new List<string>();
            if (dt.Rows.Count > 0)
            {
                for(var i=0;i<dt.Rows.Count;i++){
                    object ob1 = dt.Rows[i][0];
                    object ob2 = dt.Rows[i][1];
                    patients.Add(ob1.ToString());
                    patients.Add(ob2.ToString());
                }
            }
            return Json(patients,JsonRequestBehavior.AllowGet);
        }
        public ActionResult getPatientInfo(string sqlStr) {
            var dt = sqlService.Select(sqlStr);
            List<string> patientInfo = new List<string>();
            if (dt.Rows.Count > 0) {
                for (var i = 0; i < dt.Columns.Count; i++)
                {
                    var id = dt.Columns[i].ColumnName;
                    var value = dt.Rows[0][i].ToString();
                    patientInfo.Add(id);
                    patientInfo.Add(value);
                }
            }
            return Json(patientInfo, JsonRequestBehavior.AllowGet);
        }
    }
}
