var app = angular.module('validationApp', ['ngMessages']);

app.controller('mainController', ['$scope', function($scope) {
    $scope.user = {};

    $scope.submitForm = function() {
        if ($scope.userForm.$valid) {
            alert('Form is valid!');
        } else {
            alert('Please fill out the form correctly.');
        }
    };
}]);
