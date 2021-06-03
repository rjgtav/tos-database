#!/bin/bash

@echo "ToS database building start."

# build
BASEDIR=$(cd $(dirname $0); pwd)
REGIONS=(jTOS iTOS kTOS kTEST twTOS)
for region in ${REGIONS[@]}
do
    # parse
    cd $(BASEDIR)/tos-parser/src/
    python3 main.py $(region)

    # html
    cd $(BASEDIR)/tos-html/
    yarn install
    yarn run main
    # ->unzip
    cd $(BASEDIR)/tos-build/dist/
    unzip -y ${region,,}.zip
    # search
    cd $(BASEDIR)/tos-search/
    yarn install
    yarn run main

    # sitemap
    cd $(BASEDIR)/tos-sitemap/
    yarn install
    yarn run main

    # sw
    cd $(BASEDIR)/tos-sw/
    yarn install
    yarn run main


done

# build up!
cd $(BASEDIR)/tos-web/
yarn install
ng build --prod

@echo "Done."
