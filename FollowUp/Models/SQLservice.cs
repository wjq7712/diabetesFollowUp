using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FollowUp.Models;
using System.Data;
using System.Data.Sql;
using System.Data.SqlClient;


namespace FollowUp.Models
{
    public class SQLservice
    {
        string connstring = System.Web.Configuration.WebConfigurationManager.ConnectionStrings["sqlConn"].ConnectionString;
        public string  Insert(string sqlStr) {
            int result;
            try
            {
                SqlConnection conn = new SqlConnection(connstring);
                conn.Open();
                SqlCommand cmd = new SqlCommand(sqlStr,conn);
                SqlDataAdapter DA = new SqlDataAdapter();
                result = cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            return result.ToString();
        }
        public DataTable Select(string sqlStr) {
            SqlConnection conn = new SqlConnection(connstring);
            DataTable dt = new DataTable();
            try
            {
                conn.Open();
               // SqlCommand cmd = new SqlCommand(sqlStr, conn);
                SqlDataAdapter DA = new SqlDataAdapter(sqlStr, conn);
                DA.Fill(dt);
                conn.Close();
            }
            catch (Exception ex)
            {
                string a = ex.Message;
            }
            return dt
                ;
        }
    }
}