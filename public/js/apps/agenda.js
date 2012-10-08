define([
    'jquery',
    'tooltip',
    'mustache'
], function ($) {
    var _window = window,
        Mustache = _window.Mustache,
        app;

    app = {
        get_uri: function () {
            // TODO: make this a protoype
            var url = document.URL;
            // TODO: use re and lose the constant
            var s = url.indexOf("/agenda");
            var path = url.substr(s);
            return url.substr(0,s)+"/api/v2"+path;
        },
        show_agenda : function () {
            $.get(this.get_uri(), function (data) {
                data.members.sort(function(x,y) { return y.score-x.score});
                var min=0;
                var max=0;
                // calc to location of each member on the bar
                for (var i in data.members) {
                  // TODO: API change - use better resolution than %
                  var score = data.members[i].score;
                  data.members[i].left = (score+100-1)/2;
                  data.members[i].id = i;
                  if (score>max)
                    max = score
                  else if (score<min)
                    min = score;
                }
                //TODO: fix the user's absolute url in OK and remove the next lines
                for (var i in data.editors)
                  data.editors[i].absolute_url = "http://oknesset.org"+data.editors[i].absolute_url;
                // draw the members scores
                $("#agenda").html(Mustache.render($("#agenda-template").html(),
                                                   data));

                $("#agenda-bar").css('left', (min+99)/2+'%');
                $("#agenda-bar").css('width', (max-min+1)/2+'%');
                $(".score").tooltip();
            })
        }
    };

    return app;
});
