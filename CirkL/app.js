var apartmentsApp = angular.module('apartmentsApp', ['ui.router']);

apartmentsApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/main');
    
    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: 'main.html',
            controller: 'mainController',
        })
        .state('main.home', {
            url: '/home',
            parent:'main',
            templateUrl: 'home.html',
            controller: 'homeController'
        })
        .state('main.events', {
            url: '/events',
            parent:'main',
            templateUrl: 'events.html' ,
            controller: 'eventsController'
        })
        .state('main.events.timeline', {
                url: '/timeline',
                parent:'main.events',
                templateUrl: 'timeline.html' ,
                controller: 'timelineController'
        });
});

apartmentsApp.controller('eventsController', function($scope,$state,$rootScope) {
    console.log("eventController");
});


apartmentsApp.controller('homeController', function($scope,$state,$rootScope) {
    console.log("homeController");
});

apartmentsApp.controller('mainController', function($scope,$state,$rootScope,$timeout) {
    $scope.hide=true;
    $( ".left-big-bar" ).toggle();
    console.log("mainController");
    
    $scope.leftList=[
        {"name":"Flat","url":"main.events"},
        {"name":"Utilities","url":"main.events"},
        {"name":"Social Service","url":"main.events"},
        {"name":"Gallery","url":"main.events.timeline"},
        {"name":"Directory","url":"main.events"},
        
    ];
    
    {'glyphicon glyphicon-home':items.name=='Flat','glyphicon glyphicon-picture':items.name=='Gallery','':items.name=='Utilities','':items.name=='Social Service','glyphicon glyphicon-phone-alt':items.name=='Directory'}
    
    $scope.collapse=function(){
        $scope.hide=true;
        $( ".left-big-bar" ).toggle( "slide" );
        $timeout(function(){
            $( ".left-bar" ).toggle( "slide" );
        },50)
    }
    
    $scope.expand=function(){
        
        $( ".left-bar" ).toggle( "slide" );
        $timeout(function(){
            $( ".left-big-bar" ).toggle( "slide" );
            $timeout(function(){
                $scope.hide=false;
            },300)
            
        },100)
    }
});

apartmentsApp.controller('timelineController', function($scope,$state,$rootScope) {
    console.log("timeline");
})

//apartmentsApp.run(
//    ['$rootScope', '$state', '$stateParams',
//      function ($rootScope, $state, $stateParams) {
//          $rootScope.$state = $state;
//          $rootScope.$stateParams = $stateParams;
//      }
//    ])

