module.exports = function (context, messages) {
    context.log(`JavaScript eventhub trigger function called for message array of size: ${messages.length}`);
        
    messages.forEach((message, idx) => {
        var str;

        message["deviceid"] = context.bindingData.systemPropertiesArray[idx]["iothub-connection-device-id"];
        message["timestamp"] = context.bindingData.systemPropertiesArray[idx]["iothub-enqueuedtime"];
        message["messageid"] = context.bindingData.systemPropertiesArray[idx]["message-id"];

        str = JSON.stringify(message);
        context.log(`Processed message: ${str}`);
    });

    context.done();
};