app.directive('questionItem', function($compile) {
  var textboxTemplate 	= '<div class="textbox">'
                          + '<label>Question: {{question.question}}</label>' 
                          + '<label>Answer:</label>'
                          + '<input type="text" ng-model="question.answer">'
                          + '</div>';
  var imdbTemplate 	= '<div class="imdb">Question: {{question.question}} <br/>Type: {{question.type}}</div>';
  var youtubeTemplate 	= '<div class="youtube">Question: {{question.question}} <br/>Type: {{question.type}}</div>';
  var dateTemplate 	= '<div class="date">Question: {{question.question}} <br/>Type: {{question.type}}</div>';
  

  var getTemplate = function(questionType) {
    var template = '';

    switch(questionType) {
      case 'TEXTBOX':
        template = textboxTemplate;
        break;

      case 'IMDB':
        template = imdbTemplate;
        break;

      case 'YOUTUBE':
        template = youtubeTemplate;
        break;

      case 'DATE':
        template = dateTemplate;
        break;
    }

    return template;
  }

  var linker = function(scope, element, atts) {
    element.html(getTemplate(scope.question.type)).show();
    $compile(element.contents())(scope);
  }

  return {
    restrict: "E",
    replace: true,
    link: linker,
    scope: {
      question:'='
    }
  };
});
