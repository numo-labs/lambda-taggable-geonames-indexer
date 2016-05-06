# Lambda Taggable Geonames (AKA "*TAG-E*")

![image](https://cloud.githubusercontent.com/assets/194400/14675184/07682f88-0708-11e6-96b7-672e66329461.png)

[![Codeship](https://img.shields.io/codeship/b54de050-d99b-0133-fa16-424a9136fddd.svg)](https://codeship.com/projects/143596)
[![codecov.io](https://codecov.io/github/numo-labs/lambda-taggable-geonames-indexer/coverage.svg?branch=master)](https://codecov.io/github/numo-labs/lambda-taggable-geonames-indexer?branch=master)
[![Dependency Status](https://david-dm.org/numo-labs/lambda-taggable-geonames-indexer.svg)](https://david-dm.org/numo-labs/lambda-taggable-geonames-indexer)
[![devDependency Status](https://david-dm.org/numo-labs/lambda-taggable-geonames-indexer/dev-status.svg)](https://david-dm.org/numo-labs/lambda-taggable-geonames-indexer#info=devDependencies)
[![npm version](https://badge.fury.io/js/tag-e-geo.svg)](https://badge.fury.io/js/lambda-taggable-geonames-indexer)


## Why?

Locating Hotels and other content by searching for a place name is
the *heart* of the Tagging system.
We use Geonames to
"*[reverse geocode](https://en.wikipedia.org/wiki/Reverse_geocoding)*"
the Lat/Lon for each Hotel in the database and add "*hierarchy*" for that place.  
> *See*: ***How?*** > ***Detail*** *section for detailed example*


## What?

Lambda function that accepts a set of Longitude & Latitude coordinates (***lat/lon***)
and returns a list of Geo Tags.
(*corresponding to the elements in the Geonames hierarchy for that lat/lon*).

## How?

There are *two* ways to use this package:

### Lambda

1. Deploy the Lambda function by running the deployment script: `npm run deploy`  
( *see: https://github.com/numo-labs/aws-lambda-deploy for detail* )  

2. Invoke in AWS Console:

Sample Event
```js
{
  "_id": "hotel:mhid.02tu1jz",
  "displayName": "Elvis Presley's Heartbreak",
  "location": {
    "lat": "35.04850",
    "lon": "-90.02710"
  },
  "tags": []
}
```
Will return an array of Geo Tags in the Taggable System format:

```js
[
  {
    "_id": "geo:geonames.6295630",
    "displayName": "Earth",
    "location": {
      "lat": "0",
      "lon": "0"
    },
    "tags": [],
    "markets": {
      "de": {
        "de": {
          "label": "search",
          "values": [
            "Welt"
          ]
        }
      },
      "gb": {
        "en": {
          "label": "search",
          "values": [
            "World"
          ]
        }
      },
      "es": {
        "es": {
          "label": "search",
          "values": [
            "Tierra"
          ]
        }
      },
      "fi": {
        "fi": {
          "label": "search",
          "values": [
            "Maa"
          ]
        }
      },
      "fr": {
        "fr": {
          "label": "search",
          "values": [
            "Terre"
          ]
        }
      },
      "nl": {
        "nl": {
          "label": "search",
          "values": [
            "Aarde"
          ]
        }
      },
      "no": {
        "no": {
          "label": "search",
          "values": [
            "Jorden"
          ]
        }
      },
      "ru": {
        "ru": {
          "label": "search",
          "values": [
            "Земля"
          ]
        }
      }
    }
  },
  {
    "_id": "geo:geonames.6255149",
    "displayName": "North America",
    "location": {
      "lat": "46.07323",
      "lon": "-100.54688"
    },
    "tags": [
      {
        "node": "geo:geonames.6295630",
        "edge": "LOCATED_IN",
        "displayName": "Earth",
        "source": "geonames",
        "active": true
      }
    ],
    "markets": {
      "dk": {
        "da": {
          "label": "search",
          "values": [
            "Nordamerika"
          ]
        }
      },
      "de": {
        "de": {
          "label": "search",
          "values": [
            "Nordamerika"
          ]
        }
      },
      "gb": {
        "en": {
          "label": "search",
          "values": [
            "North America"
          ]
        }
      },
      "es": {
        "es": {
          "label": "search",
          "values": [
            "Norteamérica"
          ]
        }
      },
      "fi": {
        "fi": {
          "label": "search",
          "values": [
            "Pohjois-Amerikka"
          ]
        }
      },
      "fr": {
        "fr": {
          "label": "search",
          "values": [
            "Amérique du Nord"
          ]
        }
      },
      "nl": {
        "nl": {
          "label": "search",
          "values": [
            "Noord-Amerika"
          ]
        }
      },
      "no": {
        "no": {
          "label": "search",
          "values": [
            "Nord-Amerika"
          ]
        }
      },
      "ru": {
        "ru": {
          "label": "search",
          "values": [
            "Северная Америка"
          ]
        }
      },
      "sv": {
        "sv": {
          "label": "search",
          "values": [
            "Nordamerika"
          ]
        }
      },
      "cn": {
        "zh": {
          "label": "search",
          "values": [
            "北美洲"
          ]
        }
      }
    }
  },
  {
    "_id": "geo:geonames.6252001",
    "displayName": "United States",
    "location": {
      "lat": "39.76",
      "lon": "-98.5"
    },
    "tags": [
      {
        "node": "geo:geonames.6255149",
        "edge": "LOCATED_IN",
        "displayName": "North America",
        "source": "geonames",
        "active": true
      }
    ],
    "markets": {
      "dk": {
        "da": {
          "label": "search",
          "values": [
            "USA"
          ]
        }
      },
      "de": {
        "de": {
          "label": "search",
          "values": [
            "Vereinigte Staaten"
          ]
        }
      },
      "gb": {
        "en": {
          "label": "search",
          "values": [
            "United States of America"
          ]
        }
      },
      "es": {
        "es": {
          "label": "search",
          "values": [
            "Estados Unidos"
          ]
        }
      },
      "fi": {
        "fi": {
          "label": "search",
          "values": [
            "Yhdysvallat"
          ]
        }
      },
      "fr": {
        "fr": {
          "label": "search",
          "values": [
            "USA"
          ]
        }
      },
      "nl": {
        "nl": {
          "label": "search",
          "values": [
            "Verenigde Staten"
          ]
        }
      },
      "no": {
        "no": {
          "label": "search",
          "values": [
            "USA"
          ]
        }
      },
      "ru": {
        "ru": {
          "label": "search",
          "values": [
            "США"
          ]
        }
      },
      "sv": {
        "sv": {
          "label": "search",
          "values": [
            "USA"
          ]
        }
      },
      "cn": {
        "zh": {
          "label": "search",
          "values": [
            "美国"
          ]
        }
      }
    }
  },
  {
    "_id": "geo:geonames.4662168",
    "displayName": "Tennessee",
    "location": {
      "lat": "35.75035",
      "lon": "-86.25027"
    },
    "tags": [
      {
        "node": "geo:geonames.6252001",
        "edge": "LOCATED_IN",
        "displayName": "United States",
        "source": "geonames",
        "active": true
      }
    ],
    "markets": {
      "gb": {
        "en": {
          "label": "search",
          "values": [
            "Volunteer State"
          ]
        }
      },
      "es": {
        "es": {
          "label": "search",
          "values": [
            "Tennessee"
          ]
        }
      },
      "ru": {
        "ru": {
          "label": "search",
          "values": [
            "Теннесси"
          ]
        }
      },
      "cn": {
        "zh": {
          "label": "search",
          "values": [
            "田纳西州"
          ]
        }
      }
    }
  },
  {
    "_id": "geo:geonames.4657046",
    "displayName": "Shelby County",
    "location": {
      "lat": "35.184",
      "lon": "-89.8956"
    },
    "tags": [
      {
        "node": "geo:geonames.4662168",
        "edge": "LOCATED_IN",
        "displayName": "Tennessee",
        "source": "geonames",
        "active": true
      }
    ],
    "markets": {
      "es": {
        "es": {
          "label": "search",
          "values": [
            "Condado de Shelby"
          ]
        }
      },
      "fr": {
        "fr": {
          "label": "search",
          "values": [
            "Comté de Shelby"
          ]
        }
      },
      "ru": {
        "ru": {
          "label": "search",
          "values": [
            "Шелби"
          ]
        }
      },
      "cn": {
        "zh": {
          "label": "search",
          "values": [
            "謝爾比縣"
          ]
        }
      }
    }
  },
  {
    "_id": "geo:geonames.4645760",
    "displayName": "Nonconnah",
    "location": {
      "lat": "35.06204",
      "lon": "-90.0362"
    },
    "tags": [
      {
        "node": "geo:geonames.4657046",
        "edge": "LOCATED_IN",
        "displayName": "Shelby County",
        "source": "geonames",
        "active": true
      }
    ]
  }
]
```



### Node Module

If you prefer to use this package as a node module e.g: as part of another lambda

```sh
npm install lambda-taggable-geonames-indexer --save
```
Then in your code:

```js
var geonames = require('lambda-taggable-geonames-indexer');
var lat = '28.3852';
var lon = '81.5639';
geonames.find(lat, lon, function (err, geo) {
  console.log(geo); // see Detail section below for example output
  var geonames_id = geo.geonames[0].geonameId;
  geonames.hierarchy(geonames_id, function (err, hierarchy) {
    console.log(JSON.stringify(hierarchy, null, 2));
  }); // see Detail for example hierarchy object
});
```

### *Detail*

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
export GEONAMES_CACHE=geonames-cache

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
