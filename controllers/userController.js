const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')

const getAllUsers = async (req,res) => {
    console.log(req.user)
    // select(-password) removes password from the response
    const users = await User.find({role:'user'}).select('-password')
    res.status(StatusCodes.OK).json({ users })
}

const getSignleUser = async (req,res) => {
    const user = await User.findOne({_id:req.params.id}).select('-password')
    if(!user){
        throw new CustomError.NotFoundError(`No user with id ${req.params.id}`)
    }

    res.status(StatusCodes.OK).json({ user })
}

const showCurrentUser = async (req,res) => {
    res.send('Show current user route')
}

const updateUser = async (req,res) => {
    res.send('Update user route')
}

const updateUserPassword = async (req,res) => {
    res.send('Update user password route')
}

module.exports = {
    getAllUsers, getSignleUser, showCurrentUser, 
    updateUser, updateUserPassword
}