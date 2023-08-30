# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

This is my second attempt at making a Memory Game since TOP's revision to their React curriculum. The biggest difference is that instead of using images saved in the project directory, I've used a fetch method to get images from an API. I came across NASA's list of APIs, and went with the "Astronomy Picture of the Day" (APOD) for it's simplicity and beautiful, educational content. I also made a few smaller revisions, such as removing the "reset game" function (It's a short game anyway), and reworking a few functions to make use of "map" to iterate through all Objects in an array. This specific API also inspired 2 additional features:

1. Looping fetch - APOD also features videos, which caused problems as my script retrieves 16 random entries. I therefore included a simple check which repeats the fetch if any of the returned entries are not images. This also meant adding the conditional render for the start button, so a player cannot mount the cards until the fetch has successfully found 16 images.

2. Links to pages - I wanted the content to be educational despite the limited presentation and spirit of a memory game, but the API does not provide links to their archived pages for each info. I therefore made the "buildLink" function which parses the fetched date strings into 6 chars, then concatonates them into a URL. I then include these URLs at the end of the game so players can read more about the images featured in their game.

There are still thing's I'd like to do with this, but didn't seem important right now:
1. Card animations between turns.
2. Animation on score when resetting to 0.
3. Improved option for new fetch: I struggled to get the fetch to run again after the initial mount without also looping infinitely. My workaround was to include the button to refresh the page at the end of the game and trigger a new "initial mount".

I was wary of revisiting this project as I was so happy with my first version, but I was ultimately very motivated to make into something fun and interesting for users.

API Info: https://apod.nasa.gov/apod/lib/about_apod.html