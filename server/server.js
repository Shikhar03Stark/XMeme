const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//port number based on .env or 8081
const port = process.env.PORT ?? 8081;

//initial express app
const app = express();

//DB instance
const dbHandle = require('./database/dbHandle');

dbHandle.once('open', () => {
    console.log('Local DB Connected');
})

//Setup Middlewares
//static files
app.use('/static', express.static('public'));
//setup CORS
app.use(cors());
//bodyparser
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//debug home url
app.get('/', (req, res) => {
    const json = {
        success: true,
        //flash message
        flash : {
            type : 'success',
            message : 'Server Ready to Serve',
        }
    }

    res.status(200).json(json);
});

//Routes
// /memes/*
app.use('/memes', require('./routes/memes'));
// /query/*
app.use('/query', require('./routes/query'));


//404 page middleware exit
app.use((req, res) => {
    const json = {
        success: false,
        error : 'API endpoint Not found',
        //no flash message required
    }

    return res.status(404).json(json);
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

