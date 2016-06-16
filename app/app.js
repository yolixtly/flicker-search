var app = angular.module('imgApp', ['ngAnimate']);
  //helps configuring $http to make Cross-origin HTTP requests
  //this has been tested with and without it and it works fine without. leave it for now
app.config(function($httpProvider){
   $httpProvider.defaults.useXDomain = true;
});

app.controller('MemoriesCtrl',['$http', '$q', function($http, $q){

  var vm = this;

  //  variable to store the # of Photos found in the search.
  // It is initially set to null, because there is not initial number.
  vm.photosTotal = null;

  //error message is false, unless the Request gets an Error response
  vm.errorRequest = false; 

  //this is false, so Results Section will not be shown until form is valid
  vm.showResults = false; 
 
  vm.displayMemories = function(){
    if(vm.searchForm.$valid) {

      //Renders the results section, hides the search section
      vm.showResults = true;

      //Makes the REST API Request and brings with it all the goodies!
      getFlickerData();
    }
  };

  vm.refreshSearch = function() {
    vm.showResults = false;
    vm.searchTerm = '';
    vm.photos = '';
    vm.searchForm.$setPristine();
  };

//Accessing the Flicker API : 
   var getFlickerData = function(){
     var url = 'https://api.flickr.com/services/rest';
     var params = {
      method : 'flickr.photos.search',
      api_key : '500ecb12edc8c861d2e69492a08ed8f5',
      tags : vm.searchTerm,
      format : 'json',
      nojsoncallback : 1
    };

    vm.loadingMsg = true;

    $http({
        url: url,
        params: params,
        method: 'GET'
    }).then(function(response){
          console.log(response);
          vm.photosTotal = response.data.photos.total;
          vm.loadingMsg = false;
          vm.photos = response.data.photos.photo;
          
    },function(response){
         console.log('error retriving the getFlickerData');
         console.log(response);
         alert('Sorry, there was an error');
         vm.errorRequest = true;
    });
   };

   vm.validationBox = function(){
    console.log('hi');
      if(vm.searchTerm === ''){
        vm.showValidation = true;
      } else {
       vm.showValidation = false;
     }
   };  

   //Changing background color of Refresh button when the page is scrolled
    function scrollRefresh(){
        var scroll_start = 0;
        var startChange = $('#results');
        var offset = startChange.offset();
        console.log("this is for results: " + offset.top); //always 0
        $(document).scroll(function(){
            scroll_start = $(this).scrollTop();
            console.log(scroll_start); //adding up x4 units 
            if(scroll_start > offset.top) {
              $('.returnBtn').css({
                'background-color' : '#11caca',
                'color': '#fff'
              });
            }  else {
              $('.returnBtn').css({
                'background-color' : 'transparent',
                'color': '#11caca'
              });
              $('.returnBtn').hover(function(){
                $(this).toggleClass('.hoverRefresh');
              });
            }
        });
      }
      scrollRefresh();
}]);