#r "Newtonsoft.Json"

using Microsoft.Azure.Devices;
using Newtonsoft.Json.Linq;
using System.Net;
using System.Text;

static string connectionString = System.Configuration.ConfigurationManager.AppSettings["IOTHUB_CONNECTION_STRING"];
static RegistryManager registry = RegistryManager.CreateFromConnectionString(connectionString);

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, TraceWriter log)
{
    log.Info("C# HTTP trigger function processed a request.");

    // parse query parameter
    string name = req.GetQueryNameValuePairs()
        .FirstOrDefault(q => string.Compare(q.Key, "id", true) == 0)
        .Value;

    string keys = req.GetQueryNameValuePairs()
        .FirstOrDefault(q => string.Compare(q.Key, "keys", true) == 0)
        .Value;

    if (name == null)
    {
        return req.CreateResponse(HttpStatusCode.BadRequest, "This function has been disabled as the class is over");
    }

    Device device = await registry.GetDeviceAsync(name);    
    if (device == null) 
    {
        device = await registry.AddDeviceAsync(new Device(name));
    }

    JObject response = new JObject();
    response.Add("connectionString", $"HostName=seank.azure-devices.net;DeviceId={name};SharedAccessKey={device.Authentication.SymmetricKey.PrimaryKey}");

    if (keys != null && String.Compare(keys, "true") == 0)
    {
        response.Add("contentModeratorKey", "803f0cb402cf4cdda3bd25dcb4e2f94b");
        response.Add("faceKey", "509e7031197143a7a96232a45871ea29");
        response.Add("visionKey", "fe23ac4eef4345b4b4dc162fd88864ef");
    }

    return new HttpResponseMessage(HttpStatusCode.OK) {
        Content = new StringContent(response.ToString(), Encoding.UTF8, "application/json")
    };
}