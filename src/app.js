const express=require('express')
require('./db/conn')
const User=require('./models/usermsg')
const path=require('path')
const hbs=require('hbs')
const app=express()
const port=8000

//static path setting
const staticpath=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')

//middleware
app.use('/css',express.static(path.join(__dirname,'../node_modules/bootstrap/dist/css')))
app.use('/js',express.static(path.join(__dirname,'../node_modules/bootstrap/dist/js')))
app.use('/jq',express.static(path.join(__dirname,'../node_modules/jquery/dist')))
app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath))

//setting view engine
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/contact',(req,res)=>{
    res.render('contact')
})
app.post('/contact',async(req,res)=>{
    try{
        // res.send(req.body)
        const userData=new User(req.body)
        await userData.save()
        res.status(201).render('index')
    }
    catch(e){
        res.status(500).send(e)
    }
})

app.listen(port,()=>{
    console.log(`Listening to the port ${port}`)
})