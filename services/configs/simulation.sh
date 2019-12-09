#!/bin/bash

random=$RANDOM
echo "sending $random requests..."
/usr/sbin/ab -n $random -q localhost:8000/ping
