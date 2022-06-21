# reslide-frontend

## Description

This repository contains the instructions necessary to install the application's frontend.

[Project description](https://github.com/fsv2860/reslide)

[Backend repository](https://www.github.com/fsv2860/reslide-backend)

[App demo](https://reslide-demo.herokuapp.com/)

## Installation

### General requirements

1. Install [nodejs](https://nodejs.org/) v14.17.0.

### Packages requirements

2. To install the packages required, run the following command:

```
npm install
```

### Connecting to the API

3. Go to the file **apiRoutes.ts** located in **src/app/utils/**.
4. Change the variable **serverRoute** to match the server url and port where your API has been deployed.

### Local deployment

5. To deploy locally run the following command:

```
ng serve
```

### Final steps

6. Make sure the API is accessible as it is needed to use the web app.
7. The frontend is ready to use.

## Built with

[nodejs v14.17.0](https://nodejs.org/)

[Angular](https://angular.io/)

[Angular Material](https://material.angular.io/)

[ngx-webstorage](https://www.npmjs.com/package/ngx-webstorage)

[ngx-print](https://www.npmjs.com/package/ngx-print)

[matheo-datepicker](https://www.npmjs.com/package/@matheo/datepicker)
