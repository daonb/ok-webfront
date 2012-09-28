define([
    'jquery',
    'eventbox',
    'datatables',
    'btabs',
    "tooltip",
    'mustache'
], function ($, Ebox) {
    var Mustache = window.Mustache;
    var app = {
        memberTable: function (table) {
            var table = $(table).dataTable({
                "oLanguage": { "sUrl": "txt/dataTables.txt"},
                "iDisplayLength": 999,
                "bLengthChange": false,
                "aoColumns":  [ 
                    { "bSearchable": false,
                      "bVisible":    false }, 
                    null,null,null,null,null,null, null],
                "fnDrawCallback": function( oSettings ) {
                   $(".dataTables_paginate").hide();
                }
            });
            $.fn.dataTableExt.afnFiltering.push(
                  function( oSettings, aData, iDataIndex ) {
                    if (document.getElementById('all-switch').checked)
                      return true
                    else
                      return aData[0]=="true";
            })
            $('#all-switch').click(function () {table.fnDraw(); });
        },
        agendas : function (params) {
            $.get(params.uri, function (data) {
                data.agendas.sort(function(x,y) { return y.score-x.score});
                data.party_name = params.party_name;
                data.member_name = params.member_name;
                var template = $("#agenda-template").html();
                $("#agendas").html(Mustache.render(template, data));
                for (var i in data.agendas) {
                  var v=data.agendas[i];
                  $("#agenda-score-"+v.id).css('left', (v.score+100-1)/2+'%');
                  $("#agenda-bar-"+v.id).css('left', (v.min+100)/2+'%');
                  $("#agenda-bar-"+v.id).css('width', (v.max-v.min+0.5)/2+'%');
                  $("#agenda-bar-party-"+v.id).css('left', (v.party_min+100)/2+'%');
                  $("#agenda-bar-party-"+v.id).css('width', (v.party_max-v.party_min+1)/2+'%');
                }
                $(".bar").tooltip();
                $(".score").tooltip();
            })
         },
    };
    $('#member-nav').addClass('active');
    return app;
});

