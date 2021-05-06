const express = require('express');
const app = express();
const users = require('./users.json')
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

app.get('/users', (req, res) => {
    return res.json({ users })

})

app.post('/users', (req, res) => {
   console.log(req.body.newUser)
    users.push(req.body.newUser);
    let stringedData = JSON.stringify(users, null, 2);
    fs.writeFile('users.json', stringedData, function (err) {
        if (err) {
          return res.status(500).json({ message: err })
      }
    })
    

    return res.status(200).json({ message:"new user created" })
})

app.get('/users/:id', (req, res) => {
    
    let id = req.params.id;
   let foundUser = users.find(user => {
      return String(user.id) === id
    })    
    if (foundUser) {
       return res.status(200).json({user: foundUser})
    } else {
        return res.status(404).json({message:"user not found"})
   }
    
})


app.listen(3000, function () {
    console.log('server is up and running')
})