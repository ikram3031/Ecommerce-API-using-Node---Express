
const createProduct = async (req, res) => {
    res.send('Create Product')
}

const getAllProduct = async (req, res) => {
    res.send('Get all Product')
}

const getSingleProduct = async (req, res) => {
    res.send('Get single Product')
}

const updateProduct = async (req, res) => {
    res.send('Update Product')
}

const deleteProduct = async (req, res) => {
    res.send('delete Product')
}

const uploadImage = async (req, res) => {
    res.send('upload Image')
}

module.exports = {
    createProduct, getAllProduct,
    getSingleProduct, updateProduct,
    deleteProduct, uploadImage
}