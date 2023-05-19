#!/bin/bash
set -e

status=$(git status --porcelain)
if [ -n "$status" ]; then
  status="${status//'%'/'%25'}"
  status="${status//$'\n'/'%0A'}"
  status="${status//$'\r'/'%0D'}"
  echo "$status"
  exit 1
else
  echo "The repository is clean"
  exit 0
fi
