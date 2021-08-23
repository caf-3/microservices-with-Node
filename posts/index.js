const express = require("express");
const app = express();
const cors = require('cors');
const { randomBytes } = require('crypto');

app.use(express.json());
app.use(cors())
//posts
const posts = {};

app.get('/posts', (req, res) => {
    return res.send(posts)
});

//route to create post
app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    
    posts[id] = {
        id: id,
        title: title
    }

    return res.status(201).json({
        post: posts[id]
    })
})

app.listen(4000, () => console.log('Running on port 4000'))