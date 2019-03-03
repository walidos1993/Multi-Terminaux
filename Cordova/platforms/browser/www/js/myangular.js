    var myApp = angular.module('myApp',['ngRoute','angularPagination']);
    var page=1;
    var num=1;
myApp.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'main.html'
  })
  .when('/search/:search?/:page', {
    templateUrl: 'resultats.html',
    controller:'searchword'
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
        $scope.page=$routeParams.page;
        if($scope.search!=undefined){$scope.code="";}
    }
]);
myApp.controller('data', function($scope, $http,sharedProperties,$timeout) {
  
  var url="";
  //3017620425035

  if($scope.search!=undefined){
    url="https://world.openfoodfacts.org/cgi/search.pl?search_terms="+$scope.search+"&action=process&page="+$scope.page+"&search_simple=1&json=1";

  }
//3179730256227
     else if($scope.code!=undefined){
      url=" https://fr.openfoodfacts.org/api/v0/produit/"+$scope.code+".json"
    }
   console.log(url);
  $http.get(url).then(function(response) {
    // First function handles success
    data=response.data;
     if($scope.code!=undefined){
      $scope.data = data.product;
     }
      else{
        $scope.data = data.products;
      }
    $scope.num=data.count;
    console.log(data);
  }, function(response) {
    // Second function handles error
    $scope.data = "Something went wrong";
  });
  $timeout( function(){
            sharedProperties.setProperty($scope.num);
        }, 3000 );
 
  
});

myApp.controller('page', function($scope, Pagination,sharedProperties,$timeout) {

  $timeout( function(){
       

        var pagination = $scope.pagination = Pagination.create({
            itemsPerPage: 20,
            itemsCount: sharedProperties.getProperty(),
            maxNumbers: 10
        });
       


        pagination.onChange = function(page) {
            console.info('page=', page);
        };

        pagination.setCurrent(1);


         }, 4000 );
    }



    );
myApp.service('sharedProperties', function () {
        var property=0;

        return {
            getProperty: function () {
                return property;
            },
            setProperty: function(value) {
                property = value;
            }
        };
    });

