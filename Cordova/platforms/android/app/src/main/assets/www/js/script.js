var resultat="";
/******************************************************
*
*      Récuperation du code à l'aide plugin barcodeScanner
*
*********************************************************/
        function Scan(){
          
               cordova.plugins.barcodeScanner.scan(
      function (result) {
        resultat=result.text;
        document.location.href="#!product/"+resultat+"";
        /*  alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);*/
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Place a barcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417,EAN", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
      }
   );

        }
        var myApp = angular.module('myApp');
             
  myApp.controller('search', ['$scope',
    function($scope){
        $scope.code =resultat;

        if($scope.code!=undefined){$scope.search="";}
        

    }
]);