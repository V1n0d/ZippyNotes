define(['jquery-ui'],function(){

    window.NotesApp ={

        config : {
            notetype        : 'default',
            columns         : 3,
            maxHeight       : 200,
            notesSource     : 'js/notesSource.js',
            addNotes        : true
        }

    };

    (function() {
        this.NotesApp || (this.NotesApp = {});

        jQuery.extend(this.NotesApp, {
            on: function(eventName, callback) {
                return jQuery(window).on("notesApp:" + eventName, callback);
            },
            off: function(eventName, callback) {
                return jQuery(window).off("notesApp:" + eventName, callback);
            },
            one: function(eventName, callback) {
                return jQuery(window).one("notesApp:" + eventName, callback);
            },
            trigger: function(eventName, options) {
                return jQuery(window).trigger("notesApp:" + eventName, options);
            }
        });

    }).call(this);

    return this.NotesApp;

});


