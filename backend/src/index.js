// let's go!
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');

//make env accessible
require('dotenv').config({path:'variables.env'});
//require('./createServer'):require a file,require('createServer'):require a package
const createServer=require('./createServer');
const db=require('./db');
const server=createServer();
//TODO Use express middleware to handle cookies(JWT)
server.express.use(cookieParser());
//decode the JWT so we can get the user Id on each request
server.express.use((req,res,next)=>{
    //sign up 之后就会得到这个token
    const {token}=req.cookies;
    if(token){
        const {userId}=jwt.verify(token,process.env.APP_SECRET);
        //put the userId onto the req for future requests to access
        req.userId=userId;
    }
    next();
});
//TODO Use express middleware to populate current user
server.express.use(
    async (req,res,next)=>{
        if(!req.userId) return next();
        const user= await db.query.user({
            where:{id:req.userId},

        },'{id,email,name,permissions}');
        req.user=user;
        next();
    }
);
//start it
server.start(
    {
        cors: {
            credentials: true,//require credential
            origin: process.env.FRONTEND_URL//only port 7777 is allowed to connect to the backend
        },
    },
    deets=>{
        console.log(`Server is now running on http://localhost:${deets.port}`);
    }
);