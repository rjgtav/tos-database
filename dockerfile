FROM ubuntu:20.04
LABEL author ebisuke

# ENVs
ENV LANG=en_EN.UTF-8
ENV PYTHONIOENCODING=utf-8
# avoid apt-get blocking
RUN apt-get update && apt-get install -y -q tzdata
ENV TZ=Asia/Tokyo 

# add prerequisites

RUN apt-get update && apt-get install -y -q nodejs npm python3 python3-pip unzip nginx bash build-essential curl wget openjdk-8-jdk p7zip

# prepare python environment
RUN pip3 install pillow lupa unicodecsv pydevd-pycharm~=211.7442

# prepare nodejs environment
ENV GYP_DEFINES="javalibdir=/usr/lib/jvm/java-1.8.0-openjdk-amd64/lib/server"
ENV JAVA_HOME ="/usr/lib/jvm/java-1.8.0-openjdk-amd64/"
ENV PATH $PATH:/usr/lib/jvm/java-1.8.0-openjdk-amd64/bin

RUN npm -g i n && n 16 
RUN npm install -g @angular/cli 

# copy databases
WORKDIR /root

COPY ./ipf_unpacker ./ipf_unpacker
# make ipfunpack
WORKDIR /root/ipf_unpacker
RUN make clean && make release
WORKDIR /root
COPY ./tos-parser ./tos-parser
COPY ./tos-build ./tos-build
COPY ./tos-html ./tos-html

COPY ./tos-search ./tos-search
COPY ./tos-sitemap ./tos-sitemap
COPY ./tos-sw ./tos-sw
COPY ./tos-web ./tos-web
COPY ./tos-web-rest ./tos-web-rest
COPY ./docker/build.sh   ./build.sh
COPY ./docker/entrypoint.sh   ./entrypoint.sh
RUN mkdir ../dist
# copy http server conf
COPY ./httpserver/http.conf /etc/nginx/conf.d/http.conf
RUN ls

# expose http server
EXPOSE 8000

# freqently change ENVs
ENTRYPOINT ["/bin/sh","/root/entrypoint.sh","jTOS"  ]