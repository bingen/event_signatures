#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage $0 <aragonOS-path>";
    exit 1;
fi

ARAGON_OS_FOLDER=$1
ARAGON_OS_TEMP_FILE_NAME=aragonOS_events

# Aragon OS
grep -R "event [A-Z]" ${ARAGON_OS_FOLDER}/contracts | \
    awk 'BEGIN{FS="event "} {print $2}' | \
    sed "s/indexed //g" | \
    sed "s/ [a-zA-Z]*, /,/g" | \
    sed "s/ [a-zA-Z]*);/)/g" \
        > ./${ARAGON_OS_TEMP_FILE_NAME}.txt

node ./event_signatures ${ARAGON_OS_TEMP_FILE_NAME}

# Aragon apps
# TODO
