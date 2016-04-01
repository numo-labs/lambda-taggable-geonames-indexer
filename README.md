# Lambda Taggable Geonames
[![Codeship](https://img.shields.io/codeship/b54de050-d99b-0133-fa16-424a9136fddd.svg)](https://codeship.com/projects/140359/)
[![codecov.io](https://codecov.io/github/numo-labs/lambda-taggable-geonames-indexer/coverage.svg?branch=master)](https://codecov.io/github/numo-labs/lambda-taggable-geonames-indexer?branch=master)


Lambda function that creates tags for elements in a Geonames hierarchy.

The best way to *understand* how this works is with a simple example:

Imagine we have a Hotel in [Formenterra](https://www.google.co.uk/search?q=Formentera&tbm=isch)

```js
{
    "MID": "1234ABCD",
    "Name": "Blanco Hotel Formentera",
    "Country": "SPAIN",
    "ISO-2": "ES",
    "Address": "Calle Fonoll Marí, 50 07871 Es Pujols",
    "Latitude": "38.7",
    "Longitude": "1.467"
  }
```
We would lookup this hotel in Geonames given its `Latitude` and `Longitude`
values using the following query:

http://api.geonames.org/findNearbyPlaceNameJSON?lat=38.7&lng=1.467&username=demo&style=full&localCountry=true&maxrows=100&cities=15000

```js
{  
   "geonames":[  
      {  
         "distance":"1.31434",
         "timezone":{  
            "gmtOffset":1,
            "timeZoneId":"Europe/Madrid",
            "dstOffset":2
         },
         "asciiName":"Sant Ferran de ses Roques",
         "countryId":"2510769",
         "fcl":"P",
         "adminId2":"6424360",
         "adminId3":"6356033",
         "countryCode":"ES",
         "adminId1":"2521383",
         "lat":"38.70762",
         "fcode":"PPL",
         "continentCode":"EU",
         "elevation":0,
         "adminCode2":"PM",
         "adminCode3":"07024",
         "adminCode1":"07",
         "lng":"1.45543",
         "geonameId":6696037,
         "toponymName":"Sant Ferran de ses Roques",
         "population":10757,
         "adminName5":"",
         "adminName4":"",
         "adminName3":"Formentera",
         "alternateNames":[  
            {  
               "name":"http://en.wikipedia.org/wiki/Sant_Ferran_de_ses_Roques",
               "lang":"link"
            }
         ],
         "adminName2":"Balearic Islands",
         "name":"Sant Ferran de ses Roques",
         "fclName":"city, village,...",
         "countryName":"Spain",
         "fcodeName":"populated place",
         "adminName1":"Balearic Islands"
      }
   ]
}
```

From this response get the `geonameId` which we can use to run the
hierarchy query:
http://api.geonames.org/hierarchyJSON?geonameId=6696037&username=demo


```js
{  
   "geonames":[  
      {  
         "lng":"0",
         "geonameId":6295630,
         "name":"Earth",
         "fclName":"parks,area, ...",
         "toponymName":"Earth",
         "fcodeName":"area",
         "adminName1":"",
         "lat":"0",
         "fcl":"L",
         "fcode":"AREA",
         "population":6814400000
      },
      {  
         "lng":"9.14062",
         "geonameId":6255148,
         "name":"Europe",
         "fclName":"parks,area, ...",
         "toponymName":"Europe",
         "fcodeName":"continent",
         "adminName1":"",
         "lat":"48.69096",
         "fcl":"L",
         "fcode":"CONT",
         "population":0
      },
      {  
         "adminCode1":"00",
         "lng":"-4",
         "geonameId":2510769,
         "toponymName":"Kingdom of Spain",
         "countryId":"2510769",
         "fcl":"A",
         "population":46505963,
         "countryCode":"ES",
         "name":"Spain",
         "fclName":"country, state, region,...",
         "countryName":"Spain",
         "fcodeName":"independent political entity",
         "adminName1":"",
         "lat":"40",
         "fcode":"PCLI"
      },
      {  
         "adminCode1":"07",
         "lng":"1.45871",
         "geonameId":6356033,
         "toponymName":"Formentera",
         "countryId":"2510769",
         "fcl":"A",
         "population":10757,
         "countryCode":"ES",
         "name":"Formentera",
         "fclName":"country, state, region,...",
         "countryName":"Spain",
         "fcodeName":"third-order administrative division",
         "adminName1":"Balearic Islands",
         "lat":"38.71905",
         "fcode":"ADM3"
      }
   ]
}
```

## Expected Environment Variables

### Running the Lambda/Script

Using this script requires that you set a `GEONAMES_USERNAMES` environment variable (*one or more usernames*)
e.g:
```sh
export GEONAMES_USERNAME=yourusername,backupusername,etc
```


### Deploying

Deploying to AWS requires that you set `AWS_REGION` and `AWS_IAM_ROLE` variables.

e.g:
```sh
export AWS_REGION=eu-west-1
export AWS_IAM_ROLE=arn:aws:iam::123456789:role/LambdaExecRole
```

see: https://github.com/numo-labs/aws-lambda-deploy#2-ensure-that-the-required-aws-environment-variables-are-set






## Setup Geonames Account

To use this module you will require a Geonames account.
If you have not already signed up, visit:
[http://www.geonames.org/login](http://www.geonames.org/login)

Next, ensure that you have enabled the "***Free Web Service***" for your Geonames account:

Go to: http://www.geonames.org/manageaccount and scroll to the bottom of the page
![geonames-manageaccount-enable-free-web-services](https://cloud.githubusercontent.com/assets/194400/14138582/d8d31c58-f665-11e5-953a-82f272b1b53b.png)
you will see a link "[Click here to enable](http://www.geonames.org/enablefreewebservice)" click it.

Once enabled you should see a confirmation message:
![geonames-free-webservice-enabled](https://cloud.githubusercontent.com/assets/194400/14138588/e3e6aed4-f665-11e5-91ca-555c7c684325.png)

Now everything should work as expected.

### Running low on Geonames API Calls/Credits?

see: https://github.com/numo-labs/lambda-taggable-geonames-indexer/issues/5

## Tests

to run the tests for this project execute the following command in your terminal:

```sh
npm test
```
