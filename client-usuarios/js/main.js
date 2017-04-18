$(document).ready(function (){

    //verifica se esta acessando de um mobile
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        //esconde todo o contudo
        $('*').remove();
        //redireciona pra pagina mobile
        window.location = 'mobile/main.php';
    }
    //forcarRegra();
    Main.Init();
});

var totalRecents = 0;

var Main = {


    'Init' : function(){

        //define o modo de exibicao 
        $.ajax({
            url:'plugins/preferences/preferences/getView',
            type:'POST',
            async:false,
            complete:function(response){

                var view = response.responseText;

                $('body').addClass(view);
                //assim que entrar, define o modo de view
                $('body').trigger('viewchange');
                $('#view-change #selecionada').text(view)
                $('#view-change #opcoes li[id="'+view+'"]').addClass('selected');
                
                $('#message-list-area').css('width', (($(window).width() - $('#conta-list').width()) / 2) - 80);
                $('#message-read-area').css('left', $('#message-list-area').width())
                
            

            }
        });

        //mantem a sessao permanente
        Main.keepSessionAlive();
        
        //verifica de tempo em tempo se ha novas mensagens
        Main.verificaNovasMensagens();
        
        //assim que entrar, pede permissao do desktopNotification
        desktopNotification.verificaPermissao();
        
        //inicia os atalhos do teclado
        keyManager.init();
        
        //Inicia as acoes do menu principal - topo
        Main.setMenuPrincipal();
        
        //Inicia as acoes da barra de informacao
        Main.setBarraInfo();
        
        //Inicia as barras de arrastar
        Main.setDragBars();
        
        //inicia o scroll personalizado
        Main.setScroll();
        
        //carrega as pastas da conta principal (cria as li's)
        Main.loadMbox(0);
        
        //Inicia as operacoes da area das pastas (plugin de arrastar e etc)
        Main.setMboxArea();
        
        //Carrega as mensagens da INBOX da conta principal.
        //sempre que chamar essa funcao, o objeto cache.mensagens sera atualizado com as informacoes do callback
        Main.loadMessageList({
            accID : 0, 
            mbox : 'INBOX'
        });
        
        //inica as operacoes da listagem de mensagens
        Main.setMessageListArea();
        
        //Inicia os menus das pastas/mensagens e do menu do topo
        Main.setContextMenu();
        
        //redimensiona as areas - repete a cada 10ms
        Main.refreshAreaSize();
        
        //inicia as acoes para criar uma nova pasta
        Main.setCriarNovaPasta();
        
        //inicia as acoes do menu de configuracoes
        Main.menuConfiguracoes.init();
        
        //ao iniciar, define a altura da listagem de mensagens pra ficar com a metade da tela                        
        $('#message-read-area').css("top", ( $(window).height() / 2)  );
        
        //quando clicar em sair
        $('#topo-menu ul li').last().on('click', function(){
            MainActions.logout();
        });

        //ao clicar no botao de nova conta
        $('#btn-nova-conta').on('click', function(){
            setTimeout(function(){
                $('#configuracoes-container .btn.contas').trigger('click');
            },11);
        });
        
        //confirmacao ao sair do compose de nova mensagem
        $( window ).on( 'beforeunload', function(){
            if($('.maximizar').length > 0){
                return 'Ao sair sem salvar as mensagens, suas alterações serão perdidas.';
            }
        });


        //Carrega os contatos para a modal de nova mensagem
        $.get(configs.ENDERECO_ULTRAMAIL+'/plugins/compose2/addressbook/adddestinatarios/cID/0',function(){});
        
        //assim que a sessao expirar
        $(document).on('sessionExpired', function(){

            //exibe a mensagem avisando que a sessao expirou
            $('#message-list-area').empty().append($("<div id='message-error'>Sua sessão expirou, atualize a página e refaça o login.</div>"));
            
            //remove o evento de click de todos os elementos da pagina
            $('*').unbind('click');
            
            //adiciona o evento de click em todos os elementos da tela, anulando seu comrportamento padrao - caso click em uma <a>
            $('*').bind('click', function(){
                return false;
            });
            
        });

    },
    
    
    
    
    
    /*
     * setMenuConfiguracoes()
     * 
     * Inicia as acoes do menu de configuracoes
     * 
     * @author Bruno Andrade
     * 
     * @since 08/01/2015
     * 
     * @return void  
     *       
     */    
     'menuConfiguracoes' : {

        'init' : function(){

            //instancia do objeto menuConfiguracoes
            var _this = this;

            //guarda em cache o container do menu
            var menuConfiguracoes = $('#configuracoes-container')

            //assim que entrar define a posicao do menu
            _this.refresh();

            //sempre que redimensionar a tela
            $(window).on('resize', function(){

                _this.refresh();

            })

            //quando clicar em algum botao
            menuConfiguracoes.find('.btn').on('click', function(){

                //fecha as modais antes de abrir
                $('#corpoCAMADA').remove(); 

                //pega o nome da classe pra saber a acao
                var acao = $.trim($(this).attr('class').replace('btn', ''));
                
                //executa a acao
                switch(acao){

                    case 'preferencias' : MainActions.preferenciasManager(); break;
                    case 'seguranca' : MainActions.segurancaManager(); break;
                    case 'contas' : MainActions.contasAdicionaisManager(); break;
                    case 'pastas' : MainActions.pastasManager(); break;
                    case 'alias'  : MainActions.emailsAlias(); break;
                    case 'spam'   : MainActions.spamManager(); break;
                    case 'regras' : MainActions.regrasSieveManager(); break;
                    case 'seguranca' : MainActions.segurancaManager(); break;
                    case 'lista-negra-remetentes' : MainActions.listaNegraManager(); break;
                    case 'lista-branca-remetentes': MainActions.listaBrancaManager(); break;
                    case 'lista-negra-palavras'   : MainActions.listaNegraPalavrasManager(); break;

                }

                //marca o botao clicado
                _this.marcarBotao(acao);

                //dispara o evento de resize da janela pro jmodal abrir corretamente...
                $(window).trigger('resize');
                
            })

        },//


        marcarBotao : function(botao){

            $('#configuracoes-container').find('.btn span').removeClass('active');
            $('#configuracoes-container').find('.' + botao).find('span:first').addClass('active');

        },

        // atualiza a posicao do menu
        'refresh' : function(){

            $('#configuracoes-container').css('left', $(window).width() - $('#configuracoes-container').outerWidth())

        },

        'abrir' : function(){

            $('#configuracoes-container').addClass('visivel');

        },

        'fechar' : function(){
            $('#configuracoes-container').removeClass('visivel');
        }

    },





    /*
     * keepSessionAlive()
     * 
     * Mantem a sessao de login permanente
     * 
     * @author Bruno Andrade
     * 
     * @since 04/11/2013
     * 
     * @return void  
     *       
     */    
     'keepSessionAlive' : function(){

        //cria um timer de 5 em 5 minutos
        var sessionTimer = window.setTimeout(sessionKeepAlive, 1000 * 60 * 5); 
        
        //funcao que sera chamada de 5 em 5 minutos para manter a sessao eterna
        function sessionKeepAlive(){

            //limpa o timer anterior
            window.clearTimeout(sessionTimer);
            
            //faz uma requisicao ao arquivo ping.php que apenas da um die(pong)
            $.ajax({
                url: 'ping.php',
                type: "POST",
                cache: false,
                success : function(JsonData){
                    //quando terminar a requisicao, recria o timer
                    sessionTimer = window.setTimeout(sessionKeepAlive, 1000 * 60 * 5);
                }                
            });//ajax    
        }//function 
    },
    
    
    
    
    
    
    
    /*
     * verificaNovasMensagens()
     * 
     * Verifica se ha novas mensagens na pasta que esta aberta conforme o intervalo de tempo que o usuario definiu
     * 
     * 
     * @author Bruno Andrade
     * 
     * @since 04/11/2013
     * 
     * @return void  
     *       
     */    
     'verificaNovasMensagens' : function(){

        //verifica se esta no intervalo de atualizacao que o usuario definiu, se estiver, cria o timer com o intervalo que ele definiu
        //aqui so faz a verificacao uma vez, quando entra na pagina
        if(Main.updateInterval()){ 
            //novasMensagensTimer = window.setTimeout(verificaMensagens, 1000 * 60 *  window.configs.refreshTime);
            novasMensagensTimer = window.setTimeout(verificaMensagens, 100 * 60 *  window.configs.refreshTime); 
        }else{ 
            return false;
        }
        
        //funcao que sera chamada de tempo em tempo, verificando se ha novas mensagens
        function verificaMensagens(){

            if(window.configs.new_msg_notify == 0){
                return false;
            }

            //aqui vai verificar se saiu do intervalo
            if(!Main.updateInterval()){
                return false;
            }

            //inicia a variavel com o total de mensagens recentes para exibir no title do navegador
            var ItRecentes = 0;
            
            //inicia o objeto que guardara todas as requisicoes ajax - sera util para saber se todas as requisicoes ja terminaram de carregar
            var ajaxRequests = [];
            
            //pega todas as li do container de pastas da conta
            var pastas = $('#mbox-' + window.configs.cache.messagelist.accID + ' ol').find('li');
            
            //percorre todas as li para pegar o caminho de cada uma das pastas
            $.each(pastas, function(i, pasta){

                //pega a li
                var pasta = $(pasta);
                
                //se a li tiver um data-id significa que estamos pegando uma li de pasta
                if(pasta.attr('data-id')){

                    //pega o nome mascarado da pasta para ignorarmos algumas pastas
                    var StMboxMaskedName = Main.maskMboxName(pasta.attr('data-id'));
                    
                    //ignora algumas pastas
                    if(StMboxMaskedName != 'Itens enviados' && StMboxMaskedName != 'SPAM' && StMboxMaskedName != 'Lixeira' && StMboxMaskedName != 'Rascunhos'){

                        //enfim, pega o caminho de cada pasta
                        var StCaminhoMbox = pasta.attr('title') + '' + pasta.attr('id').replace(/[0-9]+\-/, '');


                        //requisicao para saber quantas mensagens recentes ha em cada pasta
                        //monta os parametros para recuperar as mensagens - busca somente mensagens recentes
                        var params='accID='+ window.configs.cache.messagelist.accID +'&mbox='+ encodeURIComponent(StCaminhoMbox) +
                        '&curpage='+ window.configs.cache.messagelist.curpage +'&offset='+ window.configs.cache.messagelist.offset +'&search=RECENT' +
                        '&sort='+ window.configs.cache.messagelist.orderby +'&descOrd='+ window.configs.cache.messagelist.descorder +
                        '&cleanQt='+ window.configs.cache.messagelist.cleanQt +'&cleanOffset='+ window.configs.cache.messagelist.cleanOffset;
                        
                        //adiciona a requisicao ao objeto de requisicoes
                        ajaxRequests.push($.ajax({
                            url: 'getMessageList.php',
                            type: "GET",
                            data : params,
                            cache: false,
                            success : function(JsonData){

                                //objeto com as informacoes das mensagens recuperadas
                                try{
                                    var data = eval(JsonData);
                                }catch(erro){ 
                                    var data = JsonData;
                                }
                                
                                //se o callback voltou vazio, significa que a sessao do usuario expirou
                                if(!JsonData){
                                    //dispara o evento sessionExpired
                                    $.event.trigger({
                                        type: "sessionExpired"
                                    });

                                    return false;

                                }
                                
                                //mensagens recentes
                                var recentes = data.recentes;
                                //var recentes = 1;

                                //se houver mensagens recentes
                                if(recentes){

                                    //conteudo da notificacao
                                    var mensagem = "";
                                    
                                    //incrementa o total de mensagens recentes
                                    ItRecentes += recentes;
                                    
                                    //pega as ultimas mensagens recentes
                                    for(var i in data.mensagens){
                                        var from = data.mensagens[i].from.split('<');
                                        var autor = from[0] || from[1].replace('>',''); //autor sera o nome ou se nao tiver, o seu email
                                        mensagem += autor + " \n " + data.mensagens[i].subject + '\n\n';
                                    }

                                    //mostra a notificacao
                                    desktopNotification.mostrarNotificacao(Main.maskMboxName(data.mbox),mensagem);


                                }//se houver recentes
                                
                            }//sucess
                            
                        }))//requisicao para buscar mensagens recentes

                    }//pastas ignoradas
                }//se for pasta
                
            })//foreach

            //espera carregar todas as requisicoes por mensagens recentes de cada pasta, para poder chamar a funcao de piscar o title
            $.when.apply(this, ajaxRequests).done(function() {
                if(ItRecentes){
                    Main.changeBrowserTitle(ItRecentes);
                }
            });
            
            novasMensagensTimer = window.setTimeout(verificaMensagens, 100 * 60 * window.configs.refreshTime); 
            
        }//function 

    },
    changeBrowserTitle: function(ItRecentes){
        //$(document).attr('title', '(' + ItRecentes + ') ' + window.configs.cache.email + ' - Ultramail');
        
        var countRecents = 0;
        $("[class^=mbox-count]").each(function(){
            if($(this).text()){
                countRecents += parseInt($(this).text());
            }
        });
        if(countRecents>0){
            $(document).attr('title', '(' + countRecents + ') ' + window.configs.cache.email + ' - Ultramail');
        } else {
            $(document).attr('title', window.configs.cache.email + ' - Ultramail');
        }
        
    },
        
    
    
    /*
     * setMenuPrincipal()
     * 
     * Inicia as acoes do menu principal - topo
     * 
     * 
     * @author Bruno Andrade
     * 
     * @since 30/05/2013
     * 
     * @return void  
     *       
     */    
     'setMenuPrincipal' : function(){

        //quando clicar na logo, atualiza todas as contas
        $('#logo').click(function(){
            //assim que clicar na logo pra carregar as pastas, traz a div pra frente da logo. 'desabilitando' o click
            $('#disable-logo').css('z-index', '1');     
            
            //carrega as pastas das contas
            Main.loadMbox();
            
            //assim que terminar de carregar as pastas, joga a logoFake pra traz da logo verdadeira. 'habilitando' o click
            $('body').ajaxStop(function(){
                setTimeout(function(){
                    $('#disable-logo').css('z-index', '-1');
                    
                    //marca a inbox da conta atual
                    var pastaAtual = $('#info-mbox-caminho').attr('title');
                    var accIdAtual = window.configs.cache.messagelist.accID;
                    Main.activeMbox(pastaAtual, accIdAtual);
                }, 1700);
            });

        });
        
        //nao deixa a logo fake disparar o evento da logo verdadeira
        $('#disable-logo').click(function(e){
            e.stopPropagation();     
        });
        
        
        
        
        //escrever nova mensagem
        $('.btn-escrever').on('click', function(e){
            e.preventDefault();
            MainActions.novaMensagem();
        });
        
        
        //responder mensagem
        $('.btn-responder').on('click', function(e){            
            e.preventDefault();
            MainActions.responderMensagem(false,configs.EnResponder);
        });
        
        
        //responder para todos 
        $('.btn-responder-todos').on('click', function(e){            
            e.preventDefault();
            MainActions.responderMensagem('todos',configs.EnResponder);        
        });
        
        
        //encaminhar mensagem
        $('.btn-encaminhar').on('click', function(e){            
            e.preventDefault();            
            MainActions.encaminharMensagem(configs.EnEncaminhamento);        
        });
        
        
        
        //apaga a mensagem quando clicar no botao do menu principal ou apertar delete
        $('.btn-apagar').on('click', function(e){            
            e.preventDefault();            
            MainActions.apagarMensagem();        
        });
        
        
        //localizar mensagem
        $('.btn-localizar').on('click', function(e){

            e.preventDefault();
            
            //JModal.start('./plugins/search/index/index/IDConta/'+ window.configs.cache.messagelist.accID, 580, 360, 'SEARCH_TELA_INICIAL');
            
            Main.menuConfiguracoes.abrir();          
            
            //esconde a barra de resultado da busca
            if($('#message-filter-box').css('opacity') == '1'){

                $('#message-filter-box').animate({
                    'opacity' : '0',
                    'z-index' : '0'
                }, 200, 'linear', function(){ 

                    $('#message-area').animate({
                        'top' : $('#message-area').offset().top - 35
                    });
                });
            }

            Layer.start('./plugins/busca/busca/index/IDConta/' + window.configs.cache.messagelist.accID, 500, 290);            
        });


        //contatos
        $('.btn-contatos').on('click', function(e){
            e.preventDefault();            
            MainActions.contatosManager();            
        });
        
        
        //imprimir mensagens
        $('.btn-imprimir').on('click', function(e){
            e.preventDefault();
            MainActions.imprimirMensagem();
        });
        
        
        //busca do topo
        //FROM "teste" SUBJECT "teste" 
        var buscaTimer = null;
        
        $('#topo-menu-principal #topo-busca input').on('keyup', function(e){

            //se digitar antes do timeout que faz a busca, zera o timeout
            clearTimeout(buscaTimer);

            //conteudo a ser buscado
            var StTexto = $.trim($(this).val());
            
            //se a busca estiver vazia, limpa o filtro de busca
            if(StTexto == ''){

                //se esvaziou a busca e a box de filtro esta visivel, a esconde
                if($('#message-filter-box').css('opacity') == '1'){
                    $('#message-filter-box a').trigger('click');
                }
                
                buscaTimer = null;
                return false;
                
            }else{

                //se estiver preenchido e as teclas forem as setas, ignora a busca
                if(e.keyCode == '38' || e.keyCode == '40' || e.keyCode == '37' || e.keyCode == '39'){
                    return false;
                }
                
            }
            
            //cria o timeout para fazer a busca
            if(window.configs.cache.messagelist.mbox == 'Itens enviados'){
                buscaTimer = setTimeout(function(){
                    Main.filterMessageList('search_or', {
                        TO:["Para", StTexto],
                        SUBJECT:["Assunto", StTexto]
                    });
                }, 800);
            }else{
                buscaTimer = setTimeout(function(){
                    Main.filterMessageList('search_or', {
                        FROM:["De", StTexto],
                        SUBJECT:["Assunto", StTexto]
                    });
                }, 800);
            }

        });
},





    /*
     * setBarraInfo()
     * 
     * Inicia as acoes da barra de informacao.
     * 
     * 
     * @author Bruno Andrade
     * 
     * @since 09/07/2013
     * 
     * @return void  
     *       
     */    
     'setBarraInfo' : function(){

     
        //marcar/desmarcar todas as mensagens pelo botao da barra 
        $('#marcar-mensagem').on('click', function(){

            $(this).disableSelection();
            
            MainActions.selecionarMensagens();

        });
        
        //ordenacao
        
        
        $('#ordenacao-listagem').on('click', function(e){

            //nao deixa selecionar o texto
            $(this).disableSelection();
            
            //pega o menu de ordenacao
            var opcoesContainer = $('#ordenacao-listagem #opcoes');
            
            //pega qual opcao clicou
            var itemSelecionado = $(e.target).attr('id');
            
            
            //executa as acoes de ordenacao conforme o item clicado            
            if(itemSelecionado == 'ordenar-padrao'){

                Main.ordenarListagem('padrao');
                
            }else if(itemSelecionado == 'ordenar-data'){//por data

                Main.ordenarListagem('data');
                
            }else if(itemSelecionado == 'ordenar-assunto'){//por assunto

                Main.ordenarListagem('assunto');
                
            }else if(itemSelecionado == 'ordenar-remetente'){//por remetente

                Main.ordenarListagem('remetente');
                
            }else if(itemSelecionado == 'ordenar-tamanho'){//por tamanho da mensagem

                Main.ordenarListagem('tamanho');
                
            }
            
            //mostra ou esconde o menu de ordenacao
            if(opcoesContainer.css('display') == 'none'){
                opcoesContainer.slideDown("fast");
            }else{
                opcoesContainer.slideUp("fast");
            }
            
        }).on('mouseleave', function(e){

            $('#ordenacao-listagem #opcoes').slideUp("fast");
            
        });
        // /ordenacao
        
        
        
        
        
        

        //quando clicar no box do view change
        $('#view-change').on('click', function(e){

            //nao deixa selecionar o texto
            $(this).disableSelection();
            
            //pega o menu de ordenacao
            var opcoesContainer = $('#view-change #opcoes');
            
            //pega qual opcao clicou
            var itemSelecionado = $(e.target).attr('id');
            
            //mostra ou esconde o menu de ordenacao
            if(opcoesContainer.css('display') == 'none'){
                opcoesContainer.slideDown("fast");
            }else{
                opcoesContainer.slideUp("fast");
            }
            
        }).on('mouseleave', function(e){

            $('#view-change #opcoes').slideUp("fast");
            
        });
        // /view change

        $('#view-change #opcoes li').on('click', function(){

            var view = $(this).attr('id');

            $('body').removeClass().addClass(view);

            $('body').trigger('viewchange');

            $('#view-change #selecionada').text(view)

            $(this).parent().parent().find('.selected').removeClass();

            $(this).addClass('selected');

            $.ajax({
                url:'plugins/preferences/preferences/setView',
                type:'POST',
                data:{StView:view},
                complete : function(response){

                    if(view == 'vertical'){
                        $('nova-mensagem ui-draggable').css('max-width', $('#message-list-area').width());
                        $('#message-list-area').css('width', (($(window).width() - $('#conta-list').width()) / 2) - 80);
                        $('#message-read-area').css('left', $('#message-list-area').width());
                        if($('#message-list-area tr .td-autor').width() >= 255){
                            
                            
                        //RUDS - 19/05/16
                        //Posiciona a data/hora próximo ao dragbar vertical
                        $('#message-list-area #tbl-message td.td-autor').width(
                            ($('#message-list-area').width() -  $('#mbox-list-area').width()*1.7)
                                - (($('#message-list-area #tbl-message td.td-mbox').length) ? ($('#message-list-area #tbl-message td.td-mbox').width()+40):0) 
                                - (($('#message-list-area #tbl-message td.td-tamanho').length) ? ($('#message-list-area #tbl-message td.td-tamanho').width()):0)
                        );
                            
                            //$('#message-list-area tr .td-autor .assunto').width($('#message-list-area').width() - 330)
                            /*$('#message-list-area tr .td-autor .assunto').width($('#message-list-area').width() 
                                    - ($('#message-list-area #tbl-message td.td-mbox').length==0 ? 330 : (330 + $('#message-list-area #tbl-message td.td-mbox').width())))*/
                            
                            //$('#message-list-area tr .td-autor .autor').width($('#message-list-area').width() - 330)
                            /*$('#message-list-area tr .td-autor .autor').width($('#message-list-area').width() 
                                    - ($('#message-list-area #tbl-message td.td-mbox').length==0 ? 330 : (330 + $('#message-list-area #tbl-message td.td-mbox').width())))*/
                            
                            //$('#message-list-area tr .td-autor .autor').width($('#message-list-area').width() - 200)  
                            //$('#message-list-area tr .td-autor .autor').width($('#message-list-area').width() - $('#mbox-list-area').width())
                            $('#message-list-area tr .td-autor .assunto').css('min-width', 194)
                        }
                    }
                }               
            });

        })







        //paginacao
        //no focus, muda o css, pra simular um input
        $('#paginacao-display').on('focus', function(){            
            $(this).stop(true,true).animate({
                backgroundColor : '#fff', 
                color : '#000'
            }, 200); 
            $(this).css('box-shadow' , '0px 1px 5px rgba(0,0,0,0.5) inset'); //simula um input
            $(this).html(''); //limpa o conteudo
        }).blur(function(){
            $(this).stop(true,true).animate({
                backgroundColor : '#595959', 
                color : '#fff'
            }, 200);
            $(this).css('box-shadow' , 'none');
            if($(this).text().length == 0 || $(this).text() == 0){ //nao houve modificacao, ou colocou 0
                $(this).html($(this).attr('title')); //pega o texto do atributo title - texto inicial
                return true;
            }            
            //se inseriu um numero, dispara o evento contentchangend
            $('#paginacao-display').trigger('contentchanged');
        });
        
        
        //faz a requisicao quando apertar enter
        $('#paginacao-display').on('keypress', function(e) {
            if(e.keyCode == 13) {
                e.preventDefault();
                
                var paginaFinal = Math.ceil(window.configs.cache.messagelist.total / window.configs.cache.messagelist.pagesize);
                var paginaAtual = window.configs.cache.messagelist.curpage;
                
                //so faz a requisicao ao alterar o conteudo da paginacao, se for menor que a ultima pagina e nao for igual a pagina atual
                if($(this).text() != paginaAtual && $(this).text() <= paginaFinal && $(this).text() != '' ){

                    //tira o foco do display
                    $(this).trigger('blur');
                    
                    //faz a requisicao
                    Main.loadMessageList({
                        curpage : $(this).text() //conteudo do numero inserido na paginacao
                    });

                }else{
                    //se entrou um valor invalido, volta o texto original
                    $(this).text($(this).attr('title'));
                    
                    //tira o foco do display
                    $(this).trigger('blur');

                }


            }
        });


        //so deixar valor numerico
        $('#paginacao-display').on('keyup', function(e){
            $(this).html($(this).text().replace(/[^0-9]/g,''));
            
            //bug fix do FF (FF fazendo vergonha...); quando digitava um numero, o cursor ia pro inicio do texto.
            if(document.createRange){
                var range = document.createRange();//cria o renge
                range.selectNodeContents($(this)[0]);//seleciona o conteudo da div
                range.collapse(false);//joga o cursor pro final
                selection = window.getSelection();//pega o objeto selection
                selection.removeAllRanges();//remove selecoes anteriores (se houver)
                selection.addRange(range);//aplica a posicao do range
            }

        });
        
        //assim que entrar no webmail, desabilita os botoes de voltar, e primeira pagina
        $('#paginacao-btn-back').addClass('paginacao-btn-disable');
        $('#paginacao-btn-first').addClass('paginacao-btn-disable');
        
        //avancar
        $('#paginacao-btn-next').on('click', function(){

            //desabilita a selecao de texto
            $(this).disableSelection();
            
            //so faz a requisicao se o botao nao estiver desabilitado
            if(!$(this).hasClass('paginacao-btn-disable')){
                Main.loadMessageList({
                    curpage : window.configs.cache.messagelist.curpage + 1
                }, $('#message-list-area').animate({
                    'scrollTop' : '0px'
                }));
                //assim que iniciar a requisicao, desabilita os botoes para nao ficar fazendo requisicoes
                Main.disablePaginationButtons();
            }
        });
        //voltar
        $('#paginacao-btn-back').on('click', function(){

            //desabilita a selecao de texto
            $(this).disableSelection();
            
            if(!$(this).hasClass('paginacao-btn-disable')){
                Main.loadMessageList({
                    curpage : window.configs.cache.messagelist.curpage - 1
                }, function(){
                    $('#message-list-area').animate({
                        'scrollTop' : '0px'
                    });
                });
                //assim que iniciar a requisicao, desabilita os botoes para nao ficar fazendo requisicoes
                Main.disablePaginationButtons();
            }
        });
        //primeira pagina
        $('#paginacao-btn-first').on('click', function(){

            //desabilita a selecao de texto
            $(this).disableSelection();
            
            if(!$(this).hasClass('paginacao-btn-disable')){
                Main.loadMessageList({
                    curpage : 1
                }, function(){
                    $('#message-list-area').animate({
                        'scrollTop' : '0px'
                    });
                });
                //assim que iniciar a requisicao, desabilita os botoes para nao ficar fazendo requisicoes
                Main.disablePaginationButtons();
            }
        });
        //ultima pagina
        $('#paginacao-btn-last').on('click', function(){

            //desabilita a selecao de texto
            $(this).disableSelection();
            
            if(!$(this).hasClass('paginacao-btn-disable')){
                Main.loadMessageList({
                    curpage : Math.ceil(window.configs.cache.messagelist.total / window.configs.cache.messagelist.pagesize)
                }, function(){
                    $('#message-list-area').animate({
                        'scrollTop' : '0px'
                    });
                });
                //assim que iniciar a requisicao, desabilita os botoes para nao ficar fazendo requisicoes
                Main.disablePaginationButtons();
            }
        });
    // /paginacao
    
},









    /*
     * setDragBars()
     * 
     * Inicia as barras de arrastar da listagem de pastas e listagem de mensagens
     * seta os limites que podem ser arrastadas na tela
     * ficam semi invisiveis e sao exibidas somente no mouseover
     * no clique duplo, expande ou encolhe a listagem de pastas/mensagens
     * ao arrastar a dragbar da listagem de pastas, redimensiona o tamanho da barra de quota, alem das outras areas
     * 
     * 
     * #info-quota
     * #mbox-list-area
     * #mbox-dragbar
     * #message-read-area
     * #message-list-area 
     * #message-dragbar
     * #conta-list
     * 
     * @author Bruno Andrade
     * 
     * @since 02/05/2013
     * 
     * @return void  
     *       
     */
     'setDragBars' : function(){



        //define a opacidade maxima e minima.
        var minOpacity = '0.1';
        var maxOpacity = '1'; 
        
        //posiciona a dragbar ao lado da area de lisatagem de pastas
        $('#mbox-dragbar').css('left', $('#mbox-list-area').width());
        
        
        
        
        //mostra/esconde a dragbar das pastas 
        $('#mbox-dragbar').mouseenter(function(){
            $('#mbox-dragbar').stop().animate({
                opacity:maxOpacity
            }, 0, 'linear');
        }).
        mouseleave(function(){
            $('#mbox-dragbar').stop().animate({
                opacity:minOpacity
            }, 200, 'linear');
        });        
        
        //mostra/esconde a dragbar das mensagens
        $('#message-dragbar').mouseenter(function(){
            $('#message-dragbar').stop().animate({
                opacity:maxOpacity
            }, 0, 'linear');
        }).
        mouseleave(function(){
            $('#message-dragbar').stop().animate({
                opacity:minOpacity
            }, 200, 'linear');
        });
        

        //mostra/esconde a dragbar vertical das mensagens
        $('#message-dragbar-vertical').mouseenter(function(){
            $('#message-dragbar-vertical').stop().animate({
                opacity:maxOpacity
            }, 0, 'linear');
        }).
        mouseleave(function(){
            $('#message-dragbar-vertical').stop().animate({
                opacity:minOpacity
            }, 200, 'linear');
        });

        
        //expandir/encolher area de listagem de pastas - clique duplo
        $('#mbox-dragbar').dblclick(function(){  
            
            //nao deixa redimensionar se a camada da modal estiver aberta
            if($('#corpoCAMADA').length){
                return false;
            }          
            
            if($('#mbox-list-area').css('width') == 4 + 'px' ){
                $('#mbox-list-area').css("width", 210 + 'px');
                //$('#message-read-area').css("left",210);
                //$('#message-list-area').css("left",210); 
                $('#message-area').css("left",210); 
                $('#info-quota').css("width",117); //ajusta a barra de cota para o tamanho original ao encolher                
            }else{
                $('#mbox-list-area').css("width",4);
                //$('#message-read-area').css("left",4);
                //$('#message-list-area').css("left",4);
                $('#message-area').css("left",4);
            }
        });
        
        //expandir/encolher area de listagem de mensagens - clique duplo
        $('#message-dragbar').dblclick(function(){
            if($('#message-read-area').css('top') == 0 + 'px' ){
                $('#message-read-area').css("top", 50 + '%');
                $('#message-list-area').getNiceScroll().show(); //necessario pra consertar um bug no ie            
            }else{
                $('#message-read-area').css("top",0);
                //$('#message-list-area').getNiceScroll().hide(); //necessario pra consertar um bug no ie            
            }
        });
        
        
        
        //arrastando a dragbar da listagem de pastas
        $('#mbox-dragbar').mousedown(function(e){

            //nao deixa redimensionar se a camada da modal estiver aberta
            if($('#corpoCAMADA').length){
                return false;
            }

            
            e.preventDefault();//elimina o comportamento padrao do clique pra nao deixar selecionar texto
            

            

            //movendo...
            $(document).mousemove(function(e){



                e.preventDefault();//elimina o comportamento padrao do mousemove  pra nao deixar selecionar texto

                //esconde o scroll da listagem de pastas
                //$('#conta-list').getNiceScroll().hide();

                //mantem visivel a dragbar
                $('#mbox-dragbar').css('opacity','1');

                //forca o curosr a mudar mesmo que o mouse saia da dragbar
                $('body').css( 'cursor', 'col-resize' ); 



                //modo vertical
                if($('body').hasClass('vertical')){

                    //redimensiona as areas
                    $('#mbox-list-area').css("width",e.pageX+2);                
                    $('#message-area').css("left",e.pageX+2);
                    $('#info-quota').css("width",e.pageX - 91); //ajusta o tamanho da barra de quota tambem
                    
                    
                    //limita ate onde a dragbar pode ir
                    if(e.pageX < 4){
                        $('#mbox-list-area').css("width",4);
                        $('#message-area').css("left",4);
                        
                    }
                    if(e.pageX > ($(window).width()) - 100){
                        $('#mbox-list-area').css("width",($(window).width()) - 100);
                        $('#message-area').css("left",($(window).width()) - 100);
                        $('#info-quota').css("width", $(window).width() - 193); //ajusta o tamanho da barra de quota tambem
                        
                    }




                }
                else{//modo horizontal

                    //redimensiona as areas
                    $('#mbox-list-area').css("width",e.pageX+2);                
                    $('#message-area').css("left",e.pageX+2);
                    $('#info-quota').css("width",e.pageX - 91); //ajusta o tamanho da barra de quota tambem
                    
                    
                    //limita ate onde a dragbar pode ir
                    if(e.pageX < 4){
                        $('#mbox-list-area').css("width",4);
                        $('#message-area').css("left",4);
                    }
                    if(e.pageX > ($(window).width()) - 100){
                        $('#mbox-list-area').css("width",($(window).width()) - 100);
                        $('#message-area').css("left",($(window).width()) - 100);
                        $('#info-quota').css("width", $(window).width() - 193); //ajusta o tamanho da barra de quota tambem
                    }
                }//modo horizontal
            })//mousemove
        });//mousedown



        //arrastando a dragbar horizontal da listagem de mensagens
        $('#message-dragbar').mousedown(function(e){

            //elimina o comportamento padrao do click pra nao deixar selecionar texto
            e.preventDefault();
            
            //movendo...
            $(document).mousemove(function(e){

                //elimina o comportamento padrao do mousemove  pra nao deixar selecionar texto
                e.preventDefault();
                
                //esconde o scroll da listagem de mensagens
                //$('#message-list-area').getNiceScroll().hide();
                
                //mantem visivel a dragbar
                $('#message-dragbar').css('opacity','1');
                
                //quando comecar a arrastar a drag da listagem de mensagens, posiciona o cursor
                $('#message-read-area').css("top",e.pageY-70); 
                
                //forca o curosr a mudar mesmo que o mouse saia da dragbar
                $('body').css( 'cursor', 'row-resize' ); 
                
                //limita ate onde a dragbar pode ir
                if(e.pageY < 125){                            
                    $('#message-read-area').css("top",0); 
                   // $('#message-list-area').getNiceScroll().hide(); //necessario pra consertar um bug no ie
                }else{
                    $('#message-list-area').getNiceScroll().show(); //necessario pra consertar um bug no ie            
                }     
                if($('#message-filter-box').css('opacity') == 0){//quando a box de filtro da busca nao estiver visivel
                    if(e.pageY > ($(window).height()) - 10){                   
                        $('#message-read-area').css("top",$(window).height() - 80);
                    }
                }else{//quando estiver com o filtro visivel e arrastar a area de leitura pra baixo
                    if(e.pageY > ($(window).height()) - 40){                   
                        $('#message-read-area').css("top",$(window).height() - 110);
                    }
                }
                

        });

});                



            //arrastando a dragbar vertical da listagem de mensagens
            $('#message-dragbar-vertical').mousedown(function(e){
                
                var limiteHorizontalEsquerdo = $(window).width() * .75 / 3;

                var limiteHorizontalDireito = (($(window).width() * .75) / 2) - 100;
                
                
            //elimina o comportamento padrao do click pra nao deixar selecionar texto
            e.preventDefault();
            
            //movendo...
            $(document).mousemove(function(e){
                
                //RUDS 19/05/16
                //Posiciona a data/hora próximo ao dragbar vertical
                $('#message-list-area #tbl-message td.td-autor').width(
                    ($('#message-list-area').width() -  $('#mbox-list-area').width()*1.7)
                    - (($('#message-list-area #tbl-message td.td-mbox').length) ? ($('#message-list-area #tbl-message td.td-mbox').width()+40):0) 
                    - (($('#message-list-area #tbl-message td.td-tamanho').length) ? ($('#message-list-area #tbl-message td.td-tamanho').width()):0)
                );

                //elimina o comportamento padrao do mousemove  pra nao deixar selecionar texto
                e.preventDefault();

                //esconde o scroll da listagem de mensagens
                //$('#message-list-area').getNiceScroll().hide();
                
                //mantem visivel a dragbar
                $('#message-dragbar-vertical').css('opacity','1');
                 
                 
                //quando comecar a arrastar a drag da listagem de mensagens, posiciona o cursor
                //$('#message-read-area').css("left",e.pageX-220); 
                $('#message-read-area').css("left",e.pageX - $('#mbox-list-area').outerWidth()); 

                
                
                if($('#message-list-area tr .td-autor').width() >= 255){

                    $('#message-list-area tr .td-autor .assunto').css('min-width', 194)
                }


                if($('#message-list-area'))
                    if($('body').hasClass('vertical')){
                        $('#message-list-area tr .td-autor').css('min-width', 193)
                    }

                $('#message-list-area tbody tr').css('height', 47)

                $('#message-list-area').css('width', $(window).width() - $('#message-read-area').width() - $('#mbox-list-area').width())
                $('#message-read-area').css('width', $(window).width() - $('#message-read-area').offset().left)
                    
                //forca o curosr a mudar mesmo que o mouse saia da dragbar
                $('body').css( 'cursor', 'row-resize' ); 
                 

                //limita ate onde a dragbar pode ir
                /*if(e.pageX < 250){                            
                    $('#message-read-area').css("left",20); 
                    $('#message-read-area').css("width", $(window).width() - $('#mbox-list-area').width() - 20);
                    //$('#message-list-area').getNiceScroll().hide(); //necessario pra consertar um bug no ie
                }else if(e.pageX > $(window).width() - $('#message-list-area').width() - 150){
                    $('#message-list-area').css('width', (($(window).width() - $('#conta-list').width()) / 2) - 80);
                    $('#message-read-area').css("left",$(window).width() - $('#message-list-area').width() - 370); 
                    $('#message-read-area').css("width", $(window).width() - $('#message-list-area').width() - 210);
                                        
                }*/
                
                
                if(e.pageX < limiteHorizontalEsquerdo + $('#mbox-list-area').width()){                            
                    $('#message-read-area').css("left",limiteHorizontalEsquerdo); 
                    $('#message-read-area').css("width", $(window).width() - $('#mbox-list-area').width() - $('#message-list-area').width());
                    
                    //$('#message-list-area').getNiceScroll().hide(); //necessario pra consertar um bug no ie
                    
                }
                else if(e.pageX > $(window).width() - limiteHorizontalDireito){
                    $('#message-list-area').css('width', $(window).width() - $('#mbox-list-area').width() - limiteHorizontalDireito);
                    $('#message-read-area').css('width', $(window).width() - $('#mbox-list-area').width() - $('#message-list-area').width());
                    $('#message-read-area').css('left', $(window).width() - $('#mbox-list-area').width() - limiteHorizontalDireito);
                }
                else{
                    $('#message-list-area').getNiceScroll().show(); //necessario pra consertar um bug no ie            
                }                     
                
                var posicaoMenu = $('#message-read-area').css('left').replace('px','');
                
                if(posicaoMenu == $('#mbox-list-area').css('left')){
                    $('#message-content .btn-container .btn-maximizar').addClass('invisivel');
                    $('#message-content .btn-container .btn-fechar').removeClass('invisivel');
                }
                else{
                    $('#message-content .btn-container .btn-maximizar').removeClass('invisivel');
                    $('#message-content .btn-container .btn-fechar').addClass('invisivel');
                }
            });
}); 





$(window).on('resize', function(){

    if($('body').hasClass('vertical') && $('#corpoCAMADA').length == 0){
        
        $('#view-change #opcoes #horizontal').trigger('click');
        $('#view-change #opcoes #vertical').trigger('click');

    }

});





        //remove o evento de mover o mouse
        $(document).mouseup(function(){
            $(document).unbind('mousemove');
            
            //coloca a opacidade das dragbars semi invisiveis de novo
            $('#mbox-dragbar').stop().animate({
                opacity:minOpacity
            }, 200, 'linear');
            $('#message-dragbar').stop().animate({
                opacity:minOpacity
            }, 200, 'linear');

            $('#message-dragbar-vertical').stop().animate({
                opacity:minOpacity
            }, 200, 'linear');

            //quando parar de arrastar as dragbars, mostra o scroll de novo
            $('#conta-list').getNiceScroll().show();
            
            //volta o cursor para o default
            $('body').css( 'cursor', 'default' ); 

        });

    },//setDragBars
    
    
    
    
    
    
    
    
    
    
    
    /*
     * setScroll()
     * 
     * Inicia o scroll personalizado na listagem de pastas e mensagens
     * 
     * 
     * #conta-list - na listagem de pastas
     * #message-list-area
     * #message-list-content
     * 
     * 
     * @author Bruno Andrade
     * 
     * @since 03/05/2013
     * 
     * @return void  
     *       
     */
     'setScroll' : function(){
        $('#conta-list').niceScroll({
            cursorborderradius:'0px',
            cursorwidth:'5px',
            cursorcolor:'#b1b1b1',
            zindex:1,
            cursoropacitymin:0            
        });    
        $('#message-list-area').niceScroll({
            cursorborderradius:'0px',
            cursorwidth:'8px',
            cursorcolor:'#b1b1b1',
            background:'#e9e9e9',
            zindex:1,
            cursoropacitymin:0,
            enablescrollonselection : false,
            enablekeyboard : false      
        });
        $('#message-content').niceScroll({
            cursorborderradius:'0px',
            background:'#e9e9e9',
            cursorwidth:'8px',
            cursorcolor:'#b1b1b1',
            zindex:4,
            cursoropacitymin:0,
            horizrailenabled : true 
        });         
        $('#anexo-zoom-foto-container').niceScroll({
            cursorborderradius:'0px',
            background:'#ddd',
            cursorwidth:'8px',
            cursorcolor:'#000',
            zindex:777,
            cursoropacitymin:.3,
            cursoropacitymax:.5,
            horizrailenabled : true 
        }); 



    },
    
    
    
    
    
    /*
     * loadMbox(IdConta)
     * 
     * Carrega as pastas das contas do usuario
     * 
     * Se for passado o id da conta, carrega somente da conta passada, senao, carrega todas as contas
     * 
     * #mbox-(idConta)
     * .conta-mbox
     * .mbox-loading
     * .conta-title
     * .conta-mbox-container
     * 
     * @param IdConta
     * 
     * @author Bruno Andrade
     * 
     * @since 04/06/2013
     * 
     * @uses createMbox() - formata as pastas e adiciona no container
     * 
     * @return void  
     *       
     */
     'loadMbox' : function(IdConta) {
        //se foi passado uma conta especifica (idConta), pega o container de pastas da conta, senao, pega todos os containers de pastas
        var _IdConta = (IdConta != undefined) ? '#mbox-' + IdConta : '.conta-mbox';
        
        //varre a(s) conta(s) do usuario
        $(_IdConta).each(function(){

            //pega o id da conta
            var accID = $(this).attr('id').replace('mbox-', '');
            
            //loading do container
            var loading = $('#mbox-' + accID + ' .mbox-loading');
            
            //na primeira vez que entrar no webmail, a div de loading ja existe, entao somente exibe a div
            if(loading[0]){ 
                loading.css('display', 'block');
            }else{
                //se a funcao loadMbox foi chamada clicando na logo, cria as divs de loading de cada container de pastas
                $('ol', this).empty();//limpa o conteudo da ol antes de colocar as pastas
                $("<div class='mbox-loading'></div>").insertAfter($('.conta-title', this)).slideToggle(350).parent().find('.conta-mbox-container').slideToggle().parent().find('.conta-title').trigger("click");
            }
            
            
            //busca as pastas da(s) conta(s)
            $.ajax({
                url: 'getMboxList.php?accID='+ accID,
                type: "GET",
                cache : false,
                success : function(JsonData){

                    //esconde o loading da pasta
                    loading.animate({
                        'opacity' : '0'
                    }, 1000, 'linear', function(){//depois que terminar a animacao que esconde o loading

                        //remove o loading
                        loading.remove();
                        
                        //callback com as contas e pastas do usuario
                        var conta = eval(JsonData);

                        //adiciona o id da conta, ao objeto que contem as pastas da conta, pra poder saber em qual container inserir as pastas
                        conta.pastas[0].accID = accID;
                        
                        //cria uma flag no final do objeto que contem as pastas, para poder informar ao each que acabaram as pastas
                        conta.pastas.lastDir = 1;
                        
                        //varre o objeto com as pastas recursivamente - esse loop que cria as li's nos containers
                        totalRecents = 0;
                        $.each(conta.pastas, Main.createMbox);
                        
                        //depois que montar as pastas, expande o container
                        $('#mbox-' + IdConta + ' .conta-mbox-container').slideDown(350);

                    }); //animate                    
                },//success
                complete : function(){

                    //sempre que carrega a listagem de pastas isso acontece... aqui destaca a pasta atual... fazer isso com a funcao activeMbox
                    setTimeout(function(){
                        var mbox = configs.cache.messagelist.mbox?configs.cache.messagelist.mbox:'INBOX';
                        
                        //$('#mbox-' +configs.cache.messagelist.accID+ ' ol li[id*="'+mbox+'"]').find('div').first().trigger('click');
                        
                        $('#mbox-' +configs.cache.messagelist.accID+ ' ol li[id*="'+mbox+'"]').find('div').first().addClass('mbox-active');


                        var headerParams ={
                            'accID': window.configs.cache.messagelist.accID,
                            'mbox': 'INBOX',
                            'pagesize': window.configs.cache.messagelist.pagesize,
                            'curpage': window.configs.cache.messagelist.curpage,
                            'searchby': window.configs.cache.messagelist.searchby,
                            'orderby': window.configs.cache.messagelist.orderby,
                            'descorder': window.configs.cache.messagelist.descorder,
                            'offset': -1,
                            'cleanQt': 'all',
                            'cleanOffset': 0
                        };
                        
                        //monta os parametros para recuperar as mensagens da conta e mbox passadas
                        var params='accID='+ headerParams.accID +'&mbox='+ encodeURIComponent(headerParams.mbox) +
                        '&curpage='+ headerParams.curpage +'&offset='+ headerParams.offset +'&search='+ encodeURIComponent(headerParams.searchby) +
                        '&sort='+ headerParams.orderby +'&descOrd='+ headerParams.descorder +
                        '&cleanQt='+ headerParams.cleanQt +'&cleanOffset='+ headerParams.cleanOffset;


                        //filtro atual de listagem das mensagens
                        var filtro = window.configs.cache.messagelist.searchby;

                        $.ajax({
                            url: 'getMessageList.php',
                            type: "GET",
                            data : params,
                                timeout : 20000, //20 segundos
                                cache: false,
                                success : function(JsonData){

                                //se o JsonData retornou uma string contendo uma excecao do php, exibe a box de erro  e retorna
                                if(Main.JsonError(JsonData)) return;

                                //se o callback voltou vazio, significa que a sessao do usuario expirou
                                if(!JsonData){

                                    //dispara o evento sessionExpired
                                    $.event.trigger({
                                        type: "sessionExpired"
                                    });

                                    return false;

                                }

                                //se a requisicao ocorreu tudo ok, continua...
                                var data = eval(JsonData) || JsonData;

                                Main.updateMessageCount({
                                    'mbox' : 'INBOX', 
                                    'recent' : data.recentes
                                });

                            }//sucess

                        });//getmessageList

}, 1300);

                }//complete

            });//ajax getMboxList
        });//foreach

    },//loadMbox









    /*
     * setMboxArea()
     * 
     * Inicia o plugin de arrastar pastas para dentro de outras pastas
     * 
     * inicia o plugin de multipla selecao de items
     * 
     * ao clicar no titulo da conta, carrega suas pastas
     * 
     * .conta-title - evento do click
     * #info-email - muda o nome da conta, na barra de quota
     * .mbox-loading - div com a gif de loading
     * .conta-mbox-container - container das pastas
     * 
     * @uses loadMbox() - carrega as pastas da conta
     * 
     * @author Bruno Andrade
     * 
     * @since 09/05/2013
     * 
     * @return void  
     *       
     */
     'setMboxArea' : function(){


        //abre os atalhos
        $('#conta-atalhos .atalho').on('click',function(){

            //pega os dados do atalho
            var StAtalho = $(this).attr('id');
            var StUrl = $(this).attr('data-url');
            var StUsuario = $(this).attr('data-usuario');
            var StSenha = $(this).attr('data-senha');
            
            //cria o form inline - IE e FF o form precisa estar 'apendado' em um container
            var form = $('<form target ="_blank" method = "POST" id = "form-atalho"></form>').appendTo('body');
            
            //abrindo o webfacil
            if(StAtalho == 'WEBFACIL'){

                //adiciona a action e os campos para submitar o formulario do webfacil
                form.attr('action', 'http://painel.webfacil.com.br/edit/index.php');
                form.append('<input type="hidden" name="e" value="A"/>');
                form.append('<input type="hidden" name="DadosCliente" value="'+ StUrl +'"/>');
                form.submit().remove(); //depois de submeter o form, o remove do body
                
            }else if(StAtalho == 'PAINEL'){

                //adiciona a action e os campos para submitar o formulario do painel
                form.attr('action', 'https://painel.hostnet.com.br/login');
                form.append('<input type="hidden" name="StUsuario" value="'+ StUsuario +'"/>');
                form.append('<input type="hidden" name="StSenha" value="'+ StSenha +'"/>');
                form.append('<input type="hidden" name="StOrigem" value="ultramail"/>');
                form.append('<input type="hidden" name="login" value="usuario"/>');
                form.submit(); //depois de submeter o form, o remove do body
                
            }else if(StAtalho == 'WORDPRESS'){

                //adiciona a action e os campos para submitar o formulario do wordpress
                form.attr('action', StUrl);
                form.append('<input type="hidden" name="log" value="'+ StUsuario +'"/>');
                form.append('<input type="hidden" name="pwd" value="'+ StSenha +'"/>');                
                form.submit().remove(); //depois de submeter o form, o remove do body
                
            }else if(StAtalho == 'PRESTASHOP'){

                //adiciona a action e os campos para submitar o formulario do prestashop
                form.attr('action', StUrl);
                form.attr('method', 'GET'); //o presta loga com GET
                form.append('<input type="hidden" name="email" value="'+ StUsuario +'" />');
                form.append('<input type="hidden" name="passwd" value="'+ StSenha +'" />');                
                form.append('<input type="hidden" name="token" value="" >');                
                form.append('<input type="hidden" name="redirect" value="AdminHome" />');                
                form.append('<input type="hidden" name="controller" value="AdminLogin" />');                
                form.append('<input type="hidden" name="submitLogin" value="1" />');                
                form.submit().remove(); //depois de submeter o form, o remove do body
                
            }
            
        });
        //abre os atalhos
        
        
        //expande/encolhe a caixa das pastas
        $('.conta-title').live('click',function(e){


            //quando clicar no icone de atualizar pasta
            if($(e.target).attr('class') == 'mbox-refresh'){

                //se ainda estiver carregando, nao faz requisicao
                if($('.message-loading')[0]){
                    return false;
                }else{

                    //pega o id da conta
                    var accID = $(this).parent().attr('id').replace('mbox-', '');
                    
                    //recarrega a listagem de mensagens da pasta atual
                    var mbox = $('#info-mbox-caminho').attr('title');
                    Main.loadMessageList({
                        mbox : mbox                    
                    }, function(){            
                        Main.loadMbox(accID);
                        
                    });
                    return false;
                }
            }
            
            //nao deixa selecionar texto quando clicar para expandir/encolher a caixa de pastas
            if( typeof $(this).disableSelection !== 'undefined' ){
                $(this).disableSelection();
            }
            
            //quando clicar no titulo da conta, carrega suas pastas. somente ira fazer a requisicao ajax buscando as pastas quando houver a div .mbox-loading dentro do container da conta
            //caso nao haja a div de loading, significa que ja foi feito a requisicao, entao somente expande/encolhe a box
            if(!$(this).parent().find('.mbox-loading')[0]){
                $('.conta-mbox-container', this.parentNode).stop(true, true).slideToggle(350);//encolhe/expande
            }else{
                var accID = $(this).parent().attr('id').replace('mbox-', '');
                Main.loadMbox(accID); //aqui que carrega as pastas
            }

        }); //click conta-title


        //inicia o plugin de arrastar pastas
        var nestedSortableRaizPastaArrastada = ''; //variavel global mas so usada no contexto do plugin
        $('ol.sortable').nestedSortable({
            rtl : true, //para inserir a pasta em outra, deve-se arrastar para a esquerda
            forcePlaceholderSize: true,
            handle: 'div .folder-drag',
            helper: 'clone',
            items: 'li',
            opacity: .6,
            placeholder: 'placeholder',
            revert: 250,
            tabSize: 10,
            tolerance: 'pointer',
            toleranceElement: '> div',
            maxLevels: 0,
            isTree: true,
            expandOnHover: 700,
            startCollapsed: true,
            protectRoot : false,
            start : function(e, item){

                //item que esta sendo arrastado
                var currentItem = $(item.item);
                
                //ao comecar a arrastar uma pasta, pega o pai da pasta
                nestedSortableRaizPastaArrastada = currentItem.parent().parent().attr('id');
                
                $('#destino').val(currentItem.attr('title'));

            },            
            isAllowed  : function (placeholder, placeholderParent, currentItem) {           
                //nao deixa colocar pastas antes da inbox, favoritos e nao lidas
                if($(placeholder).index() <= 2 && placeholderParent == null){
                    setTimeout(function(){
                        Main.loadingCursor('hide');
                    }, 1200);
                    return false;
                }else{
                    return true;
                }
            },
            change : function(e, item){ //sempre que houver uma mudanca

                //pega a pasta que esta sendo arrastada
                var currentItem = $(item.item);

                //se for as pastas principais, nao deixa ser inserida em outra pasta
                if ((/INBOX/.test(currentItem.attr('id'))) || (/mbox-itens_enviados/.test(currentItem.attr('class'))) || (/mbox-lixeira/.test(currentItem.attr('class'))) || (/mbox-rascunhos/.test(currentItem.attr('class'))) || (/mbox-spam/.test(currentItem.attr('class')))){
                    $('ol.sortable').nestedSortable({
                        protectRoot : true
                    });
                }else{ 
                    $('ol.sortable').nestedSortable({
                        protectRoot : false
                    });
                }
            },
            //move a pasta
            update : function(e, item){

                //pega a conta a qual esta movendo a pasta
                var accID = $(item.item).parents('.conta-mbox-container').parent().attr('id').replace('mbox-','');
                
                //pega o caminho da pasta que esta sendo arrastada
                var pastaArrastada = $(item.item);
                var pastaArrastadaOrigem = pastaArrastada.attr('title');
                var pastaArrastadaName = pastaArrastada.attr('id').replace(/[0-9]+-/,'');
                
                //pega a pasta que onde vai droppar
                var pastaDropada = $(item.item).parent().parent();
                var pastaDropadaOrigem = (pastaDropada.attr('title') !=undefined) ? pastaDropada.attr('title') : '';
                var pastaDropadaName = (pastaDropada.attr('id')) ? pastaDropada.attr('id').replace(/[0-9]+-/,'') : '';
                
                //formata os caminhos
                origem = pastaArrastadaOrigem + pastaArrastadaName;
                destino = pastaDropadaOrigem + pastaDropadaName;
                
                Main.loadingCursor('show');
                
                //salva a ordem das pastas
                Main.salvaOrdemDasPastas(accID);
                
                //move a pasta
                $.ajax({
                    url: 'plugins/mboxmanager/index/movembox',
                    type: "POST",
                    data : {
                        accID : accID,
                        origem : origem,
                        destino : destino
                    },
                    success : function(JsonData){

                        //esconde o cursor de loading
                        Main.loadingCursor('hide');
                        
                        //muda o title da pasta que foi arrastada antes de receber um click fake, pra carregar em sua nova posicao
                        //QUANDO JOGA A PASTA 'A' PRA PASTA 'B' E DEPOIS TIRA A 'B' E JOGA NA 'A' DA O ERRO 
                        if(destino.length > 0){
                            pastaArrastada.attr('title',  destino + '/');
                        }else{
                            pastaArrastada.attr('title',  destino);
                        }
                        
                        
                        //pega o lugar que a pasta foi dropada
                        var pastaDropada = ($(item.item).parent().parent().attr('id'));
                        
                        //so verifica se a pasta movida possui regras, se ela foi movida pra dentro de outra pasta diferente da atual
                        if(nestedSortableRaizPastaArrastada != pastaDropada){

                            //verifica se a pasta contem regras
                            $.ajax({
                                url: 'plugins/sieve/UserRules/ListarRegras/accID/'+ window.configs.cache.messagelist.accID,
                                type: "POST",
                                data : {
                                    'origem' : origem, 
                                    'destino' : destino
                                },
                                cache : false,
                                success : function(JsonData){

                                    //se a pasta movida possui regra, retorna um objeto contendo o status do retorno e a mensagem
                                    try{
                                        var data = JSON.parse(JsonData)
                                    }catch(e){
                                        var data = {
                                            'status' : 'null'
                                        };
                                    }
                                    
                                    //se moveu a pasta com regra...
                                    if(data['status'] == 'modificado'){                                
                                        //se ja houver um alerta, o remove
                                        $('.alerta-alteracao-regra').remove();
                                        //limpa o conteudo onde visualiza a mensagem
                                        $('#message-content').html('');
                                        //adiciona o alerta na area de exibicao da mensagem
                                        $('#message-content').append($('<div class="alerta-alteracao-regra">' + data['msg'] + '</div>').on('click', function(){
                                            $(this).find('.btn-fechar-alerta').parent().remove()
                                        }));
                                    }
                                }
                            });
}


                        //depois de mover a pasta com sucesso, dispara um click nela, pra abrir no seu caminho novo
                        setTimeout(function(){
                            pastaArrastada.find('div').trigger('click');                            
                        }, 1000);


                    }//success
                });//ajax


}
});


        //mouse hover das pastas, muda a cor de fundo e mostra o icone de arrastar
        $('.conta-mbox li div').live('mouseover', function(){
            $('.folder-drag', this).stop(true, true).delay(350).animate({
                opacity:1
            }, 200);
            $(this).stop(true,true).animate({
                backgroundColor : '#D9D9D9'
            }, 200); 
        })       
        .live('mouseleave', function(){
            $('.folder-drag', this).stop(true, true).animate({
                opacity:0
            }, 200);
            $(this).stop(true,true).animate({
                backgroundColor : '#fff'
            }, 200);
        });
        
        $('.folder-drag').live('mouseenter', function(){
            $(this).stop(true, true).delay(350).animate({
                opacity:1
            }, 200);
        });
        
        $('.disclose').live('click', function() {
            $(this).closest('li').toggleClass('mjs-nestedSortable-collapsed').toggleClass('mjs-nestedSortable-expanded');
        });






    },
    
    
    
    
    /*
     * salvaOrdemDasPastas()
     *
     * salva no banco um objeto json com a ordem das pastas
     *
     */
     'salvaOrdemDasPastas' : function(accID){

        //VERIFICAR PQ QUANDO EXCLUI NAO EXLCUI
        
        //mostra o cursor de loading
        Main.loadingCursor('show');

        //espera a listagem das pastas estarem prontas para pegar o objeto com a estrutura e salvar no banco
        setTimeout(function(){

            //pega o email da conta
            var StAccEmail = $('#conta-list #mbox-' + accID).find('ol').first().parent().parent().find('.conta-title').text();

            //pega a hierarquia de pastas
            var ArPastas = $('ol.sortable.sortableID-' + accID).nestedSortable('toHierarchy');

            //salvar no banco as pastas
            $.ajax({
                url: 'mboxOrder.php',
                type: "POST",
                data : {                    
                    StAccEmail : StAccEmail, 
                    StPastas : ArPastas
                },            
                success : function(JsonData){
                    //esconde o cursor de loading
                    Main.loadingCursor('hide');
                    
                }
            })

        },2000);
        
    },
    
    
    
    
    
    
    /*
     *
     * loadMessageList(ArParam)
     * 
     * Carrega as mensagens de uma pasta de uma conta
     * 
     * Retorna um Json com as mensagens e algumas informacoes para modificar no header : 
     * 
     * ArParam : contem o filtro para carregar as mensagem da pasta
     * callBack : se for passada uma funcao, ela eh executada ao completar a requisicao ajax.
     * 
     * mensagens - objeto contendo as mensagens da pasta passada
     * quota - retorna o total/usado e porcentagem da quota
     * accID
     * mbox
     * buscando - ?
     * novas - mensagens
     * total - mensagens
     * recentes - mensagens
     * curpage - paginacao
     * pagesize - numero de mensagens pra exibir no grid de mensagens
     * cleanQt - ?
     * cleanOffset - ?
     *
     */
     'loadMessageList' : function(ArParam, callBack){
         
        $.ajax({
            url:'plugins/preferences/preferences/getView',
            type:'POST',
            async:false,
            complete:function(response){

                var view = response.responseText;

                $('body').addClass(view);
                //assim que entrar, define o modo de view
                $('body').trigger('viewchange');
                $('#view-change #selecionada').text(view)
                $('#view-change #opcoes li[id="'+view+'"]').addClass('selected');
                
                $('#message-list-area').css('width', (($(window).width() - $('#conta-list').width()) / 2) - 80);
                $('#message-read-area').css('left', $('#message-list-area').width())
                
            

            }
        });
         
         //Main.setDragBars();
         
        //exibe selectbox de ordenação de msg
        $('#ordenacao-listagem').show();
         
        //fecha a camada da modal
        Layer.tclose('camada' + Layer.id);
        
        //inicia a variavel que guardara as tr's
        var TrMensagem = '';
        
        //ao carregar as mensagens de uma pasta, remove a box de erro anterior (se houver) 
        $('#message-error').remove();
        
        //mostra o loading de carregamento das mensagens
        $('#message-list-area').append($("<div class='message-loading'> Carregando... </div> "));
        
        
        
        //parametros do header
        var headerParams ={
            'accID': window.configs.cache.messagelist.accID,
            'mbox': window.configs.cache.messagelist.mbox,
            'pagesize': window.configs.cache.messagelist.pagesize,
            'curpage': window.configs.cache.messagelist.curpage,
            'searchby': window.configs.cache.messagelist.searchby,
            'orderby': window.configs.cache.messagelist.orderby,
            'descorder': window.configs.cache.messagelist.descorder,
            'offset': -1,
            'cleanQt': 'all',
            'cleanOffset': 0
        };
        
        //mescla os parametros passados na chamada da funcao com os parametros do header
        for (i in ArParam) {
            var novoValor = ArParam[i];
            
            if (novoValor !== undefined) {
                headerParams[i] = novoValor;
            }

        }
        
        
        //monta os parametros para recuperar as mensagens da conta e mbox passadas
        var params='accID='+ headerParams.accID +'&mbox='+ encodeURIComponent(headerParams.mbox) +
        '&curpage='+ headerParams.curpage +'&offset='+ headerParams.offset +'&search='+ encodeURIComponent(headerParams.searchby) +
        '&sort='+ headerParams.orderby +'&descOrd='+ headerParams.descorder +
        '&cleanQt='+ headerParams.cleanQt +'&cleanOffset='+ headerParams.cleanOffset;
        
        
        //filtro atual de listagem das mensagens
        var filtro = window.configs.cache.messagelist.searchby;
         
        $.ajax({
            url: 'getMessageList.php',
            type: "GET",
            data : params,
            timeout : 20000, //20 segundos
            cache: false,
            success : function(JsonData){

                //remove o loading
                $('.message-loading').remove();

                //se o JsonData retornou uma string contendo uma excecao do php, exibe a box de erro  e retorna
                if(Main.JsonError(JsonData)) return;
                
                //se o callback voltou vazio, significa que a sessao do usuario expirou
                if(!JsonData){
                    //dispara o evento sessionExpired
                    $.event.trigger({
                        type: "sessionExpired"
                    });
                    
                    return false;
                    
                }
                
                //se a requisicao ocorreu tudo ok, continua...
                var data = eval(JsonData) || JsonData;
                
                //filtro atual que esta carregando as mensagens - sera usado para mostrar o link que lista as mensagens marcadas
                filtro = data.searchby;
                
              
                
                var accID = data.accID;

                //verifica se o usuario escolheu exibir o tamanho das mensagens
                var BoExibeTamanhoMensagem = window.configs.EnExibeTamanhoMensagem;
                
                //monta as tr's com as mensagens
                for(i in data.mensagens){   

                    var IdMensagem = data.mensagens[i].id;
                    var MessageId = data.mensagens[i].messageId;
                    //var OficialIdMensagem = data.mensagens[i].messageId;
                    var StAutor = (data.mensagens[i].from)? data.mensagens[i].from: '';
                    var StRemetente = (data.mensagens[i].to)? data.mensagens[i].to: '';
                    var StAssunto = (data.mensagens[i].subject)? data.mensagens[i].subject: '';
                    var DtData = data.mensagens[i].receivedOn + ""; //forca a conversao pra string... no IE8, as funcoes de string nao pega nessa variavel vinda do json. ex split, replace etc
                    var BoAnexo = data.mensagens[i].hasAttachment;
                    var BoRespondida = data.mensagens[i].answered;
                    var BoFavorita = data.mensagens[i].flagged;
                    var BoLida = data.mensagens[i].seen;
                    var BoRemovida = data.mensagens[i].deleted;
                    var BoEncaminhada = data.mensagens[i].forwarded;
                    var StChave = data.mensagens[i].secureMessage;
                    var StTamanho = data.mensagens[i].size;
                    var tabindex = i;
                    
                    
                    /*RUDS*/
                    /*Esse bloco é responsavel por filtrar as msg de acordo com a
                     * sua data de recebimento. Será executado apenas caso 
                     * ArParam.datefinal esteja definido.*/
                    if (ArParam.datefinal !== undefined){
                        
                        var dataLimite = converteArrayParaDate(ArParam.datefinal.split('/'));
                        var dataRecebimento = data.mensagens[i].receivedOn.split(' '); 
                        var dataRecebimentoFormat = converteArrayParaDate(dataRecebimento[0].split('/'));
                        
                      if(filtraMsgPorDataLimite(dataLimite,dataRecebimentoFormat))
                         IdMensagem = undefined;
                    }

                    
                    //formata a data pra ficar de forma 'inteligente'
                    DtData = Main.formataDataInteligente(DtData);
                    
                    
                    //verifica se a mensagem tem favorito ou anexo
                    var classFavorito = (BoFavorita) ? 'td-fav-marcado' : 'td-fav';
                    var classAnexo    = (BoAnexo) ? 'td-anexo' : 'td-anexo td-vazio';
                    
                    //icone da mensagem
                    var classCarta = '';
                    var title = '';
                    
                    //se a mensagem possuir uma chave de seguranca
                    if(StChave){            
                        var classChave = 'td-chave-' + StChave.split(';')[0];
                        var chaveDescricao = StChave.split(';')[1]; 
                    }else{
                        var classChave = '';
                        var chaveDescricao = '';
                    }
                    
                    
                    //decide qual vai ser o icone da mensagem (lida, nao lida, encaminhada, respondida, deletada)
                    if(BoLida){                        
                        if(!BoEncaminhada && !BoRespondida){
                            classCarta = 'td-carta-aberta';
                            title = 'Marcar como não lida';                           
                        }
                        else if(BoEncaminhada){
                            classCarta = 'td-carta-encaminhada';
                            title = 'Essa mensagem foi encaminhada';
                        }else if(BoRespondida){
                            classCarta = 'td-carta-respondida';
                            title = 'Essa mensagem foi encaminhada';
                        }
                    }
                    
                    if(!BoLida){
                        if(!BoEncaminhada && !BoRespondida){
                            classCarta = 'td-carta-fechada';
                            title = 'Marcar como lida';                            
                        }else if(BoEncaminhada){
                            classCarta = 'td-carta-encaminhada';
                            title = 'Essa mensagem foi encaminhada';
                        }else if(BoRespondida){
                            classCarta = 'td-carta-respondida';
                            title = 'Essa mensagem foi encaminhada';
                        }

                    }
                    
                    
                    if(BoRemovida){
                        classCarta = 'td-carta-deletada';
                        title = 'Essa mensagem foi deletada por outro software de e-mail';
                    }
                    
                    
                    //formata a tr com o conteudo da mensagem
                    //IE8 adiciona um item undefined no final do objeto
                    if(IdMensagem != undefined){

                        //pega o nome do autor e o email, nao deixa o nome passar de 37 caracteres
                        if(StAutor != null){
                            var StAutorCompleto =  StAutor.replace(/</g, '&lt;').replace(/>/g, '&gt;').split('&lt;');
                            var autor = (StAutorCompleto[0].length > 37) ? StAutorCompleto[0].substr(0,37) + '...' : StAutorCompleto[0];
                            var email = (StAutorCompleto[1] != undefined) ? StAutorCompleto[1].replace(/&gt;/, '') : autor;
                            var StAutorFinal = (autor) ? autor : email;
                        }else{
                            var StAutorFinal = '';
                        }
                        
                        //pega os remetentes da mensagem, pegando somente o nome se houver, caso contrario, pega o email. pode ter 1 ou mais remetentes
                        var nRemetentes = (StRemetente) ? StRemetente.split(',') : 0;
                        var StRemetentes = "";
                        for(i in nRemetentes){
                            var StRemetenteCompleto = nRemetentes[i].toString().replace(/</g, '&lt;').replace(/>/g, '&gt;').split('&lt;');
                            var remetente = StRemetenteCompleto[0];
                            
                            var remetenteEmail = (StRemetenteCompleto[1] != undefined) ? StRemetenteCompleto[1].toString().replace(/&gt;/, '') : remetente;
                            StRemetentes += (remetente != undefined) ? remetente + " ,": remetenteEmail + " ,";
                        }
                        
                        //remove a ultima ',' dos remetentes 
                        StRemetentes = StRemetentes.slice(0,-1);
                        
                        //verifica se o campo remetente vai passar do tamanho maximo de caracteres, o limita com '...'
                        StRemetentes = (StRemetentes.length > 40) ? StRemetentes.substr(0,40) + '...' : StRemetentes;
                        
                        
                        //verifica como vai ser exibido o campo 'autor' da listagem de mensagens. verifica se esta na pasta 'itens enviados', exibindo os remetentes ou o autor, caso contrario
                        var StAutorExibicao = (data.mbox.toLowerCase() == 'itens enviados' || data.mbox.toLowerCase() == 'enviados' || data.mbox.toLowerCase() == 'enviadas') ? StRemetentes : StAutorFinal;
                        //o title/alt da td, exibe o email real do autor/remetente
                        var StAutorTitle       =  (data.mbox.toLowerCase() == 'itens enviados') ? StRemetente : email;
                        
                        StAutorTitle = StAutorTitle.replace(/'/gi, '&quot;');

                        //limita o numero de caractere do assunto
                        var StAssuntoFinal;
                        var StAssuntoMaxLength = parseInt((($(window).width() - $('#mbox-list-area').width()) - 450) / 10);
                        
                        if(StAssunto != null){
                            StAssuntoFinal = (StAssunto.length > StAssuntoMaxLength) ? StAssunto.substr(0,StAssuntoMaxLength) + '...' : StAssunto;
                            StAssuntoFinal = StAssuntoFinal.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                        }
                        
                        var classMensagem = 'class=';
                        if(!BoLida && !BoRemovida) {
                            classMensagem += 'nova-mensagem';
                        } //adiciona a classe 'nova-mensagem' se for uma mensagem nao lida
                        if(BoRemovida) {
                            classMensagem += 'mensagem-deletada';
                        } //adiciona a classe 'mensagem-deletada' se a mensagem estiver com a flag deleted (isso so acontece se a opcao modo de exclusao estiver 'MARCAR')
                        
                        //se o usuario marcou a opcao de exibir o tamanho da mensagem
                        if(BoExibeTamanhoMensagem == 'TRUE'){
                            var StTdTamanho = "<td class='td-tamanho'> "+ StTamanho +" </td>";
                        }else{
                            var StTdTamanho = '';
                        }
                        
                        
                        TrMensagem += 
                        "<!-- mensagem -->" +
                        "<tr id='" + IdMensagem +"' messageId='"+encodeURI(MessageId)+"' " + " tabindex='"+ tabindex +"' " +  classMensagem + "> " +
                        "<td class='td-drag'></td>" +
                        "<td class='td-checkbox'><div class='checkbox'></div></td>" + 
                        "<td class='td-marcarSpam' alt='Marcar como SPAM' title='Marcar como SPAM'></td>" +
                        "<td class='"+ classFavorito +"'></td>" +
                        "<td class='"+ classCarta +"' title='"+ title +"'></td>" +
                        "<td class='"+ classAnexo +"'></td>" +
                        "<td class='" + classChave + "' title='"+ chaveDescricao +"' alt='"+ chaveDescricao +"'></td>" + 
                        "<td class='td-autor' title='"+ StAutorTitle +"' alt='"+ StAutorTitle +"'> "+ StAutorExibicao +" </td>" +
                        "<td class='td-assunto'title='"+StAssunto+"'> "+ StAssuntoFinal +" </th>" +
                        "<td class='td-data'> "+ DtData +" </td>" +
                        StTdTamanho +
                        "<input type='hidden' class='remetente-email' value='"+ email +"' />"+
                        "</tr>" +
                        "<!-- mensagem -->";
                    }
                }//for
                
                
                //atualiza a quota da conta
                Main.updateQuota(data);
                
                
                //algumas variaveis pra atualizar a barra de informacao abaixo do topo
                var mbox = data.mbox;
                var MensagensTotal  = data.total;
                var MensagensNovas = data.novas;
                var MensagensFavTotal = "";
                var MensagensRecentes = data.recentes;
                
                //pega o total de mensagens favoritadas da pasta
                var params='accID='+ headerParams.accID +'&mbox='+ encodeURIComponent(headerParams.mbox) +
                '&curpage='+ 1 +'&offset=-1&search=FLAGGED' +
                '&sort=arrival&descOrd=1' +
                '&cleanQt='+ headerParams.cleanQt +'&cleanOffset='+ headerParams.cleanOffset;
                
                //busca as mensagens da pasta atual
                $.ajax({
                    url: 'getMessageList.php',
                    type: "GET",
                    data : params,
                    async : false,
                    cache: false,
                    success : function(JsonData){

                        var data = eval(JsonData);
                        
                        //total de mensagens favoritadas
                        MensagensFavTotal = (data.mensagens.length > 0 && filtro != 'FLAGGED') ? ', <span id="info-btn-fav"><span id="info-mbox-fav">' + data.mensagens.length + '</span> Favorit' + (data.mensagens.length==1?  'a ': 'as ' ) +  '</span>' : '';

                    }
                });
                
                
                //destaca a pasta
                //Main.activeMbox(mbox, accID);
                
                //se nao houver mensagens novas na mbox
                if(MensagensTotal > 0 && MensagensNovas < 1){
                    $('#info-mbox').html("<span id='info-mbox-caminho' title='"+ mbox +"'>" + Main.maskMboxName(mbox) + '</span>' + ' (<span id="info-mbox-total">aaaaaaaaa' + MensagensTotal + '</span> mensage' + (MensagensTotal==1?  'm ': 'ns ' ) + MensagensFavTotal +')');
                }
                //se nao houver nenhuma mensagem na mbox, soh exibe o nome da mbox
                else if(MensagensTotal < 1 && MensagensNovas < 1){
                    $('#info-mbox').html("<span id='info-mbox-caminhobbbbbbbbbb' title='"+ mbox +"'>" + Main.maskMboxName(mbox) + '</span>');
                    //$('#info-mbox').html("<span id='info-mbox-caminho' title='"+ mbox +"'>" + Main.maskMboxName(mbox) + '</span>' + ' (<span id="info-mbox-total">' + 0 + '</span> mensagens '+')');
                }
                //se houver mensagens e mensagens novas
                else{ 
                    $('#info-mbox').html("<span id='info-mbox-caminho' title='"+ mbox +"'>" + Main.maskMboxName(mbox) + '</span>' + ' (<span id="info-mbox-total">' + MensagensTotal + '</span> mensage' + (MensagensTotal==1?  'm ': 'ns ' ) + ', <span id="info-btn-unseen"><span id="info-mbox-novas">' + MensagensNovas +'</span> não lid' + (MensagensNovas==1?  'a ': 'as ' ) + '</span> '+ MensagensFavTotal +')');
                }
                
                //adiciona o evento do carregar as mensagens nao vistas da pasta atual
                $('#info-btn-unseen').on('click', function(){
                    Main.filterMessageList('search_and', {
                        FLAGS:["<b>Marcadas como</b> Não visualizada", "UNSEEN"]
                    });
                });
                
                
                //FAZER ISSO MELHOR... NA PASTA NAO LIDAS NAO FUNCIONA
                //adiciona o evento do carregar as mensagens favoritadas
                $('#info-btn-fav').on('click', function(){ 
                    Main.filterMessageList('search_and', {
                        FLAGS:["<b>Marcadas como</b> Marcadas", "FLAGGED"]
                    }); 
                });
                
                //pega outras informações pra atualizar 
                var curpage = data.curpage;
                var pagesize = data.pagesize;
                var orderby = data.orderby;
                var descorder = data.descorder;
                var searchby = data.searchby;
                
                //atualiza o objeto messagelist do objeto cache
                Main.updateCacheMessageList(accID, mbox, curpage, pagesize, MensagensTotal, searchby, orderby, descorder, MensagensNovas);
                
                //coloca o numero de novas mensagens ao lado da pasta
                Main.updateMessageCount({
                    'mbox' : mbox, 
                    'novas' : MensagensNovas, 
                    'total' : MensagensTotal,
                    'recent' : MensagensRecentes
                });

            },//getMessageList - success 
            
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //antes de exibir a box de erro, remove o loading, remove a propria box de erro(caso tenha algum erro anterior)
                $('#message-list-area .message-loading').remove();
                $('#message-error').remove();
                $('#message-list-area').append($("<div id='message-error'> Erro ao listar mensagens : " + (errorThrown) ? errorThrown : textStatus + '. Recarregue a pasta ' + "</div>"));
            },
            
            complete : function(xhrObject){

                //insere a tr com a mensagem na grid de mensagem
                setTimeout(function(){

                    $('#tbl-message-list-body').empty().append($(TrMensagem));
                    
                    //se foi passada uma funcao callback, a chama
                    if(typeof(callBack) == 'function'){
                        callBack();
                    }

                    //aplica o modo de view
                    $('body').trigger('viewchange');
                    $('#message-dragbar-vertical').trigger('mousedown').trigger('mousemove').trigger('mouseup');

                },0);
                
                
                var totalPaginas = Math.ceil(window.configs.cache.messagelist.total / window.configs.cache.messagelist.pagesize);
                var paginaAtual = window.configs.cache.messagelist.curpage;
                
                //nao deixa a pagina atual ser maior que o numero total de paginas
                if(paginaAtual > totalPaginas){
                    paginaAtual = totalPaginas;
                }
                
                if(totalPaginas == 0){
                    $('#paginacao-display').text('1 de 1');
                    $('#paginacao-display').attr('title', $('#paginacao-display').text());
                }else{
                    $('#paginacao-display').text(paginaAtual + ' de ' + totalPaginas);
                    $('#paginacao-display').attr('title', $('#paginacao-display').text());
                }
                
                //se estiver na primeira pagina da paginacao, desabilita os botoes de voltar e primeira pagina
                if(paginaAtual == 1){
                    $('#paginacao-btn-back').addClass('paginacao-btn-disable');
                    $('#paginacao-btn-first').addClass('paginacao-btn-disable');
                }else{
                    setTimeout(function(){
                        $('#paginacao-btn-back').removeClass('paginacao-btn-disable');
                        $('#paginacao-btn-first').removeClass('paginacao-btn-disable');
                    },300);
                }
                
                //se estiver na ultima pagina da paginacao, desabilita os botoes de proximo e ultima pagina
                if(totalPaginas == 0 || paginaAtual == totalPaginas){
                    $('#paginacao-btn-next').addClass('paginacao-btn-disable');
                    $('#paginacao-btn-last').addClass('paginacao-btn-disable');
                }else{
                    setTimeout(function(){
                        $('#paginacao-btn-next').removeClass('paginacao-btn-disable');
                        $('#paginacao-btn-last').removeClass('paginacao-btn-disable');
                    },300);
                }

                

            }

        });//ajax


},




    /*
     * setMessageListArea
     * 
     * Inicia o plugin de arrastar mensagens para dentro das pastas e outras acoes
     * 
     * 
     * @author Bruno Andrade
     * 
     * @since 28/05/2013
     * 
     * @return void  
     *       
     */
     'setMessageListArea' : function(){

        //desabilita a selecao de texto das tr's
        $("#message-list-area #tbl-message *").attr("onselectstart","return false");
        
        //exibe o icone de arrastar das mensagens - .9999 equivale a 1, um bugfix para o firefox
        $('#message-list-area #tbl-message').delegate('tr','mouseenter', function(e){            
            //$(this).css('background-color', '#d9d9d9');
            $('.td-drag', this).stop(true,true).delay(350).animate({
                opacity : .9999
            }, 200);          

        }).delegate('tr', 'mouseleave', function(){

            //se a mensagem da tr possui uma chave branca, no mouseleave, muda o icone pra uma chave mais escura
            if($('.td-chave-white', this)[0]){ 
                if(!/tbl-message-checked/.test($(this).attr('class'))){
                    $('.td-chave-white', this).css('background' , 'url("templates/default/img/messagelist/td-chave-white.png") 10px 8px no-repeat');
                }
            }
            
            //verifica se a tr possui a classe 'nova-mensagem'
            var BoNovaMensagem = (/nova-mensagem/.test($(this).attr('class'))) ? true : false;
            
            //define qual vai ser a cor do fundo da tr quando tirar o mouse de cima
            var backGroundColor = (BoNovaMensagem) ? '#f3f3f3' : '#ffffff';
            
            $(this).css('background-color' , backGroundColor);
            $('.td-drag', this).stop(true,true).animate({
                opacity : 0
            }, 200);           
        });


        //inicia o plugin de multipla selecao
        $('#tbl-message tbody').multiSelect({
            //unselectOn: '#tbl-message tbody .checked', 
            selected : 'tbl-message-checked', 
            filter : ' > tr'            
        });
        
        //marca as estrelas ao clicar
        $('.td-fav').live('click', function(e){

            //mostra o cursor de loading
            Main.loadingCursor('show');
            
            //verifica de onde esta favoritando a mensagem, se estiver na pasta 'nao lidas' pega a pasta da mensagem de um campo hidden da tr, senao, pega do objeto cache
            var mbox = ($(this).parent().find('.pasta')[0]) ? $(this).parent().find('.pasta').val() : window.configs.cache.messagelist.mbox;
            
            //favorita a mensagem
            $.ajax({
                url: "mailboxAct.php?&act=setflags&accID="+window.configs.cache.messagelist.accID+"&mbox="+ encodeURIComponent(mbox) +"&flags=" + encodeURIComponent('+flagged') + "&mIDs=" + $(this).parent().attr('id'),
                type: "GET",
                cache : false,
                success : function(JsonData){
                    //esconde o cursor de loading
                    Main.loadingCursor('hide');
                    $(e.target).toggleClass('td-fav-marcado').toggleClass("td-fav");
                }//success
            });//ajax
            
            return false;

        });       


$('.td-marcarSpam').live('click', function(e){

    e.stopPropagation();

    var tr = $(e.target).parent();

    tr.addClass('tbl-message-checked');

    if(confirm('Deseja realmente marcar como SPAM?')){

        MainActions.marcarComoSpam();

        setTimeout(function(){
            $('#tbl-message-list-body tr:first .td-assunto').trigger('click').trigger('click');
        },2000);

    }

});



        //marca como lida e nao lida
        $('td[class*=carta-]').live('click', function(){

            //flag da mensagem
            var flag;
            
            //td do icone
            var icone = $(this);
            
            //verifica qual flag colocar na mensagem
            if(icone.attr('class') == 'td-carta-aberta'){
                flag = '-seen';
            }
            else{
                if(/nova-mensagem/.test(icone.parent().attr('class'))){
                    flag = '+seen';
                }else{                    
                    flag = '-seen';
                }
            }
            
            //verifica de onde esta marcando a mensagem, se estiver na pasta 'nao lidas' ou 'favoritos' pega a pasta da mensagem de um campo hidden da tr, senao, pega do objeto cache
            var mbox = ($(this).parent().find('.pasta')[0]) ? $(this).parent().find('.pasta').val() : window.configs.cache.messagelist.mbox;
            
            //pega o id da mensagem
            var messageID = $(this).parent().attr('id');
            
            //mostra o cursor de loading
            Main.loadingCursor('show');
            
            //muda a flag dela pra vista/nao vista
            $.ajax({
                url: "mailboxAct.php?&act=setflags&accID="+window.configs.cache.messagelist.accID+"&mbox="+encodeURIComponent(mbox)+"&flags="+ encodeURIComponent(flag) +"&mIDs="+ messageID,
                type: "GET",
                cache : false,
                success : function(JsonData){

                    //esconde o cursor de loading
                    Main.loadingCursor('hide');
                    
                    //se o icone da carta que foi clicada estava aberta...
                    if(icone.attr('class') == 'td-carta-aberta'){

                        //coloca a classe de nova mensagem na tr
                        icone.parent().addClass('nova-mensagem');
                        
                        //fecha a carta
                        icone.attr('class', 'td-carta-fechada');
                        
                        //muda o title da carta
                        icone.attr('title', 'Marcar como lida');

                    }else if(icone.attr('class') == 'td-carta-fechada'){ //se estava fechada

                        //formata a tr
                        icone.parent().removeClass('nova-mensagem');
                        
                        //muda o icone da mensagem pra carta fechada
                        icone.attr('class', 'td-carta-aberta');
                        
                        //muda o title da carta
                        icone.attr('title', 'Marcar como não lida');

                    }else{ //outras cartas

                        //se for nova mensagem
                        if(/nova-mensagem/.test(icone.parent().attr('class'))){

                            //adiciona a classe de nova mensagem
                            icone.parent().removeClass('nova-mensagem');
                            
                            //muda o title da carta
                            icone.attr('title', 'Marcar como lida');

                        }else{                            

                            //tira a classe de nova mensagem
                            icone.parent().addClass('nova-mensagem');
                            
                            //muda o title da carta
                            icone.attr('title', 'Marcar como não lida');

                        }

                    }//outras cartas
                    
                    
                    //verifica se esta marcando a mensagem como lida/nao lida da listagem da pasta 'nao lidas''
                    if(icone.parent().find('.pasta')[0]){

                        //objeto json com as informacoes
                        var data = eval('('+JsonData+')');
                        
                        //pega o numero de novas mensagens
                        var novas = data['return'].data.unseen;
                        var mbox = data['contextMailbox'];
                        
                        
                        //atualiza o contador de mensagens (na barra de informacao e ao lado da pasta)
                        Main.updateMessageCount({
                            'novas' : novas,
                            'mbox' : mbox
                        });
                        
                        //pega o total de mensagens nao lidas
                        var totalUseen = $('#info-mbox-total').text();
                        
                        if(flag == '-seen'){
                            totalUseen = parseInt(totalUseen) + 1;
                        }else{
                            totalUseen = parseInt(totalUseen) - 1;
                        }
                        //atualiza o contador
                        Main.updateMessageCount({
                            'total' : totalUseen
                        });

                    }else{//se nao estiver listando da pasta 'nao lidas' atualiza o contador de mensagens normalmente

                        //informacoes para atualizar o contador das mensagens
                        //converte o retorno (string) para objeto
                        var json = eval('('+JsonData+')');
                        
                        var novas = json['return'].data.unseen;
                        var total = json['return'].data.exists;
                        var mbox = json.contextMailbox;
                        
                        //atualiza o contador de mensagens (na barra de informacao e ao lado da pasta)
                        Main.updateMessageCount({
                            'novas' : novas, 
                            'total' : total, 
                            'mbox' : mbox
                        });

                    }

                }//success
            });///ajax flag de mensagem vista/nao vista

});


$('.td-fav-marcado').live('click', function(e){

            //mostra o cursor de loading
            Main.loadingCursor('show');
            
            //verifica de onde esta desfavoritando a mensagem, se estiver na pasta 'nao lidas' pega a pasta da mensagem de um campo hidden da tr, senao, pega do objeto cache
            var mbox = ($(this).parent().find('.pasta')[0]) ? $(this).parent().find('.pasta').val() : window.configs.cache.messagelist.mbox;
            
            //desfavorita a mensagem
            $.ajax({
                url: "mailboxAct.php?&act=setflags&accID="+window.configs.cache.messagelist.accID+"&mbox="+ encodeURIComponent(mbox) +"&flags=" + encodeURIComponent('-flagged') + "&mIDs=" + $(this).parent().attr('id'),
                type: "GET",
                cache : false,
                success : function(JsonData){
                    //esconde o cursor de loading
                    Main.loadingCursor('hide');
                    $(e.target).toggleClass('td-fav').toggleClass("td-fav-marcado");
                }//success
            });//ajax

        });



        //inicia o drag e drop das tr's somente depois que as requisicoes terminarem, pra garantir que as tr's ja estao criadas
        $("body").ajaxStop(function() {

            //um timeout pra garantir mais ainda rs
            setTimeout(function(){


                /* verifica se o drag/drop esta definidos */                
                if( typeof $('#tbl-message tr').draggable === 'undefined' || typeof $(".conta-mbox-container li div").droppable === 'undefined' ){
                    return false;
                }
                
                /* inicia o drag*/  
                $('#tbl-message tr').draggable({
                    handle : '.td-drag, .td-autor, .td-assunto, .td-data',
                    
                    //assim que comecar a arrastar uma mensagem
                    start : function(event, ui){ 

                        //marca a mensagem que esta sendo arrastada
                        $('.tbl-message-checked').find('.td-assunto').trigger('click');
                        $(this).addClass('tbl-message-checked');
                        
                        //pega o total de mensagens selecionadas
                        var ItCheckedMessages = $('.tbl-message-checked').length;
                        //exibe a box de help quando estiver arrastando e formata o texto : mensagem/mensagens
                        (ItCheckedMessages > 1) ?  $('.tbl-message-help').html('Movendo ' + ItCheckedMessages + ' mensagens') : $('.tbl-message-help').html('Movendo ' + ItCheckedMessages + ' mensagem'); 
                        
                    },
                    //cria a div que sera o help - o que sera exibido quando estiver arrastando uma mensagem
                    helper : function(event, ui){
                        return $("<div class='tbl-message-help'></div>");
                    }, 
                    cursor : 'move',
                    appendTo : 'body', //coloca a div help como filha do body, para nao ficar sendo arrastavel apenas na listagem de mensagens
                    cursorAt : {
                        left : -3, 
                        top : 5
                    },
                    scroll : false,
                    containment : 'document', //nao deixa passar da tela quando arrastar pra fora dela
                    drag : function(event, ui){  }, //quando estiver arrastando...
                    revert : 'invalid' //se largar num lugar nao permitido           
                });                               
/*drag*/




/* drop */
$(".conta-mbox-container li div").droppable({
    tolerance : 'pointer',
    drop : function(event, ui) {

                        /*
                         * Observacao importante!
                         * Esse evento Drop eh disparado quando droppa uma mensagem(tr) e quando muda a ordem da pasta - pois o plugin de mover pastas NestedSortable usa 
                         * o drop do jquery .droppable...
                         **/

                        //mostra o cursor de loading
                        Main.loadingCursor('show');
                        
                        //pega os id das mensagens que foram marcadas e movidas
                        var mensagens = $('.tbl-message-checked');
                        var mensagensID = '';
                        
                        //se moveu so uma...
                        if(mensagens.length == 1){
                            mensagensID = mensagens.attr('id');
                        }else{
                            //se marcou mais de uma...
                            $('.tbl-message-checked').each(function(i, msg) {

                                //pega o id da mensagem
                                var mensagem = $(this).attr('id');
                                mensagensID += mensagem + ',';

                            });
                            
                            //remove a ultima ',''
                            mensagensID = mensagensID.slice(0,-1);

                        }
                        
                        //so continua se houver algum id de mensagem sendo arrastada
                        //eh verificado se ha id de mensagem, pois esse evento tamb acontece quando esta mudando a ordem das pastas
                        //esse if confirma se esta de fato movendo a mensagem pra pasta
                        if(mensagensID){

                            //pega a conta a qual esta movendo a mensagem
                            var accID = $(event.target).parent().parents('.conta-mbox-container').parent().attr('id').replace('mbox-','');
                            
                            //nao deixa dropar mensagens de uma conta pra outra
                            if(accID != window.configs.cache.messagelist.accID){
                                //esconde o cursor de loading
                                Main.loadingCursor('hide'); 
                                return false;
                            }
                            
                            //pega a pasta em que sera dropada a mensagem
                            var mboxTarget = $(event.target).parent();
                            
                            //se estiver droppando a mensagem na pasta 'nao lidas' retorna
                            if($.trim(mboxTarget.text().toLowerCase()) == 'não lidas'){
                                Main.loadingCursor('hide');
                                return false;
                            }
                            
                            //monta um array associativo das pastas atual da conta 
                            //var dirMap = Main.serializeMbox(accID, mboxTarget);
                            
                            //funcao recursiva que ira montar o caminho completo da pasta que esta sendo arrastada
                            //$.each(dirMap, Main.getMboxOrigem);
                            
                            //pegando o destino do campo origem 
                            //var destino = $('#origem').val().split('/').reverse().join('/').replace('root/', '').slice(0, -1) + '/' +  mboxTarget.attr('id').replace(/[0-9]+-/, '');
                            
                            var destino = mboxTarget.attr('title') + mboxTarget.attr('id').replace(/[0-9]+\-/, '');
                            
                            //remove a barra do inicio do caminho da pasta
                            if(destino.charAt(0) == '/'){
                                destino = destino.replace(destino.charAt(0), '');
                            }
                            
                            
                            //pega a origem da mensagem, verifica se esta movendo de dentro da 'pasta' 'nao lidas'
                            if($('#info-mbox-caminho').text() == 'Não lidas'){
                                var origem = $('#tbl-message-list-body #' + mensagensID).find('.pasta').val();
                            }else{
                                var origem = $('#info-mbox-caminho').attr('title');
                            }
                            
                            //por fim, move a mensagem
                            MainActions.moverMensagem(accID, origem, destino, mensagensID);

                        }//if mensagensID

                    }//drop        
                });
}, 1800);
});
/*drop*/

$('#tbl-message-list-body tr span').live('click', function(){

    $(this).parent().trigger('click');

})

/* abre a mensagem quando clicar na tr da mensagem */
$('#tbl-message-list-body tr').live('click', function(e){

            //quem foi clicado
            var target = $(e.target);
            
            //coloca o foco na ultima tr clicada
            $(this).focus();
            
            //se estiver clicando na tr e a mesma ja estiver marcada, a desmarca
            if(!/tbl-message-checked/.test(target.parent().attr('class'))){
                //se estiver desmarcando apenas uma mensagem, limpa a area de leitura
                if($('.tbl-message-checked').length < 1){
                    $('#message-read-area #message-content').empty();
                }
                
                return false;
            }
            
            //o id da mensagem
            var messageID = $(this).attr('id');
            
            //se estiver clicando na estrela ou no drag nao abre a mensagem
            if(target.attr('class') == 'td-fav' || target.attr('class') == 'td-fav-marcado' || target.attr('class') == 'td-drag' || /carta/.test(target.attr('class'))){
                return true;
            }
            
            //se a mensagem da tr possui uma chave branca, muda o icone pra uma chave mais clara
            if($('.td-chave-white', this)[0]){ 
                $('.td-chave-white', this).css('background' , 'url("templates/default/img/messagelist/td-chave-white-hover.png") 10px 8px no-repeat');
            }
            
            //se tiver mais de uma mensagem selecionada, exibe uma mensagem
            if($('.tbl-message-checked').length > 1){
                $('#message-read-area #message-content').empty().append($("<div id='message-alert'> Mais de 1 mensagem selecionada. </div>"));
                return true;
            }
            
            
            
            //se clicou na tr e deu tudo certo, remove a box de alerta, caso haja
            $('#message-alert').remove();
            
            //verifica se esta abrindo a mensagem da pasta 'nao lidas'
            var mbox = ($(this).find('.pasta')[0]) ? $(this).find('.pasta').val() : window.configs.cache.messagelist.mbox;
            //carrega o conteudo da mensagem            
            Main.loadMessage(window.configs.cache.messagelist.accID, mbox, messageID, target);
            
        //depois da mensagem ser carregada, coloca o foco na listagem de mensagens para poder navegar com o teclado
        //$('#message-list-area').focus();

        }); //tr click


        //verifica qual  tr ta selecionada e marca a checkbox automaticamente
        setInterval(function(){

            $('#tbl-message-list-body tr:not(.tbl-message-checked)').find('.td-checkbox .checkbox').removeClass('checked');
            $('.tbl-message-checked').find('.td-checkbox .checkbox').addClass('checked');
            
        }, 150);
        
        //quando clicar na checkbox
        $('.checkbox').live('click', function(){

            //marca ou desmarca a mensagem
            if(!/checked/.test($(this).attr('class'))){
                $(this).parent().parent().addClass('tbl-message-checked').find('.td-assunto').trigger('click');
            }else{
                $(this).parent().parent().removeClass('tbl-message-checked').find('.td-assunto').trigger('click');
            }
            
        });
        
        //quando clicar duas vezes na tr da mensagem, abre a compose de edicao
        $('#tbl-message-list-body tr').live('dblclick', function(e){

            var mensagem = $(this);

            setTimeout(function(){
                mensagem.addClass('tbl-message-checked').find('.td-assunto').trigger('click');

                $('#message-read-area #message-content').one('contentchange', function() {

                    $('#message-content .message-header .btn-maximizar').trigger('click');

                });

            },11)
            



            //MainActions.visualizarMensagem();
        });


    },
    
    
    
    
    
    
    
    
    
    
    
    
    /*
     * setContextMenu
     * 
     * Inicia o plugin de context menu, menu do topo e menu das pastas e mensagens
     * 
     * 
     * ol li div - div das pastas que chama o contextmenu
     * 
     * #context-menu - id da li no menu do topo
     * 
     * @author Bruno Andrade
     * 
     * @since 15/05/2013
     * 
     * @return void  
     *       
     */
     setContextMenu : function(){

        //inicia a variavel que recebera a pasta que foi aberto o contextMenu
        var pasta;
        
        //inicia o array de itens que ficam desabilitados
        var ArItensDisabled = {}; 
        
        //adiciona o evento de contextmenu ao body    
        $('body').on('contextmenu', function(e){

            //pega a pasta em que foi clicado com o botao direito
            pasta = $(e.target).parent();
            
            //pega o nome da classe da pasta
            var StMboxClass = $(e.target).parent().attr('class');
            
            //bloqueia algumas acoes do contextmenu, para algumas pastas
            if( (/mbox-caixa_de_entrada/.test(StMboxClass) ) || (/mbox-itens_enviados/.test(StMboxClass) ) || (/mbox-lixeira/.test(StMboxClass) ) || (/mbox-spam/.test(StMboxClass) ) || (/mbox-rascunhos/.test(StMboxClass) ) || (/mbox-inbox/.test(StMboxClass) ) || (/mbox-sent/.test(StMboxClass) ) || (/mbox-draft/.test(StMboxClass) ) || (/mbox-trash/.test(StMboxClass) ) ){
                ArItensDisabled['renomear'] = true;
                ArItensDisabled['excluir'] = true;
                ArItensDisabled['mover'] = true;
            }else{
                ArItensDisabled['renomear'] = false;
                ArItensDisabled['excluir'] = false;
                ArItensDisabled['mover'] = false;
            }
            
            //se estiver na caixa de entrada sem ser a principal, libera os menus
            if(/mbox-caixa_de_entrada/.test(StMboxClass) ){
                //se a pasta clicada nao tiver title e o id nao tiver INBOX, logo eh uma caixa de entrada secundaria
                if(pasta.attr('title') != '' || !/INBOX/.test(pasta.attr('id'))){
                    ArItensDisabled['renomear'] = false;
                    ArItensDisabled['excluir'] = false;
                    ArItensDisabled['mover'] = false;
                }
            }
            
            
        });


        //inicia o menu das pastas
        $.contextMenu({            
            selector: 'ol li div',            
            zIndex: 10,                        
            //ao clicar em cada item
            callback: function(key, options) {

                //verifica qual item do menu foi clicado
                var acao = key;
                
                //li da pasta clicada com o botao direito
                var LiPasta = options.$trigger.parent(); 

                //id da conta da pasta clicada
                var accID = LiPasta.closest('.conta-mbox-container').parent().attr('id').replace('mbox-',''); 

                //pega o caminho completo da pasta clicada
                //var mboxPath = Main.getMboxPath(LiPasta); 
                var mboxPath = LiPasta.attr('title') + LiPasta.attr('id').replace(/[0-9]+\-/, '');

                switch(acao){

                    //limpa os excluidos da pasta       
                    case 'limparExcluidos' :
                    MainActions.limparPasta(mboxPath, accID);
                    break;
                    
                    case 'esvaziarPasta' :
                    MainActions.esvaziarPasta(mboxPath, accID);
                    break;           
                    
                    case 'moverPasta' :
                    MainActions.moverPasta(mboxPath, accID);
                    break;
                    
                    case 'renomearPasta' :
                    MainActions.renomearPasta(mboxPath, accID);
                    break;
                    
                    case 'removerPasta' :
                    MainActions.removerPasta(mboxPath, accID);
                    break;

                }//switch

            },            
            //itens do menu
            items: {
                "renomearPasta"    : {
                    "name" : "Renomear", 
                    "disabled" : function(){
                        return ArItensDisabled['renomear']
                    }
                },
                "moverPasta"          : {
                    "name" : "Mover", 
                    "disabled" : function(){
                        return ArItensDisabled['mover']
                    }
                },
                "limparExcluidos"          : {
                    "name" : "Limpar excluídos"
                },
                "separador1" : "---------",
                "esvaziarPasta"       : {
                    "name" : "Esvaziar"
                },
                "removerPasta"          : {
                    "name" : "Excluir", 
                    "disabled" : function(){
                        return ArItensDisabled['excluir']
                    }
                }
            }

        });//menu das pastas




        //inicia o menu de contexto do topo
        $.contextMenu({            
            selector: '#context-menu',            
            trigger : 'left', //abrir com o click esquerdo          
            zIndex : 11,            
            //ao clicar em cada item do menu
            callback: function(key, options) {

                //verifica qual item do menu foi clicado
                var acao = key;
                
                switch(acao){
                    case 'novaMensagem' :
                    MainActions.novaMensagem();
                    break;
                    case 'novaPasta' :
                    MainActions.novaPasta();
                    break;
                    case 'novoContato' :
                    MainActions.contatosManager();
                    break;
                    case 'pastas' :
                    MainActions.pastasManager();
                    break;
                    case 'controleSpam' :
                    MainActions.spamManager();
                    break;
                    case 'listaBranca' :
                    MainActions.listaBrancaManager();
                    break;
                    case 'listaNegra' :
                    MainActions.listaNegraManager();
                    break;
                    case 'listaNegraPalavras' :
                    MainActions.listaNegraPalavrasManager();
                    break;
                    case 'seguranca' :
                    MainActions.segurancaManager();
                    break;
                    case 'regrasOrdem' :
                    MainActions.regrasSieveManager();
                    break;
                    case 'regrasConfiguracao' :
                    MainActions.sieveBackupManager();
                    break;
                    case 'emailsAlias':
                    MainActions.emailsAlias();
                    break;
                    case 'contasAdicionais' :
                    MainActions.contasAdicionaisManager();
                    break;
                    case 'trocarSenha' :
                    MainActions.senhaManager();
                    break;
                    case 'esvaziarLixeira' :
                    MainActions.esvaziarLixeira();
                    break;
                    case 'limparPastaAtual' :
                    MainActions.limparPasta(window.configs.cache.messagelist.mbox);
                    break;
                    case 'limparTodasPastas' :
                    MainActions.limparPastas();
                    break;
                    case 'preferencias' :
                    MainActions.preferenciasManager();
                    break;
                    case 'cabecalhoSimplesView' :
                    MainActions.setMessageView('CABECALHO');
                    break;
                    case 'cabecalhoView' :
                    MainActions.setMessageView('CABECALHO');
                    break;
                    case 'codigoFonteView' :
                    MainActions.setMessageView('FONTE');
                    break;
                    case 'textoView' :
                    MainActions.setMessageView('TEXTO');
                    break;
                    case 'htmlView' :
                    MainActions.setMessageView('HTML');
                    break;
                    case 'templateAntigo' :
                    $(window.document.location).attr('href','main-old.php');
                    break;
                    case 'sair' :
                    MainActions.logout();
                    break;
                }

            },
            
            
            //itens do menu
            items: {                

                //Contas adicionais
                "contasAdicionais": {
                    "name": "Contas"
                },
                
                //Pastas
                "pastas": {
                    "name": "Pastas"
                },
                
                // Alias
                "emailsAlias": {
                    "name": "Alias"
                },
                
                //Filtros e Regras
                /*"filtrosRegras": {
                    "name": "Filtros e regras", 
                    "items": {
                        "controleSpam" : {
                            "name": "Controle automático de SPAM"
                        }, 
                        "listaBranca" : {
                            "name": "Lista branca"
                        }, 
                        "listaNegra" : {
                            "name": "Lista negra"
                        },
                        "listaNegraPalavras":{
                            "name": "Lista negra de palavras"
                        },  
                        "regrasOrdem" : {
                            "name": "Regras gerais e ordem de execução"
                        }, 
                        "regrasConfiguracao" : {
                            "name": "Arquivo de regras e configurações"
                        }
                    }
                },*/
                
                //Controle de spam
                "controleSpam":{
                    "name":"Spam"
                },
                
                //Regras
                "regrasOrdem":{
                    "name":"Regras"
                },
                //Seguranca
                "seguranca":{
                    "name":"Segurança"
                },
                //Listas de regras especiais
                "listas":{
                    "name":"Listas",
                    "items": {
                        "listaNegra":{
                            "name":"Lista negra de remetentes"
                        },
                        "listaBranca":{
                            "name":"Lista branca de remetentes"
                        },
                        "listaNegraPalavras":{
                            "name":"Lista negra de assuntos"
                        }
                    }
                },             
                
                //separador1
                "separador1": "---------",
                
                //Preferencias
                "preferencias": {
                    "name": "Preferências"
                },
                
                //Trocar senha
                /*"trocarSenha": {
                    "name": "Trocar senha"
                },*/
                
                //separador2
                "separador2": "---------",
                
                //Esvaziar lixeira
                "esvaziarLixeira": {
                    "name": "Esvaziar lixeira"
                },
                
                //Limpar excluidos
                "limparExcluidos": {
                    "name": "Limpar excluídos", 
                    "items": {
                        "limparPastaAtual"   : {
                            "name": "Pasta atual"
                        }, 
                        "limparTodasPastas" : {
                            "name": "Todas as pastas"
                        }
                    }
                },
                
                //separador3                
                "separador3": "---------",

                //Visualizacao
                "visualizacao": {
                    "name": "Visualização", 
                    "items": {
                        "cabecalhoView" : {
                            "name": "Cabeçalho"
                        }, 
                        "codigoFonteView" : {
                            "name": "Código fonte"
                        }, 
                        "textoView" : {
                            "name": "Texto"
                        }, 
                        "htmlView" : {
                            "name": "HTML"
                        }
                    }
                }


        //         "visualizacao": {
        //             "name": "Visualização", 
        //             "items": {
        //                 "corpoEmail" : {
        //                     "name": "Corpo email",
        //                     "items" : {
        //                         "textoView" : {
        //                          "name": "Texto"
        //                      },
        //                      "htmlView" : {
        //                         "name": "HTML"
        //                     }
        //                 }
        //             }, 
        //             "cabecalhoSimplesView" : {
        //                 "name": "Cabeçalho",
        //                 /*"items" : {
        //                     "cabecalhoSimplesView" : {
        //                        "name": "Simples"
        //                    },
        //                    "cabecalhoCompletoView" : {
        //                        "name": "Completo"
        //                    }
        //                }*/
        //            }, 
        //            "codigoFonteView" : {
        //             "name": "Código fonte"
        //         }
        //     }
        // }




    }
        });//menu do topo        




        //inicia o menu das mensagens
        $.contextMenu({            
            selector: '#tbl-message tr',
            zIndex: 12,
            //ao clicar em cada item
            callback: function(key, options) {

                //verifica qual item do menu foi clicado
                var acao = key;

                //tr alvo do botao direito
                var TrMensagem = options.$trigger; 
                
                //muda a classe pra marcada
                TrMensagem.addClass('tbl-message-checked');
                
                var accID = window.configs.cache.messagelist.accID;
                var mbox = window.configs.cache.messagelist.mbox;
                var nMensagensSelecionadas = $('.tbl-message-checked');
                var ArMensagensID = Array();
                
                for(var i = 0; i < nMensagensSelecionadas.length; i++){
                    ArMensagensID.push($(nMensagensSelecionadas[i]).attr('id'));
                }
                
                
                //
                if(/rule/gi.test(acao)){

                    //pega o nome da regra que foi clicada
                    var StTituloRegra = options.items['adicionarARegra']['items'][acao].name;

                    //abre a modal
                    MainActions.gerenciarRegraModal(acao, StTituloRegra);

                }
                switch(acao){
                    case 'encaminharTexto' :
                    MainActions.encaminharMensagem('texto');
                    break;    
                    case 'editarMensagem' :
                    MainActions.editarMensagem();
                    break;   
                    case 'adicionarContatos' :
                    MainActions.adicionarContatos();
                    break;   
                    case 'copiarPara' :
                    MainActions.copiarMensagem();
                    break; 
                    case 'moverPara' :
                    MainActions.moverMensagemAntigo();
                    break;     
                    case 'marcarLida' :
                    MainActions.marcarMensagem('lida');
                    break;   
                    case 'marcarNaoLida' :
                    MainActions.marcarMensagem('naoLida');
                    break;   
                    case 'identificarSpam' :
                    MainActions.adicionarAListaNegra();
                    break;
                    case 'marcarComoSpam' :
                    MainActions.marcarComoSpam();
                    break;
                    case 'marcarComoConfiavel' :
                    MainActions.marcarComoConfiavel();
                    break;
                    case 'identificarConfiavel' :
                    MainActions.adicionarAListaBranca();
                    break;   
                    break;   
                    case 'restaurarMensagem' :
                    MainActions.restaurarMensagem(accID, mbox, ArMensagensID);
                    break;
                    case 'imprimir' :
                    MainActions.imprimirMensagem();
                    break;   
                }
                
            },
            build : function($trigger, e){

                //pega as regras do usuario
                var ArRegrasMenu = JSON.parse(window.configs.ArRegrasMenu);

                //monta o item dinamicamente com as regras               
                var itemDinamico = {};
                
                /* Armazena um vetor com as regras em ordem alfabética*/
                var regrasOrdendas = [];
                
                //percorre cada regra
                for(var i in ArRegrasMenu)
                    regrasOrdendas.push(ArRegrasMenu[i]);
               
                   /*Ordena vetor em ordem alfabética crescente*/
                   regrasOrdendas = regrasOrdendas.sort(function(a,b){
                        if ( a['StTitulo'] < b['StTitulo'])
                            return -1;
                        if ( a['StTitulo'] > b['StTitulo'])
                            return 1;
                        return 0;
                    });
                    
               
               for(var i=0; i<regrasOrdendas.length;i++)
                   itemDinamico[regrasOrdendas[i]['IDRegra']] = {'name' : regrasOrdendas[i]['StTitulo']};
               
                
                //verifica se tem regra
                var BoRegraMenu = 0;
                for(i in ArRegrasMenu){
                    BoRegraMenu++;
                }

                
                //monta o menu
                return {

                    items: {

                        "encaminharTexto" : {
                            "name" : "Encaminhar como texto"
                        },

                        


                        "separador1": "----------------------------------------------",




                        "marcarComoSpam" : {
                            "name" : "Marcar como SPAM",
                            disabled : function(item, object){

                                var item = object.items[item].$node;

                                if($.trim($('#barra-mbox #info-mbox-caminho').attr('title')) == 'SPAM'){
                                    item.hide();
                                }else{
                                    item.show();
                                }

                            }
                        },
                        
                        "marcarComoConfiavel" : {
                            "name" : "Marcar como confiável",
                            disabled : function(item, object){

                                var item = object.items[item].$node;

                                if($.trim($('#barra-mbox #info-mbox-caminho').attr('title')) == 'SPAM'){
                                    item.show();
                                }else{
                                    item.hide();
                                }

                            }
                        },


                        

                        "separador2": "----------------------------------------------",





                        "adicionarContatos" : {
                            "name" : "Adicionar aos contatos"
                        },

                        "identificarConfiavel" : {
                            "name" : "Adicionar à lista branca"
                        },

                        "identificarSpam" : {
                            "name" : "Adicionar à lista negra"                            
                        },
                        
                        "adicionarARegra" : {
                            "name" : "Adicionar à regra",
                            'items' : (BoRegraMenu) ? itemDinamico : '',
                            disabled: function(key, opt) {

                                var btnAdicionarARegra = opt.$menu.find('.context-menu-item span:contains("Adicionar à regra")');

                                if(!BoRegraMenu){

                                    btnAdicionarARegra.parent().hide();

                                }else{

                                    btnAdicionarARegra.parent().show();

                                }

                                return !BoRegraMenu;

                            }
                        },
                        

                        


                        "separador3": "----------------------------------------------",

                        


                        "marcarLida"          : {
                            "name" : "Marcar como lida"
                        },
                        "marcarNaoLida"          : {
                            "name" : "Marcar como não lida"
                        },

                        


                        "separador4": "----------------------------------------------",




                        "copiarPara"          : {
                            "name" : "Copiar para"
                        },

                        "moverPara"          : {
                            "name" : "Mover para"
                        },

                        


                        "separador5": "----------------------------------------------",




                        "editarMensagem"          : {
                            "name" : "Editar mensagem"
                        },
                        "restaurarMensagem"          : {
                            "name" : "Restaurar"
                        },                
                        "imprimir"          : {
                            "name" : "Imprimir"
                        }
                    }

                }//

            }//build

        });//menu das mensagens













    $('.menu-mais .item').live('mouseover', function(){
        $(this).stop(true,true).animate({
            backgroundColor : '#D9D9D9'
        }, 200); 
    }).live('mouseleave', function(){
        $(this).stop(true,true).animate({
            backgroundColor : '#f1f1f1'
        }, 200);
    });


    
},


    //atualiza o objeto de regras do menu do window
    atualizaMenuRegras : function(){

        $.ajax({
            url  : './plugins/sieve/Regras/xhrListarRegrasMenu/accID/' + window.configs.cache.messagelist.accID,
            type : 'POST',
            complete : function(response){

                window.configs.ArRegrasMenu = response.responseText;

            }
        });
    },





    /*
     * refreshAreaSize()
     * 
     * Redimensiona as areas, num intervalo de 10ms
     *  
     * 
     * redimensiona : 
     *                              #conta-list (height) - na area das pastas
     *                              #message-list-area(height e width)
     *                              #message-read-area(height e width)
     *                              #message-content(height) - container do conteudo da mensagem
     *                              
     *                              
     * posiciona:    #mbox-dragbar - ao lado direito da #mbox-list-area
     *                    
     *                    
     *                    
     * 
     * #mbox-dragbar
     * #mbox-list-area
     * #conta-list
     * #message-list-area
     * #message-read-area
     * #message-content
     * 
     * #conta-list
     * #message-list-area
     * #message-list-content
     * 
     * 
     * @author Bruno Andrade
     * 
     * @since 09/05/2013
     * 
     * @return void  
     *       
     */
     'refreshAreaSize' : function(){ 

        window.setInterval(function(){
            
           Main.changeBrowserTitle(totalRecents);

            //posiciona a dragbar da listagem de pastas
            $('#mbox-dragbar').css('left', $('#mbox-list-area').width());
            
            //redimensiona o tamanho da area de listagem de pastas
            $('#conta-list').height( ($(window).height() - 140) + 'px');
            

            //se estiver no modo vertical
            if($('body').hasClass('vertical')){

                //resimensiona o tamanho da area de listagem de mensagens
                if($('#corpoCAMADA').length){

                    $('#message-list-area').css('width', $(window).width());

                }else{

                    $('#message-read-area').css('width', $(window).width() - $('#message-read-area').offset().left)

                }

                //redimensiona o tamanho da area de leitura de mensagens
                //$('#message-read-area').css('width', ($(window).width() - $('#message-list-area').width()) - $('#conta-list').width());   
                $('#message-read-area').css('height', $(window).height());
                //$('#message-read-area').css('left', $('#message-list-area').width());
                
                $('#message-content').css('height', $(window).height() - 70);

                //posiciona o menu do header
                //var menuTrigger = $('#message-read-area .message-header .btn-container .btn-mais');
                //$('.menu').css('left', menuTrigger.offset().left);
                
                //RUDS - 19/05/16
                //Posiciona a data/hora próximo ao dragbar vertical
                $('#message-list-area #tbl-message td.td-autor').width(
                    ($('#message-list-area').width() -  $('#mbox-list-area').width()*1.7)
                    - (($('#message-list-area #tbl-message td.td-mbox').length) ? ($('#message-list-area #tbl-message td.td-mbox').width()+40):0) 
                    - (($('#message-list-area #tbl-message td.td-tamanho').length) ? ($('#message-list-area #tbl-message td.td-tamanho').width()):0)
                );


                /*$('#message-list-area tr .td-autor .autor').width($('#message-list-area').width() 
                                    - ($('#message-list-area #tbl-message td.td-mbox').length==0 ? 330 : (330 + $('#message-list-area #tbl-message td.td-mbox').width())))*/
                

            }else{//modo horizontal - normal

                //resimensiona o tamanho da area de listagem de mensagens
                $('#message-list-area').css('width', $(window).width() - $('#conta-list').width());               

                $('#message-area').css('width',  $(window).width() - $('#conta-list').width() );


                //redimensiona o tamanho da area de leitura de mensagens
                $('#message-read-area').css('width', $(window).width() - $('#conta-list').width());   
                $('#message-read-area').css('height', ( ($(window).height() - $('#message-list-area').height() - 60 /*+ 110*/)));   
                $('#message-content').css('height', ( ($(window).height() - $('#message-list-area').height() - 70 /*- 60*/)));

                //redimensiona a area de mensagens
                $('#message-area').css('height',  $('#message-list-area').height() + $('#message-read-area').height() /*+ 100*/);
                window.scrollTo(0,0);
            }

            //quando a box de filtro da busca nao estiver visivel
            if($('#message-filter-box').css('opacity') == 0){

                //modo vertical
                if($('body').hasClass('vertical')){
                    
                    $('#message-list-area').css('height', $(window).height() - 75 );
                }else{//horizontal
                    $('#message-list-area').css('height', ( $('#message-read-area').offset().top - 65));
                }
            }else{//quando estiver visivel
                if($('body').hasClass('vertical')){

                    $('#message-filter-box').css('margin-left', $('#mbox-dragbar').offset().left); //posiciona a box de filtro sempre ao lado da listagem de pastas
                    //$('#message-list-area').css('height', 100+'%');
                    $('#message-list-area').css('height', $(window).height() - 90 - ($('#message-filter-box').height()));

                }else{//horizontal
                    $('#message-list-area').css('height', ( $('#message-read-area').offset().top - 65));              
                    $('#message-filter-box').css('margin-left', $('#mbox-dragbar').offset().left); //posiciona a box de filtro sempre ao lado da listagem de pastas
                }
            }

            //redimensiona as scrolls
            $('#conta-list').getNiceScroll().resize();
            $('#message-list-area').getNiceScroll().resize();
            $('#message-content').getNiceScroll().resize();
            $('#anexo-zoom-foto-container').getNiceScroll().resize();
            
            //redimensiona o menu principal do topo
            if($(window).width()<1360){
                for(i=0;i<$('#topo-menu-principal ul li a').length;i++){
                    var icone = $('#topo-menu-principal ul li a')[i];
                    $(icone).width('25px').css('color','transparent').attr('title',$(icone).text());
                }
            }else{
                $('#topo-menu-principal ul li a').width('auto').css('color','#717171').attr('title','');
            }
            
            //verifica sempre se ha apenas uma mensagem selecionada, quando houver apenas uma, carrega a mensagem que ficou selecionada
            if($('.tbl-message-checked').length == 1){
                if($('#message-alert')[0]){

                    //carrega a mensagem que ficou selecionada
                    $('.tbl-message-checked').find('.td-assunto').trigger('click');

                }
            }else if($('.tbl-message-checked').length == 0){

                $('#message-alert').remove();

            }
        }, 10);


        //sempre que mudar o modo da view
        $('body').on('viewchange', function(){

            //vertical
            if($(this).hasClass('vertical')){
                //Posiciona a data/hora próximo ao dragbar vertical
                $('#message-list-area #tbl-message td.td-autor').width(
                    ($('#message-list-area').width() -  $('#mbox-list-area').width()*1.7)
                    - (($('#message-list-area #tbl-message td.td-mbox').length) ? ($('#message-list-area #tbl-message td.td-mbox').width()+40):0) 
                    - (($('#message-list-area #tbl-message td.td-tamanho').length) ? ($('#message-list-area #tbl-message td.td-tamanho').width()):0)
                );

                $('#message-list-area #tbl-message tr').css('max-height', 47+'px');

                //garante que vai disparar somente uma vez o evento
                if($('#message-list-area #tbl-message-list-body tr .assunto').length > 0){
                    return false;
                }

                //$('#message-list-area').css('width', (($(window).width() - $('#conta-list').width()) / 2) - 80);
                $('#message-read-area').css('left', $('#message-list-area').width())


                $('#mbox-list-area').width(210);
                $('#mbox-list-area #info-quota').width(117);
                $('#mbox-dragbar').trigger('dblclick').trigger('dblclick');

                $('#message-read-area').css('top', 0);
                $('#message-read-area').css('box-shadow', '0px 0px 10px rgba(0, 0, 0, 0.1)');
                $('#message-read-area').css('border-left', '1px solid #E5E5E5');
                $('#message-read-area').css('left', $('#message-list-area').width());

                //esconde a dragbar da area de leitura
                $('#message-read-area #message-dragbar').css('display', 'none');

                //TODO - sempre que muda de pasta, a area volta pro meio da tela
                $('#message-list-area').css('width', (($(window).width() - $('#conta-list').width()) / 2) - 80);
                //$('#message-read-area').css('left', $('#message-list-area').width())
                
              
 

                $('#message-dragbar-vertical').trigger('mousedown').trigger('mousemove').trigger('mouseup');

                //varre todas as tr
                $.each($('#message-list-area #tbl-message-list-body tr'), function(i, tr){

                    var tr = $(tr);
                    
                    var trAutor = tr.find('.td-autor');

                    var StAutor = trAutor.text();

                    trAutor.text('');

                    trAutor.append('<span class="autor">'+ StAutor +'</span>');

                    var trAssunto = tr.find('.td-assunto');

                    var trCheckbox = tr.find('.td-checkbox .checkbox');

                    var trData = tr.find('.td-data');

                    trAutor.append('<span class="assunto">' + trAssunto.text() + '</span>')

                    trAssunto.css('display', 'none');

                    trCheckbox.css('margin-top', '-8px');

                    //trData.css({'text-align': 'right', 'padding-right': '20px', 'max-width': '80px', 'text-overflow': 'ellipsis', 'overflow': 'hidden'})
                    
                });

                //mostra o menu em modo de tela cheia
                //$('#message-content .message-header .btn-maximizar').trigger('click');

                //esconde o botao de fechar da tela cheia da area de leitura
                $('#message-content .message-header .btn-fechar').addClass('invisivel');


            }else{//modo normal (horizontal)

                //reseta a area de leitura para o modo horizontal - normal
                $('#message-read-area').css('left', 0);
                $('#message-read-area').css('top', $(window).height() / 2);
                
                $('#message-read-area').css('box-shadow', 'none');
                $('#message-read-area').css('border-left', 'none');

                //mostra a dragbar da area de leitura
                $('#message-read-area #message-dragbar').css('display', 'block');
                
                


                $('#message-list-area tr .td-autor').removeAttr('style')

                //varre todas as tr
                $.each($('#message-list-area #tbl-message-list-body tr'), function(i, tr){

                    var tr = $(tr);
                    
                    var trAutor = tr.find('.td-autor');

                    var trAssunto = tr.find('.td-assunto');

                    var trCheckbox = tr.find('.td-checkbox .checkbox');

                    var trData = tr.find('.td-data');

                    if(trAutor.find('.assunto').length){

                        trAutor.find('.assunto').remove();

                        trAutor.text(trAutor.find('.autor').text())

                        trAutor.find('.autor').remove();

                    }

                    trAssunto.removeAttr('style');

                    trCheckbox.removeAttr('style');

                    trData.removeAttr('style');

                });


                setTimeout(function(){
                    $('#message-list-area tbody tr').removeAttr('style')
                },11)
                
                //exibe o botao de fechar da tela cheia da area de leitura
                $('#message-content .message-header .btn-fechar').removeAttr('style');

                //esconde o menu em modo de tela cheia
                $('#message-content .message-header .btn-fechar').trigger('click');
            }
        })
},










    /*
     * setCriarNovaPasta()
     * 
     * Inicia os eventos para criar uma nova pasta
     * 
     * @author Bruno Andrade
     * 
     * @since 04/11/2013
     * 
     * @return void  
     *       
     */    
     'setCriarNovaPasta' : function(){

        $('.conta-mbox-container .btn-nova-pasta').on('click', function(e){

            //pega o id da conta que ira criar a pasta
            var accID = $(this).parent().parent().attr('id').replace('mbox-','');
            
            //soh mostra o input pra por o nome da pasta uma vez
            if(!$(this).find('.nova-pasta-nome')[0]){
                $(this).append('<input class="nova-pasta-nome" id="nova-pasta-'+ accID +'" type="text" placeholder="Digite o nome da pasta..."> </input>');
                $(this).find('.nova-pasta-nome').slideDown('fast');
                $(this).find('.nova-pasta-nome').focus();
            }

        });
        
        //quando tirar o foco do input remove o mesmo
        $('.nova-pasta-nome').live('blur', function(){
            $(this).slideUp('fast', function(){
                $(this).remove();
            });            
        });
        
        //quando pressionar enter, cria a pasta
        $('.nova-pasta-nome').live('keypress', 'return', function(e){

            //pega a conta e o nome da pasta
            var accID = $(this).attr('id').replace('nova-pasta-','');
            var pastaNome = $(this).val().replace(/\\/g,'*'); //substitui todas as ocorrencias de '\' po '*' pois '\' nao eh capturado na regex
            
            //validar os nomes das pastas
            if(pastaNome.match(['[-@\'!#$%¨&*+_´`^~;:?|\?,./{}\/"<>()]'])){
                alert('Esse tipo de caractere não é permitido para criar uma pasta.');
                return false;
            }
            
            //mostra o loading do cursor
            Main.loadingCursor('show');
            
            //cria a pasta
            $.ajax({
                url: 'plugins/mboxmanager/createfolder/createfolder',
                type: "POST",
                data : 'mailboxCreate='+encodeURIComponent(pastaNome)+'&accID='+accID,
                cache: false,
                success : function(JsonData){

                    //quando terminar de criar a pasta, esconde o loading
                    Main.loadingCursor('hide');
                    
                    //recarrega a listagem de pastas
                    Main.loadMbox(accID);

                }
            });

        });

},









    /*
     * updateInterval()
     * 
     * verifica se o horario atual esta entre o intervalo que o usuario definiu nas preferencias
     * 
     */
     'updateInterval' : function(){

        //explode as strings com a hora inicial e hora final
        var timeFrom = configs.time_from.split(':');
        var timeUntil = configs.time_until.split(':');
        
        //cria os objetos de data
        var timeNow = new Date(); //agora
        var oficialFrom = new Date(); //inicial
        var oficialUntil = new Date(); //final
        
        //define a hora e minuto em timestamp da hora inicial
        oficialFrom.setHours(timeFrom[0]);
        oficialFrom.setMinutes(timeFrom[1]);
        
        //define a hora e minuto em timestamp da hora final
        oficialUntil.setHours(timeUntil[0]);
        oficialUntil.setMinutes(timeUntil[1]);
        
        var timeValueFrom = oficialFrom.getTime() - timeNow.getTime();
        var timeValueUntil = oficialUntil.getTime() - timeNow.getTime(); 
            
        //Adiciona oa timestamp caso a hora final seja menos que a inicial (outro dia)
        if(oficialUntil.getTime() > oficialFrom.getTime()){
        } else {
            timeValueUntil += 86400000;
        }
        
        //se a hora atual estiver no intervalo definido, retorna true      
        if ( timeValueFrom<0 && timeValueUntil>0 ) {
            return false;
        } else {
            return true;
        }
        
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /*
     * disablePaginationButtons()
     * 
     * desabilita os botoes da paginacao. essa funcao eh chamada sempre que um botao da paginacao eh clicado
     *  
     * @author Bruno Andrade
     * 
     * @since 17/07/2013
     * 
     * @return void  
     *       
     */
     'disablePaginationButtons' : function(){

        $('#paginacao-btn-next').addClass('paginacao-btn-disable');
        $('#paginacao-btn-first').addClass('paginacao-btn-disable');
        $('#paginacao-btn-back').addClass('paginacao-btn-disable');
        $('#paginacao-btn-last').addClass('paginacao-btn-disable');

    },
    
    
    
    
    
    
    
    
    
    /*
     * updateCacheMessageList()
     * 
     * Atualiza os valores do objeto messagelist.
     * 
     * Objeto que contem as seguintes informacoes : 
     * 
     * accID
     * mbox
     * curpage
     * pagesize
     * total 
     * searchby
     * orderby
     * descorder
     * unseen
     * 
     */
     'updateCacheMessageList' : function(accID, mbox, curpage, pagesize, total, searchby, orderby, descorder, unseen){
        window.configs.cache.messagelist={
            'accID': accID,
            'mbox': mbox,
            'curpage': curpage,
            'pagesize': pagesize,
            'total': total,
            'searchby': searchby,
            'orderby': orderby,
            'descorder': descorder,
            'unseen': unseen,
            'totalUnseen':0
        }


    },
    
    
    
    
    
    
    
    
    
    
    /*
     *
     * createMbox() - funcao recursiva executada dentro de um each em loadMbox()
     * 
     *  cria as pastas da conta e adiciona no container de pastas da conta
     *  
     *  aplica uma mascara de nomes para as pastas padrao ex: IBOX = Caixa de Entrada
     *  
     *  @param conta - callback do ajax (object)
     *  
     *  @author Bruno Andrade
     *
     *  @since 05/06/2013
     *
     */
     'createMbox' : function(key, val){
         
         
        //estamos dentro de um each
        
        //val.nomeunicode eh o id da pasta
        //pasta eh o nome mascarado da pasta ex. val.nomeunicode = inbox (id) pasta = caixa de entrada
        
        //pasta atual
        var pasta = val.nomeunicode;
        
        //pega o id da conta que vem na primeira pasta da conta pra poder adiciona-las ao container correto. obs. a cada iteracao do each, essa variavel mantem seu valor anterior
        arguments.callee.accID = arguments.callee.accID || val.accID;
        if(val.accID != undefined){
            arguments.callee.accID = val.accID;
        }
        
        //se houver mensagem nao lida, mostra o numero de mensagens nao lidas ao lado do nome da pasta
        var mensagemUnseen = (val.examination && val.examination.recent != undefined && val.examination.recent != 0) ? ' <span id="'+ val.nomeunicode +'-unseen-count" class="mbox-count-'+arguments.callee.accID+'">' + val.examination.recent + '</span>' : '';
        if(val.examination){
            totalRecents += parseInt(val.examination.recent);
        }
         
        
        //se houver mensagem nao lida, coloca a classe mbox-nova-mensagem
        var classMensagemUnseen = (mensagemUnseen) ? ' mbox-mensagem-unseen' : '';
        
        //mascara o nome das pastas
        pasta = Main.maskMboxName(pasta);
        
        var divDrag = ''; //variavel que tera a div de arrastar ou nao
        
        //pastas padrao nao sao arrastaveis e sao fixas
        if(pasta != 'Caixa de entrada' && pasta != 'SPAM' && pasta != 'INBOX'){
        //if(pasta != 'Itens enviados' && pasta != 'Lixeira' && pasta != 'Rascunhos' && pasta != 'Caixa de entrada' && pasta != 'SPAM' && pasta != 'Sent' && pasta != 'INBOX' && pasta != 'Draft' && pasta != 'Trash'){
            divDrag = " <div class='folder-drag'></div>";
        }
        
        
        //variavel que guardara as li de pastas a cada iteracao do each. obs. a cada iteracao do each, essa variavel mantem seu valor anterior
        arguments.callee.list = arguments.callee.list || '';
        
        
        //cria um id unico pra cada pasta. obs. a cada iteracao do each, essa variavel mantem seu valor anterior - de 0 a n 
        var boxID = arguments.callee.boxID = arguments.callee.boxID || 0;
        arguments.callee.boxID++;
        
        //enquanto tiver pastas
        if(key != 'lastDir'){

            //cria um id unico pra pasta, sendo o seu caminho completo
            var idUnico = val.pathunicode.replace(/\//g,'-')+val.nomeunicode;
            
            //total de mensagens nao lida
            var mensagensNaoLidas = (val.examination.unseen != undefined) ? val.examination.unseen : 0;
            
            if (val.filhos instanceof Object) { //pastas que contem filhos
                arguments.callee.list += "<li data-id='"+idUnico+"' data-ordemID='"+val.nomeunicode+"' data-naoLidas='"+mensagensNaoLidas+"' id='" + boxID + '-' + val.nomeunicode + "' title='"+ val.pathunicode +"' class='ui-droppable mjs-nestedSortable-branch mjs-nestedSortable-collapsed mbox-" + pasta.toLowerCase().replace(/ /g, '_') + classMensagemUnseen + "'><div><span class='disclose'><span></span></span>" + pasta + mensagemUnseen + divDrag + "</div>";
                arguments.callee.list += "<ol>";
                $.each(val.filhos, Main.createMbox);
                arguments.callee.list += "</ol>";
            } else { //pastas normais

                //se for a pasta nao lidas
                if(val.nomeunicode == 'naoLidas'){
                    arguments.callee.list += '<li id="mbox-naoLidas-'+ arguments.callee.accID +'" data-ordemid="'+val.nomeunicode+'" data-id="naoLidas" class="mjs-nestedSortable-no-nesting mbox-nao_lidas"><div class="ui-droppable"><span class="disclose"><span></span></span>Não Lidas <span id="naoLidas-unseen-count" class="mbox-count-0"></span></div></li>';
                }else if(val.nomeunicode == 'favoritos'){ //se for a pasta favoritas
                    arguments.callee.list += '<li id="mbox-favoritos-'+ arguments.callee.accID +'" data-ordemid="'+val.nomeunicode+'" data-id="favoritos" class="mjs-nestedSortable-no-nesting mbox-favoritos"><div class="ui-droppable"><span class="disclose"><span></span></span>Favoritos <span id="favoritos-unseen-count" class="mbox-count-0"></span></div></li>';
                }else{//pastas normais                    
                    arguments.callee.list += "<li data-id='"+idUnico.replace(/'/g,'&apos;')+"' data-ordemid='"+val.nomeunicode.replace(/'/g,'&apos;')+"' data-naoLidas='"+mensagensNaoLidas+"' id='" + boxID + '-' + val.nomeunicode.replace(/'/g,'&apos;') + "' title='"+ val.pathunicode.replace(/'/g,'&apos;') +"' class='mjs-nestedSortable-leaf mbox-" + pasta.replace(/'/g,'&apos;').toLowerCase().replace(/ /g, '_') + classMensagemUnseen + "'><div><span class='disclose'><span></span></span>" + pasta + mensagemUnseen +  divDrag + "</div></li>";
                }   
            }

        }else{ //acabou de percorrer todas as pastas, adiciona as mesmas no seu container

            //adiciona as pastas no container da conta
            $('#mbox-' + arguments.callee.accID + ' ol').append($(arguments.callee.list));
            
            
            //verifica se existe a pasta nao lidas vindas do objeto em getMboxList.php nao existe, se nao existir a cria
            if(/mbox-naoLidas-/.test(arguments.callee.list) == false) {
                //cria a pasta especial 'nao lidas' - nao deixa ela conter pastas filho
                var pastaNaoLidas = $('<li id="mbox-naoLidas-'+ arguments.callee.accID +'" data-ordemid="naoLidas" data-id="naoLidas" class="mjs-nestedSortable-no-nesting mbox-nao_lidas"><div class="ui-droppable"><span class="disclose"><span></span></span>Não Lidas <span id="naoLidas-unseen-count" class="mbox-count-0"></span></div></li>');

                //cria a pasta especial 'Favoritos' - nao deixa ela conter pastas filho
                var pastaFavoritos = $('<li id="mbox-favoritos-'+ arguments.callee.accID +'" data-ordemid="favoritos" data-id="favoritos" class="mjs-nestedSortable-no-nesting mbox-favoritos"><div class="ui-droppable"><span class="disclose"><span></span></span>Favoritos <span id="favoritos-unseen-count" class="mbox-count-0"></span></div></li>');
                pastaFavoritos.insertAfter($('#mbox-' + arguments.callee.accID + ' .conta-mbox-container ol li:first'));
                pastaNaoLidas.insertAfter($('#mbox-' + arguments.callee.accID + ' .conta-mbox-container ol li:first'));                
            } 
            
            //adiciona o evento de click nas pastas
            $('ol li div').live('click', function(e){

                //fecha o menu de configuracoes
                Main.menuConfiguracoes.fechar();



                //fecha a tela cheia da area de leitura
                $('#message-read-area .message-header .btn-fechar').trigger('click');

                //limpa a area de leitura da mensagem
                $('#message-read-area #message-content').empty();

                //pega o id da conta da pasta clicada
                var accID = $(e.target).parents('.conta-mbox-container').parent().attr('id').replace('mbox-','');
                
                //pega a div da pasta
                var pasta = ($(e.target).parent().attr('id') != undefined) ? $(e.target).parent() : $(e.target).parent().parent();
                
                //se estiver marcado 'selecionar todas', desmarca
                if($('#marcar-mensagem').attr('class') == 'marcada'){
                    $('#marcar-mensagem').trigger('click');
                }
                
                //se clicou na pasta nao lidas ignora o carregamento padrao e lista todas as mensagens nao lidas de todas as pastas
                if(/mbox-naoLidas/.test(pasta.attr('id'))){

                    //se ainda estiver carregando, nao faz uma nova requisicao
                    if($('.message-loading')[0]){ 

                        return false;
                    }
                    
                    //limpa a listagem de mensagens antes de listar as mensagens nao lidas
                    $('#tbl-message-list-body').empty();
                    
                    
                    //esconde a paginacao
                    $('#paginacao-mbox').hide('fast');
                    
                    Main.activeMbox('naoLidas', accID);
                    
                    //atualiza a quota da conta, aqui faz uma requisicao a listagem de mensagens da inbox da conta, para poder pegar as informacoes da quota e atualiza-la
                    $.ajax({
                        url: 'getMessageList.php',
                        type: "GET",
                        data : 'accID='+ accID +'&mbox=INBOX&curpage=1&offset=-1&search=all&sort=arrival&descOrd=1&cleanQt=all&cleanOffset=0',
                        //data : 'accID='+ accID +'&mbox=INBOX&curpage=1&offset=-1&search=all&sort='+window.configs.cache.messagelist.orderby+'l&descOrd=1&cleanQt=all&cleanOffset=0',
                        cache: false,
                        success : function(JsonData){               

                            //pega as informacoes pra atualizar a quota
                            var data = eval(JsonData);
                            
                            //agora atualiza a quota quando clicar na pasta nao lidas
                            Main.updateQuota(data);      
                            
                            //atualiza o objeto messagelist do objeto cache
                            Main.updateCacheMessageList(accID, 'INBOX', data.curpage, data.pagesize, data.total, data.searchby, data.orderby, data.descorder, data.novas);

                        }//success
                    });

                    //carrega as mensagens nao lidas de todas as pastas da conta
                    Main.loadSpecialMessages(accID, 'unseen');
                    
                    return false;
                    
                }else if(/mbox-favoritos/.test(pasta.attr('id'))){ //se clicou na pasta favoritos

                    //se ainda estiver carregando, nao faz uma nova requisicao
                    if($('.message-loading')[0]){ 

                        return false;
                        
                    }
                    
                    //limpa a listagem de mensagens antes de listar as mensagens favoritas
                    $('#tbl-message-list-body').empty();
                    

                    
                    //esconde a paginacao
                    $('#paginacao-mbox').hide('fast');
                    
                    Main.activeMbox('favoritos', accID);
                    
                    //atualiza a quota da conta, aqui faz uma requisicao a listagem de mensagens da inbox da conta, para poder pegar as informacoes da quota e atualiza-la
                    $.ajax({
                        url: 'getMessageList.php',
                        type: "GET",
                        data : 'accID='+ accID +'&mbox=INBOX&curpage=1&offset=-1&search=all&sort=arrival&descOrd=1&cleanQt=all&cleanOffset=0',
                        cache: false,
                        success : function(JsonData){               

                            //pega as informacoes pra atualizar a quota
                            var data = eval(JsonData);
                            
                            //agora atualiza a quota quando clicar na pasta nao lidas
                            Main.updateQuota(data);      
                            
                            //atualiza o objeto messagelist do objeto cache
                            Main.updateCacheMessageList(accID, 'INBOX', data.curpage, data.pagesize, data.total, data.searchby, data.orderby, data.descorder, data.novas);

                        }//success
                    });

                    //carrega as mensagens favoritadas de todas as pastas da conta
                      Main.loadSpecialMessages(accID, 'flagged');
                    return false;

                }
                
                if(pasta.attr('id') == undefined){
                    return true;
                }
                
                //se estiver invisivel, mostra a paginacao de novo
                $('#paginacao-mbox').show('fast');
                
                //rola o scroll pro topo da listagem
                $('#message-list-area').animate({
                    'scrollTop' : '0px'
                });

                //pega o caminho da pasta clicada
                var mbox = pasta.attr('title') + pasta.attr('id').replace(/[0-9]+\-/, '');
                
                //remove a primeira barra
                if(mbox.charAt(0) == '/'){
                    mbox = mbox.substring(1);
                }
                
                
                if(pasta){

                    //carrega as mensagens somente de uma pasta por vez. so ira carrega mensagens de outra pasta quando a requisicao da anterior terminar
                    if($('.message-loading')[0]){                        
                        return true;
                    }else{
                        //carrega as mensagens da pasta clicada
                        Main.loadMessageList({
                            accID : accID,
                            curpage : 1,
                            mbox : mbox
                        }, function(){

                            $('#topo-menu-principal #topo-busca input').trigger('keyup')

                            setTimeout(function(){
                                Main.atualizaMenuRegras();
                            }, 100);

                        });
                        
                        //destaca a pasta que foi clicada
                        Main.activeMbox(pasta.attr('data-id'), accID);
                        
                    }
                }

            });

            //limpa a variavel temporaria com a lista de pastas
            arguments.callee.list = '';

        }

    },
    
    

     'loadSpecialMessages' : function(accID, search){
         
         


        $.ajax({
            url:'plugins/preferences/preferences/getView',
            type:'POST',
            async:false,
            complete:function(response){

                var view = response.responseText;

                $('body').addClass(view);
                //assim que entrar, define o modo de view
                $('body').trigger('viewchange');
                $('#view-change #selecionada').text(view)
                $('#view-change #opcoes li[id="'+view+'"]').addClass('selected');
                
                $('#message-list-area').css('width', (($(window).width() - $('#conta-list').width()) / 2) - 80);
                $('#message-read-area').css('left', $('#message-list-area').width());
            }
        });
        
        $('#message-list-area').focus();

        Main.setDragBars();
        
        Main.filterMessageList('special', {
                        FLAGS:["Marcadas como", search]
         });

        //mostra o loading de carregamento das mensagens
        $('#message-list-area').append($("<div class='message-loading'> Carregando... </div> "));
         
        //oculta a selectbox de ordenação de msgs.
        if($('#mbox-naoLidas-'+accID+' div').hasClass('mbox-active')||
           $('#mbox-favoritos-'+accID+' div').hasClass('mbox-active'))
            $('#ordenacao-listagem').hide();
        
        //fecha a camada da modal
        Layer.tclose('camada' + Layer.id);

        //guardara o total de mensagens nao lida de todas as pastas
        var totalUnseenInfo = 0;

        //verifica se o usuario escolheu exibir o tamanho das mensagens
        var BoExibeTamanhoMensagem = window.configs.EnExibeTamanhoMensagem;
        
        
        getMessageObject(accID,'INBOX', 1);
        
        //varre todas as pastas da conta
        $('#mbox-' + accID + ' .conta-mbox-container li').each(function(index, pasta){

            //li da pasta
            var pasta = $(pasta);
            
            //pega o nome da pasta
            var nomePasta = Main.maskMboxName(pasta.attr('id').replace(/[0-9]+\-/, ''));
            
            //pega as mensagens nao lidas de todas as pastas, menos da pasta nao lidas, rascunhos, itens enviados, lixeira e spam 
            if(nomePasta != 'mbox-naoLidas-' + accID && nomePasta != 'Rascunhos' && nomePasta != 'Itens enviados' && nomePasta != 'Lixeira' && nomePasta != 'SPAM' && nomePasta != 'Sent' && nomePasta != 'Trash' && nomePasta != 'Draft'){

                //pega o numero de mensagens novas que fica ao lado da pasta ( x )
                //var totalUnseen = parseInt($('#mbox-' + accID + ' div[id="' + pasta.attr('id') + '"]').attr('data-naoLidas'));
                var totalUnseen = parseInt($('li[id="' + pasta.attr('id') + '"]').attr('data-naoLidas'));
                
                //algumas mensagens vem com o examination como false, ao inves de objeto - pastas com acento...
                if(isNaN(totalUnseen)){ 
                    return;
                }
                totalUnseenInfo += totalUnseen;
            }

        }); //varre todas as pastas da conta
        
        
        /*if(totalUnseenInfo < 1){
            $('#info-mbox').html('<span id="info-mbox-caminho" title="Não lidas">Não lidas</span>');
        }*/
        
        
        //guarda o final da execução da requesição assincrona
        //utilizado para remover o message-loading de carregamento.
        //var promessa;

        /*$.when(promessa).done(setTimeout(function(){
            $('.message-loading').remove()
        }, 500));*/

        
        //funcao interna que retorna um objeto contendo as mensagens da pasta informada
        function getMessageObject(accID, mboxPath, curpage){

            //indice da paginacao
            var pagina = curpage || 1;
            
            var params='accID='+ accID +'&mbox='+ mboxPath +
            '&curpage='+ pagina +'&offset=-1&search='+ search +
            '&sort='+ window.configs.cache.messagelist.orderby +'&descOrd='+ window.configs.cache.messagelist.descorder +
            '&cleanQt='+ window.configs.cache.messagelist.cleanQt +'&cleanOffset='+ window.configs.cache.messagelist.cleanOffset;
            
            //busca as mensagens da pasta atual
            $.ajax({
                url: 'getSpecialMessageList.php',
                type: "GET",
                data : params,
                cache: false,
                async:true,
                success : function(JsonData){

                    try{
                        var data = eval(JsonData);
                    }catch(erro){ 
                        var data = JsonData;
                    }
                    //pega o id da conta a qual esta listando as mensagens
                    //var accID = data.accID;
                    
                    var TrMensagem = '';
                    
                    
                    window.configs.cache.messagelist.totalUnseen = data.length;
                    
                    
                            //mostra o total de mensagens nao lidas
                            if(search=='unseen')
                                var texto = 'Não lidas';
                            else if (search=='flagged')
                                texto = 'Favoritos';
             
                            //$('#barra-mbox #info-mbox-caminho').html(texto + ' (' + window.configs.cache.messagelist.totalUnseen + ' mensagens)');
                            
                            if(data.length>0)
                                $('#info-mbox').html("<span id='info-mbox-caminho' title='"+ texto +"'>" + texto + '</span>' +
                                    ' (<span id="info-mbox-total">' + data.length + '</span> mensage' + (data.length==1?  'm ': 'ns' )+')');
                            else
                                $('#info-mbox').html("<span id='info-mbox-caminho' title='"+ texto +"'>" + texto + '</span>');
                            $('#info-mbox').show();
        
                            //$('#barra-mbox #info-mbox-caminho').html(texto );
                            //$('#barra-mbox #info-mbox-caminho').attr('title', texto);
                            //$('#barra-mbox #info-mbox-total').html(window.configs.cache.messagelist.totalUnseen);
                            $('#barra-mbox #info-btn-unseen').html('');
                            $('#barra-mbox #info-btn-fav').html('');
                            $('#info-mbox').html($('#info-mbox').html().replace(/,/g,''));
                    
                    
                    
                    
                    //monta as tr's das mensagens nao lidas
                    for(i in data){ 
           
                        var IdMensagem = data[i].id;
                        var StAutor = data[i].from;
                        var StAssunto = data[i].subject;
                        var DtData = data[i].receivedOn + ""; //forca a conversao pra string... no IE8, as funcoes de string nao pega nessa variavel vinda do json. ex split, replace etc
                        var DtDataOriginal = data[i].receivedOn + "";
                        var BoAnexo = data[i].hasAttachment;
                        var BoRespondida = data[i].answered;
                        var BoFavorita = data[i].flagged;
                        var BoLida = data[i].seen;
                        var BoRemovida = data[i].deleted;
                        var BoEncaminhada = data[i].forwarded;
                        var StCaminho = data[i].mbox;
                        var StChave = data[i].secureMessage;
                        var StTamanho = data[i].size;
                        var StTamanhoOriginal = data[i].sizeOriginal;
                        
                        
                        
                        //data original, serve como chave de ordenacao para o plugin sortable YYYYMMDDHHMMSS 
                        DtDataOriginal = data[i].receivedOn.split(' ')[0] + "";
                        DtHoraOriginal = data[i].receivedOn.split(' ')[1] + "";
                        
                        DtDataOriginal = DtDataOriginal.split('/');
                        DtHoraOriginal = DtHoraOriginal.split(':');
                        
                        var DtDataKey = DtDataOriginal[2] + '' + DtDataOriginal[1] + '' + DtDataOriginal[0] + '' + DtHoraOriginal[0] + '' + DtHoraOriginal[1] + '' + DtHoraOriginal[2]; 
                        
                        //formata a data pra ficar de forma 'inteligente'
                        DtData = Main.formataDataInteligente(DtData);
                        
                        //verifica se a mensagem tem favorito ou anexo
                        var classFavorito = (BoFavorita) ? 'td-fav-marcado' : 'td-fav';
                        var classAnexo    = (BoAnexo) ? 'td-anexo' : 'td-anexo td-vazio';
                        
                        //icone da mensagem
                        var classCarta = '';
                        var title = '';
                        
                        //se a mensagem possuir uma chave de seguranca
                        if(StChave){            
                            var classChave = 'td-chave-' + StChave.split(';')[0];
                            var chaveDescricao = StChave.split(';')[1]; 
                        }else{
                            var classChave = '';
                            var chaveDescricao = '';
                        }
                        
                        
                        //decide qual vai ser o icone da mensagem (lida, nao lida, encaminhada, respondida, deletada)
                        if(BoLida){                        
                            if(!BoEncaminhada && !BoRespondida){
                                classCarta = 'td-carta-aberta';
                                title = 'Marcar como não lida';                           
                            }
                            else if(BoEncaminhada){
                                classCarta = 'td-carta-encaminhada';
                                title = 'Essa mensagem foi encaminhada';
                            }else if(BoRespondida){
                                classCarta = 'td-carta-respondida';
                                title = 'Essa mensagem foi encaminhada';
                            }
                        }
                        
                        if(!BoLida){
                            if(!BoEncaminhada && !BoRespondida){
                                classCarta = 'td-carta-fechada';
                                title = 'Marcar como lida';                            
                            }else if(BoEncaminhada){
                                classCarta = 'td-carta-encaminhada';
                                title = 'Essa mensagem foi encaminhada';
                            }else if(BoRespondida){
                                classCarta = 'td-carta-respondida';
                                title = 'Essa mensagem foi encaminhada';
                            }

                        }
                        
                        
                        if(BoRemovida){
                            classCarta = 'td-carta-deletada';
                            title = 'Essa mensagem foi deletada por outro software de e-mail';
                        }
                        
                        
                        //formata a tr com o conteudo da mensagem
                        //IE8 adiciona um item undefined no final do objeto
                        if(IdMensagem != undefined){

                            //pega o nome do autor e o email, nao deixa o nome passar de 37 caracteres
                            var StAutorCompleto = StAutor.replace(/</g, '&lt;').replace(/>/g, '&gt;').split('&lt;');
                            var autor = (StAutorCompleto[0].length > 37) ? StAutorCompleto[0].substr(0,37) + '...' : StAutorCompleto[0];
                            var email = (StAutorCompleto[1] != undefined) ? StAutorCompleto[1].replace(/&gt;/, '') : autor;
                            var StAutorFinal = (autor) ? autor : email;
                            
                            //limita o numero de caractere do assunto
                            var StAssuntoFinal;
                            var StAssuntoMaxLength = parseInt((($(window).width() - $('#mbox-list-area').width()) - 450) / 10);
                            if(StAssunto != null){
                                StAssuntoFinal = (StAssunto.length > StAssuntoMaxLength) ? StAssunto.substr(0,StAssuntoMaxLength) + '...' : StAssunto;
                                StAssuntoFinal = StAssuntoFinal.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                            }                   
                            
                            var classMensagem = 'class=';
                            if(!BoLida && !BoRemovida) {
                                classMensagem += 'nova-mensagem';
                            } //adiciona a classe 'nova-mensagem' se for uma mensagem nao lida
                            if(BoRemovida) {
                                classMensagem += 'mensagem-deletada';
                            } //adiciona a classe 'mensagem-deletada' se a mensagem estiver com a flag deleted (isso so acontece se a opcao modo de exclusao estiver 'MARCAR')
                            
                            //se o usuario marcou a opcao de exibir o tamanho da mensagem
                            if(BoExibeTamanhoMensagem == 'TRUE'){

                                var StTdTamanho = "<td class='td-tamanho' sorttable_customkey='" + StTamanhoOriginal + "'> "+ StTamanho +" </td>";
                                
                            }else{
                                var StTdTamanho = '';
                            }
                            
                            
                            //Retira o nome da pasta pai caso essa seja filha de outra pasta
                            var StCaminhoCorte = StCaminho.substring(StCaminho.lastIndexOf("/")+1);
                            
                            if(StCaminhoCorte == 'INBOX')
                                StCaminhoCorte = 'Caixa de Entrada';
                                
                                
                            //se a mensagem nao esta marcada como removida entao adiciona a listagem
                            if(!BoRemovida){
                                TrMensagem += 
                                "<!-- mensagem -->" +
                                "<tr id='" + IdMensagem +"' " + classMensagem + "> " +
                                "<td class='td-drag'></td>" +
                                "<td class='td-checkbox'><div class='checkbox'></div></td>" + 
                                "<td class='"+ classFavorito +"'></td>" +
                                "<td class='"+ classCarta +"' title='"+ title +"'></td>" +
                                "<td class='"+ classAnexo +"'></td>" +
                                "<td class='" + classChave + "' title='"+ chaveDescricao +"' alt='"+ chaveDescricao +"'></td>" + 
                                "<td class='td-autor' title='"+ email +"' alt='"+ email +"'> "+ StAutorFinal +"</td>" +
                                "<td class='td-mbox' title='"+ StCaminho +"' alt='"+ StCaminho +"'> <span class='mbox-original'>"+ StCaminhoCorte +"</span> </td>" +
                                "<td class='td-assunto'title='"+StAssunto+"'> "+ StAssuntoFinal +" </th>" +
                                "<td class='td-data' sorttable_customkey='" + DtDataKey + "'> "+ DtData +" </td>" +
                                StTdTamanho + 
                                "<input type='hidden' class='remetente-email' value='"+ email +"' />"+
                                "<input type='hidden' class='pasta' value='"+ StCaminho +"' /> "+
                                "</tr>" +
                                "<!-- mensagem -->";
                            }else{
                                //se a mensagem estiver marcada como excluida, entao desincrementamos 1 no label de total de mensagens nao lidas na barra cinza
                                var total = //parseInt($('#info-mbox-total').text());
                                $('#info-mbox-total').text(total-1);
                            }
                            //$('#info-mbox-total').text(window.configs.cache.messagelist.totalUnseen);
                            
                        }
                        
                        //inicia o plugin de ordenar
                        sorttable.makeSortable($('#tbl-message')[0]);
                        
                    }//for

                    //inserir as mensagens na tabela
                    $('#tbl-message-list-body').append($(TrMensagem));
                   

                    //aplica o modo de view
                    setTimeout(function(){
                        $('body').trigger('viewchange');
                    },200)
                    $('.message-loading').remove();                  
                }
            });

        }//getMessageObject
             
    },
    
    
    
    /*
     * maskMboxName()
     * 
     * cria uma 'mascara' para o nome da mbox. retorna o nome da mbox mascarada
     * 
     * @author Bruno Andrade
     * 
     * @since 19/07/2013
     * 
     * @return String 
     *
     */
     'maskMboxName' : function(mbox){

        /*if(mbox == 'sent' || mbox == 'enviados' || mbox == 'enviadas' || mbox == 'itens enviados') mbox = 'Itens enviados';
        if(mbox == 'trash' || mbox == 'Trash' || mbox == 'lixo' || mbox == 'lixo eletrônico' || mbox == 'Lixo Eletrônico') mbox = 'Lixeira';
        if(mbox == 'drafts' || mbox == 'rascunho' || mbox == 'rascunhos' || mbox == 'Rascunho') mbox = 'Rascunhos';
        if(mbox == 'inbox' || mbox == 'INBOX') mbox = 'Caixa de entrada';
        */

        var ArNomes = {};

        idioma = window.configs.folder_language;

        if(idioma == 'PT-BR'){

            ArNomes['inbox']    = 'Caixa de entrada';
            //ArNomes['sent']     = 'Itens enviados';
            //ArNomes['enviados'] = 'Itens enviados';
            //ArNomes['enviadas'] = 'Itens enviados';
            //ArNomes['trash']    = 'Lixeira';
            //ArNomes['lixo']     = 'Lixeira';
            //ArNomes['rascunho'] = 'Rascunhos';
            //ArNomes['draft']    = 'Rascunhos';

        }else{

            ArNomes['caixa de entrada'] = 'INBOX';
            //ArNomes['itens enviados']   = 'Sent';
            //ArNomes['lixeira']          = 'Trash';
            //ArNomes['rascunhos']        = 'Draft';
            //ArNomes['rascunho']         = 'Draft';

        }

        var indice = (mbox) ? mbox.toLowerCase() : mbox;
        
        return (typeof(ArNomes[indice]) != 'undefined') ? ArNomes[indice] : mbox;

    },
    
    
    
    
    
    
    
    /*
     * serializeMbox(accID, mbox)
     * 
     * Monta um array associativo com a estrutura das pastas.
     * esse array eh usado nas funcoes recursivas : getMboxOrigem e  setMboxPath
     * a partir desse array retornado, eh criado o caminho completo da pasta que esta sendo arrastada ou que foi clicada
     *
     * @param accID - conta das pastas
     * @param mbox - jQuery object - $(li da pasta)
     *
     * retorno :
     * 
     * [inbox] => Array
     *                      (
     *                          [pasta] => INBOX
     *                          [parent] => null
     *                          [drag] => pastaSendoArrastada
     *                       )
     *
     *  [spam] => Array
     *                      (
     *                          [pasta] => SPAM
     *                          [parent] => teste
     *                          [drag] => pastaSendoArrastada
     *                       )
     *                       
     *   ...                    
     * 
     *
     */
     'serializeMbox' : function(accID, mbox){

        var dirMap = $('ol.sortable.sortableID-' + accID).nestedSortable('serialize').split('&');
        
        //inicia o array que contera as pastas e a pasta que esta sendo arrastada
        var ArMap = {};
        
        if($(mbox).attr('id') == undefined){ 
            return true;
        } 
        
        //indice que contem a pasta que esta sendo arrastada/clicada
        ArMap['drag'] = $(mbox).attr('id').replace(/[0-9]+\-/g, ''); //0-inbox - ER remove o numero e o '-' ficando so o nome da pasta
        
        //indice que contera o array de pastas
        ArMap['pastas'] = {}; 
        
        //monta uma array associativo ex : ArMap[inbox] = {pasta : inbox, parent : null}, ArMap[spam] = {pasta : spam, parent : inbox}
        //esse loop eh necessario pra criar um array associativo. pra poder fazer a gamb de pegar as pastas pai da pasta que sera dropada.  ex : root/parent/parent/pastaSendoArrastada
        $(dirMap).each(function(i, item){

            var pasta   = item.split('=')[0].replace('[', '').replace(']','').replace(/[0-9]+/,'');
            var parent = item.split('=')[1].replace('null', 'root');
            
            if(pasta != null){
                ArMap[pasta] = {
                    'pasta' : pasta, 
                    'parent' : parent
                };
            }

        });
        
        //passa o array associativo de pastas para o indice pastas
        ArMap['pastas'] = ArMap;
        
        return ArMap;

    },
    
    
    /*
     *  getMboxDestino
     *  
     *  monta o caminho completo de onde foi dropada a pasta que esta sendo arrastada - (o caminho eh montado de traz pra frente pois o plugin eh limitado)
     *  a intencao eh obeter um caminho assim : root/parent/parent/../pastaSendoArrastada
     *  
     *  funcao recursiva, eh passado um array que contem a hierarquia de pastas (esse array nao eh montado com a funcao serializeMbox, pois o plugin nao deixa usar mais de uma vez a sua funcao serialize)
     *  nesse caso, o array foi montado com a funcao do plugin 'toArray' e transformado num array associativo.
     *  
     * ao final desse each, ja teremos o caminho completo da pasta em que foi dropada e o input hidden #destino recebe esse caminho                    
     *  
     */
     'getMboxDestino' : function(key, val){

        //vai iterar cada item do array, que contem [drag - pasta que esta sendo arrastada] e [pastas]
        
        if(arguments.callee.caminho == undefined){
            arguments.callee.caminho = arguments.callee.caminho || '';
        }
        
        //quando estiver na posicao do drag(pasta que esta sendo arrastada - esse eh o primeiro item do array), seu valor sera mantido o mesmo na proxima iteracao, a nao ser que seja mudada                
        if(key == 'drag'){
            arguments.callee.pastaDrag = arguments.callee.pastaDrag || val;
        }
        
        //quando estiver na posicao das pastas do array...        
        if(key == 'pastas'){                  

            //pega o array associativo de pastas
            var pastas = val; //o val nessa posicao eh o array associativo de pastas [inbox] = { pasta : inbox, parent : xxx }
            
            //se a pasta existir no array
            if(pastas[arguments.callee.pastaDrag]){

                //verifica se o a pasta onde dropou a pasta que estava arrastando  tem parent, se sim, chama recursivamente ateh o parente da pasta atual for null
                if(pastas[arguments.callee.pastaDrag].parent != null){                

                    //muda a pasta atual para chegar se tem parent
                    arguments.callee.pastaDrag = pastas[arguments.callee.pastaDrag].parent ; 
                    
                    arguments.callee.caminho += '/' + arguments.callee.pastaDrag;             
                    
                    //recursao na pasta que tem parent...
                    $.each(pastas, Main.getMboxDestino);

                }else{
                    //se dropar na raiz 
                    //zera o pastaDrag, pois ficaria com null, pois a pastaDrag pega o ultimo parent                    
                    arguments.callee.pastaDrag = undefined;                    
                    
                    $('#destino').val(arguments.callee.caminho);
                    arguments.callee.caminho = '';

                }
            }

        }


    },
    
    
    
    
    
    /*
     *
     *  getMboxOrigem 
     *  
     *  monta o caminho completo da pasta que esta sendo arrastada.
     *  a intencao eh obeter um caminho assim : root/parent/parent/../pastaSendoArrastada - (o caminho eh montado de traz pra frente pois o plugin eh limitado)
     *  
     *  funcao recursiva, eh passado um array (serializeMbox) que contem a hierarquia das pastas
     *  
     *  ao final desse each, ja teremos o caminho completo da pasta que foi arrastada e o input hidden #origem recebe esse caminho             
     *  
     */
     'getMboxOrigem' : function(key, val){

        //vai iterar cada item do array, que contem [drag - pasta que esta sendo arrastada] e [pastas]
        
        if(arguments.callee.caminho == undefined){
            arguments.callee.caminho = arguments.callee.caminho || '';
        }
        
        //quando estiver na posicao do drag(pasta que esta sendo arrastada - esse eh o primeiro item do array), seu valor sera mantido o mesmo na proxima iteracao, a nao ser que seja mudada                
        if(key == 'drag'){
            arguments.callee.pastaDrag = arguments.callee.pastaDrag || val;
        }
        
        //quando estiver na posicao das pastas do array...        
        if(key == 'pastas'){                  

            //pega o array associativo de pastas
            var pastas = val; //o val nessa posicao eh o array associativo de pastas [inbox] = { pasta : inbox, parent : xxx }
            
            
            
            //se a pasta existir no array
            if(pastas[arguments.callee.pastaDrag]){

                //verifica se o a pasta onde dropou a pasta que estava arrastando  tem parent, se sim, chama recursivamente ateh o parent da pasta atual for null
                if(pastas[arguments.callee.pastaDrag].parent != null){                

                    //muda a pasta atual para chegar se tem parent
                    arguments.callee.pastaDrag = pastas[arguments.callee.pastaDrag].parent ; 
                    
                    arguments.callee.caminho += '/' + arguments.callee.pastaDrag;             
                    
                    //recursao na pasta que tem parent...
                    $.each(pastas, Main.getMboxOrigem);

                }else{
                    //se dropar na raiz 
                    //zera o pastaDrag, pois ficaria com null, pois a pastaDrag pega o ultimo parent
                    arguments.callee.pastaDrag = undefined; 
                    arguments.callee.caminho = undefined;
                //arguments.callee.caminho = ' ';
            }
        }else{
                //senao existir significa que a pasta drag anterior era a pasta root
                arguments.callee.pastaDrag = undefined;                
                $('#origem').val(arguments.callee.caminho);
                arguments.callee.caminho = '';

            }

        }


    },
    
    /*
     *
     *  setMboxPath 
     *  
     *  monta o caminho completo da pasta no momento em que ela eh clicada
     *  
     *  semelhante a funcao getMboxOrigem
     *  
     *  ao final desse each, ja teremos o caminho completo da pasta clicada e o input hidden #mbox-path recebe esse caminho             
     *  
     */
     'setMboxPath' : function(key, val){

        //vai iterar cada item do array, que contem [drag - pasta que esta sendo arrastada] e [pastas]
        
        if(arguments.callee.caminho == undefined){
            arguments.callee.caminho = arguments.callee.caminho || '';
        }
        
        //quando estiver na posicao do drag(pasta que esta sendo arrastada - esse eh o primeiro item do array), seu valor sera mantido o mesmo na proxima iteracao, a nao ser que seja mudada                
        if(key == 'drag'){
            arguments.callee.pastaDrag = arguments.callee.pastaDrag || val;
        }
        
        //quando estiver na posicao das pastas do array...        
        if(key == 'pastas'){                  

            //pega o array associativo de pastas
            var pastas = val; //o val nessa posicao eh o array associativo de pastas [inbox] = { pasta : inbox, parent : xxx }
            
            
            
            //se a pasta existir no array
            if(pastas[arguments.callee.pastaDrag]){

                //verifica se o a pasta onde dropou a pasta que estava arrastando  tem parent, se sim, chama recursivamente ateh o parent da pasta atual for null
                if(pastas[arguments.callee.pastaDrag].parent != null){                

                    //muda a pasta atual para chegar se tem parent
                    arguments.callee.pastaDrag = pastas[arguments.callee.pastaDrag].parent ; 
                    
                    arguments.callee.caminho += '/' + arguments.callee.pastaDrag;             
                    
                    //recursao na pasta que tem parent...
                    $.each(pastas, Main.setMboxPath);

                }else{
                    //se dropar na raiz 
                    //zera o pastaDrag, pois ficaria com null, pois a pastaDrag pega o ultimo parent
                    arguments.callee.pastaDrag = undefined; 
                    arguments.callee.caminho = undefined;
                //arguments.callee.caminho = ' ';
            }
        }else{
                //senao existir significa que a pasta drag anterior era a pasta root
                arguments.callee.pastaDrag = undefined;                
                $('#mbox-path').val(arguments.callee.caminho);
                arguments.callee.caminho = '';

            }

        }


    },
    
    /*
     *  Retorna o caminho completo da pasta (li da pasta)
     *  
     *  LiPasta = <li id="22-INBOX" class="mjs-nestedSortable-leaf mbox-caixa_de_entrada"></li>
     *  
     */
     'getMboxPath' : function(LiPasta){

        //id da conta clicada
        var accID = LiPasta.closest('.conta-mbox-container').parent().attr('id').replace('mbox-','');
        
        //mapa das pastas. um array com a hierarquia das pastas
        var dirMap = Main.serializeMbox(accID, LiPasta);
        
        //funcao recursiva que ira montar o caminho completo da pasta clicada - ela altera o input hidden #mbox-path com o caminho completo da pasta clicada
        $.each(dirMap, Main.setMboxPath);
        
        //pega o caminho da pasta clicada
        var mbox = $('#mbox-path').val().split('/').reverse().join('/').replace('root/', '').slice(0, -1) + '/' + LiPasta.attr('id').replace(/[0-9]+-/, '');
        
        //remove a primeira '/'
        mbox = mbox.replace(/^(\/)/, ''); 
        
        return mbox; // inbox/teste/etc/

    },
    
    
    /*
     *  activeMbox()
     *  
     *   destaca em qual pasta o usuario esta
     *   
     *   StMbox - id da pasta - quando for sub-pastas, pega sempre a ultima ex : teste/a/etc, ira pegar etc - remove os espacos em branco do id da pasta caso tenha - se esse parametro nao for passado, pega a ultima pasta ativa
     *   accID - id da conta que ira destacar a pasta - se esse parametro nao for passado, pega o id da conta atual
     *     
     */
     'activeMbox' : function(StMbox, accID){

        //antes de deixar a pasta marcada, remove a marcacao anterior de outra pasta
        $('.mbox-active').removeClass();
        
        var pastaAtual = StMbox || window.configs.cache.messagelist.mbox;
        var accIdAtual = accID || window.configs.cache.messagelist.accID;
        
        //$('#mbox-' + accIdAtual + ' li[id*=' + pastaAtual.replace(/\s/g, '\\ ').split('/').pop() +']').first().find('div').first().addClass('mbox-active');
        if(StMbox =="naoLidas"){
            $('#mbox-' + accIdAtual + ' li[id*=' + pastaAtual.replace(/\s/g, '\\ ').replace(/\./g,'\\.').split('/').pop() +']').first().find('div').first().addClass('mbox-active');            
        }else if(StMbox =="favoritos"){
            $('#mbox-' + accIdAtual + ' li[id*=' + pastaAtual.replace(/\s/g, '\\ ').replace(/\./g,'\\.').split('/').pop() +']').first().find('div').first().addClass('mbox-active');  
        }else{            
            $('#mbox-' + accIdAtual + ' li[data-id="' + StMbox.replace(/\s/g, '\\ ').replace(/\./g,'\\.').replace(/\//g,'-')+ '"]').find('div').first().addClass('mbox-active');
        }
    },
    
    /*
     * loadingCursor(visibility)
     * 
     * Exibe/esconde o 'cursor' de loading (relogio). 
     * 
     */
     'loadingCursor' : function(visibility){

        if(visibility == 'show'){
            $('body').on('mousemove', function(e){
                //mostra um cursor de loading (relogio)
                $("<div class='busyCursor'></div>").appendTo('body');
                //posiciona o relogio perto do mouse
                $('.busyCursor').css('left', e.pageX + 10);
                $('.busyCursor').css('top', e.pageY - 5);
            });
        }else{
            //esconde o cursor de loading (relogio)
            setTimeout(function(){
                $('.busyCursor').remove();
                $('body').unbind('mousemove');
            }, 1000);
        }

    },
    
    
    
    
    
    
    
    
    
    
    
    
    /*
     * updateQuota()
     * 
     * Atualiza as informacoes da quota da conta
     *
     */
     'updateQuota' : function(JsonData){

        var data = JsonData;
        
        //assim que carregar as mensagens da pasta, muda o email da caixa de quota
        $('#info-email').html($.trim($('#mbox-' + data.accID + ' .conta-title').text()));
        
        //informacoes da quota
        var quota = data.quota;
        var total = quota.total;
        var usado = quota.usado;
        var porcentagem = quota.perc;
        
        //inicia a cor da barra de quota
        var quotaColor = '';
        
        //define qual vai ser a cor da barra
        if(Math.round(porcentagem) <= 25){
            quotaColor = 'green'; //verde
        }else if(Math.round(porcentagem) > 25 && Math.round(porcentagem) <= 50){
            quotaColor = '#5caf25'; //verde claro
        }else if(Math.round(porcentagem) > 50 && Math.round(porcentagem) <= 75){
            quotaColor = '#f7de29';//amarelo
        }else{
            quotaColor = '#d81919';//vermelho
        }
        
        //atualiza o texto de porcentagem, total e usado
        $('#quota-perc').text(porcentagem + '%');
        $('#quota-total').text(total);
        $('#info-quota').attr('title', 'Você está usando ' + usado + ' de seu espaço disponível');
        
        //atualiza o tamanho da barra de quota e a cor da mesma
        $('#quota-bar').animate({
            width : porcentagem + '%', 
            backgroundColor : quotaColor
        }, 1100, 'linear');

    },
    
    
    /*
     *  filterMessageList()
     *  
     *  Filtra a listagem de mensagem
     *  
     *  filterType - tipo de filtragem : search_and ou search_or - serve somente para tratar o texto da box de filtro 
     *  ArParams - um objeto json com os parametros da busca
     * 
     *  exemplos de uso :
     *  Main.filterMessageList('search_and', {FLAGS:["<b>Marcadas como</b> Não lidas", "UNSEEN"]}) //busca as mensagens nao lidas - outros parametros : UNDELETED, UNFLAGGED 
     *  Main.filterMessageList('search_and', {FROM:["De", "teste"]}) - busca as mensagens pelo campo 'DE' - remetente - outros parametros : , TO:["Para", "teste"], BCC:["Bcc", "teste"], CC:["Cc", "teste"], SUBJECT:["Assunto", "teste"], BODY:["Corpo", "teste"], TEXT:["Texto", "teste"], SINCE:["A partir de", "02-Oct-2013"]
     *           
     */
     'filterMessageList2' : function(filterType, ArParams){ 

      if(filterType !== 'special'){ 
        //variavel que contera os parametros formatados. se for uma busca 'OU', ela ja inicia com um 'OR ', senao, inicia vazia   
        var parametroFinal = (filterType == 'search_and') ? '' : 'OR ';
        
        //formata os parametros para ficar no formato correto para fazer a busca
        for(param in ArParams){

            //se estiver fazendo a busca com o 'OU', os parametros sao montados com parenteses, caso contrario, sem parenteses
            if(filterType == 'search_or'){
                //se estiver no parametro de FLAGS, parametroFinal recebe somente as flags
                if(param == 'FLAGS'){
                    parametroFinal += '(' + ArParams[param][1] + ')';
                }else{//senao, parametroFinal recebe o nome do campo e o seu valor com aspas ex: FROM "teste"
                parametroFinal += '(' + param + ' "'+ ArParams[param][1] +'")';
            }
            }else{//se estiver fazendo a busca com o 'E'
                //se estiver no parametro de FLAGS, parametroFinal recebe somente as flags
                if(param == 'FLAGS'){
                    parametroFinal += ArParams[param][1];
                }else{//senao, parametroFinal recebe o nome do campo e o seu valor com aspas ex: FROM "teste"
                parametroFinal += param + ' "'+ ArParams[param][1] +'" ';
            }
        }            
        }//for
        
        
        //formata o texto da box de filtro
        //var textoFiltro = '';
        
        for(param in ArParams){
            //formata o texto das flags
            if(param == 'FLAGS'){
                textoFiltro += ArParams[param][0] + ' ';
            }else{//formata os outros parametros
               
                textoFiltro += '<b>' + ArParams[param][0] + '</b> "' + ArParams[param][1] + '" ';

                if(ArParams.SINCE){
                    if(ArParams.SINCE[3] == ' Entre '){  
                        textoFiltro += formataDataTextoFiltro(ArParams[param][2]);
                    }
                }
                
            }
        }
        
        //coloca o texto do filtro formatado na box de filtro
        $('#message-filter-box').html('<b>Busca</b> : ' + textoFiltro + ' <a>Limpar filtro</a>');
        
        //carrega as mensagens com os filtros
        Main.loadMessageList({
            'searchby' : parametroFinal,
            'curpage' : 1 
        }, function(){ //callback da loadMessageList

            //rola a listagem de mensagens pra baixo para mostrar a box de filtro, que fica atras da listagem de mensagens e listagem de pastas
            if($('#message-area').offset().top <= '65'){ //so rola pra baixo a listagem de mensagens se ela esta na posicao inicial
                $('#message-area').animate({
                    'top' : $('#message-area').offset().top + 35
                });
            }
            //exibe a box com o filtro da busca
            $('#message-filter-box').animate({
                'opacity' : '1',
                'z-index' : '1'
            });

        });
        
        
               //esconde a box de filtro quando clicar em limpar filtro, e depois lista as mensagens sem filtro da pasta atual
        
        $('#message-filter-box a').one('click', function(){
            $('#topo-busca input').val('');

            $('#message-filter-box').animate({
                'opacity' : '0',
                'z-index' : '0'
            }, 200, 'linear', function(){ 

                //depois de esconder a box de filtro, carrega as mensagens sem filtro
                Main.loadMessageList({
                    'mbox' : window.configs.cache.messagelist.mbox,
                    'searchby' : 'all',
                    'curpage' : '1'
                }, function(){//depois de ter carregado as mensagens, rola de volta a listagem de mensagens
                    //rola a listagem de mensagens pra baixo para mostrar a box de filtro, que fica atras da listagem de mensagens e listagem de pastas
                    setTimeout(function(){
                        $('#message-area').animate({
                            'top' : $('#message-area').offset().top - 35
                        });
                    }, 200);
                });

            });
        }); 
        
      }
      
        else{
       
            $('#message-filter-box').hide();
            
            for(param in ArParams){
                //if(ArParams[param][1] == 'unseen'){
                  //exibe a box com o filtro da busca
                    $('#message-filter-box').show()
                    $('#message-filter-box').animate({
                        'opacity' : '1',
                        'z-index' : '1'
                    });
                    
                    $('#message-area').animate({
                                        'top' : $('#message-area').offset().top + 35
                                       });
                  
                    var textoFiltro = ArParams[param][0] + (ArParams[param][1] == 'unseen'?' Não Lidas (Últimos 30 dias)':' Favoritas');  
                    
                    //coloca o texto do filtro formatado na box de filtro
                    $('#message-filter-box').html('<b>Busca</b>: ' + textoFiltro + ' <a>Limpar filtro</a>');
                    
                    $('#message-filter-box a').css('display','none');

                //}
            }
            
            
            $('#mbox-list-area').one('click', function(){
                    
                if(($('#message-area').offset().top>65) && ($('#message-filter-box').css('opacity')!==0)){
                    
                        $('#message-filter-box').animate({
                            'opacity' : '0',
                            'z-index' : '0'
                        }, 200, 'linear',
                    
                        setTimeout(function(){//rola a listagem de mensagens pra baixo para mostrar a box de filtro, que fica atras da listagem de mensagens e listagem de pastas
                            $('#message-area').animate({
                                'top' : $('#message-area').offset().top - 35
                            });
                        }, 200)
                    ) 
                }
            });
            
        }      
      
      
            
      

        
        //fecha o gerenciador de busca
        JModal.tclose('c' + JModal.id);

    },
    
    
    'filterMessageList' : function(filterType, ArParams){ 

      var textoFiltro = '';

      if(filterType !== 'special'){ 
        //variavel que contera os parametros formatados. se for uma busca 'OU', ela ja inicia com um 'OR ', senao, inicia vazia   
        var parametroFinal = (filterType == 'search_and') ? '' : 'OR ';
        
        
        //formata os parametros para ficar no formato correto para fazer a busca
        for(param in ArParams){

            //se estiver fazendo a busca com o 'OU', os parametros sao montados com parenteses, caso contrario, sem parenteses
            if(filterType == 'search_or'){
                //se estiver no parametro de FLAGS, parametroFinal recebe somente as flags
                if(param == 'FLAGS'){
                    parametroFinal += '(' + ArParams[param][1] + ')';
                }else{//senao, parametroFinal recebe o nome do campo e o seu valor com aspas ex: FROM "teste"
                parametroFinal += '(' + param + ' "'+ ArParams[param][1] +'")';
            }
            }else{//se estiver fazendo a busca com o 'E'
                //se estiver no parametro de FLAGS, parametroFinal recebe somente as flags
                if(param == 'FLAGS'){
                    parametroFinal += ArParams[param][1];
                }else{//senao, parametroFinal recebe o nome do campo e o seu valor com aspas ex: FROM "teste"
                parametroFinal += param + ' "'+ ArParams[param][1] +'" ';
            }
        }            
        }//for
        
        
        //formata o texto da box de filtro
        //var textoFiltro = '';
        
        for(param in ArParams){
            //formata o texto das flags
            if(param == 'FLAGS'){
                textoFiltro += ArParams[param][0] + ' ';
            }else{//formata os outros parametros
               
                textoFiltro += '<b>' + ArParams[param][0] + '</b> "' + ArParams[param][1] + '" ';

                if(ArParams.SINCE){
                    if(ArParams.SINCE[3] == ' Entre '){  
                        textoFiltro += formataDataTextoFiltro(ArParams[param][2]);
                    }
                }
                
            }
        }
        
        //coloca o texto do filtro formatado na box de filtro
        $('#message-filter-box').html('<b>Busca</b> : ' + textoFiltro + ' <a>Limpar filtro</a>');
        
        //carrega as mensagens com os filtros
        Main.loadMessageList({
            'searchby' : parametroFinal,
            'curpage' : 1 
        }, function(){ //callback da loadMessageList

            //rola a listagem de mensagens pra baixo para mostrar a box de filtro, que fica atras da listagem de mensagens e listagem de pastas
            if($('#message-area').offset().top <= '65'){ //so rola pra baixo a listagem de mensagens se ela esta na posicao inicial
                $('#message-area').animate({
                    'top' : $('#message-area').offset().top + 35
                });
            }
            //exibe a box com o filtro da busca
            $('#message-filter-box').animate({
                'opacity' : '1',
                'z-index' : '1'
            });

        });
        
      }
      
      else{
        //formata o texto da box de filtro
        
        //textoFiltro = ArParams[param][1]
        
        if($('#message-area').offset().top <= '65'){ //so rola pra baixo a listagem de mensagens se ela esta na posicao inicial
                $('#message-area').animate({
                    'top' : $('#message-area').offset().top + 35
                });
            }
            //exibe a box com o filtro da busca
            $('#message-filter-box').animate({
                'opacity' : '1',
                'z-index' : '1'
            });
        
        
        /*if(ArParams[param][1] == 'unseen')
          for(param in ArParams)
            textoFiltro = ArParams[param][0] + (ArParams[param][1] == 'unseen' ? ' Não Lidas' : ' Favoritas') + ' (Últimos 30 dias)';*/
            
            
        for(param in ArParams)
            textoFiltro = ArParams[param][0] + (ArParams[param][1] == 'unseen' ? ' Não Lidas (Últimos 30 dias)' : ' Favoritas');
            
        
        
        //coloca o texto do filtro formatado na box de filtro
        $('#message-filter-box').html('<b>Busca:</b> ' + textoFiltro + ' <a>Limpar filtro</a>');
        
        $('#message-filter-box a').css('display','none');
          
      }
      
      
        //esconde a box de filtro quando clicar em limpar filtro, e depois lista as mensagens sem filtro da pasta atual
        $('#message-filter-box a').one('click', function(){

            $('#topo-busca input').val('');

            $('#message-filter-box').animate({
                'opacity' : '0',
                'z-index' : '0'
            }, 200, 'linear', function(){ 

                //depois de esconder a box de filtro, carrega as mensagens sem filtro
                Main.loadMessageList({
                    'mbox' : window.configs.cache.messagelist.mbox,
                    'searchby' : 'all',
                    'curpage' : '1'
                }, function(){//depois de ter carregado as mensagens, rola de volta a listagem de mensagens
                    //rola a listagem de mensagens pra baixo para mostrar a box de filtro, que fica atras da listagem de mensagens e listagem de pastas
                    setTimeout(function(){
                        $('#message-area').animate({
                            'top' : $('#message-area').offset().top - 35
                        });
                    }, 200);
                });

            });
        });

        //fecha o gerenciador de busca
        JModal.tclose('c' + JModal.id);

    },
    
    
    /*
     *
     * loadMessage(accID, mbox, messageID, target)
     * 
     * carrega o conteudo da mensagem. se for mensagem nova, muda a formatacao da tr
     * 
     * target eh o target do evento de click, que eh a td da tr da listagem.
     * sao 7 td's : drag, fav, carta, chave, autor, assunto e date
     * 
     */
     'loadMessage' : function(accID, mbox, messageID, target, callback){

        //mostra o loading - o loading vai ser removido assim que carregar o conteudo da mensagem, a area de leitura eh esvaziada e entao eh colocado o conteudo da mensagem
        $('#message-read-area #message-content').empty().append("<div class='message-loading'> Carregando... </div>")
        
    
$.ajax({
    url: "getMessage.php?accID="+ accID +"&mbox="+ encodeURIComponent(mbox) +"&mID="+ messageID +"&type=xhr",
    type: "GET",
    cache : false,
    success : function(JsonData){
        
        setTimeout(function(){

                    //so exibe o conteudo da mensagem se tiver selecionado paenas uma mensagem
                    if($('.tbl-message-checked').length == 1 || target == ''/*se ta carregando a mensagem do controle em tela cheia*/){ //terminou de carregar toda a mensagem...

                        //pega o primeiro caractere do conteudo da mensagem #s #h #t #c - codigo font - html - texto - cabecalho
                        var messageType = JsonData[0];
                        
                        //TODO - ver uma forma melhor de fazer isso. em mensagens com muitos caracteres, causa lentidao consideravel - #13776
                        //se houver a tag style no conteudo, adiciona o dominio .bm_conteudo na frente das tags principais para nao sobrescrever o css principal
                        //JsonData = JsonData.replace(/(body|td|th|span|b|.*){/g, ".bm_conteudo $1");
                        
                        //adiciona o conteudo conforme o tipo de visualizacao
                        if(messageType == 's'){ //se a mensagem esta no modo codigo font

                            $('#message-read-area #message-content').empty().append('<pre>').find('pre').text(JsonData.replace('s#',''));

                        }else if(messageType == 'C'){ // codigo fonte

                            $('#message-read-area #message-content').empty().html(JsonData.replace('C#','').replace(/document.write/g, '')).find('.bm_conteudo, .bm_smlinks').remove();
                            $('.message-content .message-header').addClass('header-view');

                            //muda o modo de visualizacao da mensagem para html e pega o conteudo html
                            /*$.ajax({
                                url: 'mailboxAct.php?act=setViewType&viewType=HTML&accID='+window.configs.cache.messagelist.accID,
                                type: "GET",
                                cache : false,
                                success : function(JsonData){  
                                    $.ajax({
                                        url: "getMessage.php?accID="+ window.configs.cache.messagelist.accID +"&mbox="+ encodeURIComponent(mbox) +"&mID="+ messageID +"&type=xhr",
                                        type: "GET",
                                        cache : false,
                                        success : function(JsonData){

                                            //exibe o html
                                            $('#message-read-area #message-content').append($('<div class="cabecalho-html"></div>').html(JsonData.replace('H#','').replace('T#','').replace('C#', '').replace(/document.write/g, '')));
                                            
                                            $('#message-read-area #message-content .cabecalho-html').find('.message-header').remove();

                                            //volta pro modo codigo fonte
                                            $.ajax({
                                                url: 'mailboxAct.php?act=setViewType&viewType=CABECALHO&accID='+window.configs.cache.messagelist.accID,
                                                type: "GET",
                                                cache : false,
                                                success : function(JsonData){}
                                            });

                                        }
                                    });
                                }//
                            });*///


                        }else{ //
                            //outros modos de visualizacao html, text, header
                            $('#message-read-area #message-content').empty().html(JsonData.replace('H#','').replace('T#','').replace('C#', '').replace(/document.write/g, ''));
                            
                            //coloca http:// em todos os links pra forcar abrir em uma nova aba
                            $('#message-read-area #message-content .bm_conteudo').find('a').each(function(i, link){

                                var link = $(link);
                                
                                //se houver href na tag a
                                if(link.attr('href')){

                                    //se houver http no href, substitui por //
                                    if(/http/.test(link.attr('href'))){
                                        link.attr('href', link.attr('href').replace(/http:\/\//, '//'))
                                    }else{
                                        //se nao houver http, adiciona //
                                        link.attr('href', '//' + link.attr('href'));
                                    }
                                }
                                
                            });

                            //adiciona a classe header-novo para o novo modelo de header
                            $('.message-header').addClass('header-novo');

                        }
                        
                        //adiciona o id da mensagem no header para saber qual mensagem esta lendo - para o controle de mensagem em tela cheia
                        $('.message-header').attr('messageID', messageID)

                        //formata o header da mensagem
                        Main.formatarHeader();  


                        //forca os links do conteudo abrirem em uma nota janela
                        $('#message-read-area #message-content a').attr ('target', '_blank');
                        
                        //alerta de atencao ao abrir um link no corpo do email
                        $('#message-read-area #message-content .bm_conteudo a[rel!="submensagemXhrUltramail"]').on('click', function(e){

                            //se confirmar, entao abre o link
                            if( confirm('Atenção: Você está acessando um endereço que não pertence ao Ultramail. Tenha certeza que está acessando um conteúdo seguro. Clique Ok para acessar.')){
                                return true;
                            }else{
                                return false;
                            }

                        });
                        
                        //mostra as chaves de seguranca spf dkim dnssec - se comecar a criar mais acoes com relacao a essa area, colocar numa funcao igual tratarAnexo()
                        $('.message-header .header-security a').live('mouseenter', function(e){ 
                            var offsetX = e.offsetX -27 || e.pageX-$(this).offset().left + 70; //ff fazendo vergonha
                            $(this).parent().parent().parent().parent().find('.box-seguranca-info').first().stop().animate({
                                'opacity' : '1', 
                                'left' : offsetX
                            });
                        }).live('mouseleave', function(){
                            $(this).parent().parent().parent().parent().find('.box-seguranca-info').first().stop().animate({
                                'opacity' : '0'
                            });
                        });
                        
                        //acoes de confirmacao de leitura
                        Main.confirmacaoDeLeitura();
                        
                        //formata os anexos...
                        Main.tratarAnexo();             
                        
                        //adiciona os eventos das submensagens
                        Main.loadSubMensagem();

                    }

                }, 11);


            },//success
            
            //terminou de carregar a mensagem
            complete : function(){

                //so faz essa parte se passou o target (o td clicado). pra mudar o icone da carta pra aberta caso seja uma mensagem nova
                if(target){

                        //muda a flag dela pra vista
                        $.ajax({
                            url: "mailboxAct.php?&act=setflags&accID="+window.configs.cache.messagelist.accID+"&mbox="+encodeURIComponent(mbox)+"&flags=%2Bseen&mIDs="+ messageID,
                            type: "GET",
                            cache : false,
                            success : function(JsonData){

                                setTimeout(function(){

                                    //so atualiza o numero de novas mensagens e muda a formatacao da tr se houver apenas uma mensagem selecionada
                                    if($('.tbl-message-checked').length == 1){


                                        //verifica se esta marcando a mensagem como lida/nao lida da listagem da pasta 'nao lidas''
                                        if(target.parent().find('.pasta')[0]){

                                            //objeto json com as informacoes
                                            var data = eval('('+JsonData+')');
                                            
                                            //pega o numero de novas mensagens
                                            var novas = data['return'].data.unseen;
                                            var mbox = data['contextMailbox'];
                                            
                                            //atualiza o contador de mensagens (na barra de informacao e ao lado da pasta)
                                            Main.updateMessageCount({
                                                'novas' : novas,
                                                'mbox' : mbox
                                            });
                                            
                                            //pega o total de mensagens nao lidas
                                            var totalUseen = parseInt($('#info-mbox-total').text()) - 1;
                                            
                                            //atualiza o contador
                                            Main.updateMessageCount({
                                                'total' : totalUseen
                                            });
                                            


                                        }else{
                                            //informacoes para atualizar o contador das mensagens
                                            //converte o retorno (string) para objeto
                                            var json = eval('('+JsonData+')');
                                            
                                            var novas = json['return'].data.unseen;
                                            var total = json['return'].data.exists;
                                            var mbox = json.contextMailbox;
                                            
                                            //atualiza o contador de mensagens (na barra de informacao e ao lado da pasta)
                                            Main.updateMessageCount({
                                                'novas' : novas, 
                                                'total' : total, 
                                                'mbox' : mbox
                                            });
                                            
                                        }
                                        
                                        
                                        //remove a classe de nova mensagem da tr
                                        target.parent().removeClass('nova-mensagem').css('background-color', '#ffffff');
                                        
                                        //muda o icone da mensagem pra carta aberta
                                        target.parent().find('.td-carta-fechada').attr('class', 'td-carta-aberta');
                                    }

                                }, 2000);

                            }//success
                        });//ajax coloca a mensagem como vista - quando termina de carregar a mensagem


}

if(typeof(callback) == 'function'){
    callback();
}

            }//complete
        });//ajax carregar mensagem

},




'formatarHeader' : function(){

        //se estiver visualizando no header novo
        if($('#message-read-area .message-header.header-novo:last')[0]){

            //formata a data para o modo inteligente
            moment.lang('pt-br');

            var headerData = $('#message-read-area .message-header.header-novo:last .header-date .valor');

            var data = moment($.trim(headerData.text())).format("DD/M/YYYY HH:mm:ss");

            var dataFormatada = Main.formataDataInteligente(data);

            headerData.text(dataFormatada);

            //mostrar data completa
            headerData.one('click', function(){
                $(this).text(data).css('cursor', 'text');
            })

            var StDe = $('#message-read-area .message-header.header-novo:last .header-from .valor');
            var StDeNome = StDe.text().split('<')[0].replace(/"/gi, '');
            
            StDe.parent().attr('title', StDe.text().replace(/"/g,''));

            if(StDeNome.length > 1){
                StDe.text(StDeNome)
            }else{
                StDe.text(StDe.text().replace('<','').replace('>',''))
            }
            
            //mostrar o email todo do campo from
            StDe.one('click', function(){
                $(this).text($(this).parent().attr('title')).css('cursor', 'text')
            })


            //adiciona o botao de marcar como spam ao lado do remetente
            var btnSpam = $('<div class="marcarComoSpamHeader"> Marcar como SPAM </div>');
            $('#message-read-area .message-header.header-novo:last .header-from').append(btnSpam);

            btnSpam.on('click', function(){
                MainActions.marcarComoSpam();
                setTimeout(function(){
                    $('#tbl-message-list-body tr:first .td-assunto').trigger('click').trigger('click');
                },2000);
            })


        }else{
            //define o idioma do plugin para portugues
            moment.lang('pt-br');

            //formata a exibicao da data no formato brasileiro
            var headerData = $('.header-date:last .valor');

            var dataFormatada = moment($.trim(headerData.text())).format("dddd, DD [de] MMMM [de] YYYY [às] HH:mm:ss");
            headerData.text(dataFormatada);

        }

        //so mostra o controle de mensagens da primeira mensagem - se houver submensagens
        $('#message-read-area .message-header .btn-container').slice(1).remove();

        //pega o numero de palavras da ultima mensagem carregada
        var mensagemContainer = $('#message-read-area .message-header.header-novo:last').parent().find('.bm_conteudo');

        //mostra o tempo para leitura da mensagem
        mensagemContainer.readingTime({
            readingTimeTarget: '.tempo-leitura .tempo',
            lang : 'pt-br',
            wordsPerMinute : 200
        });












        //quando clicar no botao de maximizar a area de leitura
        $('#message-read-area .message-header .btn-container .btn-maximizar').on('click', function(){

            //container dos botoes
            var btnContainer = $(this).parent();

            if($('body').hasClass('vertical')){

                //var limiteHorizontalEsquerdo = $(window).width() * .75 / 3;
                var limiteHorizontalEsquerdo = $('#mbox-list-area').css('left');

                $('#message-read-area').css("left",limiteHorizontalEsquerdo); 
                $('#message-read-area').css("width", $(window).width() - $('#mbox-list-area').width() - $('#message-list-area').width());
                

                //ajeita o tamanho das trs das mensagens
                setTimeout(function(){
                    // $('#message-list-area').css('width', $(window).width() - $('#message-read-area').width() - $('#mbox-list-area').width())
                    $('#message-read-area').css('width', $(window).width() - $('#message-read-area').offset().left);

                    //$('#message-dragbar-vertical').trigger('mousedown').trigger('mousemove').trigger('mouseup');
                },1200);

                $(this).toggleClass('invisivel');
                btnContainer.find('.btn-fechar').toggleClass('invisivel')

            }else{

                //se estiver abrindo o controle das pastas favoritos ou nao lidas
                if($('#info-mbox-caminho').text() == 'Favoritos' || $('#info-mbox-caminho').text() == 'Não lidas'){

                    var trMensagemAberta = $('#message-list-area .tbl-message-checked');

                    if(trMensagemAberta.next('tr')[0]){
                        $('#message-read-area .message-header .btn-container .btn-proxima').on('click').css('opacity', '1');
                    }else{
                        $('#message-read-area .message-header .btn-container .btn-proxima').off('click').css('opacity', '.2');
                    }

                    if(trMensagemAberta.prev('tr')[0]){
                        $('#message-read-area .message-header .btn-container .btn-anterior').on('click').css('opacity', '1');
                    }else{
                        $('#message-read-area .message-header .btn-container .btn-anterior').off('click').css('opacity', '.2');
                    }


                }else{

                    //faz uma requisicao para pegar o array dos ids de mensagens da pasta
                    $.ajax({
                        url : 'getMessageListID.php',
                        type : 'POST',
                        data : {
                            IDConta   : window.configs.cache.messagelist.accID,
                            StMbox    : window.configs.cache.messagelist.mbox,
                            ItTotal   : window.configs.cache.messagelist.total,
                            StBusca   : window.configs.cache.messagelist.searchby,
                            StSort    : window.configs.cache.messagelist.orderby,
                            ItDescOrd : window.configs.cache.messagelist.descorder
                        },
                        complete : function(response){

                            //guarda na sessao os ids
                            sessionStorage.setItem('ArID', response.responseText);

                            //pega o array de ids das mensagens
                            var ArIDMensagens = JSON.parse(response.responseText)

                            //pega o id da mensagem aberta
                            var IDMensagemAberta = $('#message-read-area .message-header').attr('messageID');

                            //pega o indice da mensagem que sera aberta no array de id's
                            var ItIndexMensagemAberta = ArIDMensagens.indexOf(IDMensagemAberta);

                            //pega o id da mensagem anterior a que esta sendo aberta
                            var IDMensagemAnterior = ((ItIndexMensagemAberta - 1) >= 0) ? ArIDMensagens[ItIndexMensagemAberta - 1] : null;

                            //pega o id da proxima mensagem a ser aberta
                            var IDMensagemProxima = (ArIDMensagens[ItIndexMensagemAberta + 1]) ? ArIDMensagens[ItIndexMensagemAberta + 1] : null;

                            //verifica se tem mensagem anterior, para ativar ou desabilitar o controle
                            if(IDMensagemAnterior){
                                $('#message-read-area .message-header .btn-container .btn-anterior').on('click').css('opacity', '1');
                            }else{
                                $('#message-read-area .message-header .btn-container .btn-anterior').off('click').css('opacity', '.2');
                            }

                            //verifica se tem uma proxima mensagem, para ativar ou desabilitar o controle
                            if(IDMensagemProxima){
                                $('#message-read-area .message-header .btn-container .btn-proxima').on('click').css('opacity', '1');
                            }else{
                                $('#message-read-area .message-header .btn-container .btn-proxima').off('click').css('opacity', '.2');
                            }

                        }
                    })

                    //mostra os botoes escondidos
                    btnContainer.find('.btn.invisivel').removeClass('invisivel');

                    //esconde o botao de maximizar
                    $(this).addClass('invisivel');

                    //pega a posicao da area de leitura
                    var posicaoAreaLeitura = $('#message-read-area #message-dragbar').offset().top;

                    //so maximiza se nao estiver maximizado
                    if(posicaoAreaLeitura > 65){

                        //maximiza a area de leitura
                        $('#message-read-area #message-dragbar').trigger('dblclick').css('display', 'none');

                    }

                }//

            }//horizontal

        })


        //quando clicar no botao de fechar a area de leitura maximizada
        $('#message-read-area .message-header .btn-container .btn-fechar').on('click', function(){

            //container dos botoes
            var btnContainer = $(this).parent();

            if($('body').hasClass('vertical')){

                //volta a lista pra metade da tela
                $('#message-list-area').css('width', (($(window).width() - $('#conta-list').width()) / 2) - 80);
                $('#message-read-area').css('left', $('#message-list-area').width())

                //ajeita o tamanho das trs das mensagens
                setTimeout(function(){
                    $('#message-dragbar-vertical').trigger('mousedown').trigger('mousemove').trigger('mouseup');
                },120)

                //esconde o botao de fechar
                $(this).addClass('invisivel');

            }else{

                //esconde os botoes visiveis
                btnContainer.find('.btn').addClass('invisivel');

                btnContainer.find('.btn-mais').removeClass('invisivel');


                //pega a posicao da area de leitura
                var posicaoAreaLeitura = $('#message-read-area #message-dragbar').offset().top

                btnContainer.find('.menu').css('left', '-29px');

                //so minimiza se nao estiver minimizado
                if(posicaoAreaLeitura <= 65){

                   //minimiza a area de leitura
                   $('#message-read-area #message-dragbar').trigger('dblclick').css('display', 'block');

               }

            }//horizontal

            //mostra o botao de maximizar de novo
            btnContainer.find('.btn-maximizar').removeClass('invisivel');

        })


        //carrega a proxima mensagem
        $('#message-read-area .message-header .btn-container .btn-proxima').on('click', function(){


            //se estiver abrindo o controle das pastas favoritos ou nao lidas
            if($('#info-mbox-caminho').text() == 'Favoritos' || $('#info-mbox-caminho').text() == 'Não lidas'){

                var trMensagemAberta = $('#message-list-area .tbl-message-checked');

                //carrega a proxima mensagem
                trMensagemAberta.removeClass('tbl-message-checked').next('tr').addClass('tbl-message-checked').find('.td-assunto').trigger('click');

                //gamby para ver se a proxima mensagem ja carregou, fica 'ouvindo' se o conteudo da area de leitura foi alterado
                
                $('#message-read-area #message-content').one('contentchange', function() {

                    $('#message-content .message-header .btn-maximizar').trigger('click');

                });

            }else{

                //pega o array de ids das mensagens
                var ArIDMensagens = JSON.parse(sessionStorage.getItem('ArID'));

                //pega o id da mensagem aberta
                var IDMensagemAberta = $('#message-read-area .message-header').attr('messageID');

                //pega o indice da mensagem que sera aberta no array de id's
                var ItIndexMensagemAberta = ArIDMensagens.indexOf(IDMensagemAberta);
                
                //pega o id da proxima mensagem a ser aberta
                var IDMensagemProxima = (ArIDMensagens[ItIndexMensagemAberta + 1]) ? ArIDMensagens[ItIndexMensagemAberta + 1] : null;

                //pega a tr da mensagem na listagem
                var trMensagem = $('#message-list-area #tbl-message tr[id="'+ IDMensagemProxima +'"]');

                //se tiver mais mensagens mas ta na ultima tr da listagem, muda a paginacao
                if(IDMensagemProxima && !trMensagem[0]){

                    $('#paginacao-btn-next').trigger('click');

                    $('#message-list-area .message-loading').remove();

                    //marca a primeira mensagem da listagem
                    $('#message-list-area #tbl-message #tbl-message-list-body').on('contentchange', function(){

                        $('#message-list-area #tbl-message #tbl-message-list-body tr[id="'+ IDMensagemProxima +'"]').addClass('tbl-message-checked');

                    })
                    
                }

                //remove as mensagens selecionadas anteriores
                $('#message-list-area #tbl-message tr.tbl-message-checked').removeClass('tbl-message-checked');

                //se a tr estiver na listagem marca a tr
                if(trMensagem[0]){
                    trMensagem.addClass('tbl-message-checked');
                    trMensagem.removeClass('nova-mensagem');
                    trMensagem.find('.td-carta-fechada').removeClass('td-carta-fechada').addClass('td-carta-aberta');
                }
                
                //carrega a proxima mensagem
                Main.loadMessage(window.configs.cache.messagelist.accID, window.configs.cache.messagelist.mbox, IDMensagemProxima, '', function(){

                    //timeout para exibir os botoes. o header carrega tamb, o menu de botoes vem fechado...
                    setTimeout(function(){

                        $('#message-read-area .message-header .btn-container .btn-maximizar').trigger('click');

                        Main.setFlag('+seen', [IDMensagemProxima], window.configs.cache.messagelist.mbox);

                    }, 11)
                    
                });

            }

        });


        //carrega a mensagem anterior
        $('#message-read-area .message-header .btn-container .btn-anterior').on('click', function(){

            //se estiver abrindo o controle das pastas favoritos ou nao lidas
            if($('#info-mbox-caminho').text() == 'Favoritos' || $('#info-mbox-caminho').text() == 'Não lidas'){

                var trMensagemAberta = $('#message-list-area .tbl-message-checked');

                //carrega a mensagem anterior
                trMensagemAberta.removeClass('tbl-message-checked').prev('tr').addClass('tbl-message-checked').find('.td-assunto').trigger('click');

                //gamby para ver se a mensagem anterior ja carregou, fica 'ouvindo' se o conteudo da area de leitura foi alterado
                $('#message-read-area #message-content').one('contentchange', function() {

                    $('#message-content .message-header .btn-maximizar').trigger('click');

                });

            }else{

                //pega o array de ids das mensagens
                var ArIDMensagens = JSON.parse(sessionStorage.getItem('ArID'));

                //pega o id da mensagem aberta
                var IDMensagemAberta = $('#message-read-area .message-header').attr('messageID');

                //pega o indice da mensagem que sera aberta no array de id's
                var ItIndexMensagemAberta = ArIDMensagens.indexOf(IDMensagemAberta);
                
                //pega o id da mensagem anterior a ser aberta
                var IDMensagemAnterior = (ArIDMensagens[ItIndexMensagemAberta - 1]) ? ArIDMensagens[ItIndexMensagemAberta - 1] : null;

                //pega a tr da mensagem na listagem
                var trMensagem = $('#message-list-area #tbl-message tr[id="'+ IDMensagemAnterior +'"]');

                //se tiver mais mensagens mas ta na ultima tr da listagem, muda a paginacao
                if(IDMensagemAnterior && !trMensagem[0]){

                    $('#paginacao-btn-back').trigger('click');

                    $('#message-list-area .message-loading').remove();

                    //marca a ultima mensagem da listagem
                    $('#message-list-area #tbl-message #tbl-message-list-body').on('contentchange', function(){

                        $('#message-list-area #tbl-message #tbl-message-list-body tr').removeClass('tbl-message-checked');

                        $('#message-list-area #tbl-message #tbl-message-list-body tr[id="'+ IDMensagemAnterior +'"]').addClass('tbl-message-checked');

                    })
                    
                }

                //remove as mensagens selecionadas anteriores
                $('#message-list-area #tbl-message tr.tbl-message-checked').removeClass('tbl-message-checked');

                //se a tr estiver na listagem marca a tr
                if(trMensagem[0]){
                    trMensagem.addClass('tbl-message-checked');
                    trMensagem.removeClass('nova-mensagem');
                    trMensagem.find('.td-carta-fechada').removeClass('td-carta-fechada').addClass('td-carta-aberta');
                }
                
                //carrega a mensagem anterior
                Main.loadMessage(window.configs.cache.messagelist.accID, window.configs.cache.messagelist.mbox, IDMensagemAnterior, '', function(){

                    //timeout para exibir os botoes. o header carrega tamb, o menu de botoes vem fechado...
                    setTimeout(function(){

                        $('#message-read-area .message-header .btn-container .btn-maximizar').trigger('click');

                        Main.setFlag('+seen', [IDMensagemAnterior], window.configs.cache.messagelist.mbox);

                    }, 11)

                });

            }
        });


        //quando clicar no botao de mais
        $('#message-read-area .message-header .btn-container .btn-mais').on('click', function(e){

            var menu = $('.menu-mais');
            
            var trigger = $(this);

            //esconde items na pasta spam
            if($.trim($('#barra-mbox #info-mbox-caminho').attr('title')) == 'SPAM'){
                menu.find('.item.marcar-spam').hide();
                menu.find('.item.adicionarAListaNegra').hide();
            }else{
                menu.find('.item.marcar-spam').show();
                menu.find('.item.adicionarAListaNegra').show();
            }

            //tela cheia
            if($('#message-read-area .message-header .btn-container .btn-proxima').is(':visible')){

                //horizontal
                if($('#message-read-area .message-header .btn-container .btn-fechar').is(':visible')){
                    menu.css('left', trigger.offset().left - 62);
                }else{//vertical
                    menu.css('left', trigger.offset().left - 127);    
                }


            }else{//tela normal
                //horizontal
                if($('#message-read-area .message-header .btn-container .btn-fechar').is(':visible')){
                    menu.css('left', trigger.offset().left - 64);
                }else{
                    menu.css('left', trigger.offset().left - 47);
                }
            }

            menu.css('top', trigger.offset().top + 40);

            menu.show();

            var menuHeight = menu.outerHeight();

            var menuTop = menu.offset().top;

            var messageAreaHeight = $('#message-read-area').outerHeight();

            var messageAreaTop = $('#message-read-area').offset().top;

            //se o menu passar da tela pra baixo                
            if((menuTop + menuHeight) > (messageAreaHeight + messageAreaTop)){

                menu.css('top', menu.offset().top - menuHeight)

            }else{
                menu.css('top', trigger.offset().top + 40);
            }


        });
        //exibe e esconde o menu
        var timeoutMenu = null;
        $('#message-read-area .message-header .btn-container .btn-mais').on('mouseleave', function(){
            timeoutMenu = setTimeout(function(){
                $('.menu-mais').hide()
            },100)            
        })
        $('.menu-mais').on('mouseenter', function(){
            clearTimeout(timeoutMenu);
        });
        $('.menu-mais').on('mouseleave', function(){
            $(this).hide()
        })


        //quando clicar em agum item do menu de mais
        $('.menu-mais .item').off('click').on('click', function(e){

            //pega o item clicado do menu
            var item = $(e.target);

            //pega a pasta atual
            var StMbox = window.configs.cache.messagelist.mbox;

            //pega o id da mensagem
            var IDMensagem = $('#message-read-area .message-header').attr('messageID');

            //se estiver abrindo o controle das pastas favoritos ou nao lidas
            if($('#info-mbox-caminho').text() == 'Favoritos' || $('#info-mbox-caminho').text() == 'Não lidas'){

                var trMensagemAberta = $('#message-list-area .tbl-message-checked');

                window.configs.cache.messagelist.mbox = trMensagemAberta.find('.td-mbox').attr('title');

            }

            //imprimir
            if(/imprimir/.test(item.attr('class'))){

                MainActions.imprimirMensagem();

            }



            //marcar como spam
            if(/adicionarAListaNegra/.test(item.attr('class'))){

                MainActions.adicionarAListaNegra();

               //se clicar em ok
               setTimeout(function(){
                $('iframe').contents().find('#URBW_Submit').one('click', function(){
                    $('#message-read-area .message-header .btn-fechar').trigger('click');
                })
            }, 300)

           }

           //marcar como confiavel
           if(/adicionarAListaBranca/.test(item.attr('class'))){

            MainActions.adicionarAListaBranca();

                //se clicar em ok
                setTimeout(function(){
                    $('iframe').contents().find('#URBW_Submit').one('click', function(){
                        $('#message-read-area .message-header .btn-fechar').trigger('click');
                    })
                }, 300)
                

            }


           //marcar como spam
           if(/marcar-spam/.test(item.attr('class'))){

            MainActions.marcarComoSpam();

               //se clicar em ok
               setTimeout(function(){
                $('iframe').contents().find('#URBW_Submit').one('click', function(){
                    $('#message-read-area .message-header .btn-fechar').trigger('click');
                })
            }, 300)

           }



            //adicionar aos contatos
            if(/adicionar-contatos/.test(item.attr('class'))){

                MainActions.adicionarContatos();

            }

            //editar mensagem
            if(/editar/.test(item.attr('class'))){

                MainActions.editarMensagem();

            }
            

            //encaminhar como texto
            if(/encaminhar-texto/.test(item.attr('class'))){

                MainActions.encaminharMensagem('texto');

            }

            //marcar como nao lida
            if(/marcar-nao-lida/.test(item.attr('class'))){

                MainActions.marcarMensagem('nao lida');

            }

            //copiar
            if(/copiar/.test(item.attr('class'))){

                MainActions.copiarMensagem();

            }

            //mover 
            if(/mover/.test(item.attr('class'))){

                MainActions.moverMensagemAntigo();

            }

            //restaurar 
            if(/restaurar/.test(item.attr('class'))){

                MainActions.restaurarMensagem(window.configs.cache.messagelist.mbox, window.configs.cache.messagelist.mbox, [IDMensagem]);

            }

            //esconde o menu
            $('.menu-mais').hide();

        })


},  




'setFlag' : function(StFlag, ArIDMensagens, StMbox){

    var ArIDMensagens = ArIDMensagens.join() //14,77,50

    $.ajax({
        url: "mailboxAct.php?&act=setflags&accID="+window.configs.cache.messagelist.accID+"&mbox="+ StMbox +"&flags=" + encodeURIComponent(StFlag) + "&mIDs=" + ArIDMensagens,
        type: "GET",
        cache : false,
        complete : function(response){  }
    })

},







    /*
     * tratarAnexo()
     * 
     * Pega todos as tags 'a' com rel = anexosUltramail da mensagem e formata os anexos (imagem ou arquivo normal)
     * 
     * as estruturas desse contexto estao em templates/default/message.html e no mail.php (apenas a camada de zoom das imagens anexo)
     * 
     * no message.html tem 3 ul's - uma com os anexos originais, uma somente com anexos normais e outra somente com imagens anexos, a ul original fica invisivel, apenas para pegar as informacoes dos arquivos
     * 
     * @author Bruno Andrade
     * 
     * @since 22/08/2013
     * 
     * @return Void
     * 
     */    
     'tratarAnexo' : function(){

        //pega todos os links de anexo rel=anexosUltramail
        var anexos = $('#message-read-area #message-content .bm_attachs:last a[rel=anexosUltramail]'); //ira guardar <a href='....'>...</a> :last garante que ira pegar somente os anexos da mensagem/submensagem carregada
        
        //ul que contera os anexos de imagem
        var anexoContainerImagem = $('#message-read-area #message-content .bm_attachs .container-anexo-imagem:last'); //:last garante que ira pegar somente os anexos da mensagem/submensagem carregada
        
        //ul que contera os anexos normais
        var anexoContainerNormal = $('#message-read-area #message-content .bm_attachs .container-anexo-normal:last'); //:last garante que ira pegar somente os anexos da mensagem/submensagem carregada
        
        //clicar no botao de anexo
        $('#message-read-area #message-content .bm_attachs').on('click','.container-anexo-normal li',function(){
            _this = this;
            href = $(_this).find('a').attr('href');
            window.location.href = $(_this).find('a').attr('href') ;
        });
        
        //se houver algum  anexo
        if(anexos.length > 0){

            //percorre todos os anexos
            for(var i = 0; i < anexos.length; i++){

                //nome do arquivo anexo
                var nomeArquivo = $(anexos[i]).html();
                
                //tamanho em kb do arquivo anexo
                var anexoFileSize = 0;
                
                
                
                
                //faz uma requisicao ao arquivo para pegar o seu tamanho
                $.ajax({
                    url: anexos[i],
                    type: "POST",
                    cache: false,
                    success : function(JsonData){

                        //pega o tamanho do anexo em bytes
                        anexoFileSize = (JsonData + '').length;
                        
                        //formata o tamanho do anexo para KB ou MB   
                        anexoFileSize = (anexoFileSize >= 1048576) ? Math.round(anexoFileSize / 1048576) + 'MB' : Math.round(anexoFileSize / 1024) + 'KB';

                    },
                    complete : function(JsonData){

                        //pega os cabecalhos do retorno do ajax
                        var responseHeaders = JsonData.getAllResponseHeaders();
                        
                        //pegamos o nome do arquivo anexo - ele servira para colocar o tamanho do anexo no container certo
                        var anexoNome = responseHeaders.split('filename="')[1].split('"')[0];
                        
                        //se for imagem o arquivo carregado, entao coloca o nome do anexo do cabecalho igual ao que esta no container
                        if(/.(jpeg|jpg|gif|png|bmp)/.test(anexoNome.toLowerCase())){

                            //deixa o nome do arquivo que vem no cabecalho igual ao nome do anexo no container - servira como id
                            anexoNome = (anexoNome.length > 30) ? anexoNome.substr(0,30) + '...' : anexoNome;

                        }
                        
                        //pega o container dos anexos - imagem e normal - ignora o container original
                        //var anexoContainer = $('ul[class]:not(.container-anexo-original) li:contains("'+ anexoNome +'")').parent();
                        var anexoContainer = $('ul[class]:not(.container-anexo-original) li[id*="'+ anexoNome +'"]').parent();
                        
                        //verifica em qual container esta colocando o tamanho do arquivo
                        if(anexoContainer.attr('class') == 'container-anexo-imagem'){
                            anexoContainer.find('li:contains("'+ anexoNome +'")').find('.thumb-tamanho-arquivo').html(anexoFileSize);
                        }else{ 
                            anexoContainer.find('li[id*="'+ anexoNome.replace('...','') +'"]').find('span').last().html(' (' + anexoFileSize + ')');
                        }

                    }
                }); 



                //se o anexo for uma imagem
                if(/.(jpeg|jpg|gif|png|bmp)/.test(nomeArquivo.toLowerCase())){

                    //cria uma imagem temporaria, essa nao sera inserida em nenhum container, assim eu tenho a dimensao original da imagem e nao da thumb
                    var imgTemporaria = $('<img>').attr({
                        src : $(anexos[i]).attr('href')
                    });
                    
                    //espera terminar de carregar a imagem toda (temporaria), pra poder pegar as informacoes da mesma (largura e altura)
                    imgTemporaria.load(function(){

                        var largura = $(this)[0].width;
                        var altura = $(this)[0].height;
                        
                        //coloca o alt/title da imagem temporaria na imagem da thumb
                        $("img[src='"+$(this)[0].src+"']").attr('alt', largura + ' X ' + altura);
                        $("img[src='"+$(this)[0].src+"']").attr('title', largura + ' X ' + altura);

                    });           
                    
                    //cria a imagem pra thumb
                    var img = $('<img>').attr({
                        src : $(anexos[i]).attr('href')
                    });
                    
                    //se o nome do arquivo de imagem for muito grande, coloca '...'
                    nomeArquivo = (nomeArquivo.length > 30) ? nomeArquivo.substr(0,30) + '...' : nomeArquivo;
                    
                    //cria o container com a thumb
                    anexoContainerImagem.append($("<li id='"+ nomeArquivo +"'>").
                        append("<span class='thumb-nome-arquivo'>" + nomeArquivo + "</span>").
                        append(img).
                        append($("<span class='thumb-zoom'></span>")).
                        append($("<a href='"+$(anexos[i]).attr('href')+"'><span class='thumb-download'> "+ nomeArquivo +" - <span class='thumb-tamanho-arquivo'></span></span></a>")));

                }else{//se for outro arquivo
                    var bgcolor = Main.textToColor(nomeArquivo.split('.').pop().toLowerCase());
                    anexoContainerNormal.append($("<li class='"+ nomeArquivo.split('.').pop().toLowerCase() +"' id='"+ nomeArquivo +"' style='background-color:"+bgcolor+"'>").
                        append("<span><a href='"+anexos[i]+"'>" + nomeArquivo + "</a></span>").
                        append("<span></span>"));                                    
                }//outros tipos de anexo 

            }//for anexos

        }//se houver anexos
        




        //baixar todos os anexos de imagem
        if(anexoContainerNormal.find('li').length > 0){

            anexoContainerNormal.append('<div class="container-botoes"><div class="btn-baixar-todos">Baixar todos</div></div>');

            anexoContainerNormal.find('.btn-baixar-todos').on('click', function(){
                $.each(anexoContainerNormal.find('li span a'), function(i, link){
                    setTimeout(function(){
                        $(link)[0].click();
                    }, 1000 + (i * 200)/*evita baixar o mesmo arquivo*/);
                });
            })

        }



        
        //baixar todos os anexos de imagem
        if(anexoContainerImagem.find('li').length > 0){

            anexoContainerImagem.append('<div class="container-botoes"><div class="btn-baixar-todos">Baixar todas as fotos</div></div>');

            anexoContainerImagem.find('.btn-baixar-todos').on('click', function(){
                $.each(anexoContainerImagem.find('.thumb-download'), function(i, link){
                    setTimeout(function(){
                        $(link).trigger('click');
                    }, 1000 + (i * 200)/*evita baixar o mesmo arquivo*/);
                });
            })

        }

        
        //se tiver mais que 2 imagens, esconde as outras
        if(anexoContainerImagem.find('li').length > 2){

            anexoContainerImagem.find('li:gt(1)').addClass('invisivel');
            //adiciona o botao de mostrar todas as fotos
            anexoContainerImagem.find('.container-botoes').append($('<div class="btn-mostrar-todos"> Ver todas as '+ anexoContainerImagem.find('li').length +' fotos' + '</div>'))

            anexoContainerImagem.find('.btn-mostrar-todos').on('click', function(){

                //mostra as fotos
                if(anexoContainerImagem.find('.invisivel').length){
                    anexoContainerImagem.find('.invisivel').removeClass('invisivel').animate({'opacity' : 1});
                    $(this).text('Esconder fotos');
                }else{//esconde as fotos
                    anexoContainerImagem.find('li:gt(1)').stop().animate({'opacity' : 0}, function(){
                        anexoContainerImagem.find('li:gt(1)').addClass('invisivel');                        
                    });
                    $(this).text('Ver todas as '+ anexoContainerImagem.find('li').length +' fotos');
                }
                
            })

        }


        

        
        //mostra o botao de zoom quando passar o mouse no container da foto
        $('.container-anexo-imagem li').on('mouseenter', function(){
            $('.thumb-zoom', this).css('display', 'block');
            $('.thumb-download', this).stop().animate({'opacity' : 1}, 200)
        }).on('mouseleave', function(){
            $('.thumb-zoom', this).css('display', 'none');
            $('.thumb-download', this).stop().animate({'opacity' : 0}, 200)
        });
        
        
        //mostra a box de zoom da imagem
        $('.container-anexo-imagem .thumb-zoom').on('click', function(){

            //mostra o overlay do container de zoom
            $('#anexo-zoom-overlay').css('display', 'block');
            
            //limpa a imagem da box de zoom, se houver
            $('#anexo-zoom-foto').find('img').remove();
            
            //pega a imagem ja carregada da thumb e insere no container do zoom
            $(this).parent().find('img').appendTo($('#anexo-zoom-foto'));
            
            
            //pega a dimensao da tela
            var window_w = $(window).width();
            var window_h = $(window).height();
            
            //pega o container da foto e o container geral
            var imgContainer = $('#anexo-zoom-foto');
            var imgContainerGeral = $('#anexo-zoom-foto-container');
            
            //pega as dimensoes da imagem ampliada
            var imgZoom_w = $('#anexo-zoom-foto img')[0].width;
            var imgZoom_h  = $('#anexo-zoom-foto img')[0].height;
            
            //pega o nome do arquivo - a partir do link da thumb, a gente acha o anexo original no container de anexo original que fica invisivel
            var nomeArquivo = $(".container-anexo-original li a[href='"+ $(this).parent().find('a').attr('href') +"']").html();
            
            //pega o tamanho do anexo no span thumb-tamanho-arquivo
            var tamanhoArquivo = $(this).parent().find('.thumb-tamanho-arquivo').html();
            
            //descricao da imagem
            $('#anexo-zoom-foto-descricao').html(nomeArquivo + ' - ' + imgZoom_w + ' X ' + imgZoom_h + ' - ' + tamanhoArquivo);                            
            
            //margin do container da foto - pra centralizar
            var marginLeft, marginTop;
            
            //se a imagem for menor que a dimensao da tela
            if(imgZoom_w < window_w && imgZoom_h < window_h && imgZoom_w != window_w && imgZoom_h != window_h){
                imgContainer.width(imgZoom_w);
                imgContainer.height(imgZoom_h);
                marginLeft = (window_w - imgZoom_w) / 2;
                marginTop = (window_h - imgZoom_h) / 2;
                //não precisa de scroll se a imagem for menor que a tela
                $('#anexo-zoom-foto-container').getNiceScroll().hide();

            }
            else{

                //exibe o scroll do container da imagem
                $('#anexo-zoom-foto-container').getNiceScroll().show();
                
                if(imgZoom_w > window_w){ //se a imagem ultrapassar a largura da tela
                    imgContainer.width(window_w - 100);
                    marginLeft = 50;
                }else{
                    marginLeft = (window_w - imgZoom_w) / 2;
                    imgContainer.width(imgZoom_w);
                }
                if(imgZoom_h > window_h){
                    imgContainer.height(window_h - 100);
                    marginTop = 50;
                }else{
                    marginTop = (window_h - imgZoom_h) / 2;
                    imgContainer.height(imgZoom_h);
                }                                
            }
            
            //centraliza o container da imagem
            imgContainerGeral.css('margin-left', marginLeft);
            imgContainerGeral.css('margin-top', marginTop);

        }); //click icone de zoom


        //fecha a box de zoom
        $('#anexo-zoom-overlay').on('click', function(){

            //pega o link da imagem ampliada pra achar o container da thumb abaixo
            var imgZoom = $('#anexo-zoom-foto img');
            
            //pega o container da thumb da imagem ampliada
            var thumbContainer = $(".container-anexo-imagem li a[href='"+ imgZoom.attr('src') +"']").parent();
            
            //devolve a imagem para a thumb
            imgZoom.insertAfter(thumbContainer.find('span').eq(1)); //insere a tag img depois do span com o tamanho do anexo
            
            //esconde o overlay da imagem ampliada
            $(this).css('display', 'none');

        });                            
    //anexos
    
},
textToColor: function(texto) {

        //Caso texto seja igual a alguma palavra especifica forçar uma cor correspondente
        switch (texto) {
            case 'doc':
            return 'rgb(' + 50 + ',' + 50 + ',' + 200 + ')';
            case 'docx':
            return 'rgb(' + 50 + ',' + 50 + ',' + 180 + ')';
            case 'odt':
            return 'rgb(' + 70 + ',' + 70 + ',' + 220 + ')';
            case 'xls':
            return 'rgb(' + 50 + ',' + 150 + ',' + 50 + ')';
            case 'ods':
            return 'rgb(' + 70 + ',' + 150 + ',' + 70 + ')';
            case 'xlt':
            return 'rgb(' + 30 + ',' + 150 + ',' + 30 + ')';
            case 'csv':
            return 'rgb(' + 0 + ',' + 150 + ',' + 0 + ')';
            case 'ppt':
            return 'rgb(' + 200 + ',' + 50 + ',' + 0 + ')';
            case 'mdb':
            return 'rgb(' + 255 + ',' + 0 + ',' + 200 + ')';
            case 'xls':
            return 'rgb(' + 50 + ',' + 200 + ',' + 50 + ')';
            case 'ppt':
            return 'rgb(' + 200 + ',' + 50 + ',' + 0 + ')';
            case 'mdb':
            return 'rgb(' + 255 + ',' + 0 + ',' + 200 + ')';
            case 'psd':
            return 'rgb(' + 0 + ',' + 0 + ',' + 100 + ')';
            case 'ai':
            return 'rgb(' + 200 + ',' + 150 + ',' + 50 + ')';
        }
        var parte1 = Math.round(texto.length / 3);
        var parte2 = Math.round(texto.length / 3);
        var parte3 = texto.length - parte1 - parte2;

        var textoParte1 = texto.substring(0, parte1);
        var textoParte2 = texto.substring(parte1, parte1 + parte2);
        var textoParte3 = texto.substring(parte1 + parte2, parte1 + parte2 + parte3);

        var r = 0;

        for (y in textoParte1) {
            r += (textoParte1[y].toUpperCase().charCodeAt() - 65) * 8;
        }
        r = Math.ceil(r / textoParte1.length);
        r = r < 0 ? r = 0 : r = r;
        r = r > 255 ? r = 255 : r = r;

        var g = 0;
        for (y in textoParte2) {
            g += (textoParte2[y].toUpperCase().charCodeAt() - 65) * 8;
        }
        g = Math.ceil(g / textoParte2.length);
        g = g < 0 ? g = 0 : g = g;
        g = g > 255 ? g = 255 : g = g;

        var b = 0;
        for (y in textoParte3) {
            b += (textoParte3[y].toUpperCase().charCodeAt() - 65) * 8;
        }
        b = Math.ceil(b / textoParte3.length);
        b = b < 0 ? b = 0 : b = b;
        b = b > 255 ? b = 255 : b = b;

        isNaN(b) ? b = 255 : b = b;

        var string = 'rgb(' + r + ',' + g + ',' + b + ')';

        return string;
    },





    /*
     * loadSubMensagem()
     * 
     * Carrega o conteudo da submensagem e adiciona ao container (bm_submensagens) da mensagem principal
     * 
     * @author Bruno Andrade
     * 
     * @since 27/08/2013
     * 
     * @return Void
     * 
     */    
     'loadSubMensagem' : function(){

        //quando clicar no link de submensagem
        $('#message-read-area #message-content .message-content').last().find('a[rel=submensagemXhrUltramail]').one('click', function(e){

            //nao deixa barir numa nova aba ese tipo de link
            e.preventDefault();
            
            //pega o li da submensagem
            var subMensagem = $(this).parent();
            
            //url da mensagem a ser carrega no ajax
            var subMensagemUrl = $(this).attr('href') + '&type=xhr';
            
            //mostra o cursor de loading
            Main.loadingCursor('show');
            
            //encontra o container da mensagem que ira adicionar a submensagem
            var mensagemContainer = $(this).parent().parent().parent().parent();
            
            
            //carrega a submensagem 
            $.ajax({
                url: subMensagemUrl,
                type: "GET",
                cache : false,
                success : function(JsonData){

                    //esconde o cursor de loading
                    Main.loadingCursor('hide');

                    var messageType = JsonData[0];

                    //remove o container com o link da submensagem
                    //mensagemContainer.find('.bm_smlinks').remove();
                    
                    //remove o link da submensagem
                    subMensagem.remove();

                    //carrega o conteudo da mensagem no container da submensagem
                    //mensagemContainer.find('.bm_submensagens').empty().html(JsonData.replace('H#','').replace(/document.write/g, ''));
                    mensagemContainer.find('.bm_submensagens').append($('<div class="bm_submensagem"></div>').html(JsonData.replace('H#','').replace('T#','').replace(/document.write/g, '')));
                    
                    //adiciona a classe header-novo para o novo modelo de header
                    mensagemContainer.find('.message-header').addClass('header-novo');

                    
                    Main.formatarHeader();



                    //alerta de atencao ao abrir um link no corpo do email
                    $('#message-read-area #message-content .bm_conteudo a[rel!="submensagemXhrUltramail"]').on('click', function(e){

                        //se confirmar, entao abre o link
                        if( confirm('Atenção: Você está acessando um endereço que não pertence ao Ultramail. Tenha certeza que está acessando um conteúdo seguro. Clique Ok para acessar.')){
                            return true;
                        }else{
                            return false;
                        }

                    });
                    
                    //enquanto a submensagem contiver uma submensagem...
                    Main.loadSubMensagem();
                    
                    //trata os anexos das submensagens
                    Main.tratarAnexo();

                }
            });        

});
},




    /*
     * confirmacaoDeLeitura()
     * 
     * Acoes da confirmacao de leitura quando a mensagem possui uma notificacao
     * 
     * Se clicar em 'sim' faz um ajax para responder a mensagem.
     * Se clicar em nao, simplesmente esconde a notificacao.
     * 
     * @author Bruno Andrade
     * 
     * @since 03/09/2013
     * 
     * @return Void
     * 
     */    

     'confirmacaoDeLeitura' : function(){

        //procura a div de confirmacao de leitura
        var BoNotificacao = $('#umdigConfirmNotification')[0];
        
        //se ela nao estiver presente na mensagem nao faz nada
        if(!BoNotificacao){
            return false;
        }
        
        //clicou em sim
        $('#btn-notificacao-sim').on('click', function(){

            //mostra o cursor de loading
            Main.loadingCursor('show');
            
            //pega os parametros para fazer o ajax
            var notificacaoParams = $('#notificacao-params').val();
            
            //carrega a submensagem 
            $.ajax({
                url: './plugins/dispositionNotification/notify.php?'+ notificacaoParams,
                type: "GET",
                cache : false,
                success : function(JsonData){

                    //esconde o cursor de loading
                    Main.loadingCursor('hide');
                    
                    //esconde a notificacao
                    $('#umdigConfirmNotification').animate({
                        'opacity' : '0', 
                        'height' : '0px'
                    }, 800, 'linear', function(){
                        $(this).remove();
                    });

                }
            });        
        });

        //clicou em nao
        $('#btn-notificacao-nao').on('click', function(){

            //esconde a notificacao
            $('#umdigConfirmNotification').animate({
                'opacity' : '0', 
                'height' : '0px'
            }, 800, 'linear', function(){
                $(this).remove();
            });

        });


    },
    
    
    
    
    
    /*
     * JsonError(Json)
     * 
     * Verifica se o json da requisicao retornou uma string contendo uma excecao do php. 
     * se retornou erro(excecao). exibe a box de erro com a mensagem da excecao.
     * 
     * exemplo de retorno com erro :     * 
     * Fatal error: Uncaught exception 'Exception' with message 'Erro ao selecionar pasta' in /home/bruno.dig/prv/webmail_novo2/classes/class.ImapMailbox.php:22
     * 
     * ira exibir "Erro ao selecionar pasta"
     * 
     * @author Bruno Andrade
     * 
     * @since 08/07/2013
     * 
     * @return Boolean
     * 
     */    
     'JsonError' : function(Json){

        var StError = Json.split(': Uncaught');
        
        if(StError[0].indexOf('Fatal error') > -1 && StError.length>1){

            var erro = StError[1].split(' in ')[0].split('message')[1].replace(/'/g, '');
            
            //se o erro for de listagem de pastas, cria um botao de refresh das pastas
            var btnUpdatePastas = '';   
            if($.trim(erro) == 'Erro ao selecionar pasta'){
                btnUpdatePastas = '. <a> recarregar pastas  </a>'
            }
            
            $('#message-list-area').append($("<div id='message-error'> " + erro + btnUpdatePastas + "</div>"));
            
            //adiciona o evento de atualizar pastas do botao criado
            $('#message-list-area a').on('click', function(){

                //remove a box de erro
                $(this).parent().remove();
                
                //recarrega a listagem de pastas da conta em que deu o erro
                Main.loadMbox(window.configs.cache.messagelist.accID);
            });
            
            return true;
        } 
    },
    
    
    
    
    
    
    
    
    
    
    
    /*
     * updateMessageCount()
     * 
     * atualiza o numero de mensagens na barra informacao (abaixo do topo) e ao lado da pasta
     * 
     * essa funcao soh eh chamada quando eh feita requisicao para setflag - mover, marcar como lida/ nao lida e listar mensagens
     * 
     * ela nao eh chamada qundo deleta a mensagem, pois ao final de deletar a mensagem a funcao listar mensagem eh chamada - que chama updateMessageCount
     * 
     */
     'updateMessageCount' : function(ArInfoUpdate){

        var novas = ArInfoUpdate.novas || undefined; //numero de mensagens nao lida - unseen
        var total  = ArInfoUpdate.total   || undefined; //total..
        var mbox = ArInfoUpdate.mbox || undefined;//pasta em que ira atualizar o contador
        var recentes = ArInfoUpdate.recent || undefined;
        
        if(recentes!=undefined){
            totalRecents += parseInt(recentes);
        }
        Main.changeBrowserTitle(totalRecents);
        
        
        //atualiza os contadores das mensagens
        (novas) ? $('#info-mbox-novas').html(novas) :  ''; //barra de informacao abaixo do topo
        (total) ? $('#info-mbox-total').html(total) : ''; //barra de informacao abaixo do topo
        
        //bugfix - por algum motivo, na criacao das pastas ao entrar no webmail, nao esta criando o container de contador da pasta INBOX... aqui forca a criacao do contador da inbox
        if(mbox == 'INBOX'){

            //pega o li da pasta inbox
            var pastaLi = $('#mbox-' + window.configs.cache.messagelist.accID + ' li[data-id="INBOX"]');

            //adiciona a classe de mensagem nova na pasta
            pastaLi.addClass('mbox-mensagem-unseen');
            
            //cria o contador com as mensagens recentes
            var inboxCount = $(' <span id="INBOX-unseen-count" class="mbox-count-' + window.configs.cache.messagelist.accID + '"> ' + recentes + '</span>');
            
            //adiciona o contador ao lado do nome da pasta somente na primeira vez
            if(!pastaLi.find('div').first().find('#INBOX-unseen-count').length){
                pastaLi.find('div').first().append(inboxCount);
            }
            
        }else if(mbox == 'SPAM'){ //spam nao notifica no contador
            return false;            
        }
        
        //atualiza o contador ao lado da pasta
        if(mbox){

            //pega o li da conta atual. no id da li, eh substituido espaco em branco por \, pois o jquery nao consegue pegar id com espaco em branco
            var pastaLi = $('#mbox-' + window.configs.cache.messagelist.accID + ' li[id*="' + mbox.replace(/\s/g, '\\ ').replace(/\./g,'\\.').split('/').pop() +'"]');
            
            //atualiza o numero de novas mensagens da pasta data-naoLidas
            var mboxNovasContainer = $('#mbox-' + window.configs.cache.messagelist.accID + ' .conta-mbox-container li[data-id="'+ mbox.replace(/\//g,'-').replace(/\./g,'\\.') +'"]');
            if(typeof(mboxNovasContainer.attr('data-naoLidas')) != 'undefined'){
                mboxNovasContainer.attr('data-naoLidas', novas);                
            }
            
            //pega o contador ao lado da pasta. pega pelo id com o nome da mbox e que tenha o accID no nome da classe (evitar alterar pastas com nomes iguais em contas diferentes)
            var mboxContador = pastaLi.find($('#'+mbox.replace(/\s/g, '\\ ').split('/').pop()+'-unseen-count[class=mbox-count-'+window.configs.cache.messagelist.accID+']').first());
            
            //se houver mensagem nao lida
            if(mbox && recentes > 0){            

                //assim que carrega as pastas no primeiro acesso, o span com o contador ao lado da pasta eh criado somente nas pastas que tenham unseen > 0
                //caso eu esteja marcando uma mensagem como nao lida(unseen) depois do primeiro acesso, eh criado o span ao lado da pasta e eh atualizado o seu numero
                if(!mboxContador[0]){
                    $('<span id="'+mbox.split('/').pop()+'-unseen-count" class="mbox-count-'+window.configs.cache.messagelist.accID+'"></span>').insertBefore(pastaLi.find(
                        'div div')); //cria o span
                }
                
                //aqui nao eh usado a variavel mboxContador pois caso o span tenha sido criada somente depois do primeiro acesso, mboxContador estara como undefined. assim a gente pega a span que acabamos de criar
                $('#'+mbox.replace(/\s/g, '\\ ').split('/').pop()+'-unseen-count[class=mbox-count-'+window.configs.cache.messagelist.accID+']').first().html(''+recentes+'').parent().parent().addClass('mbox-mensagem-unseen');

            }
            else{ //se nao houver mensagem recente, zera o contador e remove a classe de mensagem nao vista da li
                mboxContador.html('').parent().parent().removeClass('mbox-mensagem-unseen');
            }

        }

    }, 
    
    
    
    
    
    /*
     * formataDataInteligente()
     * 
     * formata a data para o modelo 'inteligente' 
     * 
     * ex: há 5 minutos, ontem, às 10:30, 15 de outubro, 13:30
     * 
     */
     'formataDataInteligente' : function(StData){

        var DtData = StData;
        
        if(DtData == 'Invalid date')
            return false;

        //pega a data e hora no formato original - 10/02/2013 10:30:00
        var DataOriginal = DtData.split(' ')[0]; 
        var HoraOriginal = DtData.split(' ')[1];
        
        //separa a data por '/'
        var DataFormatada = DataOriginal.split('/');
        
        //acerta o mes pra ficar com 2 digitos ex: 09, 07, 01
        DataFormatada[1] = (DataFormatada[1].length == 2) ? DataFormatada[1] : '0' + DataFormatada[1]

        //formata a data para o modelo dia/mes/anoThora:minuto:segundo 10/02/2013
        DataFormatada = DataFormatada[2] + '-' + DataFormatada[1] + '-' + DataFormatada[0];
        
        //define o idioma do plugin para portugues
        moment.lang('pt-br');
        
        //pega o dia de hoje
        var hoje = moment();

        //exibe o numero de dias, de diferenca, da data da mensagem com o dia de hoje
        var diasAteHoje = hoje.diff(moment(DataFormatada), 'days');
        var anosAteHoje = hoje.diff(moment(DataFormatada), 'years');

        //mensagens ateh essa semana
        if(diasAteHoje <= 6 ) {
            DtData = moment(DataFormatada + 'T' + HoraOriginal).calendar();            
        }else{
            DtData = moment(DataFormatada + 'T' + HoraOriginal).format("D [de] MMMM, HH:MM");
        }

        if(anosAteHoje > 0){
            DtData = moment(DataFormatada + 'T' + HoraOriginal).format("D/MM/YYYY HH:MM");
        }

        return DtData;

    },
    
    
    /*
     * ordenarListagen()
     * 
     * faz a ordenacao da listagem de mensagens por um campo especifico - remetente - assunto - data - tamanho e todos (padrao)
     * 
     */

     'ordenarListagem' : function(StCampoOrdenacao){

        //verifica se esta ordenando da pasta especial 'nao lidas'
        if($('#info-mbox-caminho').text() == 'Não lidas' || $('#info-mbox-caminho').text() == 'Favoritos'){

            //define por qual campo ordenar e se sera ascendente ou descendente
            if(StCampoOrdenacao == 'padrao'){
                //dispara o evento de click do header da tabela que esta escondida
                $('thead #header-' + StCampoOrdenacao).last().trigger('click');            
            }else if(StCampoOrdenacao == 'remetente'){
                //dispara o evento de click do header da tabela que esta escondida
                $('thead #header-' + StCampoOrdenacao).last().trigger('click');            
            }else if(StCampoOrdenacao == 'assunto'){
                //dispara o evento de click do header da tabela que esta escondida
                $('thead #header-' + StCampoOrdenacao).last().trigger('click');            
            }
            else if(StCampoOrdenacao == 'data'){
                //dispara o evento de click do header da tabela que esta escondida
                $('thead #header-' + StCampoOrdenacao).last().trigger('click');            
            }
            else if(StCampoOrdenacao == 'tamanho'){
                //dispara o evento de click do header da tabela que esta escondida
                $('thead #header-' + StCampoOrdenacao).last().trigger('click');
            }
            
            
            //muda o texto da label de ordenacao
            $('#ordenacao-listagem #selecionada').text($('#ordenar-' + StCampoOrdenacao).text());
            
            return false;
        }
        
        var descOrder, orderBy;

        //define por qual campo ordenar e se sera ascendente ou descendente
        if(StCampoOrdenacao == 'padrao'){
            orderBy = 'arrival';
            descOrder = 1; //desc
        }else if(StCampoOrdenacao == 'remetente'){
            orderBy = 'from';
            descOrder = 0; //asc
        }else if(StCampoOrdenacao == 'assunto'){
            orderBy = 'subject';
            descOrder = 0; //asc
        }else if(StCampoOrdenacao == 'data'){
            orderBy = 'date';
            descOrder = 1; //desc
        }else if(StCampoOrdenacao == 'tamanho'){
            orderBy = 'size';
            descOrder = 1; //desc
        }
        
        //RUDS 12/04/16
        window.configs.cache.messagelist.orderby = orderBy;
        
        $.ajax({
            url:'plugins/preferences/preferences/setOrdenacaoMensagens',
            type:'POST',
            data:{StOrdemMensagens:StCampoOrdenacao},
            complete:function(response){
                $('#ordenacao-listagem #opcoes li').removeClass('selected');
                $('#ordenacao-listagem #opcoes #ordenar-'+StCampoOrdenacao).addClass('selected');
            }
        });
        
        
        
        
        //se escolheu a opcao que ja estava selecionada, entao inverte a ordem entre descendente (0) e ascendente (1)
        if($('#ordenacao-listagem #selecionada').text().toLowerCase() == StCampoOrdenacao){
            descOrder = (window.configs.cache.messagelist.descorder == 1) ? 0 : 1 ;
        }
        
        Main.loadMessageList({
            orderby: orderBy,
            descorder:descOrder
        }, function(){
            $('#message-list-area').animate({
                'scrollTop' : '0px'
            });
        });

        //muda o texto da label de ordenacao
        $('#ordenacao-listagem #selecionada').text($('#ordenar-' + StCampoOrdenacao).text());
        
    }


}//MAIN===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================
//===========================================================================================



































/*
 * Principais acoes da aplicacao
 * 
 */
 var MainActions = {
    /*
     * cria um id para cada compose que for aberto
     * @author Welton Azevedo <welton@hostnet.com.br>
     * 
     */
     'composeID':0,

     'newComposeID':function(){
        var id = MainActions.composeID;
        MainActions.composeID++;
        return id;
    },
    
    /* 
     * abre o compose de nova mensagem
     * @autor Bruno Andrade <bruno@hostnet.com.br>
     * @modified Welton Azevedo <welton@hostnet.com.br>
     * 
     */
     'novaMensagem' : function(){
        /**/var tID = MainActions.newComposeID();
        if( ($('#composes').children().length) >= 5){
            alert('O número de editores abertos não pode passar de 5');
            return false;
        }
        //JModal.start('./plugins/compose/index/index/winID/'+ 0 + '/IDConta/'+ window.configs.cache.messagelist.accID, 645, 445, 'COMPOSE_NOVA_MENSAGEM'); 
        /**/JModal2.start(tID,'./plugins/compose2/index/index/winID/'+ tID + '/IDConta/'+ window.configs.cache.messagelist.accID, 'COMPOSE_NOVA_MENSAGEM');
    },
    

    /*
     * abre o compose de responder mensagem
     * @autor  Bruno Andrade <bruno@hostnet.com.br>
     * @modified Welton Azevedo <welton@hostnet.com.br>
     * 
     */
     'responderMensagem_old' : function(StTo){

        $('[name=COMPOSE_PREVIEW]').closest('#corpoJMODAL').remove();
        
        var nMensagensSelecionadas = $('.tbl-message-checked');

        if(nMensagensSelecionadas.length < 1){
            alert(window.configs.alertNoSelectedMessage);
            return false;
        }
        if( (nMensagensSelecionadas.length + $('#composes').children().length) > 5){
            alert('O número de editores abertos não pode passar de 5');
            return false;
        }

        for(var i = 0; i < nMensagensSelecionadas.length; i++){
            var tID = MainActions.newComposeID();

            //pega o caminho e o id da mensagem
            if($('#info-mbox-caminho').text() == 'Não lidas' || $('#info-mbox-caminho').text() == 'Favoritos'){
                var mbox = $(nMensagensSelecionadas[i]).find('.pasta').val().replace(/\//g, '%5C'); //aqui inverte as barras para nao confundir com os parametros 
            }else{
                var mbox = $('#info-mbox-caminho').attr('title').replace(/\//g, '%5C'); //aqui inverte as barras para nao confundir com os parametros 
            }
            
            var messageID = $(nMensagensSelecionadas[i]).attr('id');
            
            var realMessageID = $(nMensagensSelecionadas[i]).attr('messageid')?$(nMensagensSelecionadas[i]).attr('messageid'):'no-id';

            if(StTo != '' && StTo == 'todos'){

                //monta o parametro para a compose de responder
                var params = '/winID/'+tID +'/IDConta/'+ window.configs.cache.messagelist.accID +'/mbox/'+ mbox +'/reply/'+ messageID +'/replyAll/1/inReplyTo/'+realMessageID+'/targetTG/tG1';

                //abre a compose de responder a todos
                JModal2.start(tID,'./plugins/compose2/index/reply'+ params,'COMPOSE_RESPONDENDO_TODOS');
            }else{

                //monta o parametro para a compose de responder
                var params = '/winID/'+ tID +'/IDConta/'+ window.configs.cache.messagelist.accID +'/mbox/'+ mbox +'/reply/'+ messageID +'/inReplyTo/'+ realMessageID+'/targetTG/tG1';

                //abre a compose de responder
                JModal2.start(tID,'./plugins/compose2/index/reply'+params,'COMPOSE_RESPONDENDO_MENSAGEM');

            }
        }

    },
    'responderMensagem' : function(StTo,StTipo){

        $('[name=COMPOSE_PREVIEW]').closest('#corpoJMODAL').remove();
        
        var nMensagensSelecionadas = $('.tbl-message-checked');
        
        if(nMensagensSelecionadas.length < 1){
            alert(window.configs.alertNoSelectedMessage);
            return false;
        }
        if( (nMensagensSelecionadas.length + $('#composes').children().length) > 5){
            alert('O número de editores abertos não pode passar de 5');
            return false;
        }
        
        var StTipoResponder = (StTipo) ? StTipo.toUpperCase() : '';
        
        if(StTipoResponder=='ANEXO'){
            /* RESPONDER COMO ANEXO */
            
            var tID = MainActions.newComposeID();
            
            //pega o caminho e o id da mensagem
            if($('#info-mbox-caminho').text() == 'Não lidas' || $('#info-mbox-caminho').text() == 'Favoritos'){
                var mbox = $(nMensagensSelecionadas[0]).find('.pasta').val().replace(/\//g, '%5C'); //aqui inverte as barras para nao confundir com os parametros 
            }else{
                var mbox = $('#info-mbox-caminho').attr('title').replace(/\//g, '%5C'); //aqui inverte as barras para nao confundir com os parametros 
            }
            var messagesIDs = '';
            for(var i = 0; i < nMensagensSelecionadas.length; i++){
                messagesIDs += ','+$(nMensagensSelecionadas[i]).attr('id');
            }
            messagesIDs = messagesIDs.substr(1);

            var params = '/winID/'+ tID +'/IDConta/'+ window.configs.cache.messagelist.accID +'/mbox/'+ mbox +'/reply/'+ messagesIDs +'/replyAll/1/type/'+ StTipoResponder +'/targetTG/tG1' ;

            //abre a compose de encaminhar
            if(StTo == 'todos'){
                JModal2.start(tID,'./plugins/compose2/index/reply'+ params, 'COMPOSE_RESPONDENDO_TODOS');
            } else {
                JModal2.start(tID,'./plugins/compose2/index/reply'+ params, 'COMPOSE_RESPONDENDO_MENSAGEM');
            }

        }else{

            /* RESPONDER COMO TEXTO */

            for(var i = 0; i < nMensagensSelecionadas.length; i++){
                var tID = MainActions.newComposeID();

                //pega o caminho e o id da mensagem
                if($('#info-mbox-caminho').text() == 'Não lidas' || $('#info-mbox-caminho').text() == 'Favoritos'){
                    var mbox = $(nMensagensSelecionadas[i]).find('.pasta').val().replace(/\//g, '%5C'); //aqui inverte as barras para nao confundir com os parametros 
                } else {
                    var mbox = $('#info-mbox-caminho').attr('title').replace(/\//g, '%5C'); //aqui inverte as barras para nao confundir com os parametros 
                }
            
                var messageID = $(nMensagensSelecionadas[i]).attr('id');
            
                var realMessageID = $(nMensagensSelecionadas[i]).attr('messageid')?$(nMensagensSelecionadas[i]).attr('messageid'):'no-id';

                if(StTo != '' && StTo == 'todos'){

                    //monta o parametro para a compose de responder
                    var params = '/winID/'+tID +'/IDConta/'+ window.configs.cache.messagelist.accID +'/mbox/'+ mbox +'/reply/'+ messageID +'/replyAll/1/type/'+ StTipoResponder +'/inReplyTo/'+realMessageID+'/targetTG/tG1';

                    //abre a compose de responder a todos
                    JModal2.start(tID,'./plugins/compose2/index/replyAll'+ params,'COMPOSE_RESPONDENDO_TODOS');
                }else{

                    //monta o parametro para a compose de responder
                    var params = '/winID/'+ tID +'/IDConta/'+ window.configs.cache.messagelist.accID +'/mbox/'+ mbox +'/reply/'+ messageID +'/type/'+ StTipoResponder +'/inReplyTo/'+ realMessageID+'/targetTG/tG1';

                    //abre a compose de responder
                    JModal2.start(tID,'./plugins/compose2/index/reply'+params,'COMPOSE_RESPONDENDO_MENSAGEM');

                }//endif
                
            }//endfor
            
        }//endif

    },
    
    
    /*
     * abre o gerenciador de criar nova pasta
     */

     'novaPasta' : function(){
        JModal.start('./plugins/mboxmanager/createFolder/index/IDConta/' + window.configs.cache.messagelist.accID, 400, 210, 'CRIAR_PASTA');
    },
    
    
    
    /*
     *  abre o gerenciador de catalogo
     */
     'contatosManager' : function(){
        JModal.start('./plugins/addressbook/', 1000, 600, 'ADDBOOK_TELA_INICIAL');
    },
    
    
    /*
     * imprime uma mensagem
     */
     'imprimirMensagem' : function(){
        //pega as mensagens selecionadas
        var mensagensSelecionadas = $('.tbl-message-checked');

        //verifica se o usuario selecionou alguma mensagem
        if(mensagensSelecionadas.length < 1){
            alert(window.configs.alertNoSelectedMessage);
            return false;
        }

        //pega o(s) Id(s) da(s) mensagem(ns) selecionada(s)
        mensagensSelecionadas.each(function(){

            //abre a janela com a mensagem a ser impressa
            window.open('getMessage.php?imprimindo=true&'+
                'accID='+ window.configs.cache.messagelist.accID +'&mbox='+ window.configs.cache.messagelist.mbox +'&mID='+ $(this).attr('id'), '_blank', 'status=0, resizable=1, menubar=1, scrollbars=1');
            
        }); 
    },
    
    /*
     *  abre o gerenciador de pastas
     */
     'pastasManager' : function(){        
        Main.menuConfiguracoes.abrir();
        Main.menuConfiguracoes.marcarBotao('pastas');
        Layer.start('./plugins/mboxmanager/index/index/IDConta/' + window.configs.cache.messagelist.accID, 587, 500);
        //JModal.start('./plugins/mboxmanager/index/index/IDConta/'+window.configs.cache.messagelist.accID, 380, 325, 'MBOX_MANAGER'); 
    },

    
    /*
     *  abre o gerenciador de controle de spam
     */
     'spamManager' : function(){        

        Main.menuConfiguracoes.abrir();
        Main.menuConfiguracoes.marcarBotao('spam');
        Layer.start('./plugins/sieve/SpamControl/index/accID/' + window.configs.cache.messagelist.accID, 587, 500);
        
    },
    
    
    /*
     *  abre o gerenciador de lista branca
     */
     'listaBrancaManager' : function(){

        //fecha o alias
        $('#alias-list-area #cancel').trigger('mousedown');

        Main.menuConfiguracoes.abrir();
        Main.menuConfiguracoes.marcarBotao('lista-branca-remetentes');
        Layer.start('./plugins/sieve/WhiteBlackList/showWhite/accID/' + window.configs.cache.messagelist.accID, 720, 500);
    },
    

    
    /*
     *  abre o gerenciador de lista negra
     */
     'listaNegraManager' : function(){

        //fecha o alias
        $('#alias-list-area #cancel').trigger('mousedown');

        Main.menuConfiguracoes.abrir();
        Main.menuConfiguracoes.marcarBotao('lista-negra-remetentes');
        Layer.start('./plugins/sieve/WhiteBlackList/showBlack/accID/' + window.configs.cache.messagelist.accID, 720, 500);
    },
    
    
    /*
     *  abre o gerenciador de lista negra de palavras
     */
     'listaNegraPalavrasManager' : function(){

        //fecha o alias
        $('#alias-list-area #cancel').trigger('mousedown');

        Main.menuConfiguracoes.abrir();
        Main.menuConfiguracoes.marcarBotao('lista-negra-palavras');
        Layer.start('./plugins/sieve/userrules/showBlackWords/accID/'+window.configs.cache.messagelist.accID+'/Rule/BLACKWORDS', 720, 500);
    }, 


    
    /*
     *  abre o gerenciador de regras sieve
     */
     'regrasSieveManager' : function(){        
        //JModal.start('./plugins/sieve/UserRules/index/accID/' + window.configs.cache.messagelist.accID, 650, 340);
        Main.menuConfiguracoes.abrir();
        Main.menuConfiguracoes.marcarBotao('regras');
        Layer.start('./plugins/sieve/Regras/index/accID/' + window.configs.cache.messagelist.accID, 500, 290);
    },
    
    
    /*
     *  abre o gerenciador de backup de regras sieve
     */
     'sieveBackupManager' : function(){
        JModal.start('./plugins/sieve/RulesFile/index/accID/' + window.configs.cache.messagelist.accID, 500, 290);
    },
    
    'emailsAlias': function(){
        Main.menuConfiguracoes.abrir();
        Main.menuConfiguracoes.marcarBotao('alias');
        //MainActions.emailsAlias.ghostWindow = new modal('plugins/ghostmail', 'ghosts', '#message-area', false);
        Layer.start('./plugins/ghostmail/index/index/accID/' + window.configs.cache.messagelist.accID, 500, 290);
    },
    
    
    /*
     *  abre o gerenciador de contas adicionais
     */
     'contasAdicionaisManager' : function(){        
        Main.menuConfiguracoes.abrir();
        Main.menuConfiguracoes.marcarBotao('contas');
        Layer.start('./plugins/mailplus/index/index', 500, 340, 'CONTAS_ADICIONAIS');
    },
    
    
    /*
     *  abre o gerenciador de troca de senha
     */
     'senhaManager' : function(){
        JModal.start('./plugins/changepass/index/index/IDConta/'+window.configs.cache.messagelist.accID, 440, 300, 'TROCA_SENHA');
    },
    
    
    /*
     *  abre o gerenciador de preferencias
     */
     'preferenciasManager' : function(){
        //JModal.start('./plugins/preferences/Preferences/index/accID/'+window.configs.cache.messagelist.accID, 780, 500, 'PREFERENCES_TELA_INICIAL');
        Main.menuConfiguracoes.abrir();
        Main.menuConfiguracoes.marcarBotao('preferencias');
        Layer.start('./plugins/preferences/Preferences/index/accID/' + window.configs.cache.messagelist.accID, 780, 500);
    },


    /*
     *  abre o gerenciador de seguranca
     */
     'segurancaManager' : function(){
        Main.menuConfiguracoes.abrir();
        Main.menuConfiguracoes.marcarBotao('seguranca');
        Layer.start('./plugins/seguranca/Seguranca/index/accID/' + window.configs.cache.messagelist.accID, 780, 500);
    },
    
    
    /*
     * fazer logout
     */
     'logout' : function(){
        location.href = "logout.php";
        //mataCookie('cookielogin'); //ver o lance do metacookie no main.js antigo
    },
    
    /*
     * marca/desmarca todas as mensagens
     */
     'selecionarMensagens' : function(){

        //pega o numero total de mensagens na listagem
        var nTotalMensagens = $('#tbl-message-list-body tr').length;
        
        //se nao tiver nenhuma mensagem selecionada, ou o numero de mensagens selecionadas for menor que o numero total de mensagens da listagem, seleciona todos
        if($('.tbl-message-checked').length != nTotalMensagens){
            $('#tbl-message-list-body tr').addClass('tbl-message-checked');
            $('#marcar-mensagem').html('<span class="checked"></span>Deselecionar todas').addClass('marcada');
        }else{
            $('#tbl-message-list-body tr').removeClass('tbl-message-checked');
            $('#marcar-mensagem').html('<span></span>Selecionar todas').removeClass('marcada');
        } 
        
        //se tiver mais de uma mensagem selecionada, exibe uma mensagem
        if($('.tbl-message-checked').length > 0){
            $('#message-read-area #message-content').empty().append($("<div id='message-alert'> Mais de 1 mensagem selecionada. </div>"));
        }
        
    },
    
    /*
     *  Limpa a lixeira de todas as contas
     *  
     */
     'esvaziarLixeira' : function(){

        if (!confirm(window.configs.confirmTrash)){
            return false;
        }
        
        //procura as contas de email do usuario
        $('#conta-list .conta-mbox').each(function(){

            //pega os id's das contas existentes
            var accID = $(this).attr('id').replace('mbox-', '');
            
            //limpa as lixeiras das contas encontradas
            $.ajax({
                url: 'mailboxAct.php?act=emptyTrash&accID='+accID,
                type: "GET",
                cache : false,
                success : function(JsonData){                                
                    //apos esvaziar as lixeiras, recarrega as pastas da conta
                    Main.loadMbox(accID);                                
                }
            });//ajax limpar lixeiras

        });
        
        //depois de ter esvaziado e recarregado as pastas, recarrega a listagem de mensagens                    
        Main.loadMessageList({
            accID : window.configs.cache.messagelist.accID,
            curpage : window.configs.cache.messagelist.curpage,
            mbox : window.configs.cache.messagelist.mbox
        }); 
    },
    
    
    
    /*
     *  limparPasta()
     *  
     *  limpa os excluidos de uma pasta
     *  
     *  StMbox - caminho completo da pasta
     *  accID - id da conta que ira limpar a pasta - se nao for passado esse parametro, accID sera o id da conta atual
     *  
     */
     'limparPasta' : function(StMbox, accID){

        //pasta que deseja limpar os excluidos
        var mbox = StMbox;
        
        //pergunta se deseja continuar... pega somente a ultima pasta do caminho para exibir no alert
        if (!confirm("Deseja realmente limpar os excluídos da pasta " + Main.maskMboxName(mbox.split('/').pop()) + " ?")){
            return false;
        }
        
        //pega os id da conta atual ou o id da conta passada
        var accID = accID || window.configs.cache.messagelist.accID;
        
        $.ajax({
            url: "mailboxAct.php?act=expunge&mbox=" +  mbox + "&accID=" +accID,
            type: "GET",
            cache : false,
            success : function(JsonData){                                
                //apos limpar os excluidos da pasta atual, recarrega as pastas
                Main.loadMbox(accID);                                
            },
            complete : function(){
                //depois de ter limpado os excluidos da pasta atual e recarregado as pastas, recarrega a listagem de mensagens                    
                Main.loadMessageList({
                    accID : window.configs.cache.messagelist.accID,
                    curpage : window.configs.cache.messagelist.curpage,
                    mbox : window.configs.cache.messagelist.mbox
                });
                
                //depois de recarregar a listagem de pastas, a listagem de mensagens, marca a pasta que estava marcada
                //esse timeout eh importante pois, talvez a listagem de pastas ainda nao esteja pronta
                setTimeout(function(){
                    Main.activeMbox();
                } ,1800);


            }
        });//ajax limpar lixeiras

},


    /*
     *  esvaziarPasta()
     *  
     *  limpa as mensagens de uma pasta de uma conta
     *  
     *  StMboxPath - caminho da pasta
     *  accID - id da conta
     *  
     */
     'esvaziarPasta' : function(StMboxPath, accID){

        if (confirm("Deseja realmente esvaziar a pasta " + StMboxPath + "?")) {

            $.ajax({
                url: "esvaziarPasta.php?conta=" + accID + "&mbox=" + StMboxPath,
                type: "GET",
                cache : false,
                success : function(JsonData){                                
                    //apos limpar a pasta, recarrega as pastas, a listagem de mensagens
                    Main.loadMbox(accID);                              
                },
                complete : function(){
                    //depois de ter limpado os excluidos da pasta atual e recarregado as pastas, recarrega a listagem de mensagens                    
                    Main.loadMessageList({
                        accID : window.configs.cache.messagelist.accID,
                        curpage : window.configs.cache.messagelist.curpage,
                        mbox : window.configs.cache.messagelist.mbox
                    });
                    
                    //depois de recarregar a listagem de pastas, a listagem de mensagens, marca a pasta que estava marcada
                    //esse timeout eh importante pois, talvez a listagem de pastas ainda nao esteja pronta
                    setTimeout(function(){
                        Main.activeMbox();
                    } ,1800);

                }
            });

        }//confirm 
    },
    
    
    
    /*
     *  moverPasta()
     *  
     *  abre o gerenciador de mover pasta
     *  
     */
     'moverPasta' : function(StMboxPath, accID){

        //pega somente a pasta - caminho/etc/pasta - retorna 'pasta''
        //var mbox = StMboxPath.split('/').pop();
        
        //pega o caminho completo da pasta caminho/etc/ - remove o ultimo item que seria a pasta - usa o join pra formatar o caminho das pastas com um '-'. o backend do gerenciador de mover pasta precisa do parametro nesse formato
        //var pathMbox = StMboxPath.split('/').slice(0, -1).join('[-]');  //caminho-etc-etc2
        
        //se o caminho for a raiz, pathmbox fica vazio, senao, adiciona um '-' ao final do caminho ex caminho-etc-etc2-  o backend precisa desse '-' no final do caminho...(?)
        //pathMbox = (pathMbox == 0) ? pathMbox : pathMbox + '[-]';
        
        //abre o gerenciador de mover pasta
        //JModal.start('./plugins/mboxmanager/index/index/IDConta/'+accID+'/Funcao/moverPasta/Mbox/'+mbox+'/PathMbox/'+pathMbox,380, 325, 'COMPOSE_MOVER_PASTA');
        Main.menuConfiguracoes.abrir();
        Layer.start('./plugins/mboxmanager/index/index/IDConta/' + window.configs.cache.messagelist.accID, 587, 500);

    },
    
    
    /*
     *  renomearPasta()
     *  
     *  abre o gerenciador de renomear pasta
     *  
     */
     'renomearPasta' : function(StMboxPath, accID){

        //pega somente a pasta - caminho/etc/pasta - retorna 'pasta''
        //var mbox = StMboxPath.split('/').pop();
        
        //pega o caminho completo da pasta caminho/etc/ - remove o ultimo item que seria a pasta - usa o join pra formatar o caminho das pastas com um '[-]'. o backend do gerenciador de mover pasta precisa do parametro nesse formato
        //var pathMbox = StMboxPath.split('/').slice(0, -1).join('[-]');  //caminho-etc-etc2
        
        //se o caminho for a raiz, pathmbox fica vazio, senao, adiciona um '-' ao final do caminho ex caminho-etc-etc2-  o backend precisa desse '[-]' no final do caminho...(?)
        //pathMbox = (pathMbox == 0) ? pathMbox : pathMbox + '[-]';
        
        //abre o gerenciador de mover pasta
        //JModal.start('./plugins/mboxmanager/index/index/IDConta/'+accID+'/Funcao/renomearPasta/Mbox/'+mbox+'/PathMbox/'+pathMbox,380, 325, 'COMPOSE_RENOMEAR_PASTA');

        Main.menuConfiguracoes.abrir();
        Layer.start('./plugins/mboxmanager/index/index/IDConta/' + window.configs.cache.messagelist.accID, 587, 500);

    },
    
    
    /*
     *  removerPasta()
     *  
     *  abre o gerenciador de renomear pasta
     *  
     */
     'removerPasta' : function(StMboxPath, accID){

        //pega somente a pasta - caminho/etc/pasta - retorna 'pasta''
        //var mbox = StMboxPath.split('/').pop();
        
        //pega o caminho completo da pasta caminho/etc/ - remove o ultimo item que seria a pasta - usa o join pra formatar o caminho das pastas com um '[-]'. o backend do gerenciador de mover pasta precisa do parametro nesse formato
        //var pathMbox = StMboxPath.split('/').slice(0, -1).join('[-]');  //caminho-etc-etc2
        
        //se o caminho for a raiz, pathmbox fica vazio, senao, adiciona um '-' ao final do caminho ex caminho-etc-etc2-  o backend precisa desse '[-]' no final do caminho...(?)
        //pathMbox = (pathMbox == 0) ? pathMbox : pathMbox + '[-]';
        
        //abre o gerenciador de mover pasta
        //JModal.start('./plugins/mboxmanager/index/index/IDConta/'+accID+'/Funcao/excluirPasta/Mbox/'+mbox+'/PathMbox/'+pathMbox,380, 325, 'COMPOSE_REMOVER_PASTA');
        Main.menuConfiguracoes.abrir();
        Layer.start('./plugins/mboxmanager/index/index/IDConta/' + window.configs.cache.messagelist.accID, 587, 500);

    },
    
    /*
     *  Adiciona uma nova conta
     *  
     */
     'adicionarNovaConta' : function(){
        JModal.start('./plugins/mailplus/index/index', 500, 340, 'CONTAS_ADICIONAIS');
    },
    
    
    
    /*
     *  limpa os excluidos de todas as pastas de todas as contas
     *
     */
     'limparPastas' : function(){

        //esse parametro vai em branco
        var mbox = '';
        
        //pergunta se deseja continuar...
        if (!confirm("Deseja realmente limpar os excluídos de suas pastas")){
            return false;
        }
        
        //procura as contas de email do usuario
        $('#conta-list .conta-mbox').each(function(){

            //pega os id's das contas existentes
            var accID = $(this).attr('id').replace('mbox-', '');
            
            $.ajax({
                url: "mailboxAct.php?act=expungeAll&mbox=" +  mbox + "&accID=" +accID,
                type: "GET",
                cache : false,
                success : function(JsonData){                                
                    //apos limpar os excluidos da pasta atual, recarrega as pastas
                    Main.loadMbox(accID);                                
                }
            });//ajax limpar lixeiras

        });//foreach
        
        //depois de ter limpado os excluidos da pasta atual e recarregado as pastas, recarrega a listagem de mensagens                    
        Main.loadMessageList({
            accID : window.configs.cache.messagelist.accID,
            curpage : window.configs.cache.messagelist.curpage,
            mbox : window.configs.cache.messagelist.mbox
        });       
    },
    
    
    
    /*
     *  muda o modo de visualizacao da mensagem. cabecalho, codigo fonte, texto, html
     *   
     */
     'setMessageView' : function(StViewMode){

        //id da mensagem que esta carregada na area de leitura de mensagem
        var messageID = $('.tbl-message-checked').first().attr('id');

        //muda o modo de visualizacao da mensagem
        $.ajax({
            url: 'mailboxAct.php?act=setViewType&viewType='+ StViewMode +'&accID='+window.configs.cache.messagelist.accID,
            type: "GET",
            cache : false,
            success : function(JsonData){  
                Main.loadMessage(window.configs.cache.messagelist.accID, window.configs.cache.messagelist.mbox, messageID);
            }
        });
    },
    
    
    
    
    
    
    /*
     * Apaga uma ou muitas mensagens
     */
     'apagarMensagem' : function(){

        //pega o numero de mensagens selecionadas
        var mensagensSelecionadas = $('.tbl-message-checked');
        
        //verifica se o usuario selecionou alguma mensagem
        if(mensagensSelecionadas.length < 1){
            alert(window.configs.alertNoSelectedMessage);
            return false;
        }
        
        
        //se o usuario marcou a opcao de confirmar exclusao
        if(window.configs.del_advice == 'TRUE') {

            //verifica se o usuario confirmou a exclusao das mensagens   
            if(mensagensSelecionadas.length==1){
                if(!confirm(window.configs.confirmMessage)) return false;
            } else{
                if(!confirm(window.configs.confirmMessages.replace(/<<x>>/, mensagensSelecionadas.length))) return false;
            }

        }
        
        //desmarca a opcao 'selecionar todas' se a mesma estiver marcada
        if($('#marcar-mensagem').attr('class') == 'marcada'){
            $('#marcar-mensagem').trigger('click');
        }
        
        //pega o(s) Id(s) da(s) mensagem(ns) selecionada(s)
        var ArMensagensID = [];
        mensagensSelecionadas.each(function(){
            ArMensagensID.push($(this).attr('id'));
        });
        
        //atualiza a informacao do objeto cache com o id da(s) ultima(s) mensagem(ns) deletada(s) 
        //e guarda tambem a posicao da ultima tr apagada
        window.configs.cache.lastDeletedMsg = ArMensagensID;
        window.configs.cache.lastDeletedRow = $('#'+ArMensagensID[0]).index();
        
        //mostra o loading do cursor
        Main.loadingCursor('show');
        
        //se estiver apagando a mensagem de dentro da pasta 'nao lidas'
        if($('#info-mbox-caminho').text() == 'Não lidas' || $('#info-mbox-caminho').text() == 'Favoritos'){

            //apaga as mensagens
            for(var i in ArMensagensID){

                var TrMensagem = $('#tbl-message-list-body').find('tr[id="'+ ArMensagensID[i] +'"]');

                var mboxMensagem = TrMensagem.find('.pasta').val();
                var mensagemId = TrMensagem.attr('id');
                
                //pega a li da pasta a qual a mensagem foi apagada, para poder atualizar o seu total de mensagens nao lidas 'data-naolidas'
                var mbox = $('#mbox-' + window.configs.cache.messagelist.accID + ' li[data-id="'+ mboxMensagem.replace(/\//g,'-') +'"]');
                var mboxNaoLidas = parseInt(mbox.attr('data-naolidas'));
                mbox.attr('data-naolidas', mboxNaoLidas - 1);
                
                //remove a tr da listagem
                TrMensagem.remove();
                
                //muda a flag para deleted da mensagem
                $.ajax({
                    url: "mailboxAct.php?&act=setflags&accID="+window.configs.cache.messagelist.accID+"&mbox="+ mboxMensagem +"&flags=" + encodeURIComponent('+deleted') + "&mIDs=" + mensagemId,
                    type: "GET",
                    cache : false,
                    success : function(JsonData)
                    {

                        //esconde o cursor de loading
                        Main.loadingCursor('hide');
                        
                        //atualiza o contador de mensagens nao lidas
                        var naoLidasCount = parseInt($('#info-mbox-total').text());
                        $('#info-mbox-total').text(naoLidasCount- 1);
                        
                        //gamby para ver se a proxima mensagem ja carregou, fica 'ouvindo' se o conteudo da area de leitura foi alterado
                        $('#message-read-area #message-content').one('contentchange', function() {

                            //so abre o menu se ja estiver maximizada a area de leitura
                            if(!$('body').hasClass('vertical')){ 
                                if($('#message-read-area #message-dragbar').offset().top < 65){

                                    $('#message-content .message-header .btn-maximizar').trigger('click');

                                }
                            }

                        });

                    }
                });

            }//for
            
            
        //terminou o processo de apagar mensagem da pasta 'nao lidas'
        
        }else{ //se estiver apagando uma mensagem de uma pasta normal

            var lastScrollTop = $('#message-list-area').scrollTop();

            //muda a flag da mensagem pra +deleted
            $.ajax({
                url: "mailboxAct.php?&act=setflags&accID="+window.configs.cache.messagelist.accID+"&mbox="+ window.configs.cache.messagelist.mbox +"&flags=" + encodeURIComponent('+deleted') + "&mIDs=" + ArMensagensID,
                type: "GET",
                cache : false,
                success : function(JsonData){

                    //esconde o cursor de loading
                    Main.loadingCursor('hide');

                    //se estiver na ultima pagina da paginacao e apagar todas as mensagens, a pagina atual sera a pagina atual - 1
                    //pra passar o curpage certo pra listar as mensagens
                    var totalPaginas = Math.ceil(window.configs.cache.messagelist.total / window.configs.cache.messagelist.pagesize);
                    var curpage = window.configs.cache.messagelist.curpage;
                    if(curpage >= totalPaginas){
                        curpage = curpage - 1; 
                    }

                    //limpa a area de leitura da mensagem antes de carregar a proxima
                    $('#message-read-area #message-content').empty();


                    //assim que deletar a mensagem, atualiza a listagem de mensagens
                    Main.loadMessageList({
                        accID : window.configs.cache.messagelist.accID,
                        curpage : curpage,
                        mbox : window.configs.cache.messagelist.mbox
                    }, function(){

                        //se a opcao de deletar mensagem for marcar como excluida, nao remove a tr, apenas marca a ultima mensagem marcada como excluida
                        if(window.configs.cache.del_msg_type == 'MARCA'){

                            //marca a ultima mensagem marcada como exlcuida
                            $('#'+window.configs.cache.lastDeletedMsg).addClass('tbl-message-checked').find('.td-assunto').trigger('click');

                            setTimeout(function(){
                                $('#message-list-area').scrollTop(lastScrollTop);
                            },11);

                            return false;

                        }

                        //quando terminar de listar as mensagens, carrega a proxima mensagem
                        //pega a posicao da ultima tr apagada
                        var lastTrRemovedIndex = window.configs.cache.lastDeletedRow;

                        //pega a tr na mesma posicao em que a tr antiga foi deletada, adiciona a classe checked e dispara o evento do click nela, carregando a mensagem
                        if($('#message-list-area #tbl-message-list-body tr').get(lastTrRemovedIndex)){
                            $($('#message-list-area #tbl-message-list-body tr').get(lastTrRemovedIndex)).addClass('tbl-message-checked').find('.td-assunto').trigger('click');
                            
                            setTimeout(function(){
                                $('#message-list-area').scrollTop(lastScrollTop);
                            },11);

                        }else{
                            $('#message-list-area #tbl-message-list-body tr').last().addClass('tbl-message-checked').find('.td-assunto').trigger('click');
                        }

                        //gamby para ver se a proxima mensagem ja carregou, fica 'ouvindo' se o conteudo da area de leitura foi alterado
                        $('#message-read-area #message-content').one('contentchange', function() {

                            //so abre o menu se ja estiver maximizada a area de leitura
                            if(!$('body').hasClass('vertical')){ 
                                if($('#message-read-area #message-dragbar').offset().top < 65){

                                    $('#message-content .message-header .btn-maximizar').trigger('click');

                                }
                            }

                        });

                    }); //loadMessageList


                }//success
            });//ajax

        }//apagando de uma pasta normal
        
    },
    
    
    /*
     *  encaminharMensagem()
     *  
     *  encaminha mensagens selecionadas
     *  
     *  StTipo - define o modo de encaminhamento, que são : texto e anexo
     *  
     *  @autor Bruno Andrade <bruno@hostnet.com.br>
     *  @modified Welton Azevedo <welton@hostnet.com.br>
     *  
     */
     'encaminharMensagem' : function(StTipo){

        $('[name=COMPOSE_PREVIEW]').closest('#corpoJMODAL').remove();
        
        var nMensagensSelecionadas = $('.tbl-message-checked');
        
        if(nMensagensSelecionadas.length < 1){
            alert(window.configs.alertNoSelectedMessage);
            return false;
        }
        if( (nMensagensSelecionadas.length + $('#composes').children().length) > 5){
            alert('O número de editores abertos não pode passar de 5');
            return false;
        }
        
        var StTipoEncaminhamento = (StTipo) ? StTipo.toUpperCase() : '';
        
        
        if(StTipoEncaminhamento=='ANEXO'){
            /* ENCAMINHAR COMO ANEXO */
            
            var tID = MainActions.newComposeID();
            
            //pega o caminho e o id da mensagem
            if($('#info-mbox-caminho').text() == 'Não lidas' || $('#info-mbox-caminho').text() == 'Favoritos'){
                var mbox = $(nMensagensSelecionadas[0]).find('.pasta').val().replace(/\//g, '%5C'); //aqui inverte as barras para nao confundir com os parametros 
            }else{
                var mbox = $('#info-mbox-caminho').attr('title').replace(/\//g, '%5C'); //aqui inverte as barras para nao confundir com os parametros 
            }
            var messagesIDs = '';
            for(var i = 0; i < nMensagensSelecionadas.length; i++){
                messagesIDs += ','+$(nMensagensSelecionadas[i]).attr('id');
            }
            messagesIDs = messagesIDs.substr(1);

            var params = '/winID/'+ tID +'/IDConta/'+ window.configs.cache.messagelist.accID +'/mbox/'+ mbox +'/forward/'+ messagesIDs +'/type/' + StTipoEncaminhamento ;

            //abre a compose de encaminhar
            JModal2.start(tID,'./plugins/compose2/index/forward'+ params, 'COMPOSE_ENCAMINHA');


        }else{

            /* ENCAMINHAR COMO TEXTO */

            for(var i = 0; i < nMensagensSelecionadas.length; i++){
                var tID = MainActions.newComposeID();

                //pega o caminho e o id da mensagem
                if($('#info-mbox-caminho').text() == 'Não lidas' || $('#info-mbox-caminho').text() == 'Favoritos'){
                    var mbox = $(nMensagensSelecionadas[i]).find('.pasta').val().replace(/\//g, '%5C'); //aqui inverte as barras para nao confundir com os parametros 
                }else{
                    var mbox = $('#info-mbox-caminho').attr('title').replace(/\//g, '%5C'); //aqui inverte as barras para nao confundir com os parametros 
                }

                var messageID = $(nMensagensSelecionadas[i]).attr('id');

                //monta o parametro para a compose de responder
                //var params = '/winID/compose'+ i +'/IDConta/'+ window.configs.cache.messagelist.accID +'/mbox/'+ mbox +'/forward/'+ messageID +'/type/' + StTipoEncaminhamento ;
                var params = '/winID/'+ tID +'/IDConta/'+ window.configs.cache.messagelist.accID +'/mbox/'+ mbox +'/forward/'+ messageID +'/type/' + StTipoEncaminhamento ;


                //abre a compose de encaminhar
                JModal2.start(tID,'./plugins/compose2/index/forward'+ params, 'COMPOSE_ENCAMINHA');
            }
        }

    },
    
    /*
     *abre o visualizador de mensagem (pra q ?)
     */
     'visualizarMensagem' : function(){

        var nMensagensSelecionadas = $('.tbl-message-checked');
        
        if(nMensagensSelecionadas.length < 1){
            alert(window.configs.alertNoSelectedMessage);
            return false;
        }
        
        for(var i = 0; i < nMensagensSelecionadas.length; i++){

            //pega o caminho da mensagem
            if($('#info-mbox-caminho').text() == 'Não lidas' || $('#info-mbox-caminho').text() == 'Favoritos'){
                var mbox = $(nMensagensSelecionadas[i]).find('.pasta').val().replace(/\//g, '%5C'); //aqui inverte as barras para nao confundir com os parametros 
            }else{
                var mbox = $('#info-mbox-caminho').attr('title'); //aqui inverte as barras para nao confundir com os parametros 
            }
            
            //pega o id da mensagem
            var messageID = $(nMensagensSelecionadas[i]).attr('id');
            
            var params = 'accID='+window.configs.cache.messagelist.accID+'&mbox='+mbox+'&mID='+messageID+'&type=request&showmenu=1';
            
            //abre a compose de edicao
            JModal.start('getMessage-old.php?' + params, 645, 445, 'COMPOSE_PREVIEW');
            
        }

    },
    
    /*
     *  editarMensagem()
     *  
     *  abre a compose para edicao de mensagens selecionadas
     *  
     *  
     */
     'editarMensagem' : function(){

        $('[name=COMPOSE_PREVIEW]').closest('#corpoJMODAL').remove();
        
        var nMensagensSelecionadas = $('.tbl-message-checked');
        
        if(nMensagensSelecionadas.length < 1){
            alert(window.configs.alertNoSelectedMessage);
            return false;
        }
        if( (nMensagensSelecionadas.length + $('#composes').children().length) > 5){
            alert('O número de editores abertos não pode passar de 5');
            return false;
        }
        
        for(var i = 0; i < nMensagensSelecionadas.length;
            i++){
            var tID = MainActions.newComposeID();

            //pega o caminho e o id da mensagem
            if($('#info-mbox-caminho').text() == 'Não lidas' || $('#info-mbox-caminho').text() == 'Favoritos'){
                var mbox = $(nMensagensSelecionadas[i]).find('.pasta').val().replace(/\//g, '%5C'); //aqui inverte as barras para nao confundir com os parametros 
            }else{
                var mbox = $('#info-mbox-caminho').attr('title').replace(/\//g, '%5C'); //aqui inverte as barras para nao confundir com os parametros 
            }
            
            
            var messageID = $(nMensagensSelecionadas[i]).attr('id');
            
            //var params='/winID/'+i+ '/IDConta/'+window.configs.cache.messagelist.accID+ '/mbox/'+mbox+ '/useDraft/'+messageID + '/targetTG/';
            /**/var params='/winID/'+tID+ '/IDConta/'+window.configs.cache.messagelist.accID+ '/mbox/'+mbox+ '/useDraft/'+messageID + '/targetTG/';

            
            //abre a compose de edicao
            //JModal.start('./plugins/compose/index/draft'+ params, 645, 445, 'COMPOSE_RASCUNHO');
            /**/JModal2.start(tID,'./plugins/compose2/index/draft'+ params,'COMPOSE_RASCUNHO');

        }

    },
    
    
    
    /*
     *  adicionarContatos()
     *  
     *  abre o gerenciador de adicionar aos contatos
     *  
     *  
     */
     /*'adicionarContatos' : function(){

        var accEmail = window.configs.cache.email; //conta em que ira adicionar os contatos
        var ItTotalContacts = 0;
        var StContacts = '';
        var ArListaAddContacts = Array();
        
        var nMensagensSelecionadas = $('.tbl-message-checked');
        
        if(nMensagensSelecionadas.length < 1){
            alert(window.configs.alertNoSelectedMessage);
            return false;
        }
        
        for(var i = 0; i < nMensagensSelecionadas.length; i++){
            var StEmail = $(nMensagensSelecionadas[i]).find('.remetente-email').val();           
            ArListaAddContacts.push(StEmail);            
        }
        
        //remove itens repetidos dos emails validos
        var ArLista = $.unique(ArListaAddContacts);
        
        //monta a lista de contatos
        for(var i = 0; i < ArLista.length; i++){
            StContacts += 'i:' + i +';s:' + ArLista[i].length + ':"' + ArLista[i] + '";';
            ItTotalContacts++;
        }

        //formata os contatos a serem adicionados
        StParamContacts = 'a:'+ ItTotalContacts + ':{' + StContacts + '}';
        
        //se clicou em adicionar contatos e nao houver emails validos
        if(ItTotalContacts == 0) return false;
        
        //passa os contatos marcados para a tela de adicionar contatos
        JModal.start('./plugins/compose/AddressBook/AddContatos/contacts/'+ StParamContacts +'/user/' + accEmail, 535, 435, 'COMPOSE_ADD_CONTATOS');

    },*/
    

    

    
    /**
    * Abre a modal de adicionar contatos
    * 
    */
    adicionarContatos : function(){

        //inicia o array com os dados do contato
        var ArContato = [];

        //todas as mensagens marcadas
        $('.tbl-message-checked').each(function(i, mensagem){

            //pega a tr da mensagem
            var mensagem = $(mensagem);

            //pega o email
            var StEmail = $(mensagem).find('.td-autor').attr('title');
            
            //popula o array com os dados do contato
            ArContato.push({'StEmail' : StEmail});

        });

        //pega o email da conta
        var StLogin = $.trim($('#info-conta #info-email').text().replace('@', '='));

        //abre a modal de adicionar contato
        var modal = new UModal({
            id : 'adicionarContato',
            url : 'plugins/modal/contatoModal/adicionarContato',
            params : {
                IDConta   : window.configs.cache.messagelist.accID,
                StLogin   : StLogin,
                ArContato : ArContato
            }
        });

    },



    /*
     *  copiarMensagem()
     *  
     *  abre o gerenciador de copiar mensagem
     *  
     *  
     */
     'copiarMensagem' : function(IDMensagem){

        var IDMensagem = (IDMensagem) ? '&IDMensagem='+ IDMensagem : '' 

        //passa os contatos marcados para a tela de adicionar contatos
        //JModal.start('copymailbox.php?accID=' + window.configs.cache.messagelist.accID + IDMensagem, 320, 320, 'COMPOSE_COPIAR_MENSAGEM');
        
        //inicia o array com os dados da mensagem selecionada
        var ArMensagem = [];

        //todas as mensagens marcadas
        $('.tbl-message-checked').each(function(i, mensagem){

            //pega a tr da mensagem
            var mensagem = $(mensagem);

            //pega o id da mensagem
            var IDMensagem = $(mensagem).attr('id');

            //pega o assunto do title, pois a td pode estar com ...
            var StAssunto = $(mensagem).find('.td-assunto').attr('title');

            //popula o array com os dados da mensagem
            ArMensagem.push({'IDMensagem' : IDMensagem, 'StAssunto' : StAssunto});

        });

        //pega o caminho da pasta atual
        var StMbox = $('#info-mbox #info-mbox-caminho').attr('title');

        //abre a modal de mover mensagem
        var modal = new UModal({
            id : 'copiarMensagem',
            url : 'plugins/modal/mensagemModal/copiarMensagem',
            params : {
                IDConta   : window.configs.cache.messagelist.accID,
                StPasta   : StMbox,
                ArMensagem : ArMensagem
            }
        });

    },
    
    
    /*
     *  moverMensagemAntigo()
     *  
     *  abre o gerenciador de mover mensagem
     *  
     *  
     */
     'moverMensagemAntigo' : function(){

        //passa os contatos marcados para a tela de adicionar contatos
        //JModal.start('movemailbox.php?accID=' + window.configs.cache.messagelist.accID, 320, 320, 'COMPOSE_MOVER_MENSAGEM');

        //inicia o array com os dados da mensagem selecionada
        var ArMensagem = [];

        //todas as mensagens marcadas
        $('.tbl-message-checked').each(function(i, mensagem){

            //pega a tr da mensagem
            var mensagem = $(mensagem);

            //pega o id da mensagem
            var IDMensagem = $(mensagem).attr('id');

            //pega o assunto do title, pois a td pode estar com ...
            var StAssunto = $(mensagem).find('.td-assunto').attr('title');

            //popula o array com os dados da mensagem
            ArMensagem.push({'IDMensagem' : IDMensagem, 'StAssunto' : StAssunto});

        });

        //pega o caminho da pasta atual
        var StMbox = $('#info-mbox #info-mbox-caminho').attr('title');

        //abre a modal de mover mensagem
        var modal = new UModal({
            id : 'moverMensagem',
            url : 'plugins/modal/mensagemModal/moverMensagem',
            params : {
                IDConta   : window.configs.cache.messagelist.accID,
                StPasta   : StMbox,
                ArMensagem : ArMensagem
            }
        });

    },
    
    
    
    /*
     *  moverMensagem()
     *  
     *  origem - caminho completo da pasta em que a mensagem esta
     *  destino - caminho completo para onde a mesagem vai
     *  ArMensagemID - pode ser um array com ids 10,20,50 ou pode ser um inteiro com o id da mensagem
     *  pega todas as mensagens selecioadas na listagem de mensagens e as move
     *  
     */
     'moverMensagem' : function(accID, StOrigem, StDestino, ArMensagemID, BoDenuncia){
        //pega a posicao(index de tr's da tabela) da ultima mensagem movida
        var posicaoMensagemMovida = (ArMensagemID instanceof Array) ? $('#'+ArMensagemID[0]).index() : $('#'+ArMensagemID).index();

        $.ajax({
            url: "mailboxAct.php?act=move&accID="+accID+"&mbox="+ encodeURIComponent(StOrigem) +"&mIDs="+ArMensagemID+"&tombox=" + encodeURIComponent(StDestino),
            type: "GET",
            cache : false,
            success : function(JsonData){

                //verifica se esta na pasta 'nao lidas'    
                if($('#info-mbox-caminho').text() == 'Não lidas'){

                    //pega o total de mensagens nao lidas
                    var totalUseen = parseInt($('#info-mbox-total').text()) - 1;
                    
                    //atualiza o contador de mensagens (na barra de informacao e ao lado da pasta)
                    Main.updateMessageCount({
                        'total' : totalUseen
                    });

                }else if($('#info-mbox-caminho').text() == 'Favoritos'){

                }
                else{

                    //informacoes para atualizar o contador das mensagens
                    //converte o retorno (string) para objeto 
                    
                    try{
                        var json = eval('('+JsonData+')');
                    }catch(erro){

                        //verificar uma forma de retornar um json decente desse backend, quando tem aspa simples quebra tudo...
                        
                        //esconde o cursor de loading
                        Main.loadingCursor('hide');
                    }   
                    
                    var novas = json['return'].data.unseen;
                    var mbox = json.contextMailbox;
                    var recentes = json['return'].data.recent;
                    
                    //atualiza o contador de mensagens (na barra de informacao e ao lado da pasta)
                    Main.updateMessageCount({
                        'novas' : novas, 
                        'mbox' : mbox,
                        'recent' : recentes
                    });

                }
                
                //esconde o cursor de loading
                Main.loadingCursor('hide');
                
                if(StDestino === 'SPAM' && json.NewRecentMovedIds && BoDenuncia){ 
                    MainActions.notificarSpamAssassin(json.NewRecentMovedIds);
                }

            },//success - mover mensagem
            complete : function(){

                //ao dropar uma mensagem, a mesma some da listagem
                $('.tbl-message-checked').each(function(){

                    //ao final da animacao, remove a tr com a mensagem
                    $(this).remove();
                    
                    //limpa a area de leitura da mensagem antes de carregar a proxima
                    $('#message-read-area #message-content').empty();

                });//each das mensagens marcadas
                
                //so recarrega a lisgagem de mensagem se nao estiver na pasta 'nao lidas'
                if($('#info-mbox-caminho').text() == 'Não lidas' || $('#info-mbox-caminho').text() == 'Favoritos'){
                    return false;
                }
                
                
                //depois de mover com sucesso as mensagens e terminar a animacao, carrega as mensagens da pasta atual
                
                //recarrega a listagem de mensagens
                Main.loadMessageList([], function(){

                    //marca a mensagem na mesma posicao da mensagem movida anteriormente
                    $($('#message-list-area #tbl-message-list-body tr').get(posicaoMensagemMovida)).addClass('tbl-message-checked');
                    

                    
                });

            }//complete
        });//ajax 
},


    /*
     * marcarMensagem()
     * 
     * Marcar a mensagem como lida ou nao lida - ela dispara o evento de click na td da carta
     * 
     */
     'marcarMensagem' : function(StFlag){

        //se nao passou a flag
        if(!StFlag) return false;
        
        //mensagens selecionadas
        var nMensagensSelecionadas = $('.tbl-message-checked');
        
        //se nao houver mensagem selecionada...
        if(nMensagensSelecionadas.length < 1){
            alert(window.configs.alertNoSelectedMessage);
            return false;
        }
        
        //percorre todas as mensagens marcadas
        for(var i = 0; i < nMensagensSelecionadas.length; i++){

            //pega a tr da mensagem
            var TrMensagem = $(nMensagensSelecionadas[i]);

            //pega a carta da mensagem
            var carta = TrMensagem.find('td[class*="td-carta"]');           

            //se foi clicado em marcar como lida
            if(StFlag == 'lida'){ 
                if(carta.attr('class') == 'td-carta-fechada' || carta.attr('class') == 'td-carta-encaminhada' || carta.attr('class') == 'td-carta-respondida'){
                    if(TrMensagem.hasClass('nova-mensagem'))
                        carta.trigger('click');
                }
            }else{//se clicou em marcar como nao lida no menu
                if(carta.attr('class') == 'td-carta-aberta' || carta.attr('class') == 'td-carta-encaminhada' || carta.attr('class') == 'td-carta-respondida'){
                    if(!TrMensagem.hasClass('nova-mensagem'))
                        carta.trigger('click');
                }
            }
            
        }
        
    },
    
    
    
    /*
     * identificarMensagem()
     * 
     * Identifica a mensagem como SPAM ou confiavel
     * 
     */
     'identificarMensagem' : function(StIdentificacao){


        //se nao passou a identificacao
        if(!StIdentificacao) return false;
        
        //array com os enderecos das mensagens selecionadas e assuntos
        var ArEnderecos = Array();
        var ArAssuntos = Array();

        //mensagens selecionadas
        var nMensagensSelecionadas = $('.tbl-message-checked');

        //se nao houver mensagem selecionada...
        if(nMensagensSelecionadas.length < 1){
            alert(window.configs.alertNoSelectedMessage);
            return false;
        }

        //se selecionar mais de 14 mensagens
        if(nMensagensSelecionadas.length > 14){
            alert('Não podem ser marcados mais que 14 contatos de uma vez para esta ação.');
            return false;
        }



        //pega todos os enderecos de todas as mensagens selecionadas e assuntos
        for(var i = 0; i < nMensagensSelecionadas.length; i++){
            var StEmail = $(nMensagensSelecionadas[i]).find('.remetente-email').val();
            var StAssunto = $(nMensagensSelecionadas[i]).find('.td-assunto').attr('title').replace(/[^\wãàáâäèéêëìíîïõòóôöùúûüçÃÀÁÂÄÈÉÊËÌÍÎÏÖÒÓÔÙÚÛÜÇ]/gi,' ');
            ArEnderecos.push(StEmail);
            if(StAssunto){
                ArAssuntos.push(StAssunto);
            }else{
                ArAssuntos.push(' ');
            }
        }

        //Monta a lista de enderecos unicos
        ArEnderecosFinal = Array();
        ArAssuntosFinal = Array();
        for(var i = 0;i<ArEnderecos.length;i++){
            var unico = true;
            for(var j=0;j<i;j++){
                if(ArEnderecos[i] == ArEnderecos[j]){
                    unico = false;
                }
            }
            if(unico==true){
                ArEnderecosFinal.push(ArEnderecos[i]);
                ArAssuntosFinal.push('');
            }
        }

        //Coloca os assuntos nos enderecos unicos
        for(var i = 0;i<ArEnderecosFinal.length; i++){

            for(j=0;j<ArEnderecos.length;j++){
                if(ArEnderecosFinal[i] == ArEnderecos[j]){
                    if(ArAssuntos[j]!=undefined){
                        ArAssuntosFinal[i] += ','+ArAssuntos[j].replace(/[ ]/g,',');
                    }
                    else{
                        ArAssuntosFinal[i] += ',';
                    }
                }
            }
            ArAssuntosFinal[i] = ArAssuntosFinal[i].replace(',','');
        }


        //string com que guardara o parametro com os enderecos
        var StEnderecos = '';
        var StAssuntos = '';

        //monta os parametros com os enderecos ex: NA0/fulano@f.com/NA1/teste@teste.com/NA2/euNaoConhecoArray@zuero.com/etc...
        for(var i = 0; i < ArEnderecosFinal.length; i++){
            StEnderecos += '/NA'+i+'/';
            StEnderecos += encodeURI(ArEnderecosFinal[i]);

            if(StIdentificacao=='black'){
                StAssuntos += '/NP'+i+'/';
                StAssuntos += encodeURI(ArAssuntosFinal[i]);
            }
        }

        //abre o gerenciador
        JModal.start( './plugins/sieve/WhiteBlackList/setAsBlackWhite/winID/compose0/list/'+ StIdentificacao +'/accID/' + window.configs.cache.messagelist.accID + escape(StEnderecos) + escape(StAssuntos), 655, 500, 'IDENTIFICAR_MENSAGEM' );

    },


    /**
    * Faz uma denuncia de uma mensagem como SPAM
    * 
    */
    marcarComoSpam : function(){

        var ArMensagemID = Array();

        $('.tbl-message-checked').each(function(i, mensagem){

            //pega a tr da mensagem
            var mensagem = $(mensagem);

            ArMensagemID.push(mensagem.attr('id'))

        });
        
        MainActions.moverMensagem(top.configs.cache.messagelist.accID, top.configs.cache.messagelist.mbox, 'SPAM', ArMensagemID.join(','), true /* BoDenuncia */);

    },
    
    
    
    
    /**
    * Faz uma denuncia de uma mensagem como confiavel
    * 
    */
    marcarComoConfiavel : function(){

        var ArMensagemID = Array();
        
        //inicia o array com os dados do contato
        var ArContato = [];

        //todas as mensagens marcadas
        $('.tbl-message-checked').each(function(i, mensagem){

            //pega a tr da mensagem
            var mensagem = $(mensagem);
            
            //pega o email
            var StEmail = $(mensagem).find('.td-autor').attr('title');
            
            //pega o dominio
            var StDominio = StEmail.split('@')[1];
            
            //popula o array com os dados do contato
            ArContato.push({
                'StEmail' : StEmail,
                'StDominio' : StDominio                
            });

        });

        //pega o email da conta
        var StLogin = $.trim($('#info-conta #info-email').text().replace('@', '='));
        
        //pega o email que vai marca
        var StEmail = ArContato[0].StEmail;
        
        //StAction
        var StAction = 'adicionarEmailAListaBranca';
         
        //adiciona o email a lista branca
	$.ajax({
            url : 'plugins/modal/' + 'sieveModal/' + StAction,
            type : 'POST',
            data : {
		IDConta : window.configs.cache.messagelist.accID,
                StEmail : StEmail
            },
            complete : function(response){
                //var retorno = Retorno.init(response);
		//se marcou com sucesso
		//if(retorno.status == 'ok'){					
                    //desliga o evento de click do botao
                    //btnMarcar.off('click');

                    //troca a classe e o label do botao
                    //var label = (btnMarcar.hasClass('disabled')) ? 'Marcar nome' : 'Nome marcado';
                    //btnMarcar.toggleClass('disabled').text(label);

		//} else {

                    //marcou algum contato que ja estava na outra lista
                    //Retorno.init({content : '<b>' + retorno.content + '</b> não foi adicionado, pois já está incluído em sua lista negra'});
                    //Retorno.show();
		//}
            }
	});

        $('.tbl-message-checked').each(function(i, mensagem){

            //pega a tr da mensagem
            var mensagem = $(mensagem);

            ArMensagemID.push(mensagem.attr('id'))

        });
        
        MainActions.moverMensagem(top.configs.cache.messagelist.accID, top.configs.cache.messagelist.mbox, 'INBOX', ArMensagemID.join(','), false /* BoDenuncia */);

    },





    /**
    * Abre a modal de adicionar email a lista negra - antigo, marcar como spam
    * 
    */
    adicionarAListaNegra : function(){

        //inicia o array com os dados do contato
        var ArContato = [];

        //todas as mensagens marcadas
        $('.tbl-message-checked').each(function(i, mensagem){

            //pega a tr da mensagem
            var mensagem = $(mensagem);

            //pega o nome do autor
            var StNome = ($('body').hasClass('vertical')) ? $.trim($(mensagem).find('.td-autor .autor').text()) : $.trim($(mensagem).find('.td-autor').text());

            //pega o email
            var StEmail = $(mensagem).find('.td-autor').attr('title');
            
            //pega o dominio
            var StDominio = StEmail.split('@')[1];

            //pega as palavras
            var ArPalavras = $.trim($(mensagem).find('.td-assunto').attr('title')).split(' ');

            //popula o array com os dados do contato
            ArContato.push({
                'StNome' : StNome,
                'StEmail' : StEmail,
                'StDominio' : StDominio,
                'ArPalavras' : ArPalavras
            });

        });

        //pega o email da conta
        var StLogin = $.trim($('#info-conta #info-email').text().replace('@', '='));

        //abre a modal de adicionar contato
        var modal = new UModal({
            id : 'adicionarAListaNegra',
            url : 'plugins/modal/sieveModal/adicionarAListaNegra',
            params : {
                IDConta   : window.configs.cache.messagelist.accID,
                StLogin   : StLogin,
                ArContato : ArContato
            }
        });

    },



    /**
    * Abre a modal de adicionar a regra
    * 
    * @param  IDRegra
    *        
    */
    'gerenciarRegraModal' : function(IDRegra, StTituloRegra){

        //inicia o array com os dados do contato
        var ArContato = [];

        //todas as mensagens marcadas
        $('.tbl-message-checked').each(function(i, mensagem){

            //pega a tr da mensagem
            var mensagem = $(mensagem);

            //pega o nome do autor
            var StNome = ($('body').hasClass('vertical')) ? $.trim($(mensagem).find('.td-autor .autor').text()) : $.trim($(mensagem).find('.td-autor').text());

            //pega o email
            var StEmail = $(mensagem).find('.td-autor').attr('title');
            
            //pega o dominio
            var StDominio = StEmail.split('@')[1];

            //pega as palavras
            var ArPalavras = $.trim($(mensagem).find('.td-assunto').attr('title')).split(' ');

            //popula o array com os dados do contato
            ArContato.push({
                'StNome' : StNome,
                'StEmail' : StEmail,
                'StDominio' : StDominio,
                'ArPalavras' : ArPalavras
            });

        });

        //pega o email da conta
        var StLogin = $.trim($('#info-conta #info-email').text().replace('@', '='));
        
        //abre a modal de adicionar contato
        var modal = new UModal({
            id : 'adicionarARegra',
            url : 'plugins/modal/sieveModal/adicionarARegra',
            params : {
                IDConta       : window.configs.cache.messagelist.accID,
                IDRegra       : IDRegra,
                StTituloRegra : StTituloRegra,
                StLogin       : StLogin,
                ArContato     : ArContato
            }
        });

    },





    /**
    * Abre a modal de adicionar email a lista branca - antigo, marcar como confiavel
    * 
    */
    adicionarAListaBranca : function(){

        //inicia o array com os dados do contato
        var ArContato = [];

        //todas as mensagens marcadas
        $('.tbl-message-checked').each(function(i, mensagem){

            //pega a tr da mensagem
            var mensagem = $(mensagem);
            
            //pega o email
            var StEmail = $(mensagem).find('.td-autor').attr('title');
            
            //pega o dominio
            var StDominio = StEmail.split('@')[1];
            
            //popula o array com os dados do contato
            ArContato.push({
                'StEmail' : StEmail,
                'StDominio' : StDominio                
            });

        });

        //pega o email da conta
        var StLogin = $.trim($('#info-conta #info-email').text().replace('@', '='));

        //abre a modal de adicionar contato
        var modal = new UModal({
            id : 'adicionarAListaBranca',
            url : 'plugins/modal/sieveModal/adicionarAListaBranca',
            params : {
                IDConta   : window.configs.cache.messagelist.accID,
                StLogin   : StLogin,
                ArContato : ArContato
            }
        });

    },












    /*
     * setIcone()
     * 
     * Muda o icone da listagem da mensagem
     * 
     * StFlag - nome do icone
     * 
     * aberta
     * respondida
     * deletada
     * encaminhada
     * fechada
     * 
     */
     'setIcone' : function(StFlag){

        //mensagens selecionadas
        var nMensagensSelecionadas = $('.tbl-message-checked');
        
        //muda o icone das mensagens selecionadas 
        for(var i = 0; i < nMensagensSelecionadas.length; i++){

            //pega a td da carta
            var TdCarta = $(nMensagensSelecionadas[i]).find('td[class*="td-carta-"]');           
            
            //muda o icone da carta
            TdCarta.removeClass().addClass('td-carta-' + StFlag);
            
        }
        
    },
    
    
    
    /*
     * restaurarMensagem()
     * 
     * Restaura a mensagem excluida
     * 
     */
     'restaurarMensagem' : function(accID, mbox, ArMensagensID){
        $.ajax({
            url: "mailboxAct.php?&act=setflags&accID="+window.configs.cache.messagelist.accID+"&mbox="+ window.configs.cache.messagelist.mbox +"&flags=" + encodeURIComponent('-deleted') + "&mIDs=" + ArMensagensID,
            type: "GET",
            cache : false,
            success : function(JsonData){

                //esconde o cursor de loading
                Main.loadingCursor('hide');
                
                //assim que restaurar a mensagem, atualiza alistagem da pasta
                Main.loadMessageList({
                    accID : window.configs.cache.messagelist.accID,
                    curpage : window.configs.cache.messagelist.curpage,
                    mbox : window.configs.cache.messagelist.mbox
                }, function(){

                    //se a opcao de deletar mensagem for marcar como excluida, nao remove a tr
                    if(window.configs.cache.del_msg_type == 'MARCA'){
                        return false;
                    }

                }); //loadMessageList
            }
        });

},
'notificarSpamAssassin': function(ArIdsMensagens) {
    $("#div-desfazer-spam").remove();
    
    var ItTotalMsgs = (ArIdsMensagens.length > 1 ? (ArIdsMensagens[1] - ArIdsMensagens[0] + 1) : 1);
    
    $.ajax({
        url: "notificaSpamAssassin.php",
        type: "POST",
        cache : false,
        data : {
            'ArMensagens': ArIdsMensagens,
            'accID': window.configs.cache.messagelist.accID,
            'BoDenuncia': "true"
        }
    });
    
    var StTexto = ItTotalMsgs;
    
    if(ItTotalMsgs > 1){
        StTexto += ' mensagens foram adicionadas como spam.';
    } else {
        StTexto += ' mensagem foi adicionada como spam.';
    }
    
    this.criaBoxDesfazerSpam(StTexto, ArIdsMensagens, 7);
},
'criaBoxDesfazerSpam': function(StTexto, ArIdsMensagens, ItDuracao){
    jQuery('<div/>', { id: 'div-desfazer-spam', class: 'aviso-spam-desfazer', text: StTexto }).appendTo('body');
    jQuery('<a/>', { id: 'link-desfazer-spam', href: 'javascript:void(0)', text: 'Desfazer' }).appendTo('#div-desfazer-spam');
    
    $('#link-desfazer-spam').click(function(){
        $("#div-desfazer-spam").html('Aguarde...');
        MainActions.desfazerDenunciaDeSpam(ArIdsMensagens)
    });
    
    setTimeout(function(){
        $("#div-desfazer-spam").remove();
    }, ItDuracao * 1000);
},
'desfazerDenunciaDeSpam': function(ArIdsMensagens){
    var ArIDsTodasMensagens = [];
    
    if(ArIdsMensagens.length > 1){
        for(var i = ArIdsMensagens[0]; i <= ArIdsMensagens[1]; i++){
            ArIDsTodasMensagens.push(i);
        }
    } else {
        ArIDsTodasMensagens.push(ArIdsMensagens[0]);
    }
    
    var StListaMensagens = ArIDsTodasMensagens.join();
    
    $.ajax({
        url: "notificaSpamAssassin.php",
        type: "POST",
        cache : false,
        ArIdsMensagens: ArIdsMensagens,
        success: function(ArRetorno){
            $.ajax({
                url: "mailboxAct.php?act=move&accID="+window.configs.cache.messagelist.accID+"&mbox="+ encodeURIComponent('SPAM') +"&mIDs="+StListaMensagens+"&tombox=" + encodeURIComponent(window.configs.cache.messagelist.mbox),
                type: "GET",
                cache : false,
                success : function(JsonData){
                    Main.loadMessageList([], function(){                   
                        $("#div-desfazer-spam").remove();
                    });
                }
            });
        },
        data : {
            'ArMensagens': ArIdsMensagens,
            'accID': window.configs.cache.messagelist.accID,
            'StBoxAtual': window.configs.cache.messagelist.mbox
        }
    });
    
    
}
}
//MainActions ============================================================================
// =====================================================================================
// =====================================================================================
// =====================================================================================
// =====================================================================================
// =====================================================================================
// =====================================================================================
// =====================================================================================
// =====================================================================================
// =====================================================================================
// =====================================================================================
// =====================================================================================
// =====================================================================================

















/*
 *  gerencia os atalhos do teclado
 *  
 */
 var keyManager = {

   

    //inicia o gerenciador de teclas
    'init' : function(){

        //deletar mensagem
        $(document).bind('keyup', 'del', function(){

            if($('.tbl-message-checked').length > 0){
                MainActions.apagarMensagem();
            }
            else{
                return true;
            }    

        });
        
        
   


        
        //selecionar todas as mensagens control + A
        $(document).bind('keydown', 'ctrl+a', function(e){
            e.preventDefault();
            MainActions.selecionarMensagens();
        });
        
        
        //seleciona muitas mensagens com shift + seta
        $('#tbl-message-list-body').on('keydown', function(e){

            //se for o firefox, usa o preventDefault pra nao selecionar  o texto tambem
            if ($.browser.mozilla){
                e.preventDefault();
            }
            
            //evento keydown
            var tecla = e.which;
            
            //pega o index da ultima mensagem marcada - no evento de soltar a tecla, dispara o evento de click na tr, e sempre que clicar na tr, a tr recebe o foco - focus()
            var ultimaMensagemIndex = $(':focus').index();
            
            //pressionou pra cima
            if(tecla == 38){

                //segurando shift
                if (e.shiftKey){

                    //se tiver mais de uma mensagem selecionada, exibe uma mensagem
                    if($('.tbl-message-checked').length > 0){
                        $('#message-read-area #message-content').empty().append($("<div id='message-alert'> Mais de 1 mensagem selecionada. </div>"));
                    }
                    
                    //se estiver na primeira retorna
                    if(ultimaMensagemIndex == 0){
                        return false;
                    }
                    
                    //verifica se a mensagem ja esta marcada na posicao acima
                    if(/tbl-message-checked/.test($('#tbl-message tr').eq(ultimaMensagemIndex).attr('class')) && ultimaMensagemIndex > 0){

                        //se ja ta marcada a mensagem uma posicao acima, remove a classe de marcada
                        $('#tbl-message tr').eq(ultimaMensagemIndex +1).removeClass('tbl-message-checked');    
                        
                    }else{//se nao estiver marcada, adiciona a classe de marcada
                        $('#tbl-message tr').eq(ultimaMensagemIndex).addClass('tbl-message-checked');                
                    }
                    
                    //coloca o foco na ultima mensagem selecionada com seta + shift
                    $('#tbl-message tr').eq(ultimaMensagemIndex).focus();
                    
                }
            }
            
            //pressionou pra baixo
            if(tecla == 40){

                //segurando shift
                if (e.shiftKey){

                    //se tiver mais de uma mensagem selecionada, exibe uma mensagem
                    if($('.tbl-message-checked').length > 0){
                        $('#message-read-area #message-content').empty().append($("<div id='message-alert'> Mais de 1 mensagem selecionada. </div>"));
                    }

                    //verifica se a mensagem abaixo ja esta marcada
                    if(/tbl-message-checked/.test($('#tbl-message tr').eq(ultimaMensagemIndex + 2).attr('class'))){

                        //se ja ta marcada a mensagem uma posicao abaixo, remove a classe de marcada
                        $('#tbl-message tr').eq(ultimaMensagemIndex + 1).removeClass('tbl-message-checked');
                        
                    }else{//se nao estiver marcada, adiciona a classe de marcada
                        $('#tbl-message tr').eq(ultimaMensagemIndex + 2).addClass('tbl-message-checked');
                    }
                    
                    //coloca o foco na ultima mensagem selecionada com seta + shift
                    $('#tbl-message tr').eq(ultimaMensagemIndex + 2).focus();
                    
                }
            }
            
        });



        //timeout, sera zerado quando pressionar pra cima ou pra baixo, e sera disparado quando soltar as teclas por mais de 380ms 
        var timerKeyDown = null;
        
        
        
        //muda a mensagem quando clicar pra baixo
        $('#message-list-area').bind('keydown', 'down', function(){

         

            //se apertou pra cima, zera o timer e nao carrega a mensagem
            clearTimeout(timerKeyDown);
            
            //pega as mensagens marcadas
            var mensagemSelecionada = $('.tbl-message-checked');
            
          
            
            //se houver alguma mensagem marcada
            if(mensagemSelecionada.length > 0){

                //pega a posicao da ultima mensagem selecionada
                var mensagemSelecionadaIndex = $(mensagemSelecionada).last().index();
                
                var proximaMensagem = $($('#message-list-area tr').get(mensagemSelecionadaIndex + 2));
                
                //carrega a proxima mensagem, somente se a proxima tr existir
                if(mensagemSelecionadaIndex < proximaMensagem.index()){ 

                    //desmarca as mensagens selecionadas anteriores
                    $('#message-list-area tr').removeClass('tbl-message-checked');
                    
                    //marca a proxima mensagem
                    $($('#message-list-area tr').get(mensagemSelecionadaIndex + 2)).addClass('tbl-message-checked');
                    
                    //pega o top da tr marcada
                    var trTop = $('.tbl-message-checked').offset().top;
                    var dragTop = $('#message-dragbar').offset().top;
                    var scrollTop = $('#message-list-area').scrollTop();
                    
  
                    //se a proxima mensagem passar do limite da area de listagem, rola o scroll
                    if($('body').hasClass('vertical')){

                        if(trTop > $(window).height()){
                            $('#message-list-area').scrollTop(scrollTop + $(window).height() - 100);
                        }

                    }else{

                        if(trTop > dragTop){
                            $('#message-list-area').scrollTop(scrollTop + dragTop - 100);
                        }

                    }

                }

            }

        });//seta pra baixo


        //muda a mensagem quando clicar pra cima
        $('#message-list-area').bind('keydown', 'up', function(){

            //se apertou pra cima, zera o timer e nao carrega a mensagem
            clearTimeout(timerKeyDown);
            
            //pega as mensagens marcadas
            var mensagemSelecionada = $('.tbl-message-checked');
            
            //se houver alguma mensagem marcada
            if(mensagemSelecionada.length > 0){

                //pega a posicao da ultima mensagem selecionada
                var mensagemSelecionadaIndex = $(mensagemSelecionada).last().index();
                
                //carrega a proxima mensagem, somente se a proxima tr existir
                if(mensagemSelecionadaIndex != 0){

                    //desmarca as mensagens selecionadas anteriores
                    $('#message-list-area tr').removeClass('tbl-message-checked');
                    
                    //marca a proxima mensagem
                    $($('#message-list-area tr').get(mensagemSelecionadaIndex)).addClass('tbl-message-checked');

                    //pega o top da tr marcada
                    var trTop = $('.tbl-message-checked').offset().top;
                    var barraTop = $('#barra-mbox').offset().top;
                    var dragTop = $('#message-dragbar').offset().top;
                    var scrollTop = $('#message-list-area').scrollTop();
                    
                    
                    
                    
                    //se a proxima mensagem passar do limite da area de listagem, rola o scroll
                    if($('body').hasClass('vertical')){

                        if(trTop < barraTop){
                            $('#message-list-area').scrollTop(scrollTop - (($(window).height() / 2) - 100));
                        }

                    }else{

                        if(trTop < barraTop){
                            $('#message-list-area').scrollTop(scrollTop - ((dragTop / 2) - 100));
                        }

                    }

                }

            }

        });//seta pra cima


        //assim que soltar as teclas pra cima ou pra baixo, dispara um timeout pra carregar a mensagem que ta marcada
        $('#message-list-area').bind('keyup', 'down', function(){
            timerKeyDown = setTimeout(function(){                
                $('.tbl-message-checked .td-assunto').trigger('click');                
            }, 11);
        });  
        $('#message-list-area').bind('keyup', 'up', function(){
            timerKeyDown = setTimeout(function(){                
                $('.tbl-message-checked .td-assunto').trigger('click');                
            }, 11);
        });  


    }

}//keyManager ===========================================================================
// =====================================================================================
// =====================================================================================
// =====================================================================================
// =====================================================================================
// =====================================================================================
// =====================================================================================
// =====================================================================================
// =====================================================================================
// =====================================================================================

















/*
 *  desktopNotification()
 *  
 *  Exibe uma notificacao de desktop, nativo no chrome e no firefox apenas atraves de plugins
 *  
 */
 var desktopNotification = {


    /*
     *  Exibe um alerta de permissao para o usuario habilitar ou negar o desktopNotification
     */
     'verificaPermissao' : function(){

        //se o navegador for compativel com desktopnotification
        if(window.Notification){

            //ao clicar na tela
            $(window).on('click', function(e){

                //cria a localStorage pra guardar a escolha do usuario
                var jaNotificou = localStorage.getItem('jaNotificou') || localStorage.setItem('jaNotificou', false);
                
                //verifica se o usuario ainda nao fez uma escolha por mostrar ou nao a notificacao
                if (Notification && Notification.permission == "default") {
                    Notification.requestPermission();
                    alert("Permita que o seu navegador mostre as modificações com notificações na área de trabalho. Para isso clique no aviso de permissão de notificações do seu navegador ou acesse as configurações de Privacidade.");
                }else{

                    //se nao possui a notificacao nativa e for o firefox so exibe uma vez a notificacao
                    if($.browser.mozilla == true && !jaNotificou){
                        alert("Permita que o seu navegador mostre as modificações com notificações na área de trabalho. Para isso clique no aviso de permissão de notificações do seu navegador ou acesse as configurações de Privacidade.");
                        localStorage.setItem('jaNotificou', true);
                    }
                    
                }

            });


        }//se for compativel com desktopnotification

    },
    
    
    /*
     * Exibe a notificacao
     */
     'mostrarNotificacao' : function(StTitulo, StMensagem){

        //se o navegador nao suportar, nao faz nada
        if (!("Notification" in window)) {
            return false;
        }
        
        if(Notification && Notification.permission == "granted"){

            //cria a notificacao
            //var notification = window.webkitNotifications.createNotification("templates/default/img/favicon/favicon.ico", StTitulo, StMensagem); 
            var notification = new Notification(StTitulo, {
                body:StMensagem, 
                icon:"templates/default/img/favicon/favicon.ico"
            });

            //exibe a notificacao
            //notification.show();   

            //assim que a notificacao aparecer
            notification.onshow = function(e) {

                //depois de mostrar a notificacao, recarrega as pastas da conta atual
                Main.loadMbox(window.configs.cache.messagelist.accID);

                //recarrega a listagem de mensagens
                //Main.loadMessageList([]);

                //depois de 5 segundos, some a notificacao
                setTimeout(function(){
                    notification.close();
                }, 1000 * 5);

            };

            //quando clicar na notificacao
            notification.onclick = function(e) { 

                //se a pagina do ultramail estiver minimizada, ela maximiza
                window.focus();   

                //depois de mostrar a notificacao, recarrega as pastas da conta atual
                Main.loadMbox(window.configs.cache.messagelist.accID);

                //recarrega a listagem de mensagens
                Main.loadMessageList([]);

                //cancela a notificacao e a fecha
                e.target.close();

            //recarrega a listagem de mensagens da pasta atual
            /*Main.loadMessageList({
                'mbox' : window.configs.cache.messagelist.mbox, 
                'curpage' : 1
            }, function(){ //depois de listar as mensagens
                //dispara o evento de clique da primeira mensagem da listagem
                $('#tbl-message-list-body tr').first().addClass('tbl-message-checked').find('.td-assunto').trigger('click');
            });*/

};

}

}


}


/*RUDS*/
/*Formata a data final para que a mesma seja exibida corretamente
* na box que exibe o tipo da busca realizada.*/
function formataDataTextoFiltro(arrayDate){

    if(!arrayDate)
        return '';

    var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var date = converteArrayParaDate(arrayDate.split('/'));
    
    var day = date.getDate();
    
    
    return '<b> até </b> "' + ((day<10)?('0'+day.toString()):day) + '-' + monthShortNames[date.getMonth()] + '-' + date.getFullYear() + '" ';
}

/*RUDS*/
/**/
function filtraMsgPorDataLimite(dataLimite, dataRecebimento){

                     if(dataRecebimento.getTime()> dataLimite.getTime())    
                        return true;   
                     else
                        return false;                         
}




/*RUDS*/    
function converteArrayParaDate(arrayDate){
    return new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0]);
}


/*RUDS*/
function isValidDate(arrayDate){  
    
    var splited = arrayDate.split('-');
    
    var ordenado = [splited[1],splited[0],splited[2]];
    
    var data = (new Date(ordenado.join(' ')).toString());
    
    return data.localeCompare('Invalid Date');
}

/*RUDS*/
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
}

//temporario...
function forcarRegra(){
    $.ajax({
        type:'POST',
        url:'plugins/sieve/WhiteBlackList/corrigirBug/accID/0',
        data:'',
        complete:function(response){
            //console.log(response);
        }
    });
}


