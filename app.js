require('dotenv').config();
const express = require('express');
var _ = require('underscore');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

var salaries = [{
    "name": "Abhishek",
    "salary": "145000",
    "currency": "USD",
    "department": "Engineering",
    "sub_department": "Platform"
    },
    {
    "name": "Anurag",
    "salary": "90000",
    "currency": "USD",
    "department": "Banking",
    "on_contract": "true",
    "sub_department": "Loan"
    },
    {
    "name": "Himani",
    "salary": "240000",
    "currency": "USD",
    "department": "Engineering",
    "sub_department": "Platform"
    },
    {
    "name": "Yatendra",
    "salary": "30",
    "currency": "USD",
    "department": "Operations",
    "sub_department": "CustomerOnboarding"
    },
    {
    "name": "Ragini",
    "salary": "30",
    "currency": "USD",
    "department": "Engineering",
    "sub_department": "Platform"
    },
    {
    "name": "Nikhil",
    "salary": "110000",
    "currency": "USD",
    "on_contract": "true",
    "department": "Engineering",
    "sub_department": "Platform"
    },
    {
    "name": "Guljit",
    "salary": "30",
    "currency": "USD",
    "department": "Administration",
    "sub_department": "Agriculture"
    },
    {
    "name": "Himanshu",
    "salary": "70000",
    "currency": "EUR",
    "department": "Operations",
    "sub_department": "CustomerOnboarding"
    },
    {
    "name": "Anupam",
    "salary": "200000000",
    "currency": "INR",
    "department": "Engineering",
    "sub_department": "Platform"
    }];

app.get('/salaries', (req, res) => {
  res.status(200).send(salaries)
});

const getSS = (isContract, department, subDepartment) => {    
    let list = isContract ? salaries.filter(elem => elem.on_contract) : salaries;
    if (department){
        list = list.filter(elem => (elem.department === department));
    }
    if (subDepartment){
        list = list.filter(elem => elem.sub_department === subDepartment);
    }                    
    let sum = list.reduce((a, b) => a + Number.parseFloat(b.salary), 0);
    const list1 = list.map((elem) => elem["salary"]);
    return {"mean" : (sum/list.length) || 0,
                        "min": Math.min(...list1),
                        "max": Math.max(...list1)};
}

app.get('/summary', (req, res) => {
    res.status(200).send(getSS(false,null, null));
  });

app.get('/departmentSummary', (req, res) => {
    let temp = _
        .chain(salaries)
        .groupBy('department')
        .map(function(value, key) {
            return { [key] : getSS(false, key, null) };
        })
        .value();
    
    res.status(200).send(temp);
});

app.get('/subdepartmentSummary', (req, res) => {
    let temp = _
        .chain(salaries)
        .groupBy('department')
        .map(function(value, key) {
            var subs = _
                        .chain(value)
                        .groupBy('sub_department')
                        .map(function(value, key) {
                              return {[key] : getSS(false, null, key)}
                            }).value();
            return { [key] : subs };
        })
        .value();
    
    res.status(200).send(temp);
});

app.get('/contractsSummary', (req, res) => {
    res.status(200).send(getSS(true,null, null));
});

app.post('/salaries', (req, res) => {
    const newRecord = req.body;
    if(!newRecord){
        res.status(418).send(
            {message : 'Invalid salary record!'}
        )
    }
    salaries.push(newRecord);
    res.status(201).send(salaries)
})

app.delete('/salaries/:name', authenticateToken, (req, res) => {
    salaries = salaries.filter(elem => elem.name != req.params.name);
    console.log(`${req.username} deleted the record.`);
    res.status(200).send({ message : 'record removed successfully'});
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(403);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.username = user.name;
        next();
    })
}

app.post('/login',(req, res) =>{
    const user = {name : req.body.username};
    const password = req.body.password;

    if(req.body.username === 'srikanth' && password === 'password')
    {
        const token = jwt.sign(user, process.env.TOKEN_SECRET);
        res.json({token:token});
    }
    
})


module.exports = app;