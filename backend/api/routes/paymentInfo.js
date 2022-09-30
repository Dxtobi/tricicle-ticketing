const paymentInfo=require('../../models/paymentInfo')
const sendMail = require('../sendMail')

module.exports = function (router) {

    router.post('/newPaymentInfo', function (req, res) {
        console.log(req.body)
        const html = `<!DOCTYPE html>
            <html lang="en">
            
            <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="style.css" />
            <title>Browser</title>
            </head>
            
            <body>
            <h1>
                POLYCONSULT TICKETING 
            </h1>
            <p>
                YOU JUST PURCASED A TICKET WIT H THE FOLLOWING DETAILS
            </p>
            <div style='background:lightgray; padding:20px; width:70%; margin:auto;margin-top:30px; border-radius:10px'>
                <div style='border-bottom:1px solid black; display:flex; justify-content:space-between; width:60%; margin:auto; margin-top:20px'>
                    <div >NAME</div>-------<div>${req.body.name}</div>
                </div>
                <div style='border-bottom:1px solid black; display:flex; justify-content:space-between; width:60%; margin:auto; margin-top:20px'>
                    <div >TRANSFER ID</div>-------<div>${req.body.tid}</div>
                </div>
                <div style='border-bottom:1px solid black; display:flex; justify-content:space-between; width:60%; margin:auto; margin-top:20px'>
                    <div >FROM</div>-------<div>${req.body.from}</div>
                </div>
                <div style='border-bottom:1px solid black; display:flex; justify-content:space-between; width:60%; margin:auto; margin-top:20px'>
                    <div >TO</div>-------<div>${req.body.to}</div>
                </div>
                <div style='border-bottom:1px solid black; display:flex; justify-content:space-between; width:60%; margin:auto; margin-top:20px'>
                    <div >DATE</div>-------<div>${req.body.date}</div>
                </div>
                <div style='border-bottom:1px solid black; display:flex; justify-content:space-between; width:60%; margin:auto; margin-top:20px'>
                    <div >PAID</div>-------<div>NGN${req.body.paid}</div>
                </div>
                <div style='border-bottom:1px solid black; display:flex; justify-content:space-between; width:60%; margin:auto; margin-top:20px'>
                    <div >EMAIL</div>-------<div>${req.body.email}</div>
                </div>
            </div>
            <script src="script.js"></script>
            </body>
            
            </html>`
        const data = {to:req.body.email, text:html, subject:'FEDERAL E-TICKET'}
        //'akanbitobijoseph@gmail.com'
            sendMail(data)
        let note=new paymentInfo(req.body)
        note.save((err)=>{
            if(err){
                return(res.status(400).json(err))
            }
            res.status(200).json(note)
        })
    })

    router.get('/allpayment/:email',function(req,res){
        paymentInfo.find({email:req.params.email},(err,user)=>{
            if(err){
                res.json({status:false,message:err})
            }
            else{
                if(user){
                    res.json(user)
                }else{
                    res.send("Customer does not exist")
                }
            }
        })
    })

    router.get('/get-value/:value',function(req,res){
        paymentInfo.findOne({tid:req.params.value},(err,user)=>{
            if(err){
                res.json({status:false,message:err})
            }
            else{
                if(user){
                    res.json(user)
                }else{
                    res.send("Customer does not exist")
                }
            }
        })
    })

    router.post('/confirm-ticket/:value',function(req,res){
        console.log(req.params)
        paymentInfo.findOne({tid:req.params.value},(err,user)=>{
            if(err){
                res.json({status:false, message:err})
            }
            else{
                if (user) {
                    user.used = true
                    user.save()
                    res.json(user)
                }else{
                    res.send("no ticket found")
                }
            }
        })
    })
}