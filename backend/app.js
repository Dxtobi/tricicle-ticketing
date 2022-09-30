const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const app=express()
const mongoose=require('mongoose')
const port=process.env.PORT || 8081
const morgan=require('morgan')
const api=require('./api') 
const path = require('path');

const root = require('path').join(__dirname, '../frontend', 'build')
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(root));
//app.use(morgan('dev'))

app.use(function(req,res){
    const err=new Error("not found")
    err.status=404
    res.json(err)
})

const monogUrl='mongodb://localhost:27017/BusBookingCollection'
mongoose.connect(monogUrl,{useNewUrlParser:true})



if(process.env.NODE_ENV === 'production'){
    //set static folder
   // app.use(express.static(path.join(__dirname, "client/build")));
  
  app.use(express.static(root));
  
  console.log('😸', path.join(__dirname, "../frontend/build"), '😸')
}
  
app.get("*", (req, res) => {
 
    if (!req.path.includes('api')) {
      console.log('says', '😸 hit  me harder 😸 😸 😸😸😸', root, req.path)
     // console.log(path.resolve(__dirname, 'client', 'build', 'index.html')+root, root+req.path)
      res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
    } else {
      console.log('this is the error 😸 //hahahah 😸 /hahahah😸')
        }
  })

  app.use('/api',api)
const db=mongoose.connection




db.on('error',console.error.bind(console,"connection error:"));
db.once('open',function(){
    console.log("   Successfuly Connected  to MONGODB")
    app.listen(port,()=>{
        console.log(`Server is now active on ${port}`)
    })
})


