const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/events', async (req, res)=> {
    try {
        const { type, data} = req.body;
        if(type == 'CommentCreated'){
            let { status, content, id, postId} = data;
            status = content.includes('orange') ? 'rejected' : 'approved';
            await axios.post('http://localhost:4005/events', {
                type: 'CommentModerated',
                data: {
                    id: id,
                    content: content,
                    postId: postId,
                    status: status
                }
            })
        }
        res.send({});
        
    } catch (error) {
        console.log('Error:', error)
    }
});

app.listen(4003, ()=> {
    console.log('Moderation-service running on port', 4003);
})