#!/bin/bash
set -eu
echo "ToS database building start."

# launch xvfb
nohup Xvfb :0 -ac -screen 0 1024x768x16 > xvfb.log 2>&1 &
echo $! > xvfbpid.txt
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
    #cd ${BASEDIR}/tos-parser/
    #python3 src/main.py ${region}

    # html
    #cd ${BASEDIR}/tos-html/
    #yarn install
    #yarn run main
    # ->unzip
    #cd ${BASEDIR}/tos-build/dist/
    #echo ${region,,}.zip
    #if [$(unzip -o ${region,,}.zip) -ge 2]; then
    #    exit 1
    #fi
    echo "complete"
    


done
# search
cd ${BASEDIR}/tos-search/
yarn install
yarn run main


# sitemap
cd ${BASEDIR}/tos-sitemap/
yarn install
yarn run main
# build up!
cd ${BASEDIR}/tos-web/
yarn install
ng build --prod

# kill xvfb
cd ${BASEDIR}/
kill -9 `cat xvfbpid.txt`
rm xvfbpid.txt

echo "Done."
