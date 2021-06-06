#!/bin/bash
set -eu
echo "ToS database building start."


# build
BASEDIR=$(cd $(dirname $0); pwd)
#REGIONS=(jTOS iTOS kTOS kTEST twTOS)
REGIONS=(jTOS)
REPATCH=0
if [ $# -ge 1 ];then
    REPATCH=$1
fi
for region in ${REGIONS[@]}
do
    echo ${region}

    # parse
    cd ${BASEDIR}/tos-parser/src
    python3 main.py ${region} true ${REPATCH}

    # html
    cd ${BASEDIR}/tos-html/
  
    npm install
    npm run main ${region}
    # ->unzip
    cd ${BASEDIR}/tos-build/dist/
    echo ${region,,}.zip
    if [ $(unzip -o ${region,,}.zip 2> /dev/null) -ge 2 ]; then
        exit 1
    fi
    echo "complete"
    
    # search
    cd ${BASEDIR}/tos-search/
    npm install
    npm run main ${region}

    # sitemap
    cd ${BASEDIR}/tos-sitemap/
    npm install
    npm run main ${region}

done

cd ${BASEDIR}

echo "Launch bootstrap."
sh bootstrap.sh

echo "Done."
