// We use node codes require
const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
// path is native  node module 
const path       = require('path'); 

if(process.env.NODE_ENV!=='production')
//get env key 
require('dotenv').config();
const stripe =require('stripe')(process.env.STRIPE_SECRET_KEY);
const app =express();
const port = process.env.PORT || 5000;

// find body and convert to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// able to properly make request 
// cors make sure that we are from the same web server
app.use(cors());

if(process.env.NODE_ENV==='production'){
// if production we have to join our directory 
//with client build --production
app.use(express.static(path.join(__dirname,'client/build')));


//put the response in a format static files (html css js)
app.get('*', function(request,response){
    response.sendFile(path.join(__dirname,'client/build','index.html'))
});
}

//listen for errors
app.listen(port,error=>{
    if(error) throw error;
    console.log('server running on port '+port);
});

// stripe charge service funct  
// set /payment route as interface
app.post('/payment', (req,res)=> {
    const body = { 
        // id of token stripe
        source : req.body.token.id,
        // pass the total amount
        amount : req.body.amount,
        // set currnecy usd
        currency :'usd'
    };
    stripe.charges.create(body,(stripeErr, stripeRes)=>{
        if(stripeErr){
            res.status(500).send({error:stripeErr});
        }else {
            res.status(200).send({success:stripeRes});
        }
    })
})