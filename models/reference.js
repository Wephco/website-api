const mongoose = require('mongoose')

const referenceSchema = mongoose.Schema({
    reference: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    notes: {
        type: String,
        required: true,
    },
})

referenceSchema.virtual('id').get(() => {
    return this._id.toHexString()
})

referenceSchema.set('toJSON', {
    virtuals: true,
})

exports.Reference = mongoose.model('Reference', referenceSchema)
exports.referenceSchema = referenceSchema
