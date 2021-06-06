#!/bin/bash

/bin/bash /root/build.sh 0
/bin/bash /root/bootstrap.sh

echo "nginx READY!"
/usr/sbin/nginx -g "daemon off;"