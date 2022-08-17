const Product = require('../models/Product')

const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const { checkPermissions } = require('../utils')


const createOrder = async (req,res) => {
    const { items: cartItems, tax, shippingFee } = req.body;

    if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError('No cart items provided');
    }

    if (!tax || !shippingFee) {
      throw new CustomError.BadRequestError(
        'Please provide tax and shipping fee'
      );
    }

    let orderItems = [];
    let subtotal = 0;

    //check if the product exists
    // hers it is in an async function,
    // thats why we will first take a loop and use await to call if statement
    for(const item of cartItems){
        const dbProduct = await Product.findOne({_id:item.product})
        if(!dbProduct){
            throw new CustomError.NotFoundError(
                `No product found with id: ${item.product}`
            )
        }

        const { name, price, image, _id } = dbProduct

        //lets set single product schema
        const singleOrderItem = {
            amount: item.amount,
            name, 
            price, 
            image, 
            product: _id
        } 

        // Add item to order
        orderItems = [...orderItems,singleOrderItem]

        //calculate subtotal
        subtotal += item.amount * price;
    }

    console.log(orderItems, subtotal)

    res.status(StatusCodes.CREATED).json({})
}

const getAllOrders = async (req,res) => {
    res.send('Get all Orders')
}

const getSingleOrder = async (req,res) => {
    res.send('Get single Order')
}

const getCurrentUserOrders = async (req,res) => {
    res.send('Get current User Orders')
}

const updateOrder = async (req,res) => {
    res.send('Update Order')
}

module.exports = {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder,
}