
// SEARCH CODE 
        var tn = 0;
        var pl = [];  // playlist array passed to player
        var vid_ids = '';
        var vid_data = []; // array of video.list data
        var count = 0;  // current pl[id]
        var srchValue; var srchNum = 0;
        var qn; var numShort; var numMed; var numLong; var tn = 0; 
        var toon = 0; // counter
        var yearCount = 0;
        var srchArray = [];
        var srchString; var srchQ; var srchLen; var srchTrm; var srchIt;
        var srchDuration;
        //var date = new Date();
        //var firstDay = new Date(date.getFullYear(), date.getMonth(), 1); 
        //var firstDate = new Date(date.setDate(date.getDate() - 30))
        var firstDay; 
        //console.log(firstDay);
        var nextPageToken;

        function videoSearch(frm){
            if(isPlaying == 1) { player.pauseVideo(); }
                count = 0; qn = 0; numShort=0; numMed=0; numLong=0; var terms = []; var strSplt = [];
                vid_ids = '';
                var randshuff = Math.floor(Math.random()*123);
                srchValue = document.getElementById("srch").value;
                srchValueY1 = document.getElementById("srchY1").value;
                srchValueY2 = eval(document.getElementById("srchY2").value)+1;
                srchArray = Number.range(srchValueY1, srchValueY2);
                
                if(srchValue !== "") {
                        strSplt = srchValue.split(" ");
                }
                srchNum = document.getElementById("srchnum").value;
                if (srchNum == 25) { srchIt = 1 }
                else if (srchNum == 30) { srchIt = 2 }
                else { srchIt = 3 }

                srchDuration = document.getElementById("duration").value;

                srchPub = document.getElementById("srchpub").value;
        
                if(srchPub != 0) {
                    var date = new Date();              
                    var firstDate = new Date(date.setDate(date.getDate() - srchPub))
                    firstDay = firstDate.toISOString()
                }

                if(toon == 0){ 
                        pl.length = 0; 
                        document.getElementById("vidgallery_full").innerHTML = ""; 
                }
                srchLen = srchArray.length;

 var strLen = strSplt.length;
                if(srchLen > 0) { 
                        srchQ = srchArray[yearCount]; 
                        if(srchValue !== "") { srchQ = srchValue+"+"+srchQ; } 
                        else { srchQ = srchQ; }
                } else { 
                        srchQ = ""; 
                        if(srchValue !== "") { srchQ = srchValue; } 
                }
                
                        var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video";
                        url += "&q="+srchQ+"&videoDuration="+srchDuration;
                        if(document.getElementById("vcbtn").checked == true){
                            url += "&order=date";
                        }  
                        if(srchPub != 0) {      
                            url += "&publishedAfter="+firstDay;
                        }
                        url += '&maxResults=50&paid-content=false&format=5';
                        url += "&fields=nextPageToken,items(id,snippet)";
                        url += "&relevanceLanguage=en";
                        url += "&safeSearch=none&videoEmbeddable=true";
                        url += "&key="+apikey;

                        //console.log(url);

                        $.getJSON(url, addVideos);
            }
        
       
        function addVideos(data) {
                qn ++;
                var feed = data.feed;
                nextPageToken = data.nextPageToken;
                var entries = data.items;
                if(entries.length > 0) {
                        for (var i = 0; i < entries.length; i++) {
                                var entry = entries[i];
                                //console.log(entry);
                                var playerUrl = entry.id.$t;
                                var vid = entry.id.videoId;
                                var video_thmb = entry.snippet.thumbnails.default.url;
                                var video_title = entry.snippet.title;
                                var video_date = entry.snippet.publishedAt;;
                                if (entry.id != 'undefined') {
                                    var obj = {};
                                    obj['vid'] = vid;
                                    obj['video_date'] = video_date;
                                    obj['video_title'] = video_title;
                                    obj['video_thmb'] = video_thmb;
                                    pl.push(obj);
                                   vid_ids += vid+','; 
                                }
                        }
                        if(qn == 1) { numShort = entries.length; }
                        else if(qn == 2) { numMed = entries.length; }
                        else if(qn == 3) { numLong = entries.length; }
                }
                        
                vid_ids = vid_ids.substring(0, vid_ids.length - 1);

                var url = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id="+vid_ids;
                url += "&key="+apikey;



                console.log(url);
                $.getJSON(url,function(data) {
                    //console.log(data);
                   
                    var entries = data.items;
                    if(entries.length > 0) {
                        for (var i = 0; i < entries.length; i++) {
                                var entry = entries[i];
                                //console.log(entry);
                                pl[i].viewCount = entry.statistics.viewCount;
                                pl[i].likeCount = entry.statistics.likeCount;
                                //console.log(pl[i]);

                        }
                    }
        
                });     
        
                console.log(qn);
                console.log(vid_ids);
                testVids();
        }
        function testVids() {
                if(document.getElementById("shuffle").checked){shuffleArray(pl);}
                if(srchNum !== 1) { getMore(srchDuration,srchNum); } else { tn ++; }
                console.log('tn '+tn);
        }



        function getMore(vidDuration,moreNum) {
                var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+srchQ; 
                url += "&type=video&videoDuration="+vidDuration+"&maxResults=50";
                url += "&relevanceLanguage=en&safeSearch=none&videoEmbeddable=true";
                url += "&paid-content=false&format=5";
                if(document.getElementById("vcbtn").checked == true){
                     url += "&order=date";
                }
                if(srchPub != 0) {
                     url += "&publishedAfter="+firstDay;
                } 
                url += "&fields=nextPageToken,items(id,snippet)";
                url += "&key="+apikey;
                if (nextPageToken != 'undefined') {
                        url += '&pageToken='+nextPageToken;
                }

                $.getJSON(url, showMore);
                console.log(pl.length+": "+numShort+"   "+numMed+"   "+numLong);
        }
        

        function showMore(data) {
//console.log('showMore: '+JSON.stringify(data));
                var feed = data.feed;
                vid_ids = '';
                nextPageToken = data.nextPageToken;
                var entries = data.items;
                for (var i = 0; i < entries.length; i++) {
                        var entry = entries[i];
                        var playerUrl = entry.id.$t;
                        var vid = entry.id.videoId;
                        var video_thmb = entry.snippet.thumbnails.default.url;
                        var video_title = entry.snippet.title;
                        var video_date = entry.snippet.publishedAt;     
                        if (entry.id != 'undefined') {
                                    var obj = {};
                                    obj['vid'] = vid;
                                    obj['video_date'] = video_date;
                                    obj['video_title'] = video_title;
                                    obj['video_thmb'] = video_thmb;
                                    pl.push(obj);
                                    vid_ids += vid+','; 
                                }


                }
                vid_ids = vid_ids.substring(0, vid_ids.length - 1);

                var url = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id="+vid_ids;
                url += "&key="+apikey;

                //console.log(url);
                $.getJSON(url,function(data) {
                   
                    var entries = data.items;
                    if(entries.length > 0) {
                        for (var i = 0; i < entries.length; i++) {
                                var entry = entries[i];
                                var vid = entry.id;
                                var index = pl.map((o) => o.vid).indexOf(vid);
                                pl[index].viewCount = entry.statistics.viewCount;
                                pl[index].likeCount = entry.statistics.likeCount;
                        }
                    }
                    testPlay();
                }); 
        }

        function testPlay() {
                if(document.getElementById("shuffle").checked){shuffleArray(pl);}
                console.log('tnshowmore '+tn);
                if(tn <= srchIt) {
                   tn++;
                   testVids();
                } else {
                   playVids();
                }
        }
       
        function playVids() {
                //console.log(pl);
                if (pl.length > 1) {
                        pl = pl.reduce((unique, o) => {
                            if(!unique.some(obj => obj.vid === o.vid)) {
                                unique.push(o);
                            }
                            return unique;
                        },[]);
                console.log(pl);
                        if(document.getElementById("vcbtn").checked == true){
                            pl.sort(function(a, b){
                                var dateA=new Date(a.video_date), dateB=new Date(b.video_date)
                                return dateB-dateA //sort by date descending
                            })
                        }

                        console.log(pl);
                        console.log(pl.length);
                        if(document.getElementById("shuffle").checked){shuffleArray(pl);shuffleArray(pl);shuffleArray(pl);}
                        if(document.getElementById("full").checked == false){
                                pl.length = 72;
                                shuffleArray(pl);shuffleArray(pl);shuffleArray(pl);
                                pl.length = 22;
                        }
                        seek = 0;
                        prevEvent = 0;
                        toon = 0;
                        yearCount = 0;
                        tn = 0;
                        vidPlay();

			                       if(document.getElementById("gridbtn").checked) {
                                $("#vidgallery_full").sortable({
                                        helper : 'clone',
                                        start: function(event, ui) {
                                                startPos = ui.item.index();
                                                console.log(startPos);
                                        },
                                        stop: function(event, ui)  {
                                                stopPos =  ui.item.index();
                                                if(stopPos !== -1) {
                                                        element = pl[startPos];
                                                        console.log(element);
                                                        pl.splice(startPos, 1);
                                                        pl.splice(stopPos, 0, element);
                                                        if(startPos == count){count = stopPos;}
                                                        else if(startPos >=count && stopPos < count) {
                                                                count ++;
                                                        }
                                                        else if(startPos < count && stopPos >= count) {
                                                                count --;
                                                        }
                                                        console.log(stopPos,count);
                                                }
                                        },
                                        over: function () {
                                                removeIntent = false;
                                        },
                                        out: function () {
                                                removeIntent = true;
                                        },
                                                            beforeStop: function (event, ui) {
                                                if(removeIntent == true){
                                                        pl.splice(startPos,1);
                                                        if(startPos < count) { count--;}
                                                        else if(startPos == count){count--;}
                                                        ui.item.remove();
                                                }
                                                console.log("remove"+count);
                                        }
                                });
                                $("#vidgallery_full").disableSelection();
                                for(var i = 0; i < pl.length; i++  ) {
                                    if (pl[count]) {
                                        //console.log(pl);
                                        if(pl[i]) {
                                            document.getElementById("vidgallery_full").innerHTML += '<img id="'+i+'" src="'+pl[i].video_thmb+'" title="'+pl[i].video_title+'" onClick="loadVid(\''+pl[i].vid+'\','+i+');" >';

                                        }
                                    }
                                }
                        }
                } else {
                        alert('No Search Results');
                }
    }


       
        function vidPlay(nav) {
                lv = 0;
                randur = 0;
                document.getElementById("vidinfo").innerHTML =  "";
                if (nav == 0) {
                        count --;
                        if(count < 0) {count = eval(pl.length - 1); }
                        dur = pl[count][3];
                        durmost = dur - (dur / 3);
                        randur = Math.floor(Math.random()*durmost);
                } else if (nav == 1) {
                        count ++;
                        if(count >= pl.length) {count = 0; }
                        dur = pl[count][3];
                        durmost = dur - (dur / 3);
                        randur = Math.floor(Math.random()*durmost);
                } else if (nav == 2) {
                        count ++;
                        if(count >= pl.length) {count = 0; }
                }
                if (pl[count]) {
                        var vId = pl[count].vid;
                }
                console.log(count);
                player.cueVideoById(vId,randur,vidQuality);
        }


      function loadVid(v) {
                document.getElementById("vidinfo").innerHTML = "";
                for(var i = 0; i < pl.length; i++) {
                        if(pl[i].vid === v) {
                                count = i;
                                break;
                        }
                }
                lv = 1;
                player.cueVideoById(v,0,vidQuality);
                console.log(count);
        }

        function clearGrid() {
                pl.length = 0;
                $("#vidgallery_full").empty();
        }




