#!/bin/bash

for i in $(pgrep -f index); do
  echo "Killing process: '$i'"
  sudo kill -9 $i
done;

cd ../
sudo node index.js > out.log 2> err.log &

