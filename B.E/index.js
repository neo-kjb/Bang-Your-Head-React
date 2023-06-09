const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')

const app=express()
const PORT=process.env.PORT|| 3005

const connectToDB = require('./config/db-connect')
connectToDB()

const userRoutes=require('./routes/users')
const concertsRoutes=require('./routes/concerts')
const reviewRoutes=require('./routes/reviews')



app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(userRoutes)
app.use('/concerts',concertsRoutes)
app.use(reviewRoutes)

app.use((error,req,res,next)=>{
    const status=error.status||500
    const message=error.message||'Something Went Wrong!'
    const data=error.data
    res.status(status).json({message,data})
}
)
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))