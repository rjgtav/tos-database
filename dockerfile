FROM ubuntu:20.04
LABEL author ebisuke

# avoid apt-get blocking
RUN apt-get update && apt-get install -y -q tzdata
ENV TZ=Asia/Tokyo 
ENV DISPLAY=:0.0
# add prerequisites
RUN apt-get update && apt-get install -y -q nodejs npm python3 python3-pip unzip wine nginx bash build-essential curl wget xvfb
# prepare python environment
RUN pip3 install pillow lupa unicodecsv pandas


# prepare nodejs environment
RUN npm -g i n yarn && n 16 && yarn global add @angular/cli

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
COPY ./build.sh   ./build.sh
# copy http server conf
COPY ./httpserver/http.conf /etc/nginx/conf.d/http.conf


# expose http server
EXPOSE 8000

# build first touch
RUN /bin/bash ./build.sh

ENTRYPOINT [ "/bin/sh" ]