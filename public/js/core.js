// public/core.js

var nodeAngularTodo = angular.module('nodeAngularTodo', []);

nodeAngularTodo.controller('MainCtrl', [
	'$scope',
	'$http',
	function($scope, $http){
		$scope.formData = {};

		// when landing on the page, get all todos and show them
		$http.get('/api/todos')
			.success(function(data) {
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});

		// show a single todo
		$scope.getTodo = function(id) {
			$http.get('/api/todos/' + id)
				.success(function(data) {
					$scope.todo = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		};

		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {
			$http.post('/api/todos', $scope.formData)
				.success(function(data) {
					$scope.formData = {}; // clear the form so our user is ready to enter another todo
					$scope.todos = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		};

		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$http.delete('/api/todos/' + id)
				.success(function(data) {
					$scope.todos = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		};

	}
]);
