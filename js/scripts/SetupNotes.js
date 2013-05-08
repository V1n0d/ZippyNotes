define(['jquery-ui','scripts/app','underscore'],function($,NotesApp,_){

    this.NotesApp = NotesApp || {};
    this.NotesApp.SetupNotes = (function(){

        var noteBlockArray =[];

        function SetupNotes() {
            this.margin = 15;
            this.wrapper = $('#contentWrapper');
            this.colCount=3;


        }

        SetupNotes.prototype.init = function() {
            this.getNotes();
        };

        SetupNotes.prototype.initColumnBlocks=function() {
            this.columns = [];
            this.windowWidth = $(window).width();
            this.colWidth = (100/(this.colCount))+'%'
            for(var i=0;i<this.colCount;i++){
                this.columns[i] = $('<div>').attr({
                    id : 'column'+i,
                    class : 'column'
                }).css({
                        'width' : this.colWidth,
                        'height': 'auto'
                    });

            }
            this.wrapper.append(this.columns);
            this.initColumnPositions();
            this.appendNoteBlocks();
            this.editNoteContent()
        };

        SetupNotes.prototype.editNoteContent = function() {

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


        SetupNotes.prototype.initColumnPositions = function() {
            var self=this;
            this.blocks = [];
            this.spaceLeft = (this.windowWidth - ((this.colWidth*this.colCount)+this.margin*2)) / 2;
            this.spaceLeft -= this.margin;

            $(this.columns).each(function(i){

                var leftPos = self.margin+(i*(self.colWidth+self.margin));
                $(this).css({
                    'left':((leftPos+self.spaceLeft)-(2*self.margin))+'px',
                    'top':'120px'
                });

            });

        };


        SetupNotes.prototype.initializeNoteBlocks = function(data) {
            var self = this;
            _.each(data,function(note,index){
                noteBlockArray[index] = self.buildNoteBlocks(note);
            });
            self.initColumnBlocks()
        };


        SetupNotes.prototype.buildNoteBlocks = function(note) {
            var self = this;
            this.noteBlock = $('<div>').css({
                'width' : '97%'
            });

            this.noteBlock.attr({
                'id':'noteBlock'+note.id,
                'class' : 'noteBlock'
            });

            this.noteTitle = $('<div>');
            this.noteTitle.attr({
                'id':'noteTitle'+note.id,
                'class' : 'noteTitle'
            });

            this.noteTitle.html('<div class="btn-toolbar"><div class="btn-group"> <a class="btn btn-mini" style="margin:10px;float:left;" href="#"><i class="collapseNote icon-chevron-up"></i></a></div></div>' +
                '<div class="titleText" style="float:left">'+note.title.toUpperCase()+" "+note.id+'</div>');

            this.noteContent = $('<div>');
            this.noteContent.attr({
                'id':'noteContent'+note.id,
                'class' : 'noteContent'
            });
            this.noteContent.css({
                'height':'auto'
            });
            this.contentText = $('<div>');
            this.contentText.attr({
                'id':'contentText'+note.id,
                'class' : 'contentText'
            });
            this.contentText.css({
                'height':'auto'
            });
            this.contentText.text(note.content );

            this.noteContent.append(this.contentText)


            this.manageNotes = $('<div>').css({
                float:'right'
            }).html('<div class="btn-toolbar"><div class="btn-group"> <a class="btn btn-mini" style="margin-right:10px" href="#"><i class="editNote icon-pencil""></i></a><a class="btn btn-mini" style="margin-right:10px; href="#"><i class="deleteNote icon-trash"></i></a></div></div>');

            this.noteTitle.append(this.manageNotes)

            return this.noteBlock.append([this.noteTitle,this.noteContent]);

        };


        SetupNotes.prototype.appendNoteBlocks = function() {
            var self = this;
            var j=0;

            $(noteBlockArray).each(function(i){

                if(i%self.colCount==0) j=0;
                self.columns[j].append($(this))
                j++;

            });

        };



        SetupNotes.prototype.getNotes = function(){
            var data, method, options, url,
                self = this;

            url = NotesApp.config.notesSource;
            options = {
                type : 'GET',
                dataType: 'json',
                context: self,
                success : function(data){
                    self.initializeNoteBlocks.call(self,data);
                },
                error: function(xhr){
                    //console.log(xhr.responseText,error)
                }

            };


            return $.ajax(url, options);

        };


        return SetupNotes;
    })();

    return this.NotesApp;

});


