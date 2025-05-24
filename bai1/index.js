const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors())

app.post('/sum', (req, res)=>{
    const{a, b} = req.body;

    if(typeof a != "number" || typeof b != "number"){
        return res.status(400).json({err: 'invalid'});
    }

    const result = a + b;
    res.json({result})
});

app.post('/subtrac', (req, res)=>{
    const{a, b} = req.body;

    if(typeof a != "number" || typeof b != "number"){
        return res.status(400).json({err: 'invalid'});
    }

    const result = a - b;
    res.json({result})
});

app.post('/multi', (req, res)=>{
    const{a, b} = req.body;

    if(typeof a != "number" || typeof b != "number"){
        return res.status(400).json({err: 'invalid'});
    }

    const result = a * b;
    res.json({result})
});

app.post('/divisi', (req, res)=>{
    const{a, b} = req.body;

    if(typeof a != "number" || typeof b != "number"){
        return res.status(400).json({err: 'invalid'});
    }

    if(b ==0){
        return res.status(400).json({err: 'khong the chia cho 0'});
    }

    const result = a / b;
    res.json({result})
});



app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
});
