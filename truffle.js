module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      "javascripts/app.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  },
  deploy: ["Bounty"],
  networks: {
    test: {
      network_id: 3,
      host: 'localhost',
      port: '8545'
    }
  }
};
