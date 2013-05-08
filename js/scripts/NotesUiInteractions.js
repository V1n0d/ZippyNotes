define(['jquery-ui','scripts/SetupNotes','underscore'],function($,NotesApp,_){

    this.NotesApp = NotesApp || {};
    //console.log(this.NotesApp)
    this.NotesApp.NotesUiInteractions = (function(){

        function NotesUiInteractions(){

            this.NoteBlockElements = $('.noteBlock');
            //console.log(this.NoteBlockElements)

        }

        NotesUiInteractions.prototype.initUiInteractions = function() {

            this.collapseNoteBlock();
            this.dragNotesBlock();
            this.sortNotesBlock();


        };

        NotesUiInteractions.prototype.collapseNoteBlock = function() {
            $('.collapseNote').on('click',function (e) {
                e.stopPropagation();
                if($(this).hasClass('icon-chevron-up')) {
                    $(this).removeClass('icon-chevron-up').addClass('icon-chevron-down').
                        parents('.noteBlock').find('.noteContent').hide();
                    return false;
                }

                if($(this).hasClass('icon-chevron-down')) {
                    $(this).removeClass('icon-chevron-down').addClass('icon-chevron-up').
                        parents('.noteBlock').find('.noteContent').show();
                    return false;
                }

            });

        };

        NotesUiInteractions.prototype.dragNotesBlock = function() {

            this.noteBlockElements = $('.noteBlock');
            this.noteBlockElements.find('.noteTitle').css({
                cursor: 'move'
            });
            this.noteBlockElements.draggable({
                handle : $('.noteTitle'),
                containment: 'document'

            });
        };

        NotesUiInteractions.prototype.sortNotesBlock = function() {
            var self = this;
            this.noteBlockElements = $('.noteBlock')

            this.noteBlockElements.find('.noteTitle').css({
                cursor: 'move'
            }).mousedown(function (e) {
                    self.noteBlockElements.css({width:''});
                    $(this).parent().css({
                        width: $(this).parent().width() + 'px'
                    });
                }).mouseup(function () {
                    if(!$(this).parent().hasClass('dragging')) {
                        $(this).parent().css({width:''});
                    } else {
                        $('.column').sortable('disable');
                    }
                });
            $('.column').sortable({
                items : self.noteBlockElements,
                connectWith: $('.column'),
                handle : $('.noteTitle'),
                start: function (e,ui) {
                    $(ui.helper).addClass('dragging');
                },
                stop: function (e,ui) {
                    $(ui.item).css({width:''}).removeClass('dragging');
                    $('.column').sortable('enable');
                }
            })
        };


        return NotesUiInteractions;
    })();

    //new NotesApp.NotesUiInteractions();
    return this.NotesApp;

});