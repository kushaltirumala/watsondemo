# Watranslate
Version of Google Translate built completely on top Watson
link: [here](https://watranslate.mybluemix.net/); not up right now I didn't want to pay :)

## What does it use?
Node.js backend hosted on IBM Bluemix

## How to run it locally
1) download the repository or <code>git clone</code>
2) create the necessary services (speech to text, language translator, and text to speech) on the bluemix. and enter the necessary credentials into an <code>admin.js</code> file following the names of the local variables in <code>index.js</code>
3) <code>cd</code> into the directory and run <code>npm start</code>

## How to host on bluemix
1) download the Cloud Fountry CLI tool [here](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html). Change your <code>manifest.yml</code> file to contain the right app name (the app name will be your host name i.e hostname.bluemix.net). 
2) run <code>cf push</code> which should start up the application @ hostname.mybluemix.net

