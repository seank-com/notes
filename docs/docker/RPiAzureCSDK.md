## Azure IoT SDK C

Here is the docker file to do a multistage build of a container using the [Azure IoT SDK for C](https://github.com/Azure/azure-iot-sdk-c)

```dockerfile
FROM arm32v7/ubuntu:latest AS builder

RUN \
  apt-get update && \
  apt-get -y upgrade && \
  apt-get install -y git && \
  apt-get install -y cmake && \
  apt-get install -y build-essential && \
  apt-get install -y curl && \
  apt-get install -y libcurl4-openssl-dev && \
  apt-get install -y libssl-dev && \
  apt-get install -y uuid-dev && \
  apt-get install -y nano && \
  cmake --version && \
  gcc --version && \
  mkdir /src

WORKDIR /src

RUN git clone -b 2018-04-13 --recursive https://github.com/Azure/azure-iot-sdk-c.github

RUN \
  cd azure-iot-sdk-c && \
  mkdir cmake && \
  cd cmake && \
  cmake .. && \
  cmake --build .

FROM arm32v7/ubuntu:latest AS release

RUN \
  apt-get update && \
  apt-get -y upgrade && \
  apt-get install -y libcurl4-openssl-dev && \
  apt-get install -y libssl-dev && \
  apt-get install -y uuid-dev && \
  mkdir /app

WORKDIR /app

COPY --from=builder /src/azure-iot-sdk-c/cmake/iothub_client/samples/iothub_client_sample_mqtt_dm/iothub_client_sample_mqtt_dm .

CMD ["bash"]
```
