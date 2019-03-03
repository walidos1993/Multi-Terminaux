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

myApp.controller('searchword', ['$scope','$routeParams',
    function($scope, $routeParams){
        $scope.search = $routeParams.search;
        if($scope.search!=undefined){$scope.code="";}
    }
]);
myApp.controller('data', function($scope, $http) {
  var url="";
  //3017620425035
  console.log(url);
  if($scope.search!=undefined){
    url="https://world.openfoodfacts.org/cgi/search.pl?search_terms="+$scope.search+"&search_simple=1&json=1";

  console.log(url);
  }

    else if($scope.code!=undefined){
      url="https://world.openfoodfacts.org/cgi/search.pl?codes_tags="+$scope.code+"&action=process&search_simple=1&json=1";

  console.log(url);
    }
    else{
      url="https://world.openfoodfacts.org/cgi/search.pl?&search_simple=1&json=1";
    }

  $http.get(url)
  .then(function(response) {
    // First function handles success
   
    data=response.data;
    console.log(  data);

    $scope.data = data;
  }, function(response) {
    // Second function handles error
    $scope.data = "Something went wrong";
  });
});