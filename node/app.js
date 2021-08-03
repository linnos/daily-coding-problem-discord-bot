const express = require('express');

const app = express();

app.get('/', function(req, res){
    res.send('Hello World');
});

// app.get('/wherearewegoing', function(req, res){
//     res.send('To The Mines!');
// });

app.listen(3000, function(){
    console.log("Server started on port 3000...");
})