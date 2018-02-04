import mongoose from 'mongoose'

var todoSchema = mongoose.Schema({
    name: { type: String, required: true },
    description:{type:String}
})

var Todo = mongoose.model('Todo', todoSchema)

export default Todo