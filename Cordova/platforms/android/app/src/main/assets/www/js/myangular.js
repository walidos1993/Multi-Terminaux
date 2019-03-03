    var myApp = angular.module('myApp',['ngRoute','angularPagination']);
    var page=1;
    var num=1;
    var n=0;
myApp.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'main.html'
  })
  .when('/search/:search?/:page?', {
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
   url="https://world.openfoodfacts.org/cgi/search.pl?";

  if($scope.search!=undefined){
    url+="search_terms="+$scope.search+"&";

  }

     if($scope.code!=undefined){
      url+="codes_tags="+$scope.code+"&";

    }
   url+="action=process&page="+$scope.page+"&search_simple=1&json=1";
   
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
            console.log($scope.data)
        }, 10000 );
 
  sharedProperties.setProperty($scope.num);
});

function callAtInterval(num) {
    console.log("Interval occurred");
     console.log(num);
}
myApp.controller('page', function($scope, Pagination,sharedProperties) {
        var pagination = $scope.pagination = Pagination.create({
            itemsPerPage: 20,
            itemsCount: sharedProperties.getProperty(),
            maxNumbers: 5
        });
         console.log(sharedProperties.getProperty());

        pagination.onChange = function(page) {
            console.info('page=', page);
        };
    });
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

