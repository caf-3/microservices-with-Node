const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post('/events', (req, res) => {
    try{
        const event = req.body;
        axios.post('http://localhost:4000/events', event);        
        axios.post('http://localhost:4001/events', event);        
        axios.post('http://localhost:4002/events', event);        
    }catch(error){
        console.log("An error occured",error)
    }
});

app.listen(4005, () => console.log('Server listening on port 4005'));