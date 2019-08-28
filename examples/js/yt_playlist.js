    // AUTHENTICATION & PLAYLISTS
        var token;
        var haveLists = 0;
         // 4. The API will call this function when the video player is ready.
        function load() {
                if (token == null) {
                        gapi.auth.authorize({
                                client_id: '657664434308.apps.googleusercontent.com',
                                scope: 'https://gdata.youtube.com',
                                response_type: 'token',
                                immediate: 'true'
                                },getToken);
                } else {
                        watchLater();
                }
        }
        

        function parseAccess(data) {
                var SearchString = data.substring(1);
                var VariableArray = SearchString.split('&');
                for(var i = 0; i < VariableArray.length; i++){
                        var KeyValuePair = VariableArray[i].split('=');
                        if(KeyValuePair[0] == 'access_token'){
                                token = KeyValuePair[1];
                        }
                }
                
        }

        function getToken(authResult){
                if(authResult) {
                        var obj = gapi.auth.getToken();
                        token = obj.access_token;
                        watchLater();
                } else {
                        alert('access denied');
                }
        }

    function watchLater(frm) {
                pl.length = 0;
                document.getElementById("vidgallery_full").innerHTML = "";
                var script = document.createElement('script');
                script.setAttribute('id', 'jsonScript');
                script.setAttribute('type', 'text/javascript');
                script.setAttribute('src', 'https://gdata.youtube.com/feeds/api/users/default/watch_later?v=2&access_token='+token+'&alt=json-in-script&max-results=50&format=5&fields=entry(media:group)&callback=watchLaterList');
                document.documentElement.firstChild.appendChild(script);
       //alert(pl[0]);
      //player.cuePlaylist({listType: playlist, list: 'PLLRbwjJQG3awh8mXw7pdXgpjfyUA3-1Y8'});
    }
        


        var listId; var wlnum = 0;
        function watchList(id,startnum) {
                if(startnum == 0) { pl.length = 0; document.getElementById("vidgallery_full").innerHTML = ""; wlnum = 1;}
                if(id !== "") { listId = id; }
                var url = "https://gdata.youtube.com/feeds/api/playlists/"+listId+"?v=2&access_token="+token+"&alt=json-in-script&max-results=50";
                if(startnum == 1) {
                        url += "&start-index=50"; wlnum = 0;
                }
                url += "&format=1,5&fields=entry(media:group)&callback=watchLaterList";


                var script = document.createElement('script');
                script.setAttribute('id', 'jsonScript');
                script.setAttribute('type', 'text/javascript');
                script.setAttribute('src', url);
                document.documentElement.firstChild.appendChild(script);
       //alert(pl[0]);
      //player.cuePlaylist({listType: playlist, list: 'PLLRbwjJQG3awh8mXw7pdXgpjfyUA3-1Y8'});
    }


        function watchLaterList(data) {
                var feed = data.feed;
                var entries = feed.entry || [];
                if(entries.length > 0) {
                        for (var i = 0; i < entries.length; i++) {
                                var entry = entries[i];
                                var vid = entry.media$group.yt$videoid.$t;
                                var video_thmb = entry.media$group.media$thumbnail[0].url; 
                                var video_title = entry.media$group.media$title.$t;
                                pl.push([vid,video_thmb,video_title]);
                        }
                        if(document.getElementById("shuffle").checked){shuffleArray(pl);}
                }
                
                if(entries.length == 50 && wlnum == 1) {
                        console.log('foo');
                        watchList(listId, 1);
                }
                
                if (pl.length > 1) {
                        if(document.getElementById("shuffle").checked){shuffleArray(pl);}
                        if(document.getElementById("shuffle").checked){shuffleArray(pl);}
                        if(document.getElementById("shuffle").checked){shuffleArray(pl);}
                        // pl.length = 22;
                        seek = 0;
                        prevEvent = 0;
                        toon = 0;
                        yearCount = 0;
                        tn = 0;
                        vidPlay();
                        for(var i = 0; i < pl.length; i++  ) {
                                document.getElementById("vidgallery_full").innerHTML += '<img src="'+pl[i].video_thmb+'" onClick="loadVid(\''+pl[i].vid+'\','+i+');" >';
                        }


			                        } else {
                        alert('No Search Results');
                }
                if(haveLists !== 1) {
                        getPlaylists();
                }
          }


          function getPlaylists() {
                var script = document.createElement('script');
                script.setAttribute('id', 'jsonScript');
                script.setAttribute('type', 'text/javascript');
                script.setAttribute('src', 'https://gdata.youtube.com/feeds/api/users/default/playlists?v=2&access_token='+token+'&alt=json-in-script&callback=showPlaylists');
                document.documentElement.firstChild.appendChild(script);

          }

             function showPlaylists(data) {
                var feed = data.feed;
                var entries = feed.entry || [];
                if(entries.length > 0) {
                        for (var i = 0; i < entries.length; i++) {
                                var entry = entries[i];
                                console.log(entry);
                                var listId = entry.yt$playlistId.$t;
                                var listName = entry.title.$t;
                                //console.log(listName);
                                document.getElementById("playlists").innerHTML += '<INPUT TYPE="button" Value="'+listName+'" onClick="watchList(\''+listId+'\',0);"> &nbsp;&nbsp;&nbsp; ';
                        }
                }
                haveLists = 1;
          }

          function addWatchLater() {
                var vid = pl[count][0];
                $.ajax({
            type:"POST",
            beforeSend: function (request)
            {
                                request.setRequestHeader("Content-Type", "application/atom+xml");
                request.setRequestHeader("Authorization", "Bearer "+token);
            },
            url: "https://gdata.youtube.com/feeds/api/users/default/watch_later",
            data: "<?xml version=\"1.0\" encoding=\"UTF-8\"?><entry xmlns=\"http://www.w3.org/2005/Atom\" xmlns:yt=\"https://gdata.youtube.com/schemas/2007\"><id>"+vid+"</id><yt:position>1</yt:position></entry>",
            processData: false,
            success: function(msg) {
                alert('foo');
            }
        });

          }


