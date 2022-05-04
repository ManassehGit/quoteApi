const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.send({quote: randomQuote})
})

app.get('/api/quotes/:person?', (req, res, next) => {
    const person = req.query.person;
    let personQuotes = [];
    if(person){
        personQuotes = quotes.filter(quote => quote.person === person);
        if(personQuotes){
            res.send({quotes: personQuotes})
        }else{
            res.send({quotes: []})
        }
    }else{
        res.send({quotes: quotes})
    }
    
})

app.post('/api/quotes', (req, res, next) => {
    const person = req.query.person;
    const quote = req.query.quote;
    const quoteData = {person: person, quote: quote};

    if(person && quote){
        quotes.push(quoteData)
        res.send({quote: quoteData});
    }else{
        res.status(400).send();
    }
})

app.listen(PORT, () => {
    console.log('Listening for requests...')
})
