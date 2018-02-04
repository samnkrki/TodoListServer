import Todo from './../model/todo.model'

function create(req, res, next) {
    var newTodo = new Todo()
    if (req.body.name) {
        newTodo.name = req.body.name
    }
    if (req.body.description) {
        newTodo.description = req.body.description
    }
    newTodo.save()
        .then(result => {
            res.json(result)
        })
        .catch(e => next(e))
}

function listAll(req, res, next) {
    Todo.find({})
        .then(result => {
            res.json(result)
            console.log(result)   
        })
        .catch(e => next(e))
}

export default {
    create,
    listAll
}