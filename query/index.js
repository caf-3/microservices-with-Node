const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts)
})
app.post('/events', (req, res) => {
    const {type, data } = req.body;
    
    if(type == 'PostCreated'){
        const {id, title} = data;
        posts[id] = { id, title, comments: [] };
        console.log('PostCreated', posts[id]);
        res.send({})
    }

    if(type == 'CommentCreated'){
        const {id, content, postId} = data;

        const post = posts[postId];

        post.comments.push({id, content});
        console.log('CommentCreated', post);
        res.send({})
    }
    
})

app.listen(4002, () => console.log('Query-service running on port 4002'));