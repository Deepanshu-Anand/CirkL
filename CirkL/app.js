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
        })
        .state('main.utilities', {
                url: '/utilities',
                parent:'main',
                templateUrl: 'utilities.html' ,
                controller: 'utilitiesController'
        })
        .state('main.utilities.tickets', {
                url: '/requests',
                parent:'main.utilities',
                templateUrl: 'utilityticket.html'
        })
        .state('main.utilities.newticket', {
                url: '/newrequests',
                parent:'main.utilities',
                templateUrl: 'newTicket.html'
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
    $scope.pageName=$state.$stateParams;
    console.log($scope.pageName)
    
    $scope.leftList=[
        {"name":"Flat","url":"main.events"},
        {"name":"Events","url":"main.events.eventlist"},
        {"name":"Utilities","url":"main.utilities.tickets"},
        {"name":"Social Service","url":"main.socialservice"},
        {"name":"Gallery","url":"main.gallery"},
        {"name":"Directory","url":"main.directory"},
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
    $scope.selectedName = '';
    $scope.eventList = [{
        name: 'Event Name1',
        date: '05 June 2017',
        venue: 'Auditorium',
        fee: 'Rs.200',
        description: 'The ICC Champions Trophy returns to England and Wales in 2017 with Edgbaston, The Oval and the Cardiff Wales Stadium set to welcome the best eight One Day International sides in the world.',
        regFlag: false
    },
    {
        name: 'Event Name2',
        date: '14 June 2017',
        venue: 'Auditorium',
        fee: 'Rs.1000',
        description: 'The 15 match tournament runs from 1-18 June, with the eight teams split into two groups of four. The top two sides from each group will progress to the semi-finals, which will be played at Cardiff and Edgbaston on 14 and 15 June respectively, with The Oval hosting the final.',
        regFlag: true
    },
    {
        name: 'Event Name3',
        date: '15 June 2017',
        venue: 'Auditorium',
        fee: 'Rs.500',
        description: 'India will be looking to successfully retain their title, having won the 2013 tournament in a thrilling final against England at Edgbaston.',
        regFlag: false
    },
    {
        name: 'Event Name4',
        date: '25 June 2017',
        venue: 'Auditorium',
        fee: 'Rs.300',
        description: 'BookMyShow brings to you the official fan packages in association with Sports Konnect which is appointed as an Official Travel Agent for the ICC Champions Trophy England & Wales 2017.',
        regFlag: false
    }];
    
    $scope.register = function(event) {
        console.log("Event Id ME!!", event.name);
        $scope.selectedName = event.name;
    }
    
    $scope.confirmRegister = function(event) {
        console.log("Event "+event.name+" Registered!");
        $scope.index = _.findIndex($scope.eventList, {name: event.name});
        $scope.eventList[$scope.index].regFlag = true;
        $scope.selectedName = '';
    }
    
    $scope.cancelRegister = function() {
        console.log("cancelRegister Registeration!");
        $scope.selectedName = '';
    }
    
});

apartmentsApp.controller('hosteventController', function($scope,$state,$rootScope) {
    console.log("hosteventController");
});

apartmentsApp.controller('utilitiesController', function($scope,$state,$rootScope,$http) {

        $http({
          method: 'GET',
          url: '/Utility/getMemberUtilityList?id=1'
        }).then(function successCallback(response) {
            $scope.requestList=response.data;
        }, function errorCallback(response) {
            $scope.requestList = [{
                Id: 'Electric-100',
                UtilityType: 'Electricity',
                IssueDate: '5 June 2017',
                Description: 'The ICC Champions Trophy returns to England and Wales in 2017 with Edgbaston, The Oval and the Cardiff Wales Stadium set to welcome the best eight One Day International sides in the world.',
                Status: 'open'
            },{
                Id: 'Plumbing-101',
                UtilityType: 'Plumbing',
                IssueDate: '1 June 2017',
                Description: 'The ICC Champions Trophy returns to England and Wales in 2017 with Edgbaston, The Oval and the Cardiff Wales Stadium set to welcome the best eight One Day International sides in the world.',
                Status: 'closed'
            }];
        });
    

    
    $scope.requestTypes=['Electricity','Plumbing','Laundry','Maid Request','Painting','Pest Control'];
    $scope.setRequestType=function(type){
        $scope.requestJson={
            "requestType":type,
            "Description":"",
            "date":new Date(),
            "status":"open"
        }
    }
});


apartmentsApp.directive('pageNav',function(){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs, controllers) {
        console.log(attrs.list);
        scope.imageSrc=attrs.imageUrl;
        scope.list=JSON.parse(attrs.list);
        console.log(scope.list)
    },
    templateUrl: 'pageNav.html'
  };
});


