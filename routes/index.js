module.exports = function(app) {

  var rest = require('./../lib/rest')(app);

  return {
    /*
     * GET static page.
     */
    index: function(req, res){
      res.render('index', { title: 'Express' })
    },
    about: function(req, res){
      res.render('about', { title: 'Express' })
    },
    /**
     * Route globbing function for GET requests.
     * Expects routes in format:
     *  GET /:controller
     *  GET /:controller/:id
     *  GET /:controller/:action/:id
     * Proxies request to rest API on oknesset and renders the relevant view accordingly
     * @param req
     * @param res
     */
    api: function(req, res, next){
       var uri = req.originalUrl.substr(7)
       console.log('LOG: API call to ', uri);
       rest.get(uri, function(err, data){
              res.send(data)
       })
    },
    get: function(req, res, next){
      var controller = req.params.controller,
      id = req.params.id,
      action = req.params.action || (id ? 'show' : 'index');

      if(~req.path.indexOf('css') || ~req.path.indexOf('txt') ||
         ~req.path.indexOf('js') || ~req.path.indexOf('img') ||
           controller == 'api') {
        next();
      } else {
        rest.get(req.path, function(err, data){
          if ( err === null ) {
              try {
                var ok_app = require('./../middle/'+controller)(app);
                ok_app.update(action, id, data);
              }
              catch (e) {};
              var template=(action==null)?controller + '.html':
                                    controller + '/' + action + '.html', data;
              res.render(template, data);

          }
          else {
            console.log('ERROR', err, req.path);
            res.end(null);
          }
        });
      }
    }
  }

};
