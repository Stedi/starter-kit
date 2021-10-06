# Postman collections

A repo with examples and templates showing how to use [Stedi APIs](https://www.stedi.com/docs) using Postman. 

## How to use

1. In Postman, go to File -> Import
2. Upload the JSON file from this repo or paste raw text - this will create a new collection
3. [Create a free Stedi account](https://terminal.stedi.com/sign-up)
4. [Create an API Key](https://www.stedi.com/docs/authentication)
5. Paste your key into the header replacing `<STEDI_API_KEY>`.
6. Try out a request

## EDI Core API
<img src="https://user-images.githubusercontent.com/89091046/136258093-c3aba730-7109-4f64-acc0-46dda44043cb.png" width=50% height=50%>

## Example requests

**EDI to JEDI**
<details>
  <summary>cURL</summary>

```
curl --location --request POST 'https://edi-core.stedi.com/2021-06-05/translate' \
--header 'Content-Type: application/json' \
--header 'Authorization: Key <STEDI_API_KEY>' \
--data-raw '{
    "input_format": "edi",
    "output_format": "jedi@1.0",
    "input": "ISA*00*          *00*          *ZZ*               *ZZ*               *210902*1200*U*00401*123456789*1*T*:~GS*IN*00*00*20210902*1200*987654321*X*004010~ST*810*0000~BIG*20210902*AB01010101~TDS*999~SE*4*0000~GE*1*987654321~IEA*1*123456789~",
    "output_options": {
        "include_trailing_newlines": true
    },
    "validation_options": {
        "validation_type": "base"
    }
}'
```
</details> 
    
<details>
  <summary>Python</summary>

```import requests
import json

url = "https://edi-core.stedi.com/2021-06-05/translate"

payload = json.dumps({
  "input_format": "edi",
  "output_format": "jedi@1.0",
  "input": "ISA*00*          *00*          *ZZ*               *ZZ*               *210902*1200*U*00401*123456789*1*T*:~GS*IN*00*00*20210902*1200*987654321*X*004010~ST*810*0000~BIG*20210902*AB01010101~TDS*999~SE*4*0000~GE*1*987654321~IEA*1*123456789~",
  "output_options": {
    "include_trailing_newlines": True
  },
  "validation_options": {
    "validation_type": "base"
  }
})
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Key <STEDI_API_KEY>'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
```
</details> 
    
<details>
  <summary>JavaScript - Fetch</summary>

```var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Key <STEDI_API_KEY>");

var raw = JSON.stringify({
  "input_format": "edi",
  "output_format": "jedi@1.0",
  "input": "ISA*00*          *00*          *ZZ*               *ZZ*               *210902*1200*U*00401*123456789*1*T*:~GS*IN*00*00*20210902*1200*987654321*X*004010~ST*810*0000~BIG*20210902*AB01010101~TDS*999~SE*4*0000~GE*1*987654321~IEA*1*123456789~",
  "output_options": {
    "include_trailing_newlines": true
  },
  "validation_options": {
    "validation_type": "base"
  }
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://edi-core.stedi.com/2021-06-05/translate", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
</details> 
    
<details>
  <summary> NodeJS - Axios</summary>
 
```
var axios = require('axios');
var data = JSON.stringify({
  "input_format": "edi",
  "output_format": "jedi@1.0",
  "input": "ISA*00*          *00*          *ZZ*               *ZZ*               *210902*1200*U*00401*123456789*1*T*:~GS*IN*00*00*20210902*1200*987654321*X*004010~ST*810*0000~BIG*20210902*AB01010101~TDS*999~SE*4*0000~GE*1*987654321~IEA*1*123456789~",
  "output_options": {
    "include_trailing_newlines": true
  },
  "validation_options": {
    "validation_type": "base"
  }
});

var config = {
  method: 'post',
  url: 'https://edi-core.stedi.com/2021-06-05/translate',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Key <STEDI_API_KEY>'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
</details> 


**validate against Mapping Guide**
    
<details>
  <summary>cURL</summary>
```
curl --location --request POST 'https://edi-core.stedi.com/2021-06-05/translate?Content-Type=application/json&Authorization=Key%20%3CSTEDI_API_KEY%3E' \
--header 'Content-Type: application/json' \
--header 'Authorization: Key <STEDI_API_KEY>' \
--data-raw '{
    "input_format": "edi",
    "output_format": "jedi@1.0",
    "input": "ISA*00*          *00*          *ZZ*CVS            *01*Vendor ID      *090915*1537*U*00401*000008513*0*P*^~GS*PO*CVS*Vendor ID*20090915*1537*1342*X*004010~ST*850*711002~BEG*00*DS*6375220**20090913~REF*VR*2A999~PER*DC**TE*(623) 933-7233~FOB*PO~ITD*01*15*****7***100~DTM*010*20090913~AMT*BAP*5081~N9*L1*PO COMMENTS~MSG*THIS PO SUBJECT TO THE TERMS AND CONDITIONS FOUND ON CVS SUPPLIERS WEBSTE~N1*ST**92*09999~N3*9901B W THUNDERBIRD BLVD~N4*SUN CITY*AZ*85351~N1*BT**92*09999~PO1**1*PC*63.9**PI*123456*UI*01235648937~PAM*01*63*ZZ~PO4*30~PO1**2*PC*52.94**PI*124536*UI*02235416897~PAM*01*105*ZZ~PO4*60~PO1**1*PC*52.94**PI*325678*UI*02145689730~PAM*01*52*ZZ~PO4*30~PO1**1*PC*55.64**PI*123567*UI*03124589763~PAM*01*55*ZZ~PO4*60~PO1**1*PC*55.64**PI*13564*UI*01235648972~PAM*01*55*ZZ~PO4*60~PO1**1*PC*55.64**PI*123456*UI*02820011234~PAM*01*55*ZZ~PO4*60~PO1**7*PC*55.64**PI*234567*UI*02820001234~PAM*01*389*ZZ~PO4*60~PO1**1*PC*47.04**PI*231456*UI*02040001234~PAM*01*47*ZZ~PO4*30~PO1**1*PC*59.24**PI*853124*UI*026100009637~PAM*01*59*ZZ~PO4*60~PO1**1*PC*49.54**PI*213546*UI*02720002315~PAM*01*49*ZZ~PO4*30~PO1**7*PC*49.54**PI*123546*UI*02720002563~PAM*01*346*ZZ~PO4*30~PO1**2*PC*49.54**PI*231567*UI*02720001253~PAM*01*99*ZZ~PO4*30~CTT*51*93~SE*167*711002~GE*2*1342~IEA*1*000008513~",
    "validation_options": {
    "validation_type": "specification",
    "validation_id": "01FC7CS89MRVJ4E5NS8ZFJA20A"
    }
}'
```
</details>
    <details>
  <summary>Python</summary>

```
import requests
import json

url = "https://edi-core.stedi.com/2021-06-05/translate?Content-Type=application/json&Authorization=Key <STEDI_API_KEY>"

payload = json.dumps({
  "input_format": "edi",
  "output_format": "jedi@1.0",
  "input": "ISA*00*          *00*          *ZZ*CVS            *01*Vendor ID      *090915*1537*U*00401*000008513*0*P*^~GS*PO*CVS*Vendor ID*20090915*1537*1342*X*004010~ST*850*711002~BEG*00*DS*6375220**20090913~REF*VR*2A999~PER*DC**TE*(623) 933-7233~FOB*PO~ITD*01*15*****7***100~DTM*010*20090913~AMT*BAP*5081~N9*L1*PO COMMENTS~MSG*THIS PO SUBJECT TO THE TERMS AND CONDITIONS FOUND ON CVS SUPPLIERS WEBSTE~N1*ST**92*09999~N3*9901B W THUNDERBIRD BLVD~N4*SUN CITY*AZ*85351~N1*BT**92*09999~PO1**1*PC*63.9**PI*123456*UI*01235648937~PAM*01*63*ZZ~PO4*30~PO1**2*PC*52.94**PI*124536*UI*02235416897~PAM*01*105*ZZ~PO4*60~PO1**1*PC*52.94**PI*325678*UI*02145689730~PAM*01*52*ZZ~PO4*30~PO1**1*PC*55.64**PI*123567*UI*03124589763~PAM*01*55*ZZ~PO4*60~PO1**1*PC*55.64**PI*13564*UI*01235648972~PAM*01*55*ZZ~PO4*60~PO1**1*PC*55.64**PI*123456*UI*02820011234~PAM*01*55*ZZ~PO4*60~PO1**7*PC*55.64**PI*234567*UI*02820001234~PAM*01*389*ZZ~PO4*60~PO1**1*PC*47.04**PI*231456*UI*02040001234~PAM*01*47*ZZ~PO4*30~PO1**1*PC*59.24**PI*853124*UI*026100009637~PAM*01*59*ZZ~PO4*60~PO1**1*PC*49.54**PI*213546*UI*02720002315~PAM*01*49*ZZ~PO4*30~PO1**7*PC*49.54**PI*123546*UI*02720002563~PAM*01*346*ZZ~PO4*30~PO1**2*PC*49.54**PI*231567*UI*02720001253~PAM*01*99*ZZ~PO4*30~CTT*51*93~SE*167*711002~GE*2*1342~IEA*1*000008513~",
  "validation_options": {
    "validation_type": "specification",
    "validation_id": "01FC7CS89MRVJ4E5NS8ZFJA20A"
  }
})
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Key <STEDI_API_KEY>'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
```
</details>
    <details>
  <summary>JavaScript - Fetch</summary>

```
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Key <STEDI_API_KEY>");

var raw = JSON.stringify({
  "input_format": "edi",
  "output_format": "jedi@1.0",
  "input": "ISA*00*          *00*          *ZZ*CVS            *01*Vendor ID      *090915*1537*U*00401*000008513*0*P*^~GS*PO*CVS*Vendor ID*20090915*1537*1342*X*004010~ST*850*711002~BEG*00*DS*6375220**20090913~REF*VR*2A999~PER*DC**TE*(623) 933-7233~FOB*PO~ITD*01*15*****7***100~DTM*010*20090913~AMT*BAP*5081~N9*L1*PO COMMENTS~MSG*THIS PO SUBJECT TO THE TERMS AND CONDITIONS FOUND ON CVS SUPPLIERS WEBSTE~N1*ST**92*09999~N3*9901B W THUNDERBIRD BLVD~N4*SUN CITY*AZ*85351~N1*BT**92*09999~PO1**1*PC*63.9**PI*123456*UI*01235648937~PAM*01*63*ZZ~PO4*30~PO1**2*PC*52.94**PI*124536*UI*02235416897~PAM*01*105*ZZ~PO4*60~PO1**1*PC*52.94**PI*325678*UI*02145689730~PAM*01*52*ZZ~PO4*30~PO1**1*PC*55.64**PI*123567*UI*03124589763~PAM*01*55*ZZ~PO4*60~PO1**1*PC*55.64**PI*13564*UI*01235648972~PAM*01*55*ZZ~PO4*60~PO1**1*PC*55.64**PI*123456*UI*02820011234~PAM*01*55*ZZ~PO4*60~PO1**7*PC*55.64**PI*234567*UI*02820001234~PAM*01*389*ZZ~PO4*60~PO1**1*PC*47.04**PI*231456*UI*02040001234~PAM*01*47*ZZ~PO4*30~PO1**1*PC*59.24**PI*853124*UI*026100009637~PAM*01*59*ZZ~PO4*60~PO1**1*PC*49.54**PI*213546*UI*02720002315~PAM*01*49*ZZ~PO4*30~PO1**7*PC*49.54**PI*123546*UI*02720002563~PAM*01*346*ZZ~PO4*30~PO1**2*PC*49.54**PI*231567*UI*02720001253~PAM*01*99*ZZ~PO4*30~CTT*51*93~SE*167*711002~GE*2*1342~IEA*1*000008513~",
  "validation_options": {
    "validation_type": "specification",
    "validation_id": "01FC7CS89MRVJ4E5NS8ZFJA20A"
  }
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://edi-core.stedi.com/2021-06-05/translate?Content-Type=application/json&Authorization=Key <STEDI_API_KEY>", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
</details>
<details>
  <summary> NodeJS - Axios</summary>
 
```
var axios = require('axios');
var data = JSON.stringify({
  "input_format": "edi",
  "output_format": "jedi@1.0",
  "input": "ISA*00*          *00*          *ZZ*CVS            *01*Vendor ID      *090915*1537*U*00401*000008513*0*P*^~GS*PO*CVS*Vendor ID*20090915*1537*1342*X*004010~ST*850*711002~BEG*00*DS*6375220**20090913~REF*VR*2A999~PER*DC**TE*(623) 933-7233~FOB*PO~ITD*01*15*****7***100~DTM*010*20090913~AMT*BAP*5081~N9*L1*PO COMMENTS~MSG*THIS PO SUBJECT TO THE TERMS AND CONDITIONS FOUND ON CVS SUPPLIERS WEBSTE~N1*ST**92*09999~N3*9901B W THUNDERBIRD BLVD~N4*SUN CITY*AZ*85351~N1*BT**92*09999~PO1**1*PC*63.9**PI*123456*UI*01235648937~PAM*01*63*ZZ~PO4*30~PO1**2*PC*52.94**PI*124536*UI*02235416897~PAM*01*105*ZZ~PO4*60~PO1**1*PC*52.94**PI*325678*UI*02145689730~PAM*01*52*ZZ~PO4*30~PO1**1*PC*55.64**PI*123567*UI*03124589763~PAM*01*55*ZZ~PO4*60~PO1**1*PC*55.64**PI*13564*UI*01235648972~PAM*01*55*ZZ~PO4*60~PO1**1*PC*55.64**PI*123456*UI*02820011234~PAM*01*55*ZZ~PO4*60~PO1**7*PC*55.64**PI*234567*UI*02820001234~PAM*01*389*ZZ~PO4*60~PO1**1*PC*47.04**PI*231456*UI*02040001234~PAM*01*47*ZZ~PO4*30~PO1**1*PC*59.24**PI*853124*UI*026100009637~PAM*01*59*ZZ~PO4*60~PO1**1*PC*49.54**PI*213546*UI*02720002315~PAM*01*49*ZZ~PO4*30~PO1**7*PC*49.54**PI*123546*UI*02720002563~PAM*01*346*ZZ~PO4*30~PO1**2*PC*49.54**PI*231567*UI*02720001253~PAM*01*99*ZZ~PO4*30~CTT*51*93~SE*167*711002~GE*2*1342~IEA*1*000008513~",
  "validation_options": {
    "validation_type": "specification",
    "validation_id": "01FC7CS89MRVJ4E5NS8ZFJA20A"
  }
});

var config = {
  method: 'post',
  url: 'https://edi-core.stedi.com/2021-06-05/translate?Content-Type=application/json&Authorization=Key <STEDI_API_KEY>',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Key <STEDI_API_KEY>'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
</details>


**JSON to EDI**

<details>
  <summary>cURL</summary>

```
curl --location --request POST 'https://edi-core.stedi.com/2021-06-05/translate' \
--header 'Content-Type: application/json' \
--header 'Authorization: Key <STEDI_API_KEY>' \
--data-raw '{
    "input_format": "jedi@1.0",
    "output_format": "edi",
    "input": {    "interchanges": [
            {
                "IEA": {
                    "01": "1",
                    "02": "123456789"
                },
                "ISA": {
                    "01": "00",
                    "02": "          ",
                    "03": "00",
                    "04": "          ",
                    "05": "ZZ",
                    "06": "               ",
                    "07": "ZZ",
                    "08": "               ",
                    "09": "210902",
                    "10": "1200",
                    "11": "U",
                    "12": "00401",
                    "13": "123456789",
                    "14": "1",
                    "15": "T",
                    "16": ":"
                },
                "delimiters": {
                    "element": "*",
                    "segment": "~",
                    "sub_element": ":"
                },
                "groups": [
                    {
                        "GE": {
                            "01": "1",
                            "02": "987654321"
                        },
                        "GS": {
                            "01": "IN",
                            "02": "00",
                            "03": "00",
                            "04": "20210902",
                            "05": "1200",
                            "06": "987654321",
                            "07": "X",
                            "08": "004010"
                        },
                        "transaction_sets": [
                            {
                                "heading": {
                                    "010_ST": {
                                        "01": "810",
                                        "02": "0000"
                                    },
                                    "020_BIG": {
                                        "01": "20210902",
                                        "02": "AB01010101"
                                    }
                                },
                                "summary": {
                                    "010_TDS": {
                                        "01": "999"
                                    },
                                    "080_SE": {
                                        "01": "4",
                                        "02": "0000"
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        ]},
    "output_options": {
        "include_trailing_newlines": true
    },
    "validation_options": {
        "validation_type": "base"
    }
}'
```
</details>
    <details>
  <summary>Python</summary>

```
import requests
import json

url = "https://edi-core.stedi.com/2021-06-05/translate"

payload = json.dumps({
  "input_format": "jedi@1.0",
  "output_format": "edi",
  "input": {
    "interchanges": [
    ...
    ]
  },
  "output_options": {
    "include_trailing_newlines": True
  },
  "validation_options": {
    "validation_type": "base"
  }
})
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Key <STEDI_API_KEY>'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
```
</details>
    <details>
  <summary>JavaScript - Fetch</summary>

```
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Key <STEDI_API_KEY>");

var raw = JSON.stringify({
  "input_format": "jedi@1.0",
  "output_format": "edi",
  "input": {
    "interchanges": [
    ...
    ]
  },
  "output_options": {
    "include_trailing_newlines": true
  },
  "validation_options": {
    "validation_type": "base"
  }
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://edi-core.stedi.com/2021-06-05/translate", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
</details>
    <details>
  <summary> NodeJS - Axios</summary>

```
var axios = require('axios');
var data = JSON.stringify({
  "input_format": "jedi@1.0",
  "output_format": "edi",
  "input": {
    "interchanges": [
    ...
    ]
  },
  "output_options": {
    "include_trailing_newlines": true
  },
  "validation_options": {
    "validation_type": "base"
  }
});

var config = {
  method: 'post',
  url: 'https://edi-core.stedi.com/2021-06-05/translate',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Key <STEDI_API_KEY>'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
</details>
