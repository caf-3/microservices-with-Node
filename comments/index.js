const express = require("express");
const app = express();
const cors = require('cors');
const { randomBytes} = require('crypto');

app.use(cors());
app.use(express.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
})

app.post('/posts/:id/comments', (req, res) => {
    const { content } = req.body;
    if(!content) return res.status(401).json({message: "Comment content is empty"});

    const commentId = randomBytes(4).toString('hex');
    const postId = req.params.id;
    const comments = commentsByPostId[postId] || [];

    comments.push({id: commentId, content: content })  
    commentsByPostId[postId] = comments;

    res.status(201).json(comments);
})

app.listen(4001, () => console.log("App listening on port 4001"));