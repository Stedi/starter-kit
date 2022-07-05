#!/bin/bash

set -e

# Set your Stedi API key here, or alternatively export it in the shell from which you run this script:
STEDI_API_KEY="<replace-me>"
FUNCTION_NAME="webrequest"
STEDI_ENDPOINT='https://functions.cloud.us.stedi.com/2021-11-16/functions'

# Set -s for silent, -v for debug of 'curl' requests
VERBOSE="-s"

########## do not edit anything below this line ##########

HTTPMETHOD=""

# build function
buildfunction() {

    # remove old package and (re)create build directory
    rm -rf ./build
    mkdir -p ./build

    echo -e "\nstarting npx build for ${FUNCTION_NAME}\n"

    # build using npx, create zip file
    npx esbuild --bundle --target=node14 --platform=node ./handler.ts > build/index.js
    cd build && zip package -r ./* && cd ..

    echo -e "\nbuilt package for ${FUNCTION_NAME}, ready to deploy\n"
}

# delete function
deletefunction() {

    echo -e "\ndeleting function ${FUNCTION_NAME}'\n"

    curl --location --request DELETE "${STEDI_ENDPOINT}/${FUNCTION_NAME}" \
      ${VERBOSE} \
      --header "Authorization: Key ${STEDI_API_KEY}" | jq .

    echo -e "\ndeleted ${FUNCTION_NAME} function\n"

}

# create and update function
createupdatefunction() {

    buildfunction

    # for create function
    API_PATH="${STEDI_ENDPOINT}"

    # on update function, add function name to API path
    if [ ${HTTPMETHOD} == "PUT" ]
    then
        API_PATH="${STEDI_ENDPOINT}/${FUNCTION_NAME}/"

    fi

    echo -e ${API_PATH}

    curl --location --request ${HTTPMETHOD} "${API_PATH}/" \
    ${VERBOSE} \
    --header 'Content-Type: application/json' \
    --header "Authorization: Key ${STEDI_API_KEY}" \
    --data-raw "{
        \"functionName\": \"${FUNCTION_NAME}\",
        \"package\": \"$(openssl base64 -A -in build/package.zip)\",
        \"environmentVariables\": {}
    }" | jq .

    echo -e "\ncompleted ${HTTPMETHOD} for ${FUNCTION_NAME} function\n"

}

# build local zip
if [[ $1 == "build" ]] || [[ $1 == "b" ]]
then

    buildfunction


# delete function
elif [[ $1 == "delete" ]]
then

    deletefunction

# create new function
elif [[ $1 == "create" ]] || [[ $1 == "c" ]]
then

    # set POST for create
    HTTPMETHOD=POST

    createupdatefunction

# update existing function
elif [[ $1 == "update" ]] || [[ $1 == "u" ]]
then

    # set PUT for update
    HTTPMETHOD=PUT

    createupdatefunction


# describe (read) function
elif [[ $1 == "read" ]] || [[ $1 == "describe" ]] || [[ $1 == "r" ]] || [[ $1 == "d" ]]
then

    echo -e "\ndescribe function ${FUNCTION_NAME}\n"

    curl --location --request GET "${STEDI_ENDPOINT}/${FUNCTION_NAME}" \
    ${VERBOSE} \
    --header "Authorization: Key ${STEDI_API_KEY}" | jq .

# list all functions
elif [[ $1 == "list" ]] || [[ $1 == "li" ]]
then

    echo -e "\nlist all functions\n"

    curl --location --request GET "${STEDI_ENDPOINT}" \
    ${VERBOSE} \
    --header "Authorization: Key ${STEDI_API_KEY}" | jq .


elif [[ $1 == "invoke" ]] || [[ $1 == "i" ]]
then

    PAYLOAD=`cat event.json`

    echo -e "\ninvoke function ${FUNCTION_NAME} with payload ${PAYLOAD}\n"

    # invoke function
    curl --location --request POST "${STEDI_ENDPOINT}/${FUNCTION_NAME}/invocations/" \
    ${VERBOSE} \
    --header "Authorization: Key ${STEDI_API_KEY}" \
    --data-raw "${PAYLOAD}" | jq .

else

    echo -e "
    Usage:

        ./deploy.sh [OPTION]

    Options:

        build                Build package for ZIP deploy
        delete               Delete an existing Function
        create               Create a new Function
        update               Update an existing Function
        read                 Describe Function
        list                 List all Functions in your account
        invoke               Invoke function with the './events.json' payload
        "
fi
