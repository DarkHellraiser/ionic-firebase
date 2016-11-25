// Ionic + Firebase Starter Demo
var app = angular.module('starter', ['ionic', 'firebase']);
app.constant('fbRef','https://ionic-demos-c259a.firebaseio.com');

app.factory('Items', function($firebaseArray, fbRef) {
  var itemsRef = new Firebase(fbRef + '/items');
  return $firebaseArray(itemsRef);
});

app.controller('ListCtrl', function($scope, $ionicListDelegate, Items, fbRef) {

  $scope.items = Items;

  $scope.addItem = function() {
    var name = prompt('What do you need to buy?');
    if (name) {
      $scope.items.$add({
        'name': name
      });
    }
  };

  $scope.purchaseItem = function(item) {
    var itemRef = new Firebase(fbRef + '/items/' + item.$id);
    itemRef.child('status').set('purchased');
    $ionicListDelegate.closeOptionButtons();
  };
});
