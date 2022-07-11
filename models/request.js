const mongoose = require('mongoose')
const { RealEstateRequest } = require('./realEstateRequest')

const Requests = {
    RealEstate: RealEstateRequest,
}

const requestSchema = mongoose.Schema({
    requestType: {
        type: mongoose.Schema.Types.ObjectId,
        enum: Requests,
        required: true,
    },
    paid: {
        type: Boolean,
        default: false,
    },
})

requestSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

requestSchema.set('toJSON', {
    virtuals: true,
})

exports.Request = mongoose.model('Request', requestSchema)
exports.requestSchema = requestSchema
