#!/bin/bash
set -eu
echo "ToS database bootstrap start."

echo "Let's go to build up!"
BASEDIR=$(cd $(dirname $0); pwd)
# build up!
cd ${BASEDIR}/tos-web/
#npm install -std=c++17 --force
ng build --prod
#ng build 

echo "Copying..."
# copy dists
#cp -Rn ../skeleton_distweb/* ./dist/
#cp -Rn ../tos-build/dist/* ./dist/

echo "Done."
