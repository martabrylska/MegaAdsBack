<div align="center">
  <h1>Mega Ads</h1> 
</div>

# Table of Contents

- [About the Project](#about-the-project-🎉)
    - [Screenshots](#screenshots-📺)
    - [Tech Stack](#tech-stack-🔧)
- [Getting Started](#getting-started-🚀)
    - [Run the app locally](#run-the-app-locally)

## About the project 🎉

The application is designed to connect buyers and sellers. The app's interactive map serves
as the central hub for adding and showcasing sales offers. Admin approval ensures the
authenticity and quality of listings. After approval, each offer appears as a marker on the
map, promoting visibility and fostering connections between potential buyers and sellers.
The app uses eg.:

- (FE) Leaflet map to show location of sales offers,
- (FE) React context (for the searched phrase in the offer),
- (BE) Nodemailer for sending mails to admin in order to verify advertisements.

### Screenshots 📺

<div>
  <img src="https://raw.githubusercontent.com/martabrylska/MegaAdsFront/main/public/app-screens/homepage.JPG" alt="home page" />
    <img src="https://raw.githubusercontent.com/martabrylska/MegaAdsFront/main/public/app-screens/add_ad.JPG" alt="add your ad page"/>
</div>

### Tech stack 🔧

  <ul>
    <li><a href="https://react.dev/">React.js</a></li>
    <li><a href="https://expressjs.com/">Express.js</a></li>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://www.mysql.com/">mySQL</a></li>
  </ul>

## Getting started 🚀

### Run the app locally

1. Clone the frontend repo: [https://github.com/martabrylska/MegaAdsFront](https://github.com/martabrylska/MegaAdsFront)

   ` git clone https://github.com/martabrylska/MegaAdsFront.git`

2. Install NPM packages:

   `cd MegaAdsFront`

   `npm install`

3. Start the server development:

   `npm start`

4. Open new terminal (at the same place as in the beginning) and run the backend of the
   app: [https://github.com/martabrylska/MegaAdsBack](https://github.com/martabrylska/MegaAdsBack)

   `git clone https://github.com/martabrylska/MegaAdsBack.git`

5. Go to file config/mail-config.example.ts and change it to mail-config.ts.

   Uncomment the contents of the file and make configuration where is needed.

6. Install NPM packages and start development mode:

   `cd MegaAdsBack`

   `npm install`

   `npm run start:dev`

7. You can now test the app.
