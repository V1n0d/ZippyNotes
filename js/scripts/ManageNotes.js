define(['jquery-ui','scripts/SetupNotes','underscore'],function($,NotesApp,_){

    this.NotesApp = NotesApp || {};
    //console.log(this.NotesApp)
    this.NotesApp.ManageNotes = (function(){

        function ManageNotes(){

            this.NoteBlockElements = $('.noteBlock');
            //console.log(this.NoteBlockElements)

        }

        ManageNotes.prototype.initEditNoteBlock = function() {

            this.editNoteTitle();
            this.editNoteContent();
            this.deleteNoteBlock();


        };

        ManageNotes.prototype.editNoteTitle = function() {

            $('.titleText').css({cursor:'text'}).mousedown(function(e){
                e.stopPropagation()
                var content = $(this).text();
                var self = this;
                if($(this).hasClass('titleText')){
                    $(this).parent().append('<input class="titleInput" type="text" value="'+content+'" style="height:20px"/>').focus();
                    $(this).remove();

                    $('.titleInput').on('blur',function(){
                        $(this).parent().append($(self).text($(this).val()));
                        $(this).remove();

                    });
                }
            });
        };


        ManageNotes.prototype.editNoteContent = function() {

            $('.noteContent').css({cursor:'text'}).mousedown(function(e){
                e.stopPropagation()

                var oldContent = $(this).find('.contentText').html();
                var self = this;

                if($(this).hasClass('noteContent')){
                    var contentTextElement = $(this).find('.contentText')
                    contentTextElement.attr({contentEditable:true}).css({border:'1px solid #E0E0E0'})

                    $(this).find('.contentText').on('blur',function(){
                        contentTextElement.attr({contentEditable:false}).css({border:''})
                    })
                }

            });
        };

        ManageNotes.prototype.deleteNoteBlock = function() {
            $('.deleteNote').css({cursor:'pointer'}).mousedown(function(){
                return $(this).parents('.noteBlock').remove();
            })
        };



        return ManageNotes;
    })();

    return this.NotesApp;

});