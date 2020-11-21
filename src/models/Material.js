const mongoose = require('mongoose')
const { Schema } = mongoose;


const Material = new Schema({
    title: String,
    code: String,
    duration: String,
    material_type: String,
    content_type: String,
    cost_center: String,
    gener: String,
    canal: String,
    lock: {
        default: false,
        type: Boolean,
    }
});

module.exports = mongoose.model('Material', Material);