<?php

// YouTube API keys
$apikey = 'AIzaSyDCAot4lETPRwRlYRwGWUVfrDMagOyOqGU';
// $apikey = 'AIzaSyDvNg5enf6G6R88pALlXRbsLUOzTv92tN4';
//$apikey = 'AIzaSyDFd_rOk2q-kC_deCS7ROs7eSTRsETLgDo';
//$apikey = 'AIzaSyBu-EdogFJe60KxbM14MaAQwc8dfN2c9Cw';
//$apikey = 'AIzaSyDfoZgGnbD6JeoBF_6PVxn8R5kmJjd9S1M';


function getAPI($u) {
    $headers = [ 'Accepts: application/json' ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $u);          // url passed into function
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_VERBOSE, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);     // set the headers
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);         // ask for raw response instead of bool
    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
}


$genre = "rockgenre";
$playlistId = array();
$playlistId = ['PLEuUPYukC_M5osNiNN4y62zGvkjDkL9ep','PLEuUPYukC_M4WeZutOSk12nwgNHMXl8LK']; 


// YouTube v3 API playlistItems call - 

$items = array();

//for( $i=0; $i<=1;$i++) {

$url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url .= '&playlistId='.$playlistId[0];
$url .= '&order=viewCount&maxResults=50';
$url .= '&key='.$apikey;

$results.= getAPI($url);
$json_results = array();
$json_results[] = json_decode($results,true); // decode API JSON to PHP array
$items_b = array(); 
$items_b = $json_results[0]["items"];  // save playlist items to items array

foreach($json_results[0]["items"] as $key => $item) {
    $items_b[$key]["kind"] = $genre; // update "kind" value to reflect playlist genre
}

$items = array_merge($items,$items_b);

//print_r($items[0]);

//

// YouTube v3 API playlistItems call - 


// Just copying the code for each playlist entry doesn't work either.

/*$url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url .= '&playlistId='.$playlistId[1];
$url .= '&order=viewCount&maxResults=50';
$url .= '&key='.$apikey;

$results.= getAPI($url);
$json_results = array();
$json_results[] = json_decode($results,true); // decode API JSON to PHP array
$items_c = array(); 
$items_c = $json_results[0]["items"];  // save playlist items to items array

foreach($json_results[0]["items"] as $key => $item) {
    $items_c[$key]["kind"] = $genre; // update "kind" value to reflect playlist genre
}

$items = array_merge($items,$items_c);*/

//}

foreach($items as $item) {
         //$item["snippet"]["resourceId"]["kind"] = $genre;
         //$kind .= $item["snippet"] ["resourceId"]["kind"] .',';
         $vid_ids .= $item["snippet"]["resourceId"]["videoId"].','; // get string of videoIds 
}


//print_r($items[0]);

//echo '<br><br>';



$vid_ids = rtrim($vid_ids, ','); // remove final comma
//echo($vid_ids);

// YouYube v3 statistics call
$url2 = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=".$vid_ids;    
$url2 .= "&key=".$apikey;

$results2 = getAPI($url2);
$json_results2 = array();
$json_results2[] = json_decode($results2,true);


foreach($json_results2[0]["items"] as $key => $item) {
    $items[$key]["statistics"] = $item["statistics"]; // attach statistics to main playlist JSON
}

//print_r($json_results2[0]["items"][0]);

$nextPage = $json_results[0]["nextPageToken"]; 

// Loop through nextPage queries for 50 items
for( $i=0; $i<=5;$i++) {
    if($nextPage != '') {
        $urlnext = $url."&pageToken=".$nextPage; // create URL with nextpageToken
        $results_next = getAPI($urlnext); // get nextPage results
    $json_results_next[] = json_decode($results_next,true);
    $items_next = array();
    $items_next = $json_results_next[$i]["items"];

    $j = $i + 1;  // counter for nextPage results array index

    $vid_ids = '';  
    foreach($items_next as $item) {
           $vid_ids .= $item["snippet"]["resourceId"]["videoId"].','; // get string of videoIds   
    }

    $vid_ids = rtrim($vid_ids, ','); // remove final comma  

    $url2 = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=".$vid_ids;
    $url2 .= "&key=".$apikey;

    $results_next2 = getAPI($url2);
    $json_results_next2 = array();
    $json_results_next2[] = json_decode($results_next2,true);
    //print_r($json_results2);

    foreach($json_results_next2[0]["items"] as $key => $item) {
            $items_next[$key]["statistics"] = $item["statistics"]; // attach statistics to main playlist JSON
            $items_next[$key]["kind"] = $items[$key]["kind"]; // update "kind" value to reflect playlist genre
    }
    //print_r($json_results_next[$i]["items"]); 
    $items =  array_merge($items,$items_next);
    $nextPage = $json_results_next[$i]["nextPageToken"];
    }
}

    //$items =  array_merge($items,$pitems);


usort($items, function($a, $b) { //Sort the array using a user defined function
    return $a["statistics"]["viewCount"] > $b["statistics"]["viewCount"] ? -1 : 1; //Compare the scores
});

$json_return = json_encode($items);  // encode PHP array as JSON

//print_r($items);
//print_r($json_results[0]);

print_r($json_return);



?>