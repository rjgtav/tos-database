#!/bin/bash
set -eu
echo "ToS database bootstrap start."

echo "Let's go to build up!"

# build up!
cd ${BASEDIR}/tos-web/
npm install -std=c++17 --force
ng build --prod

echo "Done."
