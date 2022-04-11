import express from 'express'
import jwt from 'jsonwebtoken'
const app = express()

//get request
app.get('/', (req, res)=>{
    res.send({
        message: 'Authentication application'
    })
})

//post request 

app.post('/api/login', (req,res) =>{
    //Moke user

    const user ={
        username: 'karim',
        email: 'sherkarim868@gmail.com'
    }
    jwt.sign({user: user}, 'secretkey', {expiresIn: '30s'}, (err, token)=>{
    res.json({token})
    })
})

//Acess token 
//Authorization: Bearer <acces token>

//verify Tloen

const verifyToken = ((req, res, next)=>{
    
    //Get Auth header value

    const bearerHeader = req.headers['authorization'];

    //check if bearer is undefined
    if(typeof bearerHeader != 'undefined'){
        
        //split at the space
        const bearer = bearerHeader.split(' ');

        //Get the token form array
        const bearerToken = bearer[1];

        //set the token 
        req.token = bearerToken;

        //Next middleware
        next()
    }else{
        //Foribidden
        res.sendStatus(403)
    }
})

//Post to Validate the API with jwt token 
app.post('/api/validate', verifyToken,(req, res)=>{
    jwt.verify(req.token, 'secretkey', (err,authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
            res.json({
                message: 'Validated', authData
            })
        }
    })
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on port http://localhost:${PORT}`));

