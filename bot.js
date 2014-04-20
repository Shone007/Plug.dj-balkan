if (API.enabled && $("#test-css").length <= 0) {

    var test = {

     
         setCookie: function (key, value) {          
            var expires = new Date();
            expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000));
            document.cookie = key + '=' + value + ';path=/;expires=' + expires.toUTCString();   
        },

        getCookie: function (key) {
            var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
            return keyValue ? keyValue[2] : null;
        },   

        

          ],
        addChatLog: function(message, cssClass) {
            $('#chat-messages').append('<div class="update ' + cssClass + '">' + message + '</div>');
            $('#chat-messages').scrollTop($('#chat-messages').prop("scrollHeight"));
        },

        playChatSound: function() {
            document.getElementById('chat-sound').playChatSound();
        },

        playMentionSound: function() {
            document.getElementById('chat-sound').playMentionSound();
        },

        updateQueueStatus: function() {            
            if(API.getWaitListPosition() == '0') {
                radiantScript.addChatLog('Get ready ' + this.userInfo.username + ', you\'re about to play!', 'aqua');
                $('#waitlist-button').addClass('blue-bg');     
                radiantScript.playChatSound();   
                radiantScript.playMentionSound();           
            }
            else {                      
                $('#waitlist-button').removeClass('blue-bg');                                  
            }
        },

        
            });
        },

        fullscreen: function() {
            if (radiantScript.fullScreen) { 
                var a = document.getElementById("playback");
                var b = document.getElementById("playback-container").style.height = document.getElementById("room").style.height;
                var c = document.getElementById("playback-container").style.width = document.getElementById("room").style.width;
                var d = document.getElementById("no-dj");
                var e = chat.offsetTop;
                var f = document.getElementById("footer").offsetTop;
                var g = f - e;

                a.style.height = "", a.style.overflow = "visible";
                document.getElementById("playback-container").style.left = 0, a.style.left = 0, a.style.zIndex = 2e3;
                d && (d.style.height = b, d.style.width = c, d.style.left = 0);
                chat.style.height = g + "px", document.getElementById("chat-messages").style.height = g - 100 + "px"

                window.onresize = function(event) {
                    radiantScript.fullscreen();
                }
                window.dispatchEvent = function(event) {
                    radiantScript.fullscreen();
                }
                window.onclick = function(event) {
                    radiantScript.fullscreen();
                }
            }
        },

        updateUserStats: function() {
            var statsUsername = API.getUser().username;
            var statsDjpoints = API.getUser().djPoints;
            var statsListener = API.getUser().listenerPoints;
            var statsCurator  = API.getUser().curatorPoints;
            var statsTotal    = statsDjpoints+statsListener+statsCurator;
            var statsFans     = API.getUser().fans;

            $('#rmstatsInfo_username').html(statsUsername);
            $('#rmstatsInfo_points').html(statsTotal.toLocaleString());
            $('#rmstatsInfo_djpoints').html(statsDjpoints.toLocaleString());
            $('#rmstatsInfo_listenerpoints').html(statsListener.toLocaleString());
            $('#rmstatsInfo_grabpoints').html(statsCurator.toLocaleString());
            $('#rmstatsInfo_fans').html(statsFans.toLocaleString());
        },

        init: function() {

            this.autoWoot    = this.getCookie('COOKIE_AUTO_WOOT') == 'true' ?  true : false;               
            this.cAutoWoot   = this.autoWoot   ? 'checked' : '';   
            this.userInfo    = API.getUser();

            if(this.autoWoot) { $('#woot').click(); }      
            this.updateQueueStatus();

            API.on(API.DJ_ADVANCE, this.djAdvanced);
            API.on(API.DJ_ADVANCE, this.updateUserStats);

            this.updateUserStats();

            $('#now-playing-media').hover(function(){
            $('body').append('<div id="tooltip" style="top:0px;left:550px;"><span>' + API.getMedia().author + ' - ' + API.getMedia().title + '</span><div class="corner"></div></div>');
                },function(){
                    $('#tooltip').remove();
                });         
            $('#dj-booth').append('<div id="rmbooth" style="background-image: url(http://radiantedm.com/rmscript/img/djbooth.png);"></div>');
            $(".background").find('img').attr('src','http://radiantedm.com/rmscript/img/radiant.music.playback1.png');

            API.on(API.CHAT_COMMAND, customCommands);
            function customCommands(value) {
                if (value == '/5') {
                    API.chatLog("Status set to 5 (Bugged)");
                    $.ajax({ type: 'POST', url: 'http://plug.dj/_/gateway/user.set_status_1', contentType: 'application/json', data: '{ "service": "user.set_status_1", "body": ["5"] }' });
                }
                if (value == '/4') {
                    API.chatLog("Status set to 4 (Idle)");
                    $.ajax({ type: 'POST', url: 'http://plug.dj/_/gateway/user.set_status_1', contentType: 'application/json', data: '{ "service": "user.set_status_1", "body": ["4"] }' });
                }
                if (value == '/3') {
                    API.chatLog("Status set to 3 (Gaming)");
                    $.ajax({ type: 'POST', url: 'http://plug.dj/_/gateway/user.set_status_1', contentType: 'application/json', data: '{ "service": "user.set_status_1", "body": ["3"] }' });
                }
                if (value == '/2') {
                    API.chatLog("Status set to 2 (Working)");
                    $.ajax({ type: 'POST', url: 'http://plug.dj/_/gateway/user.set_status_1', contentType: 'application/json', data: '{ "service": "user.set_status_1", "body": ["2"] }' });
                }
                if (value == '/1') {
                    API.chatLog("Status set to 1 (AFK)");
                    $.ajax({ type: 'POST', url: 'http://plug.dj/_/gateway/user.set_status_1', contentType: 'application/json', data: '{ "service": "user.set_status_1", "body": ["1"] }' });
                }
                if (value == '/0') {
                    API.chatLog("Status set to 0 (Available)");
                    $.ajax({ type: 'POST', url: 'http://plug.dj/_/gateway/user.set_status_1', contentType: 'application/json', data: '{ "service": "user.set_status_1", "body": ["0"] }' });
                }
                if (value == '/fullscreen') {
                    radiantScript.fullScreen = !radiantScript.fullScreen;
                    if (radiantScript.fullScreen) {
                        radiantScript.addChatLog('Fullscreen video activated! Run command again to disable', 'orange');
                        radiantScript.fullscreen();
                        $('#vote').addClass('fsenabled');
                        $('#radiantscriptBottom').addClass('fsenabled2');
                        $('#playback').addClass('fsenabled3');
                        $('#playback-controls').addClass('fsenabled4');
                        $('#playback .background').addClass('fsenabled5');
                        $('#playback .background img').addClass('fsenabled6');
                    }
                    if (!radiantScript.fullScreen) {
                        radiantScript.addChatLog('Fullscreen video disabled! Resize window to return to normal', 'orange');
                        $('#vote').removeClass('fsenabled');
                        $('#radiantscriptBottom').removeClass('fsenabled2');
                        $('#playback').removeClass('fsenabled3');
                        $('#playback-controls').removeClass('fsenabled4');
                        $('#playback .background').removeClass('fsenabled5');
                        $('#playback .background img').removeClass('fsenabled6');
                    }
                }
            }
        },

    }           

    console.log('Loaded Radiant Script v' + radiantScript.version);       
    radiantScript.addChatLog('Running Radiant Script v' + radiantScript.version, 'aqua');  
    radiantScript.init();  
    var plugCubed;
    var content = '<section id="radiantscript">\
        <h3>Radiant Script</h3>\
        <p class="version">bookmarklet for plug.dj</p>\
        <p>Auto Woot?</p>\
        <div class="onoffswitch">\
            <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="checkbox-autowoot" ' + radiantScript.cAutoWoot + '>\
            <label class="onoffswitch-label" for="checkbox-autowoot">\
                <div class="onoffswitch-inner"></div>\
                <div class="onoffswitch-switch"></div>\
            </label>\
        </div>\
        <p class="version">version ' + radiantScript.version + '</p>\
    </section>';
    var content2 = '<section id="radiantscriptRight">\
    <div id="socialrm-fb"></div>\
    <div id="socialrm-tw"></div>\
    </section>';

    var content3 = '<section id="radiantscriptBottom">\
      <div id="radiantscriptBottom2">\
      <span id="rmstatsTitle">Username:</span>\
      <span id="rmstatsInfo_username"></span>\
      <span id="rmstatsSpacer">&nbsp;</span>\
      <span id="rmstatsTitle">Points:</span>\
      <span id="rmstatsInfo_points"></span>\
      <span id="rmstatsSpacer">&nbsp;</span>\
      <span id="rmstatsTitle">DJ Points:</span>\
      <span id="rmstatsInfo_djpoints"></span>\
      <span id="rmstatsSpacer">&nbsp;</span>\
      <span id="rmstatsTitle">Listener Points:</span>\
      <span id="rmstatsInfo_listenerpoints"></span>\
      <span id="rmstatsSpacer">&nbsp;</span>\
      <span id="rmstatsTitle">Grab Points:</span>\
      <span id="rmstatsInfo_grabpoints"></span>\
      <span id="rmstatsSpacer">&nbsp;</span>\
      <span id="rmstatsTitle">Fans:</span>\
      <span id="rmstatsInfo_fans"></span>\
      </div>\
    </section>';

    $('body').prepend('<link rel="stylesheet" type="text/css" id="test-css" href="https://raw.githubusercontent.com/Shone007/PlugBot/master/bot.js" />');  
    $('#room').append(content);     
    $('#room').append(content2); 
    $('#room').append(content3); 
 
}
