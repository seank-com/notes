#r "System.Data"
#r "Newtonsoft.Json"

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http.Formatting;

private static SqlConnection connection = new SqlConnection();

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, TraceWriter log)
{
    log.Info("C# GetReceipts function processed a request.");

    try
    {
        if (connection.State != ConnectionState.Open) {
            string conn = System.Configuration.ConfigurationManager.
                ConnectionStrings["seank"].ConnectionString;

            connection.ConnectionString = conn;

            await connection.OpenAsync();    
        }

        if (connection.State != ConnectionState.Open) {
            return req.CreateResponse(HttpStatusCode.BadRequest, 
                $"ConnectionState not Open");            
        }

        JArray results = new JArray();
        using (SqlCommand command = connection.CreateCommand())
        {
            command.CommandText = "SELECT * FROM [dbo].[Receipts]";
            command.CommandTimeout = 15;
            command.CommandType = CommandType.Text;

            using (SqlDataReader reader = await command.ExecuteReaderAsync())
            {
                while (reader.Read())
                {
                    // SELECT [ReceiptNumber]
                    //      ,[CustomerNumber]
                    //      ,[CustomerName]
                    //      ,[Quantity]
                    //  FROM [dbo].[Receipts]

                    JObject row = new JObject();
                    row.Add("ReceiptNumber", reader.GetString(0));
                    row.Add("CustomerNumber", reader.GetString(1));
                    row.Add("CustomerName", reader.GetString(2));
                    row.Add("Quantity", reader.GetInt32(3));
                    results.Add(row);
                }
            }
        }

        return req.CreateResponse(HttpStatusCode.OK, results, JsonMediaTypeFormatter.DefaultMediaType);
    }
    catch (SqlException sqlex)
    {
        return req.CreateResponse(HttpStatusCode.BadRequest, 
            $"The following SqlException happened: {sqlex.Message}");
    }
    catch (Exception ex)
    {
        return req.CreateResponse(HttpStatusCode.BadRequest, 
            $"The following Exception happened: {ex.Message}");
    }
}
