// read and set any environment variables with the dotenv package
require("dotenv").config();

// import inquirer module
const inquirer = require('inquirer');

// import axios module
const axios = require('axios');

// import spotify api
const Spotify = require('node-spotify-api');

// import moment module
const moment = require('moment');

// reads the sportify api keys from keys.js
const keys = require('./keys');

console.log(keys.spotify)
var spotify = new Spotify(keys.spotify)


inquirer.prompt([/* Pass your questions in here */
    
    {
        type: 'list',
        name: 'command',
        message: 'What would you like to do?',
        choices: ['concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says']
    },
    {
        type: 'input',
        name: 'search',
        message:'What would you like to search for?'
    }
    

]) 
.then(function(answers) {
    // console.log('It worked!')
    if (answers.command === 'spotify-this-song') {
        if (answers.search === '') {
            spotify
                .search({ type: 'track', query: 'The Sign Ace of Base' })
                .then(function(response) {
                    
                    let base = response.tracks.items[0]
                    let artist = base.album.artists[0].name
                    let album = base.album.name
                    let date = base.album.release_date
                    let name = base.name
                    let url = base.external_urls.spotify
                    let spacer = '\n*------------------------------------------------------------------*'

                    console.log(`${spacer}\n\n  Song: ${name}\n\n  Artist: ${artist}\n\n  Album: ${album}\n\n  Release Date: ${date}\n\n  Spotify URL: ${url}\n\n${spacer}`)
                
            })
            .catch(function(err) {
                console.log(err);
            });
        }
        else {
            spotify
                .search({ type: 'track', query: answers.search })
                .then(function(response) {
                    for (var i = 0; i < 5; i++) {
                        let base = response.tracks.items[i]
                        let artist = base.album.artists[0].name
                        let album = base.album.name
                        let date = base.album.release_date
                        let name = base.name
                        let url = base.external_urls.spotify
                        let spacer = '\n*------------------------------------------------------------------*'

                        console.log(`${spacer}\n\n  Song: ${name}\n\n  Artist: ${artist}\n\n  Album: ${album}\n\n  Release Date: ${date}\n\n  Spotify URL: ${url}\n\n${spacer}`)
                    }
            })
            .catch(function(err) {
                console.log(err);
            });
        }
    }
});