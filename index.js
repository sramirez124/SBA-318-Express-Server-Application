require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const users = require('./data/users');
const posts = require('./data/posts');

// Body Parser IMPORTANT
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// GET
app.get('/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (user) res.json(user);
    res.send(user);
});

app.get("/posts/:id", (req, res) => {
    const post = posts.find(post => post.id === parseInt(req.params.id));
    if (post) res.json(post);
    res.send(post);
});


// POST
app.post('/api/users', (req, res) => {
    if (req.body.name && req.body.role && req.body.username && req.body.password && req.body.email) {
        const foundUser = users.find(user => user.username === req.body.username);
        const foundName = users.find(user => user.name === req.body.name);
        if (foundUser && foundName) {
            res.json({ error: 'User already exists' });
            return
        }
        const user = {
            id: users[users.length - 1].id + 1,
            name: req.body.name,
            role: req.body.role,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        };
        users.push(user);
        res.json(user);
    } else {
        throw "Missing required fields"
    }
})

app.use((err, req, res, next) => {
    console.log(res.statusCode, err);
    res.status(404).json({ error: err })
})

app.listen(PORT, () => {
    console.log(`Matrix is running on port ${PORT}`);
});