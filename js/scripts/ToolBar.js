define(['jquery-ui','scripts/SetupNotes','underscore'],function($,NotesApp,_){

    this.NotesApp = NotesApp || {};
    //console.log(this.NotesApp)
    this.NotesApp.ToolBar = (function(){

        function ToolBar(){

            this.NoteBlockElements = $('.noteBlock');
            //console.log(this.NoteBlockElements)

        }


        ToolBar.prototype.initToolbar = function() {

        };



        return ToolBar;
    })();

    return this.NotesApp;

});