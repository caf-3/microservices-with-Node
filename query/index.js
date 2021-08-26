const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

app.get('/posts', (req, res) => {

})
app.post('/events', (req, res) => {
    
})

app.listen(4002, () => console.log('Query-service running on port 4002'));