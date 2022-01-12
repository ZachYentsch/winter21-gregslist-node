import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const HouseSchema = new Schema(
    {
        sqft: { type: Number, required: true },
        rooms: { type: Number, required: true },
        baths: { type: Number, required: true },
        description: { type: String, required: true },
        imgUrl: { type: String, required: true, default: 'https://placehold.it/200x200' },
        creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true }
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

HouseSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Profile',
    justOne: true
})