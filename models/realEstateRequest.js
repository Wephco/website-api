const mongoose = require('mongoose')

const realEstateRequestSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    property: {
        type: String,
        required: true,
    },
    bedroom: {
        type: String,
        required: true,
    },
    budget: {
        type: String,
        required: true,
    },
})

realEstateRequestSchema.virtual('id').get(() => {
    return this._id.toHexString()
})

realEstateRequestSchema.set('toJSON', {
    virtuals: true,
})

exports.RealEstateRequest = mongoose.model(
    'RealEstateRequest',
    realEstateRequestSchema
)
exports.realEstateRequestSchema = realEstateRequestSchema
