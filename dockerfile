FROM ubuntu:20.04
LABEL author ebisuke

# ENVs
ENV LANG=en_EN.UTF-8
ENV PYTHONIOENCODING=utf-8

# avoid apt-get blocking
RUN apt-get update && apt-get install -y -q tzdata
ENV TZ=Asia/Tokyo 

# add prerequisites

RUN apt-get update && apt-get install -y -q nodejs npm python3 python3-pip unzip nginx bash build-essential curl wget openjdk-11-jdk

# prepare python environment
RUN pip3 install pillow lupa unicodecsv

# prepare nodejs environment
RUN npm -g i n yarn && n 16.3.0 && yarn global add @angular/cli

# copy databases
WORKDIR /root

COPY ./ipf_unpacker ./ipf_unpacker
COPY ./tos-build ./tos-build
COPY ./tos-html ./tos-html
COPY ./tos-parser ./tos-parser
COPY ./tos-search ./tos-search
COPY ./tos-sitemap ./tos-sitemap
COPY ./tos-sw ./tos-sw
COPY ./tos-web ./tos-web
COPY ./tos-web-rest ./tos-web-rest
COPY ./docker/build.sh   ./build.sh
COPY ./docker/entrypoint.sh   ./entrypoint.sh
# copy http server conf
COPY ./httpserver/http.conf /etc/nginx/conf.d/http.conf
RUN ls
# make ipfunpack
WORKDIR /root/ipf_unpacker
RUN make clean && make release
WORKDIR /root

# expose http server
EXPOSE 8000


ENTRYPOINT ["/bin/sh","/root/entrypoint.sh"  ]