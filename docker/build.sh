#!/bin/bash
set -eu
echo "ToS database building start."


# build
BASEDIR=$(cd $(dirname $0); pwd)
REGIONS=(jTOS iTOS kTOS kTEST twTOS)

if [$# -ne 0]; then
    REGIONS=($1)
fi

for region in ${REGIONS[@]}
do
    echo ${region}

    # parse
    cd ${BASEDIR}/tos-parser/
    python3 src/main.py ${region} true 1

    # html
    cd ${BASEDIR}/tos-html/
    npm install
    npm run main
    # ->unzip
    cd ${BASEDIR}/tos-build/dist/
    echo ${region,,}.zip
    if [$(unzip -o ${region,,}.zip) -ge 2]; then
        exit 1
    fi
    echo "complete"
    


done
# search
cd ${BASEDIR}/tos-search/
npm install
npm run main


# sitemap
cd ${BASEDIR}/tos-sitemap/
npm install
npm run main

echo "Let's go to build up!"


# build up!
cd ${BASEDIR}/tos-web/
npm install -std=c++17 --force
ng build --prod


echo "Done."
