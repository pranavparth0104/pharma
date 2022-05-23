require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const orderRouter = require('./routes/orderRouter');
const app = express();

//db connect 
// console.log(process.env.MONGODB_URI );
mongoose.connect('mongodb+srv://pranav:pranav@meradb.usmt3.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(console.log("Database Connected"));

const PORT = process.env.PORT || 8080;

//use express middlewaree
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use serRouter
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);


//Paypal client ID from .env file. send back to front end
app.get('/api/config/paypal', (req, res) => {
    // console.log(process.env.PAYPAL_CLIENT_ID);
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});



//For heroku deployment - this block of codes will only run in production env
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join('../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//error handling middleware
app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
});

//server 
app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}. http://localhost:${PORT}`);
});