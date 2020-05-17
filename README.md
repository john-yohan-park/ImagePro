# ImagePro

Fullstack web app that 
- detects an image's edges and renders it black & white solely consisting of its edges
- conducts empirical analysis on 2 edge-detection algorithms: Euclidean & Sobel

Feel free to clone this repository and run the application locally.

<b>Requirements</b>
- Node JS version 13.12.0 (latest)
- NPM version 6.14.4 (latest)
- Mongo Key

If you have a mac and don't have Node & NPM, open up a terminal and install Homebrew (https://brew.sh/) then run `brew install node`, which installs the latest versions of Node & NPM.

<b>To Run</b>
- Open `MongoKey.js` from the project directory and copy & paste Mongo Key value into the region labeled `'PASTE MONGO KEY HERE'` (keep the single quotes around the key value since the key has to be a string value) 
- `cd` into `frontend` directory and run `npm i`
- `cd` into `backend` directory and run `npm i`
- While in `backend` directory, run `npm start`
- Fire up a browser and go to `http://localhost:3000/`

Enjoy!

Built with: <br/>
<img src="./screenshots/react.png" width=9%>
<img src="./screenshots/node.png" width=15%>
<img src="./screenshots/mongoDB.png" width=20%>

<b>Screenshots</b>

<img src="./screenshots/home.png" width=60%>

<img src="./screenshots/abstract.png" width=60%>

<img src="./screenshots/analysis.png" width=60%>
