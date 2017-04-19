var myApp = angular.module('contactApp', ['ngRoute'])

myApp.config(function ($routeProvider, $locationProvider){
  
    $routeProvider
  
    .when('/Home', {
      templateUrl: '/template/default.html',
    })
    .when('/contact-info/:contact_index', {
      templateUrl: '/template/contact_info.html',
      controller: 'contactInfoCtrl'
    })
    .when('/Add', {
      templateUrl: '/template/contact_form.html',
      controller: 'addContactCtrl'
    })
    .when('/edit/:contact_index', {
      templateUrl: '/template/contact_form.html',
      controller: 'editContactCtrl'
    })
    .otherwise({
      redirectTo: '/Home'
    });
    
    
     $locationProvider.html5Mode(true);
})

myApp.controller('navCtrl', function ($scope) {
  $scope.nav = {
    navItems: ['Home', 'Add'],
    selectedIndex: 0,
    navClick: function ($index) {
      $scope.nav.selectedIndex = $index;
    }
  };
})

myApp.controller('homeCtrl', function ($scope, ContactService){
  $scope.contacts = ContactService.getContacts();
 
  $scope.removeContact = function (item) {
    var index = $scope.contacts.indexOf(item);
    $scope.contacts.splice(index, 1);
    $scope.removed = 'Contact Deleted';
  };

})

myApp.controller('contactInfoCtrl', function ($scope, $routeParams){
  var index = $routeParams.contact_index;
  $scope.currentContact = $scope.contacts[index];
})

myApp.controller('addContactCtrl', function ($scope, $location) {
  //needed to show the correct button on the contact form
  $scope.path = $location.path();

  $scope.addContact = function () {
    var contact = $scope.currentContact;
    contact.id = $scope.contacts.length;
    $scope.contacts.push(contact);
  };

})

myApp.controller('editContactCtrl', function ($scope, $routeParams){
  $scope.index = $routeParams.contact_index;
  $scope.currentContact = $scope.contacts[$scope.index];
})

myApp.directive('contact', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/template/contact.html'
  }
})

myApp.factory('ContactService', function () {
  var factory = {};
  factory.getContacts = function () {
    return contactList;
  }
  var contactList = [
    {id: 0, name: 'Pranaya Kartik', email: 'Pranaya@gmail.com', phone: 123-456-7890, city: 'Los Angeles' },
    {id: 1, name: 'Manisha Dubia', email: 'Manisha@gmail.com', phone: '123-456-7890', city: 'Newark'},
    {id: 2, name: 'James Watson', email: 'Watson@gmail.com', phone: '123-456-7890', city: 'Chicago'},
    {id: 3, name: 'Grey Snow', email: 'Grey@gmail.com', phone: '123-456-7890', city: 'Miami'},
    {id: 4, name: 'Arya Stark', email: 'Stark@gmail.com', phone: '123-456-7890',city: 'Boston'},
    {id: 5, name: 'Dora Steve', email: 'Steve@gmail.com', phone: '123-456-7890', city: 'Houston'},
  ];
  return factory;
});

