const express = require("express");
const app = express();
const cors = require('cors');
const axios = require('axios');
const { randomBytes} = require('crypto');

app.use(cors());
app.use(express.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
})

app.post('/posts/:id/comments', async (req, res) => {
    const { content } = req.body;
    if(!content) return res.status(401).json({message: "Comment content is empty"});

    const commentId = randomBytes(4).toString('hex');
    const postId = req.params.id;
    const comments = commentsByPostId[postId] || [];

    comments.push({id: commentId, content: content })  
    commentsByPostId[postId] = comments;
    await axios.post('http://localhost:4005/events',{
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId
        }
    })
    res.status(201).json(comments);
})

app.post('/events', (req, res) => {
    console.log('Event received:', req.body.type);
    res.send({})
})

app.listen(4001, () => console.log("Comments service listening on port 4001"));