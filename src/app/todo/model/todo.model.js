import mongoose from 'mongoose'
var Schema = mongoose.Schema

var todoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true,
});

var Todo = mongoose.model('Todo', todoSchema)

export default Todo