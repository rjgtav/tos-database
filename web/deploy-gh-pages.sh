#!/bin/bash

# Thanks to https://gist.github.com/nobuoka/d0f088df57d50e4cda1a

if [ "$1" == "" ]; then
    echo "Please provide commit message"
    exit
fi

# 1. Build angular application (twice to make sure it is built correctly...)
echo -e "Building angular application..."
ng build --prod --base-href "https://rjgtav.github.io/tos-database/"
ng build --prod --base-href "https://rjgtav.github.io/tos-database/"
cp -rf ./dist/web/index.html ./dist/web/404.html # Hack: make GitHub redirect all unknown URLs to index.html

# 2. Create tree object
echo -e "Creating tree object..."
git add -f ./dist/
treeId=$(git write-tree --prefix=web/dist/web)
git reset ./dist/

# 3. Create a commit for the tree
echo -e "Creating commit for tree ${treeId}"
commitId=$(git commit-tree -p gh-pages -m "$1" ${treeId})

# 4. Update gh-pages to point to the new commit
echo -e "Updating gh-pages to point to ${commitId}"
git update-ref refs/heads/gh-pages ${commitId}

# 5. Push
git push origin gh-pages:gh-pages
