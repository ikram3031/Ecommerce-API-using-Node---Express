require('dotenv').config();
require('express-async-errors')
//express
const express = require('express')
const app = express()

//rest packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

//database
const connectDB = require('./db/connect')

// Routers
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const orderRouter = require('./routes/orderRoutes')

//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//morgan middleware
app.use(morgan('tiny'))

//express middleware
app.use(express.json());

//cookie parser
app.use(cookieParser(process.env.JWT_SECRET));

//static assets
app.use(express.static('./public'))
//file upload
app.use(fileUpload())

//home route
app.get('/', (req,res) => {
    res.send('<h1>E_COMMERCE API</h1>')
})

app.get('/api/v1', (req,res) => {
    console.log(req.signedCookies);
    res.send("test")
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/reviews', reviewRouter)
app.use('/api/v1/orders', orderRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

//port
const port = process.env.PORT || 5000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch(error){
        console.log(error);
    }
};

start();


