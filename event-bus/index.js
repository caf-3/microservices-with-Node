const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());
const events = [];

app.get('/events', (req, res) => {
    res.send(events);
})
app.post('/events', async (req, res) => {
    try{
        const event = req.body;
        events.push(event)
        axios.post('http://localhost:4000/events', event);        
        axios.post('http://localhost:4001/events', event);        
        axios.post('http://localhost:4002/events', event);        
        axios.post('http://localhost:4003/events', event);        
    }catch(error){
        console.log("An error occured",error)
    }
});

app.listen(4005, () => console.log('Event-Bus listening on port 4005'));