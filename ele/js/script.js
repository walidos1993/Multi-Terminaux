var resultat="";
var Dialogs = require('dialogs')


/******************************************************
*
*      Récuperation du code à l'aide plugin barcodeScanner
*
*********************************************************/
        function Scan(){
        	const smalltalk = require('smalltalk');
 
        	smalltalk
    .prompt('Question', 'How old are you?', '10')
    .then((value) => {
        console.log(value);
    })
    .catch(() => {
        console.log('cancel');
    });
/*
 		dialogs.prompt('resultat', function(ok) {
        console.log('"Code Barre à insérer:', ok)
      })
        document.location.href="#!product/"+resultat+"";
*/
        }
        var myApp = angular.module('myApp');
             
  myApp.controller('search', ['$scope',
    function($scope){
        $scope.code =resultat;

        if($scope.code!=undefined){$scope.search="";}
        

    }
]);