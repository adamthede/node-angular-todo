// Load the Todo model
var Todo = require('./models/todo');

// expose the routes to our app with module.exports

module.exports = function(app){
	// ROUTES - API
	// GET all todos
	app.get('/api/todos', function(req, res){
		// use mongoose to get all todos in the database
		Todo.find(function(err, todos){
			// if there is an error retrieving, send the error. Nothing after res.send(err) will execute
			if(err) {
				res.send(err);
			}

			res.json(todos); // return all todos in JSON format
		});
	});

	// CREATE todo and send back all todos after creation
	app.post('/api/todos', function(req, res){
		// create a todo, information comes from AJAX request from angular
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo){
			if(err){
				res.send(err);
			}

			Todo.find(function(err, todos){
				if(err){
					res.send(err);
				}

				res.json(todos);
			});
		});
	});

	// GET single todo
	app.get('/api/todos/:todo_id', function(req, res){
		Todo.find({
			_id : req.params.todo_id
		}, function(err, todo){
			if(err){
				res.send(err);
			}

			res.json(todo);
		});
	});

	// DELETE a todo
	app.delete('/api/todos/:todo_id', function(req, res){
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo){
			if(err){
				res.send(err);
			}

			// get and return all the todos after you delete the todo
			Todo.find(function(err, todos){
				if(err){
					res.send(err);
				}

				res.json(todos);
			});
		});
	});

	// ROUTES - APPLICATION
	app.get('*', function(req, res){
		res.sendfile('./public/index.html'); // load the single view file (angular will handle page changes on front end)
	});
};
