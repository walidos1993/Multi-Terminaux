    var myApp = angular.module('myApp',['ngRoute']);
myApp.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'main.html'
  })
  .when('/search/:search?', {
    templateUrl: 'resultats.html',
    controller:'search'
  })
  .when('/product', {
    templateUrl: 'produit.html'
  })
  .otherwise({
    redirectTo: '/'
  });
});

myApp.controller('search', ['$scope','$routeParams',
    function($scope, $routeParams){
        $scope.search = $routeParams.search;
    }
]);