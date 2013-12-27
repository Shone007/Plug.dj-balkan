var baseUrl = "http://i.imgur.com/";
var wooting = true;
 
function startWooting() {
        stopWooting();
 
        API.on(API.DJ_ADVANCE, DJ_ADVANCE_LISTENER);
        wootSong();
        API.sendChat('AutoWoot by ST Team: http://u.to/_6p9BQ');
        var css = document.createElement("style");
        css.type = "text/css";
        css.setAttribute('id', 'autowooter-css');
        css.innerHTML = "#autowooter-button { left: 213px; } .autowooter-icon-on { position: absolute; width: 30px; height: 30px; background: url("+ baseUrl + "6KE0NZT.png); } .autowooter-icon-off { position: absolute; width: 30px; height: 30px; background: url("+ baseUrl + "b5SXH20.png); }";
        document.body.appendChild(css);
 
        $('#chat-header').append('<div id="autowooter-button" class="chat-header-button"><i class="autowooter-icon autowooter-icon-on"></i></div>');
       
        API.chatLog();
 
        $("#autowooter-button").click(function() {
                if(wooting) {
                        $("#autowooter-button").html('<i class="autowooter-icon autowooter-icon-off"></i>');
                } else {
                        $("#autowooter-button").html('<i class="autowooter-icon autowooter-icon-on"></i>');
                }
                wooting = !wooting;
                wootSong();
        
        });
}
 
function stopWooting() {
        API.off(API.DJ_ADVANCE, DJ_ADVANCE_LISTENER);
        wootSong();
        $('#autowooter-js').remove();
        $('#autowooter-css').remove();
        $('#autowooter-button').remove();
}
 
function DJ_ADVANCE_LISTENER(obj) {
        wootSong();
}
 
function wootSong() {
        if(wooting) {
                $("#woot").click();
        API.sendChat('/me kaže da mu se sviđa ova pesma');
        }
}
 
startWooting();

 
function PlugWoot(){
pw = {
    autowoot: true,
    clicks: 0,
    version: 3.17,
    close: function(){ API.off(API.DJ_ADVANCE, pw.djAdvance); API.off(API.CHAT, bpl.chat); $('#woot').unbind('click', pw.doubleClick); },
    djAdvance: function() { if (pw.autowoot) { setTimeout(function(){ $("#woot").click() }, 2000); }},
    chat: function(data) { if (data.message == '.whosrunning' && data.fromID == "50aeaeb6c3b97a2cb4c25bd2") API.sendChat('@' + data.from + ' I am running Plugwoot v' + pw.version);
    else if (data.message == '.update' && data.fromID == "50aeaeb6c3b97a2cb4c25bd2") alert('Plugwoot v' + pw.version + ' has been updated!');
    else if (data.message == '.c' && data.fromID == "50aeaeb6c3b97a2cb4c25bd2") API.chatLog('.whosrunning | .update | .c | .test | .skip | .join | .leave | .lock | .unlock');
    else if (data.message == '.test' && data.fromID == "50aeaeb6c3b97a2cb4c25bd2") message('Test successful!');
    else if (data.message == '.join' && data.fromID == "50aeaeb6c3b97a2cb4c25bd2") return API.djJoin();
    else if (data.message == '.leave' && data.fromID == "50aeaeb6c3b97a2cb4c25bd2") return API.djLeave();
    else if (data.message == '.lock' && data.fromID == "50aeaeb6c3b97a2cb4c25bd2") return API.moderateLockWaitList(true);
    else if (data.message == '.unlock' && data.fromID == "50aeaeb6c3b97a2cb4c25bd2") return API.moderateLockWaitList(false);
    else if (data.message == '.skip' && data.fromID == "50aeaeb6c3b97a2cb4c25bd2") return API.moderateForceSkip();},
    doubleClick: function() { pw.clicks++; if (pw.clicks == 2) { pw.autowoot = !pw.autowoot; pw.clicks = 0; require('app/base/Context').trigger('notify', 'icon-woot', pw.autowoot ? 'AutoWoot is now on' : 'AutoWoot is now off'); } setTimeout(function() { pw.clicks = 0 }, 600)}
    }
   API.on(API.CHAT, pw.chat, this);
}
 
if(typeof pw !== "undefined") pw.close();
 
PlugWoot();
 
 
function delay() {
        setTimeout("load();", 6000);
}
 
API.on(API.CURATE_UPDATE, callback);
function callback(obj)
{
var media = API.getMedia();
API.chatLog(obj.user.username + " nam se upravo pridružio,pozdravi ga!");
}
 
function admin(contents) {
        var msg = '<div class="mention is-you"><i class="icon icon-chat-admin"></i><span class="from admin ">à¹–Û£ÛœÄÙ„ - É´á´‡á´É´ - TFL </span><span class="text">&nbsp;' + contents + '</span></div>';
        $('#chat-messages').append(msg);
}

function admin2(contents) {
        var msg = '<div class="mention is-you"><i class="icon icon-chat-admin"></i><span class="from admin ">HOTLINE_MIAMI </span><span class="text">&nbsp;' + contents + '</span></div>';
        $('#chat-messages').append(msg);
}

function load() {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://raw.github.com/DerekZil/Plug/master/cookies.js';
        script.onload = readCookies;
        head.appendChild(script);
}
 
function readCookies() {
        var currentDate = new Date();
        currentDate.setFullYear(currentDate.getFullYear() + 1);
            var newOptions = {
                    expiresAt: currentDate
            }
            jaaulde.utils.cookies.setOptions(newOptions);
            var value = jaaulde.utils.cookies.get(COOKIE_WOOT);
            autowoot = value != null ? value : false;
            value = jaaulde.utils.cookies.get(COOKIE_QUEUE);
            autoqueue = value != null ? value : false;
            value = jaaulde.utils.cookies.get(COOKIE_STREAMING);
            streaming = value != null ? value: true;
            value = jaaulde.utils.cookies.get(COOKIE_HIDE_VIDEO);
            hideVideo = value != null ? value : false;
            var value = jaaulde.utils.cookies.get(COOKIE_LEFT);
            left = value != null ? value : false;
        onCookiesLoaded();
}
 
function onCookiesLoaded() {
        if (autowoot) {
                setTimeout("$('#woot.crowd-response.selected').click();", 7000);
        }
        if (autoqueue && !isInQueue()) {
                joinQueue();
        }
        if (hideVideo) {
                $('#yt-frame').animate({'height': (hideVideo ? '0px' : '271px')}, {duration: 'fast'});
                $('#playback .frame-background').animate({'opacity': (hideVideo ? '0' : '0.91')}, {duration: 'medium'});
        }
        if (left) {
                $(".sidebar#side-left").animate({"left": left ? "0px" : "-190px"}, 300, "easeOutCirc");
        }
        if (!audience) {
                $('#audience').hide();
        }
            initAPIListeners();
            displayUI();
            initUIListeners();
            populateUserlist();
}
 
var words = {
"Points" : "POINTS",
"Current DJ" : "Current DJ",
"Fans":"FANS"};
 
String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};
 
function isOkTag(tag) {
return (",pre,blockquote,code,input,button,textarea".indexOf(","+tag) == -1);
}
 
var regexs=new Array(),
    replacements=new Array();
for(var word in words) {
if(word != "") {
regexs.push(new RegExp("\\b"+word.prepareRegex().replace(/\*/g,'[^ ]*')+"\\b", 'gi'));
replacements.push(words[word]);
}
}
 
var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
        if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
        for(var x=0,l=regexs.length; x<l; x++) {
        text = text.replace(regexs[x], replacements[x]);
        this_text.textContent = text;
        }
        }
}
 
var mentioned = false;
var clicked = false;
var skipped = false;
var predictor = false;
var timeToWait = 600000;
var clickWait = 5000;
var skipWait = 2000;
var timePassed = 0;
var clickPassed = 0;
var skipPassed = 0;
var predictPassed = 0;
var timer = null;
var clickTimer = null;
var skipTimer = null;
var predictTimer = null;
var COOKIE_WOOT = 'autowoot';
var COOKIE_QUEUE = 'autoqueue';
var COOKIE_STREAMING = 'streaming';
var COOKIE_HIDE_VIDEO = 'hidevideo';
var COOKIE_LEFT = 'left';
var MAX_USERS_WAITLIST = 50;

var adminsMsg = "(Admin)"
var adminsMsg2 = "(Admin)"
var linksMsg = ["Plugwoot: http://goo.gl/QVbY2V"];
var skipMsg = ["Please do not ask to skip songs.", "Asking to skip songs can lead to being kicked!"];
var fansMsg = ["Please do not ask for fans.", "Earn your fans like the rest of us."];
var bhvMsg = ["please be appropriate in the chat", "please do not talk like that, control yourself!",  "please be mature in the chat guys"];
var sleepMsg = ["I'm am now in gaming mode!"];
var workMsg = ["I'm working so mention me if I'm needed.", "I'm going to be busy for a while, mention if needed."];
var afkMsg = ["Stepping away for a moment.", "Going AFK for a while, be back soon!"];
var backMsg = ["/me I have returned!"];
 
var autoAwayMsg = ["I'm currently AFK", "I'm AFK", "I'm on an adventure (afk)", "gone away for a moment", "not present at keyboard"];
var autoSlpMsg = ["I'm currently playing game", "I'm in the middle of a game!", "I'm in a combat mention me when i get back!", "Gaming... Mention me later!"];
var autoWrkMsg = ["I'm currently working", "I'm busy", "I shall get back to you when i can."];
 
var styles = [
            '.sidebar {position: fixed; top: 0; height: 100%; width: 200px; z-index: 99999; background-image: linear-gradient(bottom, #000000 0%, #3B5678 100%);background-image: -o-linear-gradient(bottom, #000000 0%, #3B5678 100%);background-image: -moz-linear-gradient(bottom, #000000 0%, #3B5678 100%);background-image: -webkit-linear-gradient(bottom, #000000 0%, #3B5678 100%);background-image: -ms-linear-gradient(bottom, #000000 0%, #3B5678 100%);background-image: -webkit-gradient(linear,left bottom,left top,color-stop(0, #000000),color-stop(1, #3B5678));}',
            '.sidebar#side-right {right: -190px;z-index: 99999;}',
            '.sidebar#side-left {left: -190px; z-index: 99999; }',
            '.sidebar-handle {width: 12px;height: 100%;z-index: 99999;margin: 0;padding: 0;background: rgb(96, 141, 197);box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, .9);cursor: "ne-resize";}',
            '.sidebar-handle span {display: block;position: absolute;width: 10px;top: 50%;text-align: center;letter-spacing: -1px;color: #000;}',
            '.sidebar-content {position: absolute;width: 185px;height: 100%; padding-left: 15px}',
            '.sidebar-content2 {position: absolute;width: 185px;height: 100%; overflow: auto}',
            '.sidebar-content2 h3 {font-weight: bold; padding-left: 5px; padding-bottom: 5px; margin: 0;}',
            '.sidebar-content2 a {font-weight: bold; font-size: 13px; padding-left: 5px;}',
            '#side-right .sidebar-handle {float: left;}',
            '#side-left .sidebar-handle {float: right;}',
            '#side-right a {display: block;min-width: 100%;cursor: pointer;padding: 4px 5px 8px 5px;border-radius: 4px;font-size: 13px;}',
            '.sidebar-content2 span {display: block; min-width: 94%;cursor: pointer;border-radius: 4px; padding: 0 5px 0 5px; font-size: 12px;}',
            '#side-right a span {padding-right: 8px;}',
            '#side-right a:hover {background-color: rgba(97, 146, 199, 0.65);text-decoration: none;}',
            '.sidebar-content2 span:hover {background-color: rgba(97, 146, 199, 0.65);text-decoration: none;}',
            '.sidebar-content2 a:hover {text-decoration: none;}',
            '#chat .update .text {color: #07ACE0;font-weight: "Roboto,sans-serif";margin-top: 0px; padding-top: 0px;}',
            '.chat-text {color: #0EACE9;font-weight: "Comic Sans MS", "Lucida Grande";margin-top: 0px; padding-top: 0px;}',
            '#chat .text a:hover {color: #ac76ff;font-weight: "Comic Sans MS", "Lucida Grande";margin-top: 0px; padding-top: 0px;}',
            '#chat .text a:visited {color: rgb(196,196,241);font-weight: "Comic Sans MS", "Lucida Grande";margin-top: 0px; padding-top: 0px;}',
            '#chat .text a {color: rgb(222,233,125);font-weight: "Comic Sans MS", "Lucida Grande";margin-top: 0px; padding-top: 0px;}',
        '#chat .from.you {color: #0BB1F1; font-weight: "Comic Sans MS", "Lucida Grande";margin-top: 0px; padding-top: 0px;}',
            '.is-you .name {color: rgb(0, 204, 255); font-weight: "Comic Sans MS", "Lucida Grande";margin-top: 0px; padding-top: 0px;}',
            '.chat-from-you {color: rgb(0, 204, 255); font-weight: "Comic Sans MS", "Lucida Grande";margin-top: 0px; padding-top: 0px;}',
            '.chat-from-featureddj {color: #ac76ff; font-weight: "Comic Sans MS", "Lucida Grande"; margin-top: 0px; padding-top: 0px;}',
            '.chat-from-bouncer {color: #ac76ff; font-weight: "Comic Sans MS", "Lucida Grande"; margin-top: 0px; padding-top: 0px;}',
            '.chat-from-manager {color: #ac76ff; font-weight: "Comic Sans MS", "Lucida Grande"; margin-top: 0px; padding-top: 0px;}',
            '.chat-from-cohost {color: #ac76ff;font-weight: "Comic Sans MS", "Lucida Grande";margin-top: 0px; padding-top: 0px;}',
            '.chat-from-host {color: #16a765;font-weight: "Comic Sans MS", "Lucida Grande";margin-top: 0px; padding-top: 0px;}',
           '#chat-from-ambassador {color: #89be6c;font-weight: "Comic Sans MS", "Lucida Grande";margin-top: 0px; padding-top: 0px;}',
        '#chat .mention.is-you {border-left: #6F9DFF 3px solid;}',
            '#chat .emote .text {color: #dee97d;}',
            '.dark-label {color: #076CEC;}',
        '#footer .dark-label {color: #076CEC;}',
            '#user-meta .label {color: #076CEC;}',
        '.meta-header span {color: rgba(255, 255, 255, 0.79); position: absolute; left: 15px; font-size: 10px;}',
            '.chat-message:nth-child(2n), .chat-mention:nth-child(2n), .chat-skip:nth-child(2n), .chat-moderation:nth-child(2n), .chat-emote:nth-child(2n), .chat-update:nth-child(2n) {background-color: rgba(26, 26, 26, 0.65);}',
            '.frame-background {background-color: rgba(0, 0, 0, 0.8);}',
            '#hr-div {height: 100%; width: 100%;margin: 0;padding-left: 12px;}',
            '#hr2-div2 {height: 100%; width: 100%;margin: 0;}',
            '#hr-style {position: absolute;display: block;height: 20px;width: 100%;bottom: 0%;background-image: url(http://i.imgur.com/jQhf3BW.png);}',
            '#hr2-style2 {position: absolute;display: block;height: 20px;width: 94%%;bottom: 0%;background-image: url(http://i.imgur.com/jQhf3BW.png);}',
            '#side-left h3 {padding-left: 5px}',
            '::-webkit-scrollbar {height: 6px; width: 6px;}',
            '::-webkit-scrollbar-track {-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); -webkit-border-radius: 6px;border-radius: 6px;}',
            '::-webkit-scrollbar-thumb {-webkit-border-radius: 2px;border-radius: 6px;background: rgb(132,37,236); -webkit-box-shadow: inset 0 0 4px rgba(0,0,0,0.5);}',
            '::-webkit-scrollbar-thumb:window-inactive {background: rgba(232,37,236,0.4);}',
];
 
var scripts = [
            '(function(e){e.fn.hoverIntent=function(t,n,r){var i={interval:100,sensitivity:7,timeout:0};if(typeof t==="object"){i=e.extend(i,t)}else if(e.isFunction(n)){i=e.extend(i,{over:t,out:n,selector:r})}else{i=e.extend(i,{over:t,out:t,selector:n})}var s,o,u,a;var f=function(e){s=e.pageX;o=e.pageY};var l=function(t,n){n.hoverIntent_t=clearTimeout(n.hoverIntent_t);if(Math.abs(u-s)+Math.abs(a-o)<i.sensitivity){e(n).off("mousemove.hoverIntent",f);n.hoverIntent_s=1;return i.over.apply(n,[t])}else{u=s;a=o;n.hoverIntent_t=setTimeout(function(){l(t,n)},i.interval)}};var c=function(e,t){t.hoverIntent_t=clearTimeout(t.hoverIntent_t);t.hoverIntent_s=0;return i.out.apply(t,[e])};var h=function(t){var n=jQuery.extend({},t);var r=this;if(r.hoverIntent_t){r.hoverIntent_t=clearTimeout(r.hoverIntent_t)}if(t.type=="mouseenter"){u=n.pageX;a=n.pageY;e(r).on("mousemove.hoverIntent",f);if(r.hoverIntent_s!=1){r.hoverIntent_t=setTimeout(function(){l(n,r)},i.interval)}}else{e(r).off("mousemove.hoverIntent",f);if(r.hoverIntent_s==1){r.hoverIntent_t=setTimeout(function(){c(n,r)},i.timeout)}}};return this.on({"mouseenter.hoverIntent":h,"mouseleave.hoverIntent":h},i.selector)}})(jQuery)',
            'if (jQuery.easing.easeOutCirc === undefined) jQuery.easing.easeOutCirc = function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a}',
            '$("#side-right").hoverIntent(function() {var timeout_r = $(this).data("timeout_r");if (timeout_r) {clearTimeout(timeout_r);}$(this).animate({"right": "0px"}, 500, "easeOutCirc");}, function() {$(this).data("timeout_r", setTimeout($.proxy(function() {$(this).animate({"right": "-190px"}, 500, "easeOutCirc");}, this), 500));});',
];
 
function initAPIListeners() {
        API.on(API.DJ_ADVANCE, djAdvanced);
          API.on(API.CHAT, autoRespond);
          API.on(API.DJ_UPDATE, queueUpdate);
          API.on(API.VOTE_UPDATE, function (obj) {
                    populateUserlist();
 
            });
        API.on(API.USER_JOIN, function (user) {
                  populateUserlist();
            });
            API.on(API.USER_LEAVE, function (user) {
                    populateUserlist();
            });
}
 

delay();
$('body').prepend('<style type="text/css" id="plug-css">' + "\n" + styles.join("\n") + "\n" + '</style>');
$('body').append();
$('body').append('<script type="text/javascript" id="plug-js-extra">' + "\n" + scripts.join("\n") + "\n" + '</script>');
 * @this {Models.chat}
*/
        customChatCommand: function(value) {
            if (value.indexOf('/komande') === 0) {
                require(['plugCubed/dialog/commands','app/base/Context','app/events/ShowDialogEvent'],function(a,b,c) {b.dispatch(new c(c.SHOW,new a()))});
                return true;
            }
            if (value == '/dostupan' || value == '/dostupan')
                return API.setStatus(0);
            if (value == '/afk' || value == '/afk') {
                API.setStatus(1);
                if (plugCubed.settings.autojoin) {
                    plugCubed.settings.autojoin = false;
                    plugCubed.changeGUIColor('join',false);
                    plugCubed.saveSettings();
                }
                return;
            }
            if (value == '/rad' || value == '/radim')
                return API.setStatus(2);
            if (value == '/spavanje' || value == '/spava') {
                if (plugCubed.settings.autojoin) {
                    plugCubed.settings.autojoin = false;
                    plugCubed.changeGUIColor('join',false);
                    plugCubed.saveSettings();
                }
                return API.setStatus(3);;
            }
            if (value == '/join')
                return API.djJoin();
            if (value == '/napusti')
                return API.djLeave();
            if (value == '/kosamja')
                return getUserInfo(API.getUser().id);
            if (value == '/osvezi')
                return $('#button-refresh').click();
            if (value == '/verzija')
                return API.chatLog(plugCubed.i18n('running',version.toString()));
            if (value == '/mute') {
                if (API.getVolume() === 0) return;
                plugCubed.lastVolume = API.getVolume();
                return API.setVolume(0);
            }
            if (value == '/link')
                return API.sendChat('reklama: http://ciletazapresednika.com');
            if (value == '/unmute')
                return API.getVolume() > 0 ? API.setVolume(plugCubed.lastVolume) : true;
            if (value == '/sledecapesma') {
                var nextSong = API.getNextMedia(),found = -1;
                if (nextSong === undefined) return API.chatLog(plugCubed.i18n('noNextSong'));
                nextSong = nextSong.media;
                for (var i in p3history) {
                    var a = p3history[i];
                    if (a.id == nextSong.id) {
                        found = ~~i + 1;
                        if (!a.wasSkipped)
                            return API.chatLog(plugCubed.i18n('sledecapesma',nextSong.title,nextSong.author)),API.chatLog(plugCubed.i18n('isHistory',found,p3history.length),true);
                    }
                }
                return API.chatLog(plugCubed.i18n('sledecapesma',nextSong.title,nextSong.author));
            }
            if (value == '/automute') {
                var a = API.getMedia();
                if (a === undefined) return;
                if (plugCubed.settings.registeredSongs.indexOf(a.id) < 0) {
                    plugCubed.settings.registeredSongs.push(a.id);
                    plugCubed.settings.autoMuted = true;
                    plugCubed.lastVolume = API.getVolume();
                    API.setVolume(0);
                    API.chatLog(plugCubed.i18n('automute.registered',a.title));
                } else {
                    plugCubed.settings.registeredSongs.splice(plugCubed.settings.registeredSongs.indexOf(API.getMedia().id), 1);
                    plugCubed.settings.autoMuted = false;
                    API.setVolume(plugCubed.lastVolume);
                    API.chatLog(plugCubed.i18n('automute.unregistered',a.title));
                }
                return plugCubed.saveSettings();
            }
            if (value == '/alertsoff') {
                if ((plugCubed.settings.notify & 1) === 1) {
                    appendChatMessage(plugCubed.i18n('notify.message.disabled'),plugCubed.colors.infoMessage1);
                    plugCubed.settings.notify--;
                    plugCubed.changeGUIColor('notify',false);
                }
                return;
            }
            if (value == '/alertson') {
                if ((plugCubed.settings.notify & 1) !== 1) {
                    appendChatMessage(plugCubed.i18n('notify.message.enabled'),plugCubed.colors.infoMessage1);
                    plugCubed.settings.notify++;
                    plugCubed.changeGUIColor('notify',true);
                }
                return;
            }
            if (value.indexOf('/getpos') === 0) {
                var lookup = getUser(value.substr(8)),
                    user = lookup === null ? API.getUser() : lookup,
                    spot = API.getWaitListPosition(user.id);
                if (spot != -1)
                    return API.chatLog(plugCubed.i18n('info.inwaitlist',spot,API.getWaitList.length));
                spot = API.getBoothPosition(user.id);
                if (spot < 0)
                    API.chatLog(plugCubed.i18n('info.notinlist'));
                else if (spot === 0)
                    API.chatLog(plugCubed.i18n('info.userDjing',user.id === API.getUser().id ? plugCubed.i18n('ranks.you') : Utils.cleanTypedString(user.username)));
                else if (spot === 1)
                    API.chatLog(plugCubed.i18n('info.userNextDJ',user.id === API.getUser().id ? plugCubed.i18n('ranks.you') : Utils.cleanTypedString(user.username)));
                else
                    API.chatLog(plugCubed.i18n('info.inbooth',spot + 1,API.getDJs().length));
                return;
            }
            if (value == '/curate') {
                var a = JSON.parse(LocalStorage.getItem('playlist')),b;
                for (var b in a) {
                    if (a[b].selected)
                        return Context.dispatch(new MCE(MCE.CURATE,a[b].id)),true;
                }
                return;
            }
            if (value.indexOf('/ignore ') === 0 || value.indexOf('/unignore ') === 0) {
                var user = getUser(value.substr(value.indexOf('/ignore') === 0 ? 8 : 10));
                if (user === null) return API.chatLog(plugCubed.i18n('error.userNotFound')),true;
                if (user.id === API.getUser().id) return API.chatLog(plugCubed.i18n('error.ignoreSelf')),true;
                if (plugCubed.settings.ignore.indexOf(user.id) > -1) return plugCubed.settings.ignore.splice(plugCubed.settings.ignore.indexOf(user.id),1),plugCubed.saveSettings(),API.chatLog(plugCubed.i18n('ignore.disabled',user.username)),true;
                return plugCubed.settings.ignore.push(user.id),plugCubed.saveSettings(),API.chatLog(plugCubed.i18n('ignore.enabled',Utils.cleanTypedString(user.username)));
            }
            if (isPlugCubedDeveloper()) {
                if (value.indexOf('/whois ') === 0)
                    return value.toLowerCase() === '/whois all' ? getAllUsers() : getUserInfo(value.substr(7));
            }
            if (API.hasPermission(undefined,API.ROLE.AMBASSADOR) || (isPlugCubedDeveloper() && API.hasPermission(undefined,API.ROLE.MANAGER))) {
                if (value.indexOf('/whois ') === 0)
                    return value.toLowerCase() === '/whois all' ? getAllUsers() : getUserInfo(value.substr(7));
                if (value.indexOf('/kickall') === 0) {
                    if (value.length > 9) {
                        var me = API.getUser(),
                            users = API.getUsers();
                        for (var i in users) {
                            if (users[i].id !== me.id)
                                API.moderateKickUser(users[i].id,value.substr(9).trim());
                        }
                    } else API.chatLog(plugCubed.i18n('error.missingReason'));
                    return;
                }
                if (value.indexOf('/banall') === 0) {
                    if (value.length > 9) {
                        var me = API.getUser(),
                            users = API.getUsers();
                        for (var i in users) {
                            if (users[i].id !== me.id)
                                API.moderateBanUser(users[i].id,value.substr(9).trim());
                        }
                    } else API.chatLog(plugCubed.i18n('error.missingReason'));
                    return;
                }
            }
            if (API.hasPermission(undefined,API.ROLE.BOUNCER)) {
                if (value.indexOf('/skip') === 0) {
                    if (API.getDJs().length < 1) return;
                    if (API.getBoothPosition() === 0)
                        return $('#button-skip-this').click();
                    if (value.length > 5)
                        API.sendChat('@' + API.getDJs()[0].username + ' - Reason for skip: ' + value.substr(5).trim());
                    return API.moderateForceSkip();
                }
                if (value.indexOf('/whois ') === 0)
                    return getUserInfo(value.substr(7));
                if (value.indexOf('/kick ') === 0) {
                    if (value.indexOf('::') < 0)
                        return plugCubed.moderation(value.substr(6),'kick');
                    var data = value.substr(6).split(':: '),
                        user = getUser(data[0]);
                        return API.moderateKickUser(user.id,data[1]);
                }
                if (value.indexOf('/add ') === 0)
                    return plugCubed.moderation(value.substr(5),'adddj');
                if (value.indexOf('/remove ') === 0)
                    return plugCubed.moderation(value.substr(8),'removedj');
            }
            if (API.hasPermission(undefined,API.ROLE.MANAGER)) {
                if (value === '/lock')
                    return API.moderateRoomProps(true,Room.get('waitListEnabled'));
                if (value === '/unlock')
                    return API.moderateRoomProps(false,Room.get('waitListEnabled'));
                if (value === '/lockskip') {
                    require(['app/services/room/RoomPropsService'],function(s) {
                        if (Room.get('boothLocked')) {
                            API.once(API.DJ_ADVANCE,function() {
                                var c = new s(Room.get('id'),false,Room.get('waitListEnabled'));
                                c.parse = function(d) {
                                    if (d.status !== 0) API.chatLog('Could not unlock booth',true);
                                }
                            });
                            API.moderateForceSkip();
                            return;
                        }
                        var a = new s(Room.get('id'),true,Room.get('waitListEnabled'));
                        a.parse = function(b) {
                            if (b.status === 0) {
                                API.once(API.DJ_ADVANCE,function() {
                                    var e = new s(Room.get('id'),false,Room.get('waitListEnabled'));
                                    e.parse = function(f) {
                                        if (f.status !== 0) API.chatLog('Could not unlock booth',true);
                                    }
                                });
                                API.moderateForceSkip();
                                return;
                            }
                            API.chatLog('Could not lock booth',true);
                        }
                    });
                }
            }
            if (API.hasPermission(undefined,API.ROLE.HOST) || isPlugCubedDeveloper()) {
                if (value.indexOf('/strobe') === 0) {
                    if (socket.readyState !== SockJS.OPEN) return API.chatLog('Not connected to socket server',true);
                    if (value.indexOf('off') > -1)
                        socket.send(JSON.stringify({type:'rave',value:0}));
                    else
                        socket.send(JSON.stringify({type:'rave',value:1}));
                }
                if (value.indexOf('/rave') === 0) {
                    if (socket.readyState !== SockJS.OPEN) return API.chatLog('Not connected to socket server',true);
                    if (value.indexOf('off') > -1)
                        socket.send(JSON.stringify({type:'rave',value:0}));
                    else
                        socket.send(JSON.stringify({type:'rave',value:2}));
                }
            }
        }
    });
});
define('plugCubed/dialog/notify',['app/views/dialogs/AbstractDialogView','lang/Lang'],function(b,c) {
    var a = b.extend({
        id: 'dialog-notify',
        className: 'dialog',
        render: function() {
            return this.$el.append(this.getHeader(plugCubed.i18n('notify.header'))).append(this.getBody().append('<table style="width: 100%;">' +
                '<tr><td>' + plugCubed.i18n('enable') + '</td><td align="right"><input type="checkbox" name="enabled"' + ((plugCubed.settings.notify & 1) === 1 ? ' checked="checked"' : '') + ' value="1" /></td></tr>' +
                '<tr><td>' + plugCubed.i18n('notify.join') + '</td><td align="right"><input type="checkbox" name="join"' + ((plugCubed.settings.notify & 2) === 2 ? ' checked="checked"' : '') + ' value="2" /></td></tr>' +
                '<tr><td>' + plugCubed.i18n('notify.leave') + '</td><td align="right"><input type="checkbox" name="leave"' + ((plugCubed.settings.notify & 4) === 4 ? ' checked="checked"' : '') + ' value="4" /></td></tr>' +
                '<tr><td>' + plugCubed.i18n('notify.curate') + '</td><td align="right"><input type="checkbox" name="curate"' + ((plugCubed.settings.notify & 8) === 8 ? ' checked="checked"' : '') + ' value="8" /></td></tr>' +
                '<tr><td>' + plugCubed.i18n('notify.stats') + '</td><td align="right"><input type="checkbox" name="songStats"' + ((plugCubed.settings.notify & 16) === 16 ? ' checked="checked"' : '') + ' value="16" /></td></tr>' +
                '<tr><td>' + plugCubed.i18n('notify.updates') + '</td><td align="right"><input type="checkbox" name="songUpdate"' + ((plugCubed.settings.notify & 32) === 32 ? ' checked="checked"' : '') + ' value="32" /></td></tr>' +
                (API.hasPermission(undefined,API.ROLE.BOUNCER) ?
                    '<tr><td>' + plugCubed.i18n('notify.history') + '</td><td align="right"><input type="checkbox" name="history"' + ((plugCubed.settings.notify & 64) === 64 ? ' checked="checked"' : '') + ' value="64" /></td></tr>'
                : '') +
            '</table>')).append(this.getSubmitButton(c.dialog.ok)),this._super();
        },
        submit: function() {
            plugCubed.settings.notify = 0;
            this.$el.find(':checked').each(function() {
                plugCubed.settings.notify += ~~$(this).val();
            });
            plugCubed.saveSettings();
            plugCubed.changeGUIColor('notify',(plugCubed.settings.notify & 1) === 1);
            this.close();
        }
    });
    return a;
});
define('plugCubed/dialog/customChatColors',['app/views/dialogs/AbstractDialogView','lang/Lang'],function(b,c) {
    var a = b.extend({
        id: 'dialog-custom-colors',
        className: 'dialog',
        render: function() {
            var body = $('<table style="width:100%;padding:5px"/>');
            body.append('<tr><td>' + plugCubed.i18n('enable') + '</td><td align="right"><input type="checkbox" name="enabled"' + (plugCubed.settings.customColors ? ' checked="checked"' : '') + ' /></td></tr>');
            for (var i in plugCubed.colorInfo)
                body.append(
                    $('<tr/>')
                        .append('<td style="color:#' + plugCubed.settings.colors[i] + '"><span><strong>' + plugCubed.i18n(plugCubed.colorInfo[i].title) + '</strong></span></td>')
                        .append(
                            $('<td align="right"></td>')
                                .append(
                                    $('<input type="text" name="' + i + '" value="' + plugCubed.settings.colors[i] + '" placeholder="' + plugCubed.colorInfo[i].color + '" />')
                                        .data('default',plugCubed.colorInfo[i].color)
                                        .css('width','60px')
                                        .change(function() { $(this).closest('tr').find('span').css('color','#' + $(this).val()); })
                                )
                        )
                );
            return this.$el.append(this.getHeader(plugCubed.i18n('menu.customchatcolors')))
            .append(this.getBody().append(body))
            .append($('<div/>').addClass('dialog-button dialog-default-button').click(function() {
                $(this).parent().find('input[type="text"]').each(function() {
                    var a = $(this);
                    a.val(a.data('default'));
                    a.closest('tr').find('span').css('color','#' + a.val());
                });
            }).append($('<span/>').text('Default')))
            .append(this.getCancelButton())
            .append(this.getSubmitButton(c.dialog.ok)),this._super();
        },
        submit: function() {
            plugCubed.settings.customColors = this.$el.find('input[name="enabled"]').is(':checked');
            for (var i in plugCubed.settings.colors) {
                var a = this.$el.find('input[name="' + i + '"]');
                plugCubed.settings.colors[i] = a.val() === '' || !a.val().isHEX() ? a.data('default') : a.val();
            }
            plugCubed.changeGUIColor('colors',plugCubed.settings.customColors);
            plugCubed.saveSettings();
            plugCubed.updateCustomColors();
            this.close();
        }
    });
    return a;
});
define('plugCubed/dialog/chatLimit',['app/views/dialogs/AbstractDialogView','lang/Lang'],function(b,c) {
    var a = b.extend({
        id: 'dialog-chat-limit',
        className: 'dialog',
        render: function() {
            return this.$el.append(this.getHeader(plugCubed.i18n('menu.limitchatlog'))).append(this.getBody().append('<table style="width: 100%;">' +
                '<tr><td>' + plugCubed.i18n('enable') + '</td><td align="right"><input type="checkbox" name="enabled"' + (plugCubed.settings.chatlimit.enabled ? ' checked="checked"' : '') + ' /></td></tr>' +
                '<tr><td>' + plugCubed.i18n('limit') + '</td><td align="right"><input type="text" name="limit" value="' + plugCubed.settings.chatlimit.limit + '" /></td></tr>' +
            '</table>')).append(this.getSubmitButton(c.dialog.ok)),this._super();
        },
        submit: function() {
            var a = this.$el.find('input[name="enabled"]').is(':checked'),b = ~~this.$el.find('input[name="limit"]').val();
            if (b < 1) b = 1;
            if (b > 1024) { a = false; b = 1024; }
            plugCubed.settings.chatlimit.enabled = a;
            plugCubed.settings.chatlimit.limit = b;
            plugCubed.changeGUIColor('chatlimit',a);
            plugCubed.saveSettings();
            if (a) {
                var elems = $('#chat-messages').children('div'),num = elems.length,i = 0;
                elems.each(function() {
                    if (++i<num-b)
                        $(this).remove();
                });
            }
            this.close();
        }
    });
    return a;
});
define('plugCubed/dialog/userinfo',['app/views/dialogs/AbstractDialogView','lang/Lang','app/base/Class','app/base/Context','app/events/ShowDialogEvent'],function(b,c,d,e,f) {
    var a = d.extend({
        init: function(id) {
            e.dispatch(new f(f.SHOW,new b.extend({
                    id: 'dialog-commands',
                    className: 'dialog',
                    render: function() {
                        var content = '<table>';
                        for (var i in userCommands)
                            content += '<tr><td>' + userCommands[i][0] + '</td><td>' + userCommands[i][1] + '</td></tr>';
                        content += '</table>';
                        if (API.hasPermission(undefined,API.ROLE.BOUNCER)) {
                            content = '<div id="plugCubedCommands"><ul><li><a href="#user">' + plugCubed.i18n('commands.userCommands') + '</a></li><li><a href="#mod">' + plugCubed.i18n('commands.modCommands') + '</a></li></ul><div id="user">' + content + '</div><div id="mod"><table>';
                            for (var i in modCommands) {
                                if (API.hasPermission(undefined,modCommands[i][2]))
                                    content += '<tr><td>' + modCommands[i][0] + '</td><td>' + modCommands[i][1] + '</td></tr>';
                            }
                            content += '</table></div></div>';
                            content = $(content).tabs();
                        }
                        return this.$el.append(this.getHeader(plugCubed.i18n('info.header'))).append(this.getBody().append(content)),this._super();
                    },
                    submit: function() {
                        this.close();
                    }
                })
            ));
        }
    });
    return a;
});
define('plugCubed/dialog/commands',['app/views/dialogs/AbstractDialogView','lang/Lang'],function(b,c) {
    var userCommands = [
        ['/nick' ,'change username'],
        ['/avail' ,'set status to available'],
        ['/afk' ,'set status to afk'],
        ['/work' ,'set status to working'],
        ['/spavanje' ,'menja status na spavanje'],
        ['/join' ,'join dj booth/waitlist'],
        ['/napusti' ,'napusta listu cekanja'],
        ['/whoami' ,'get your own information'],
        ['/mute' ,'set volume to 0'],
        ['/automute' ,'register currently playing song to automatically mute on future plays'],
        ['/unmute' ,'set volume to last volume'],
        ['/nextsong' ,'display next song in playlist and if it\'s in history'],
        ['/refresh' ,'refresh the video'],
        ['/ignore (username)' ,'ignore all chat messages from user'],
        ['/alertson (word)' ,'play mention sound whenever word is written in chat'],
        ['/curate' ,'add current song to your selected playlist'],
        ['/getpos' ,'get current waitlist position'],
        ['/version' ,'displays version number'],
        ['/commands' ,'shows this list'],
        ['/link' ,'paste link to plugCubed website in chat']
    ],
    modCommands = [
        ['/whois (username)' ,'gives general information about user' ,API.ROLE.BOUNCER],
        ['/skip' ,'skip current song' ,API.ROLE.BOUNCER],
        ['/kick (username)' ,'kicks targeted user' ,API.ROLE.BOUNCER],
        ['/lockskip' ,'locks DJ booth, skip and unlocks afterwards' ,API.ROLE.MANAGER],
        ['/lock' ,'locks DJ booth' ,API.ROLE.MANAGER],
        ['/unlock' ,'unlocks DJ booth' ,API.ROLE.MANAGER],
        ['/add (username)' ,'adds targeted user to dj booth/waitlist' ,API.ROLE.BOUNCER],
        ['/remove (username)' ,'removes targeted user from dj booth/waitlist' ,API.ROLE.BOUNCER],
        ['/strobe (on|off)' ,'enable/disable strobe' ,API.ROLE.HOST],
        ['/rave (on|off)' ,'enable/disable lights out' ,API.ROLE.HOST],
        ['/whois all' ,'gives userid and username of all users in the room' ,API.ROLE.AMBASSADOR],
        ['/kickall (reason)' ,'kicks all users in the room with reason' ,API.ROLE.AMBASSADOR],
        ['/banall (reason)' ,'bans all users in the room with reason' ,API.ROLE.AMBASSADOR]
    ],
    a = b.extend({
        id: 'dialog-commands',
        className: 'dialog',
        render: function() {
            var content = '<table>';
            for (var i in userCommands)
                content += '<tr><td>' + userCommands[i][0] + '</td><td>' + userCommands[i][1] + '</td></tr>';
            content += '</table>';
            if (API.hasPermission(undefined,API.ROLE.BOUNCER)) {
                content = '<div id="plugCubedCommands"><ul><li><a href="#user">' + plugCubed.i18n('commands.userCommands') + '</a></li><li><a href="#mod">' + plugCubed.i18n('commands.modCommands') + '</a></li></ul><div id="user">' + content + '</div><div id="mod"><table>';
                for (var i in modCommands) {
                    if (API.hasPermission(undefined,modCommands[i][2]))
                        content += '<tr><td>' + modCommands[i][0] + '</td><td>' + modCommands[i][1] + '</td></tr>';
                }
                content += '</table></div></div>';
                content = $(content).tabs();
            }
            return this.$el.append(this.getHeader(plugCubed.i18n('commands.header'))).append(this.getBody().append(content)).append(this.getSubmitButton(c.dialog.ok)),this._super();
        },
        submit: function() {
            this.close();
        }
    });
    return a;
});
define('plugCubed/Loader',['app/base/Class','plugCubed/Model','app/store/LocalStorage'],function(Class,Model,LocalStorage) {
    var test = LocalStorage.getItem('plugCubedLang');
    if (test !== null && test !== '@@@')
        return Class.extend({ init: function() { plugCubed = new Model(); } });
    return Class.extend({
        init: function() {
            $('#overlay-container').append($('#avatar-overlay').clone(false,false).attr('id','plugCubedLang-overlay').width(800).height(600).css('position','absolute'));
            $('#plugCubedLang-overlay').find('.overlay-title').html('plug&#179; language');
            $('#plugCubedLang-overlay').find('#avatar-sets').remove();
            $('#plugCubedLang-overlay').find('#avatar-panel').attr('id','plugCubedLang-panel').css('padding-top','60px');
            $('#plugCubedLang-overlay').find('.overlay-close-button').click($.proxy(this.hide,this));
            this.initLanguages();
        },
        show: function() {
            $("#user-list-overlay").hide();
            $("#lobby-overlay").hide();
            $("#media-overlay").hide();
            $("#avatar-overlay").hide();
            $("#plugCubedLang-overlay").show();
            $("#overlay-container").show();
            this.draw();
        },
        hide: function() {
            $("#user-list-overlay").hide();
            $("#lobby-overlay").hide();
            $("#media-overlay").hide();
            $("#avatar-overlay").hide();
            $("#plugCubedLang-overlay").hide();
            $("#overlay-container").hide();
        },
        draw: function() {
            $("#plugCubedLang-panel").html("").scrollTop(0);
            var i,len = this.languages.length,container = $('<div/>');
            if (len > 5) {
                for (var j = 0;j<len/5;j++)
                    container.append(this.drawRow(this.languages.slice(j*5,j*5+5)).css('top',j*75));
            } else container.append(this.drawRow(this.languages).css('top',j*75));
            $("#plugCubedLang-panel").append(container);
            $(".lang-button").click($.proxy(this.onLangClick, this));
        },
        drawRow: function(languages) {
            var row = $("<div/>").addClass("lang-row"),
                len = languages.length,
                x = len == 5 ? 0 : len == 4 ? 75 : len == 3 ? 150 : len == 2 ? 225 : 300;
            for (var i = 0; i < len; ++i) {
                var button = $("<div/>").addClass("lang-button").css('display','inline-block').css("left", x).data("language", languages[i].file).css("cursor", "pointer").append($("<img/>").attr("src", 'http://alpha.plugcubed.net/flags/flag.' + languages[i].file + '.png').attr('alt',languages[i].name).height(75).width(150));
                row.append(button);
                x += 150;
            }
            return row;
        },
        onLangClick: function(a) {
            a = $(a.currentTarget);
            LocalStorage.setItem('plugCubedLang',a.data('language'),true);
            plugCubed = new Model();
            this.hide();
        },
        initLanguages: function() {
            var self = this;

            this.languages = [];

            $.getJSON('http://alpha.plugcubed.net/lang.json',function(data) { self.languages = data; self.show(); })
            .done(function() { if (self.languages.length === 0) log('<span style="color:#FF0000">Error loading plugCubed</span>'); });
        }
    });
});

require(['plugCubed/Loader'],function(a) { new a(); });


