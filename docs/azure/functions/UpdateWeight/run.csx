#r "System.Data"
#r "Newtonsoft.Json"

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http.Formatting;

private static SqlConnection connection = new SqlConnection();

private static bool KeyMissing(IDictionary<string, JToken> dict, string key)
{
    return dict.ContainsKey(key) == false;
}

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, TraceWriter log)
{
    log.Info("C# UpdateWeight function processed a request.");

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

        // Get request body
        string content = await req.Content.ReadAsStringAsync();
        JObject record = JObject.Parse(content);
        
        if (KeyMissing(record, "ReceiptNumber") || 
            KeyMissing(record, "SlapMark") ||
            KeyMissing(record, "GramWeight") ||
            KeyMissing(record, "PercentFat")) 
        {
            return req.CreateResponse(HttpStatusCode.BadRequest, 
                $"Body must contain ReceiptNumber, SlapMark, GramWeight & PercentFat");
        }

        string receiptNumber = (string)record["ReceiptNumber"];
        string slapMark = (string)record["SlapMark"];
        int gramWeight = (int)record["GramWeight"];
        int percentFat = (int)record["PercentFat"];
        
        using (SqlCommand command = connection.CreateCommand())
        {
            command.CommandText = $"SELECT * FROM [dbo].[Receipts] WHERE [ReceiptNumber] = '{receiptNumber}'";
            command.CommandTimeout = 15;
            command.CommandType = CommandType.Text;

            using (SqlDataReader reader = await command.ExecuteReaderAsync())
            {
                if (reader.HasRows == false)
                {
                    return req.CreateResponse(HttpStatusCode.BadRequest, 
                        $"ReceiptNumber invalid");                    
                }
            }
        }

        int rows = 0;
        using (SqlCommand command = connection.CreateCommand())
        {
            command.CommandText = $"INSERT INTO [dbo].[Carcasses] ([ReceiptNumber],[SlapMark],[GramWeight],[PercentFat]) " +
                $"VALUES ('{receiptNumber}','{slapMark}',{gramWeight},{percentFat})";
            command.CommandTimeout = 15;
            command.CommandType = CommandType.Text;

            rows = await command.ExecuteNonQueryAsync();
        }

        return req.CreateResponse(HttpStatusCode.OK, $"{rows} were updated", JsonMediaTypeFormatter.DefaultMediaType);
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