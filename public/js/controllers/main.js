angular.module('todoController', [])
	.controller('MainCtrl', function($scope, $http, Todos){
		$scope.formData = {};

		Todos.get()
			.success(function(data){
				$scope.todos = data;
			});

		$scope.createTodo = function(){
			if(!$.isEmptyObject($scope.formData)){
				Todos.create($scope.formData)
					.success(function(data){
						$scope.formData = {};
						$scope.todos = data;
					});
			}
		};

		$scope.getOneTodo = function(id){
			Todos.get(id)
				.success(function(data){
					$scope.todo = data;
				});
		};

		$scope.deleteTodo = function(id){
			Todos.delete(id)
				.success(function(data){
					$scope.todos = data;
				});
		};
	});
