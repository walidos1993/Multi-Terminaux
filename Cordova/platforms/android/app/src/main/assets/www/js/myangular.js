    var myApp = angular.module('myApp',['ngRoute','angularPagination']);
    var page=1;
    var num=1;


/******************************************************
*
*      Routage
*
*********************************************************/


myApp.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'main.html'
  })
  .when('/search/:search?/:page', {
    templateUrl: 'resultats.html',
    controller:'data'
  })
  .when('/product/:code', {
    templateUrl: 'produit.html',
    controller:'product'
  })
  .otherwise({
    redirectTo: '/'
  });
});
/******************************************************
*
*      Résultats de la recherche utilisation de l'api
*
*********************************************************/


myApp.controller('data', function($scope, $http,sharedProperties,$timeout, $routeParams) {
  $scope.search = $routeParams.search;
  $scope.page=$routeParams.page;
  

    url="https://world.openfoodfacts.org/cgi/search.pl?search_terms="+$scope.search+"&action=process&page="+$scope.page+"&search_simple=1&json=1";

  
  $http.get(url).then(function(response) {
    // First function handles success
    data=response.data;
    $scope.data = data;
    $scope.num=data.count;
   
  }, function(response) {
    // Second function handles error
    $scope.data = "Something went wrong";
  });
  $timeout( function(){
            sharedProperties.setProperty($scope.num);
        }, 3000 );
 
});

/******************************************************
*
*  Résultats de la recherche à l'aide du Code barre utilisation de l'api
*
*********************************************************/
  



myApp.controller('product', function($scope, $http,$routeParams) {
   $scope.code = $routeParams.code;

  console.log($scope.code);
  
  var url=" https://fr.openfoodfacts.org/api/v0/produit/"+$scope.code+".json"

    
  $http.get(url).then(function(response) {
    // First function handles success
    $scope.product=response.data;
     
  }, function(response) {
    // Second function handles error
    $scope.product = "Something went wrong";
  });
 
  
});

/******************************************************
*
*      Pagination du résultat
*
*********************************************************/


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

/******************************************************
*
*    Partage du variable entre controlleurs
*
*********************************************************/

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

