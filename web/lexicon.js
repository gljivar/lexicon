

var app = angular.module('lexicon', ['mongolab']).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:ListCtrl, templateUrl:'list.html'}).
      when('/edit/:lexiconId', {controller:EditCtrl, templateUrl:'detail.html'}).
      when('/new', {controller:CreateCtrl, templateUrl:'detail.html'}).
      when('/fill/:lexiconId', {controller:EditCtrl, templateUrl:'fill.html'}).
      otherwise({redirectTo:'/'});
  });
 
 
function ListCtrl($scope, Lexicon) {
  $scope.lexicons = Lexicon.query();
}
 
 
function CreateCtrl($scope, $location, Lexicon) {
  $scope.save = function() {
    Lexicon.save($scope.lexicon, function(lexicon) {
      $location.path('/edit/' + lexicon._id.$oid);
    });
  }
}
 
 
function EditCtrl($scope, $location, $routeParams, Lexicon) {
  var self = this;
 
  Lexicon.get({id: $routeParams.lexiconId}, function(lexicon) {
    self.original = lexicon;
    $scope.lexicon = new Lexicon(self.original);
    $scope.lexicon.questions = eval('(' + $scope.lexicon.description + ')'); // TODO: Miro - optimize or expell
  });
 
  $scope.isClean = function() {
    return angular.equals(self.original, $scope.lexicon);
  }
 
  $scope.destroy = function() {
    self.original.destroy(function() {
      $location.path('/list');
    });
  };
 
  $scope.save = function() {
    $scope.lexicon.update(function() {
      $location.path('/');
    });
  };

  $scope.addQuestion = function() {
    //alert("yea"); 
    $scope.lexicon.questions.push({question:"", type: "TEXTBOX"});
  };
}
