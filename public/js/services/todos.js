angular.module('todoService', [])
	.factory('Todos', function($http){
		return {
			// GET all todos
			get : function(){
				return $http.get('/api/todos');
			},
			// CREATE one todo
			create : function(todoData){
				return $http.post('/api/todos', todoData);
			},
			// GET one todo
			getOne : function(id){
				return $http.get('/api/todos' + id);
			},
			// DELETE one todo
			delete : function(id){
				return $http.delete('/api/todos' + id);
			}
		};
	});
