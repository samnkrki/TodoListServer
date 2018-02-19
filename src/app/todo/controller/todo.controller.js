import Todo from './../model/todo.model'

function create(req, res, next) {
    var newTodo = new Todo()
    newTodo.createdBy = req.user._id
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
    let Query = {isDeleted:false, createdBy:req.user._id}
    Todo.find(Query)
        .sort({ createdAt: 1 })
        .populate('createdBy')
        .then(result => {
            res.json(result)
            console.log(result)
        })
        .catch(e => next(e))
}

function updateState(req, res, next) {
    Todo.findById(req.params.id)
        .then(result => {
            result.set({
                isDisabled: true
            })
            return result.save()
        })
        .then(result => {
            res.json(result)
        })
        .catch(e => res.json(e))
}

function remove(req, res, next) {
    Todo.findById(req.params.id)
        .then(result => {
            result.set({ isDeleted: true })
            return result.save()
        })
        .then(result=>res.json(result))
        .catch(e => console.log(e))
}

export default {
    create,
    listAll,
    updateState,
    remove
}