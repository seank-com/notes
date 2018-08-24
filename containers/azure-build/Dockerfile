FROM ubuntu:xenial

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

CMD ["bash"]