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
        .state('main.events.eventlist', {
                url: '/eventlist',
                parent:'main.events',
                templateUrl: 'eventList.html' ,
                controller: 'eventlistController'
        })
        .state('main.events.hostevent', {
                url: '/hostevent',
                parent:'main.events',
                templateUrl: 'hostEvent.html' ,
                controller: 'hosteventController'
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
        {"name":"Events","url":"main.events.eventlist"},
        {"name":"Utilities","url":"main.events"},
        {"name":"Social Service","url":"main.events"},
        {"name":"Gallery","url":"main.events.timeline"},
        {"name":"Directory","url":"main.events"},
        
    ];

    
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

apartmentsApp.controller('eventlistController', function($scope,$state,$rootScope) {
    console.log("eventlistController");
    $scope.eventList = [{
        name: 'Event Name1',
        date: '05 June 2017',
        venue: 'Auditorium'
    },
    {
        name: 'Event Name2',
        date: '14 June 2017',
        venue: 'Auditorium'
    },
    {
        name: 'Event Name3',
        date: '15 June 2017',
        venue: 'Auditorium'
    },
    {
        name: 'Event Name4',
        date: '25 June 2017',
        venue: 'Auditorium'
    }];
});

apartmentsApp.controller('hosteventController', function($scope,$state,$rootScope) {
    console.log("hosteventController");
});

