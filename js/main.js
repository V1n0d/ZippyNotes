require.config({
    paths : {
        underscore : '../js/lib/underscore',
        jquery : '../js/lib/jquery',
        "jquery-ui" : '../js/lib/jquery-ui',
        jasmine: '../test/lib/jasmine',
        'jasmine-html': '../test/lib/jasmine-html',
        spec: '../test/jasmine/spec/'
        },
    shim : {
        "jquery-ui": {
            exports: "$",
            deps: ['jquery']
        },
        underscore : {
            exports : '_'
        },
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        }
    }
})

define( ["jquery-ui","scripts/setupNotes"], function ($,NotesApp) {

    this.NotesApp ={

        config : {
            notetype        : 'default',
            columns         : 3,
            maxHeight       : 200,
            notesSource     : 'js/notesSource.js',
            addNotes        : true
        },
        init : function(){
            new NotesApp.SetupNotes().init();

        }

    };

    this.NotesApp.init()

});