let express=require('express')
let env=require('dotenv');
let connectMongo=require('./db');
let cors = require('cors')
let app=express();
env.config();
const port=5000;

app.use(cors())
app.use(express.json())
//Endpoints
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port,()=>{
    console.log(`Listening on http://127.0.0.1:${port}`)
})

//connecting mongoose
connectMongo();