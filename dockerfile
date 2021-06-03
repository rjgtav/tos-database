FROM ubuntu:20.04
LABEL author ebisuke

# avoid apt-get blocking
RUN apt-get update && apt-get install -y -q tzdata
ENV TZ=Asia/Tokyo 

# add prerequisites
RUN apt-get update && apt-get install -y -q nodejs npm python3 python3-pip unzip wine nginx bash build-essential
# prepare python environment
RUN pip3 install pillow lupa unicodecsv pandas


# prepare nodejs environment
RUN npm -g i n yarn && n 16

# copy databases
WORKDIR /root
COPY ./tos-build .
COPY ./tos-html .
COPY ./tos-parser .
COPY ./tos-search .
COPY ./tos-sitemap .
COPY ./tos-sw .
COPY ./tos-web .
COPY ./tos-web-rest .
COPY ./build.sh   .
# copy http server conf
COPY ./httpserver/http.conf /etc/nginx/conf.d/http.conf

# restart nginx
RUN nginx -s reload

# expose http server
EXPOSE 8000

# build first touch
RUN /bin/bash ./build.sh

ENTRYPOINT [ "/bin/sh" ]