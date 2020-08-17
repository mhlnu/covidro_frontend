# covidro.info
A basic React experiment using public APIs or whatever CORS-free APIs I could find.

## Purpose

The whole purpose of this little toy was to create a self-updating, better visual framework for COVID-related dashboards. Work is still in progress.

## Functionality

This is only the frontend of the app. There is an /api directory with a data.json (real data for 17/03/2020 - 17/08/2020) which you can use in Home.js (no idea if it works with current API call; if it doesn't, just add ".json" to the existing "/api/data" URL).

The reason I'm not embedding a backend is that I'm currently lurking on other people APIs. Which means I'm not eager to seeing those closed because of the data usage going crazy. Feel free to find your own data sources.

## License

This project could probably be reused by whoever given that they have access to whatever working APIs might be available. The code is free to use.

## Credits

Don't expect a final result too soon. I might as well drop this project anytime if I get bored. Also, do not expect it to run forever, as it is at the mercy of the APIs owners. If they pull the plug, oh well.
 
The app is currently lurking on [datelazi.ro](https://datelazi.ro), which offers a public API ([datelazi.ro/latestData.json](https://datelazi.ro/latestData.json)) and [graphs.ro](https://www.graphs.ro). My thanks to Dragoș Vana for supporting my lurking and to Alex Ștefănescu (Code4Romania) for making the API public.

[Running here.](https://covidro.info)
