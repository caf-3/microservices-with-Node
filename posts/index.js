const express = require("express");
const app = express();
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

app.use(express.json());
app.use(cors())
//posts
const posts = {};

app.get('/posts', (req, res) => {
    return res.send(posts)
});

//route to create post
app.post('/posts', async (req, res) => {
    try{
        const id = randomBytes(4).toString('hex');
        const { title } = req.body; 
        
        posts[id] = {
            id: id,
            title: title
        }
        await axios.post('http://localhost:4005/events', {
            type: 'PostCreated',
            data: {
                id,
                title
            }
        })
        return res.status(201).json({
            post: posts[id]
        })
    }catch(error){
        console.log('error', error)
    }
})

app.post('/events', (req, res) => {
    console.log('Event received:', req.body.type);
    res.send({})
})
app.listen(4000, () => console.log('Posts service running on port 4000'))