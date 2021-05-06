const express = require('express');
const app = express();
const posts = require('./posts.json')
const fs = require('fs');
const { rawListeners } = require('process');

app.use(express.json());
app.use(express.urlencoded());

app.get('/', function (req, res) {
    res.send('hello world');
})

app.get('/books', function (req, res) {
    res.send('there are 4 books in store');
});

app.post('/', function (req, res) {
    res.send('this is a post request')
});

app.get('/posts', (req, res) => {
    return res.json({ posts })

})

app.post('/posts', (req, res) => {
   console.log(req.body.newPosts)
    posts.push(req.body.newPosts);
    let stringedData = JSON.stringify(posts, null, 2);
    fs.writeFile('posts.json', stringedData, function (err) {
        if (err) {
          return res.status(500).json({ message: err })
      }
    })
    

    return res.status(200).json({ message:"new user created" })
})

app.get('/posts/:id', (req, res) => {
    
    let id = req.params.id;
   let foundUser = posts.find(posts => {
      return String(post.id) === id
   })
    
    posts.push(req.body.newPost);
    
    if (foundUser) {
       return res.status(200).json({posts: foundUser})
    } else {
        return res.status(404).json({message:"user not found"})
   }
    
})


app.listen(3000, function () {
    console.log('server is up and running')
})