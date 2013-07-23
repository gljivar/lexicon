

var app = angular.module('lexicon', ['mongolab']).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:ListCtrl, templateUrl:'list.html'}).
      when('/edit/:lexiconId', {controller:EditCtrl, templateUrl:'detail.html'}).
      when('/new', {controller:CreateCtrl, templateUrl:'detail.html'}).
      when('/fill/:lexiconId', {controller:LexiconAnswerFillCtrl, templateUrl:'fill.html'}).
      otherwise({redirectTo:'/'});
  });
 
 
function ListCtrl($scope, Lexicon) {
  $scope.lexicons = Lexicon.query();
}
 
 
function CreateCtrl($scope, $location, Lexicon) {
  $scope.lexicon = {};
  $scope.lexicon.questions = [];
  $scope.lexicon.nextQuestionId = 1;

  $scope.save = function() {
    Lexicon.save($scope.lexicon, function(lexicon) {
      $location.path('/edit/' + lexicon._id.$oid);
    });
  }

  $scope.addQuestion = function() {
    $scope.lexicon.questions.push({question:"", type: "TEXTBOX", id: $scope.lexicon.nextQuestionId});
    $scope.lexicon.nextQuestionId++;
  };

  $scope.removeQuestion = function(question) {
    $scope.lexicon.questions.splice( $.inArray(question, $scope.lexicon.questions), 1 );
  };
}
 
 
function EditCtrl($scope, $location, $routeParams, Lexicon) {
  var self = this;

  Lexicon.get({id: $routeParams.lexiconId}, function(lexicon) {
    self.original = lexicon;
    $scope.lexicon = new Lexicon(self.original);
    $scope.lexicon.questions = $scope.lexicon.questions || [];
    $scope.lexicon.nextQuestionId = $scope.lexicon.nextQuestionId || 1;
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
      self.original = $scope.lexicon;
      $location.path('/edit/' + $scope.lexicon._id.$oid);
    });
  };

  $scope.addQuestion = function() {
    $scope.lexicon.questions.push({question:"", type: "TEXTBOX", id: $scope.lexicon.nextQuestionId});
    $scope.lexicon.nextQuestionId++;
  };

  $scope.removeQuestion = function(question) {
    $scope.lexicon.questions.splice( $.inArray(question, $scope.lexicon.questions), 1 );
  };
}

function LexiconAnswerFillCtrl($scope, $location, $routeParams, Lexicon, LexiconAnswer) {
  var self = this;

  Lexicon.get({id: $routeParams.lexiconId}, function(lexicon) {
    self.original = lexicon;
    $scope.lexicon = new Lexicon(self.original);
    $scope.lexiconAnswer = {};
  });

  $scope.save = function() {
    $scope.lexiconAnswer.answers = [];
    $.each($scope.lexicon.questions, function () {
      $scope.lexiconAnswer.answers.push({
        questionId: this.id,
        answer: this.answer
      });      
    });
    $scope.lexiconAnswer.lexiconId = $scope.lexicon._id.$oid;
    LexiconAnswer.save($scope.lexiconAnswer, function(lexiconAnswer) {
      $location.path('/');
    });
  };
}

