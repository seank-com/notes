## Build The container

```bash
$ docker build -t azure-build .
```

## Use the container

### on a mac
```bash
$ docker run -it --rm --mount type=bind,src=/Users/seank/Development/azure-iot-sdk-c,dst=/src/azure-iot-sdk-c azure-build
```

### on Windows
```bash
$ docker run -it --rm --mount type=bind,src=c:/Users/v-seakel/Development/azure-iot-sdk-c,dst=/src/azure-iot-sdk-c azure-build
```

### build and run unittests from the container

```bash
# cd azure-iot-sdk-c
# rm -rf cmake/
# mkdir cmake
# cd cmake/
# cmake .. -Drun_unittests:bool=ON
# cmake --build .
# ./iothub_client/tests/blob_ut/blob_ut_exe
# ./iothub_client/tests/iothub_client_authorization_ut/iothub_client_authorization_ut_exe
# ./iothub_client/tests/iothub_client_retry_control_ut/iothub_client_retry_control_ut_exe
# ./iothub_client/tests/iothubclient_diagnostic_ut/iothubclient_diagnostic_ut_exe
# ./iothub_client/tests/iothubclient_ll_u2b_ut/iothub_client_ll_u2b_ut_exe
# ./iothub_client/tests/iothubclient_ll_ut/iothubclient_ll_ut_exe
# ./iothub_client/tests/iothubclient_ut/iothubclient_ut_exe
# ./iothub_client/tests/iothubmessage_ut/iothubmessage_ut_exe
# ./iothub_client/tests/iothubtr_amqp_msgr_ut/iothubtr_amqp_msgr_ut_exe
# ./iothub_client/tests/iothubtr_amqp_tel_msgr_ut/iothubtr_amqp_tel_msgr_ut_exe
# ./iothub_client/tests/iothubtr_amqp_twin_msgr_ut/iothubtr_amqp_twin_msgr_ut_exe
# ./iothub_client/tests/iothubtransport_amqp_cbs_auth_ut/iothubtransport_amqp_cbs_auth_ut_exe
# ./iothub_client/tests/iothubtransport_amqp_common_ut/iothubtransport_amqp_common_ut_exe
# ./iothub_client/tests/iothubtransport_amqp_connection_ut/iothubtransport_amqp_connection_ut_exe
# ./iothub_client/tests/iothubtransport_amqp_device_ut/iothubtransport_amqp_device_ut_exe
# ./iothub_client/tests/iothubtransport_mqtt_common_ut/iothubtransport_mqtt_common_ut_exe
# ./iothub_client/tests/iothubtransport_ut/iothubtransport_ut_exe
# ./iothub_client/tests/iothubtransportamqp_methods_ut/iothubtransportamqp_methods_ut_exe
# ./iothub_client/tests/iothubtransportamqp_ut/iothubtransportamqp_ut_exe
# ./iothub_client/tests/iothubtransportamqp_ws_ut/iothubtransportamqp_ws_ut_exe
# ./iothub_client/tests/iothubtransporthttp_ut/iothubtransporthttp_ut_exe
# ./iothub_client/tests/iothubtransportmqtt_ut/iothubtransportmqtt_ut_exe
# ./iothub_client/tests/iothubtransportmqtt_ws_ut/iothubtransportmqtt_ws_ut_exe
# ./iothub_client/tests/message_queue_ut/message_queue_ut_exe
# ./iothub_client/tests/uamqp_messaging_ut/uamqp_messaging_ut_exe
# ./iothub_client/tests/version_ut/version_ut_exe
# ./serializer/tests/agentmacros_ut/agentmacros_ut_exe
# ./serializer/tests/agenttypesystem_ut/agenttypesystem_ut_exe
# ./serializer/tests/codefirst_cpp_ut/codefirst_cpp_ut_exe
# ./serializer/tests/codefirst_ut/codefirst_ut_exe
# ./serializer/tests/codefirst_withstructs_cpp_ut/codefirst_withstructs_cpp_ut_exe
# ./serializer/tests/codefirst_withstructs_ut/codefirst_withstructs_ut_exe
# ./serializer/tests/commanddecoder_ut/commanddecoder_ut_exe
# ./serializer/tests/datamarshaller_ut/datamarshaller_ut_exe
# ./serializer/tests/datapublisher_ut/datapublisher_ut_exe
# ./serializer/tests/iotdevice_ut/iotdevice_ut_exe
# ./serializer/tests/jsondecoder_ut/jsondecoder_ut_exe
# ./serializer/tests/jsonencoder_ut/jsonencoder_ut_exe
# ./serializer/tests/methodreturn_ut/methodreturn_ut_exe
# ./serializer/tests/schema_ut/schema_ut_exe
# ./serializer/tests/schemalib_ut/schemalib_ut_exe
# ./serializer/tests/schemalib_without_init_ut/schemalib_without_init_ut_exe
# ./serializer/tests/schemaserializer_ut/schemaserializer_ut_exe
# ./serializer/tests/serializer_dt_ut/serializer_dt_ut_exe
# ./iothub_service_client/tests/iothub_devicemethod_ut/iothub_devicemethod_ut_exe
# ./iothub_service_client/tests/iothub_devicetwin_ut/iothub_devicetwin_ut_exe
# ./iothub_service_client/tests/iothub_msging_ll_ut/iothub_messaging_ll_ut_exe
# ./iothub_service_client/tests/iothub_msging_ut/iothub_messaging_ut_exe
# ./iothub_service_client/tests/iothub_rm_ut/iothub_rm_ut_exe
# ./iothub_service_client/tests/iothub_sc_version_ut/iothub_sc_version_ut_exe
# ./iothub_service_client/tests/iothub_srv_client_auth_ut/iothub_service_client_auth_ut_exe
```


Scanning dependencies of target iothub_messaging_ll_ut_exe
[ 24%] Building C object iothub_service_client/tests/iothub_msging_ll_ut/CMakeFiles/iothub_messaging_ll_ut_exe.dir/iothub_messaging_ll_ut.c.o
cc: internal compiler error: Killed (program cc1)
Please submit a full bug report,
with preprocessed source if appropriate.
See <file:///usr/share/doc/gcc-5/README.Bugs> for instructions.
iothub_service_client/tests/iothub_msging_ll_ut/CMakeFiles/iothub_messaging_ll_ut_exe.dir/build.make:62: recipe for target 'iothub_service_client/tests/iothub_msging_ll_ut/CMakeFiles/iothub_messaging_ll_ut_exe.dir/iothub_messaging_ll_ut.c.o' failed
make[2]: *** [iothub_service_client/tests/iothub_msging_ll_ut/CMakeFiles/iothub_messaging_ll_ut_exe.dir/iothub_messaging_ll_ut.c.o] Error 4
CMakeFiles/Makefile2:2217: recipe for target 'iothub_service_client/tests/iothub_msging_ll_ut/CMakeFiles/iothub_messaging_ll_ut_exe.dir/all' failed
make[1]: *** [iothub_service_client/tests/iothub_msging_ll_ut/CMakeFiles/iothub_messaging_ll_ut_exe.dir/all] Error 2
Makefile:138: recipe for target 'all' failed
make: *** [all] Error 2
root@bdcf604bce47:/src/azure-iot-sdk-c/cmake#