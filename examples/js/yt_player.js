
// YOUTUBE PLAYER CODE
        // loads youtube iframe api
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        //creates player
    var player;
    var vidInfo = 0;
        var h = $(window).height(); var w = $(window).width();
        var lv;
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                vidQuality = 'large';
        } else {
                vidQuality = 'hd1080';
        }
    function onYouTubeIframeAPIReady() {
                player = new YT.Player('player', {
                height: 480,
                width: 640,
                playerVars: {
                        'rel': 0,
                        'showinfo': 0,
                        'controls': 1,
                        'iv_load_policy': 3
                },
                events: {
                        'onReady': onPlayerReady,
                        'onStateChange': onPlayerStateChange
                        }
                });
                //$("#player").fitVids();
        }

    function onPlayerReady(event) {
                videoSearch();
    }

    var seek = 0;
    var prevEvent;
    var isPlaying = 0;

    function onPlayerStateChange(event) {
                var dur; var randur; var durmost;
                // -1 (unstarted)  0 (ended)  1 (playing)  2 (paused)  3 (buffering)  5 (video cued).
                if (event.data == 5) {
                        event.target.playVideo();
                        window.scrollTo(0,1);
                        prevEvent = 5;
                }
                else if (event.data == 2) {
                        prevEvent = 2;
                }
                else if (event.data == 1) {
                        if (isPlaying == 0) {
                                isPlaying = 1;
                        }
                        prevEvent = 1;
                }
                else if (event.data == 0) {
                        vidPlay(2);
                }
                else if (event.data == -1) {
                        isPlaying = 0;
                }
    }

    function stopVideo() {
                player.stopVideo();
        }

        function vidStart() {
                player.seekTo(0, true);
        }

        function vidnfo() {
                //console.log(count+' '+pl[count]);
                document.getElementById("vidinfo").innerHTML =  pl[count][2];
                $('#vidinfo').fadeIn(200);
                $('#vidinfo').delay(3000).fadeOut(2000);
        }

