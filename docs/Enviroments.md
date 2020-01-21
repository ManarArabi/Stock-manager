## Intro
The object process.env holds the values of any enviroment variable gets set before starting the node app process. The NODE_ENV environment variable specifies the environment in which an application is running (usually, development or production). One of the simplest things you can do to improve performance is to set NODE_ENV to “production.”

Setting NODE_ENV to “production” makes Express:

Cache view templates.
Cache CSS files generated from CSS extensions.
Generate less verbose error messages.


## Reason to use:

### 1 - Availaibility:
Typically in any use case of a node server app it has different configuration and keys for each enviroment for instance locally in "developement" it uses the ```mongodb://localhost:27017``` but on a deployment machine it will to be ```mongodb://[username:password@]host[:port][/[database][?options]]``` which will be confusing to edit on the machine once deployed or to use it in both developement and production

### 2 - Security:
When specifing an enviroment which the app is running on you may want to use api keys, jwt signature and other private strings or keys that you don't want anyother developer even if it's an open source so the solution would to add all these keys in certain config json file of your wanted environment and prevent it from seen in git by adding to ```.gitignore```  ex: ```src/config/developement.json```
so when you want to use it on the target machine running the app or the docker image you just create the json file and leave there as it is untouched and away from any github users

## How to use them:
First you install the package ```config``` it reads from a folder you create in root directory called ```config``` before you run the app you set the NODE_ENV variable to any value you want but you have to a json file the ```config``` folder with the exact name of the value of the NODE_ENV for instance you create ```config/developement.json``` and set NODE_ENV=developement then run the app it'll read the values from there.
now to fetch any value you've store in the json file you use the line ```config.get(valueKey)``` for instance ```config.get('mongoUrl')```

## Instructions:
rename ```developement_defaults.json``` to ```developement.json``` put your wanted values and then re-run the app
also see file ```src/db/mongoose.json``` and ```src/models/user.js```

