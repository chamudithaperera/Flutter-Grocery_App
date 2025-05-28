const { category } = require("../models/category.model");

async function createCategory(params, callback) {
    if(!params.categoryName) {
        return callback({
            message: "Category name is required"
        },
        "");
    }
    const category = new category(params);
    category.save().then((response) => {
        return callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    });
}

async function getCategories(params, callback) {
    const categoryName = params.categoryName;
    var condition = categoryName ? {
        categoryName: { $regex: new RegExp(categoryName), $options: "i" }}
         : {};
         let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
         let page = (Math.abs(params.page) || 1) - 1;
    }