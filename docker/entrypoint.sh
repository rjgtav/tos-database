#!/bin/bash

/bin/bash /root/build.sh 0
/bin/bash /root/bootstrap.sh

/usr/sbin/nginx -g "daemon off;"