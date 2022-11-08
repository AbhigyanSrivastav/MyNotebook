let express=require('express')
let app=express();
let env=require('dotenv');
let connectMongo=require('./db');
env.config();
const port=process.env.PORT;

app.use(express.json())
//Endpoints
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port,()=>{
    console.log(`Listening on http://127.0.0.1:${port}`)
})

//connecting mongoose
connectMongo();