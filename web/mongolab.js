// This is a module for cloud persistance in mongolab - https://mongolab.com
angular.module('mongolab', ['ngResource']).
    factory('Lexicon', function($resource) {
      var Lexicon = $resource('https://api.mongolab.com/api/1/databases' +
          '/lexicon/collections/lexicons/:id',
          { apiKey: 'D66JOrIiHPEHs6NuG7W6-NbCw7wnjiXz' }, {
            update: { method: 'PUT' }
          }
      );
 
      Lexicon.prototype.update = function(cb) {
        return Lexicon.update({id: this._id.$oid},
            angular.extend({}, this, {_id:undefined}), cb);
      };
 
      Lexicon.prototype.destroy = function(cb) {
        return Lexicon.remove({id: this._id.$oid}, cb);
      };
 
      return Lexicon;
    });
