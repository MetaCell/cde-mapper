#!/bin/sh
# replace_env_vars.sh

for var in $(printenv | grep VITE_ | awk -F= '{print $1}'); do
  sed -i 's|import.meta.env.'$var'|"'$(printenv $var)'"|g' ./demo/*.js
done
