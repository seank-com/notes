#r "Microsoft.ServiceBus"
#r "Newtonsoft.Json"

using Microsoft.ServiceBus.Messaging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;

public static void Run(EventData messages, TraceWriter log)
{
    //log.Info($"C# IoT Hub trigger function processed a message: {JsonConvert.SerializeObject(messages)}");
    string deviceId = messages.SystemProperties["iothub-connection-device-id"].ToString();
    string messageId = messages.SystemProperties["message-id"].ToString();
    DateTime dt = messages.EnqueuedTimeUtc;

    log.Info($"C# IoT Hub trigger function processed a message from {deviceId}({messageId}) at {dt}");

    JObject body;
    using(var stream = messages.GetBodyStream())
    using(var streamReader = new StreamReader(stream))
    {
        body = JObject.Parse(streamReader.ReadToEnd());
        log.Info($"body {JsonConvert.SerializeObject(body)}");
    }
}