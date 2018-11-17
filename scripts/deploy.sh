#!/bin/bash
source deploy-variables.sh
pushd ../web

#################################################################
# 1. Deploy to rjgtav.github.io/tos-database
#    Thanks to https://gist.github.com/nobuoka/d0f088df57d50e4cda1a
#################################################################
#if [ "$1" == "" ]; then
#    echo "Please provide commit message"
#    exit
#fi

# Build angular application
# echo -e "Building angular application..."
# ng build --prod --base-href "https://rjgtav.github.io/tos-database/"
# cp -rf ./dist/web/index.html ./dist/web/404.html # Hack: make GitHub redirect all unknown URLs to index.html

# Create tree object
# echo -e "Creating tree object..."
# git add -f ./dist/
# treeId=$(git write-tree --prefix=web/dist/web)
# git reset ./dist/

# Create a commit for the tree
# echo -e "Creating commit for tree ${treeId}"
# commitId=$(git commit-tree -p gh-pages -m "$1" ${treeId})

# Update gh-pages to point to the new commit
# echo -e "Updating gh-pages to point to ${commitId}"
# git update-ref refs/heads/gh-pages ${commitId}

# Push
# git push origin gh-pages:gh-pages

#################################################################
# 2. Deploy to tos.guru
#################################################################
# Build angular application
echo -e "Building angular application..."
ng build --prod --base-href "https://tos.guru/"
cp -rf ./dist/web/index.html ./dist/web/404.html # Hack: make GitHub redirect all unknown URLs to index.html
cp -rf ./dist/.cpanel.yml ./dist/web/.cpanel.yml
cp -rf ./dist/.htaccess ./dist/web/.htaccess

# Upload to tos.guru
echo -e "Uploading to tos.guru..."
lftp -c "
    set cmd:fail-exit yes;
    set ftp:list-options -a;
    set ftp:ssl-allow no;
    open 'ftp://$USER:$PASS@$HOST';
    lcd $LOCAL;
    cd $REMOTE;
    mirror --delete --ignore-time --only-newer --reverse --verbose
"

popd