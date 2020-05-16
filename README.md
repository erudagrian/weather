# Weather App

[Demo](https://weather-app-israbaurel.web.app/). Limited for API key purposes

![Mobile](https://weather-app-israbaurel.web.app/assets/screen/mobile.png)

![Desktop](https://weather-app-israbaurel.web.app/assets/screen/desktop.png)

This is a Weather PWA based in Angular framework. It calls two different API to get both locations and current conditions and is ready to be used with Firebase emulators and deployment.

You can find a limited demo App in [https://weather-app-israbaurel.web.app/](https://weather-app-israbaurel.web.app/).

## Requeriments

You need to have [NodeJS](https://nodejs.org/en/blog/release/v10.18.0/) installed (v10 recomended for firebase tools)
A google account and a [firebase project setup](https://console.firebase.google.com/)

## Install
1. Run:
```bash
    git clone git@github.com:erudagrian/weather.git
```

2. Once cloned you run
```bash
npm install
```

3. Then bootstrap firebase by executing
```bash
npm run firebase login
```

4. And initialize you firebase project
```bash
npm run firebase init
```

5. Setup your project with hosting emmulators by following the CLI wizard.

6. Get your firebase project keys and set them up in the `/src/environments/environment.ts` in the firebase section and your production keys in
 `/src/environments/environment.prod.ts`.

7. Get API dev keys from [https://dataservice.accuweather.com](https://dataservice.accuweather.com) and [https://api.openweathermap.org](https://api.openweathermap.org). Add the keys to the `/src/environments/environment.ts` in the `locationsApiKey` and `weatherApiKey` respectively.

## Development server

To run your development server run:

```bash
npm run build -- --watch
```

It will keep running the building process in that terminal.

Open a new terminal and run:

```bash
npm run start:hosting
```

## Code scaffolding

Follow the Angular CLI scafolding recomendations [https://angular.io/cli](https://angular.io/cli).

## Production Build

This will build and anable the PWA functions.

```bash
npm run build -- --prod
```

## Deploy

Once you set-up and init your firebase app just run

```bash
npm run deploy:hosting
```
