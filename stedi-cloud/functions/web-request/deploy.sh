#!/bin/bash

# set your API key here, or alternatively export it in the shell from which you run this script:
STEDI_API_KEY="<replace-me>"
FUNCTION_NAME="webrequest"
STEDI_ENDPOINT='https://functions.cloud.stedi.com/2021-11-16/functions'

# -s for silent, -v for debug
VERBOSE="-s"

########## do not edit anything below this line ##########

buildfunction() {

    # remove old package and create build directory
    if test -d "build/"
    then
        rm -rf ./build
        mkdir -p ./build
    fi

    echo "starting build"

    # build using npx, create zip file
    npx esbuild --bundle --target=node14 --platform=node ./handler.ts > build/index.js
    cd build && zip package -r ./* && cd ..

    echo -e "built package ${FUNCTION_NAME}, ready to deploy"
}

deletefunction() {

    echo -e "deleting function ${FUNCTION_NAME}"

    curl --location --request DELETE "${STEDI_ENDPOINT}/${FUNCTION_NAME}" \
      ${VERBOSE} \
      --header "Authorization: Key ${STEDI_API_KEY}" | jq .

    echo -e "deleted function ${FUNCTION_NAME}"

}

createupdatefunction() {

    buildfunction
    
    # for create function
    API_PATH="${STEDI_ENDPOINT}"

    # on update function, add function name to API path
    if [ ${HTTPMETHOD} == "PUT" ]
    then
        API_PATH="${STEDI_ENDPOINT}/${FUNCTION_NAME}/"

    fi

    echo -e ${url}

    curl --location --request ${HTTPMETHOD} "${API_PATH}/" \
    ${VERBOSE} \
    --header 'Content-Type: application/json' \
    --header "Authorization: Key ${STEDI_API_KEY}" \
    --data-raw "{
        \"function_name\": \"${FUNCTION_NAME}\",
        \"package\": \"$(openssl base64 -A -in build/package.zip)\"
    }"

    echo -e "${HTTPMETHOD} function ${FUNCTION_NAME}"

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
elif [[ $1 == "read" ]] || [[ $1 == "r" ]] || [[ $1 == "d" ]]
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
    
    echo -e "\ninvoke function ${FUNCTION_NAME}\n"

    # invoke function
    curl --location --request POST "${STEDI_ENDPOINT}/${FUNCTION_NAME}/executions" \
    ${VERBOSE} \
    --header "Authorization: Key ${STEDI_API_KEY}" \
    --data-raw '{
        "type": "event"
    }' | jq .


# invoke function (create execution)
elif [[ $1 == "logs" ]] || [[ $1 == "lo" ]]
then

    echo -e "view logs for ${FUNCTION_NAME}"

    # view logs for function
    curl --location --request POST "${STEDI_ENDPOINT}/${FUNCTION_NAME}/executions" \
    ${VERBOSE} \
    --header 'Content-Type: application/json' \
    --header "Authorization: Key ${STEDI_API_KEY}" \
    --data-raw '{
        \"name\": \"Stedi Functions\"
    }' | jq .

else

    echo -e "
    Usage:
    
        ./deploy.sh [OPTION]

    Options:

        build: build package
        delete: delete function
        create: create function
        update: update function
        read: describe function
        list: list all functions
        logs: view logs for function
        invoke: invoke function
        "

fi 
