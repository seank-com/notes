FROM ubuntu:xenial AS base

FROM base AS tools

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

FROM tools AS sdk

RUN git clone -b lts_10_2018 --recursive https://github.com/Azure/azure-iot-sdk-c.git