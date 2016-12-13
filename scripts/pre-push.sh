#!/bin/bash

#.git/hooks/pre-push

if [ "$(git symbolic-ref HEAD 2>/dev/null)" == "refs/heads/master" ] ; then
  echo "Checking if src changed."
  # precompile assets if any have been updated
  if git diff-index --name-only HEAD~1 | egrep '^assets/less' >/dev/null ; then
    echo "Precompiling build"
    gulp build --env production
    echo "Builded production assets"
    git add -A assets/
    git commit -m "Updated assets for production"
    echo "Committed new assets"
  fi
fi
