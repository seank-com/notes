#r "Microsoft.ServiceBus"
#r "Newtonsoft.Json"

using Microsoft.Azure.Devices;
using Microsoft.ServiceBus.Messaging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Text;
using System.Threading.Tasks;

static string connectionString = System.Configuration.ConfigurationManager.AppSettings["IOTHUB_CONNECTION_STRING"];
static ServiceClient serviceClient = ServiceClient.CreateFromConnectionString(connectionString);

public static async Task Run(EventData message, TraceWriter log)
{
    string deviceId = message.SystemProperties["iothub-connection-device-id"].ToString();
    //string messageId = message.SystemProperties["message-id"].ToString();

    //log.Info($"C# IoT Hub trigger function processed a message from {deviceId}({messageId})");

    string payload;
    JObject body;
    using(var stream = message.GetBodyStream())
    using(var streamReader = new StreamReader(stream))
    {
        payload = streamReader.ReadToEnd();
        body = JObject.Parse(payload);
        //log.Info($"body {payload}");
    }

    Message msg = new Message(Encoding.ASCII.GetBytes(payload));
    msg.MessageId =  Guid.NewGuid().ToString();

    await serviceClient.SendAsync(deviceId, msg);
}