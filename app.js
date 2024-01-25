const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

const url = 'https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap';

app.get('/', async (req , res ) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const musicians= [];

        $('#mw-page a').each((index , element) => {
            const musiciansUrl = $(element).attr('href');
            musicians.push({url: musiciansUrl});
        });
        for( const musicians of musicians) {
            const musicianResponse = await axios.get('https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap')
            const musician$ = cheerio.load(musicianResponse.data);
            
            musician.title = musician$('h1').text();
            musician.images = [];
            musician$('img').each((index , element) => {
                musician.images.push($(element).attr('src'));
            });

            musician.text = [];
            musician$('p').each((index , element) => {
                musician.texts.push($(element).text());
            });
        }
        console.log(musicians);

        res.send(musicians);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
    }
});



app.listen(3000 ,() =>{
    console.log('Express esta escuchando en el servidor http//localhost3000')
});
