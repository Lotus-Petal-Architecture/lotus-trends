<?php

// YouTube API keys
$apikey = 'AIzaSyDCAot4lETPRwRlYRwGWUVfrDMagOyOqGU';
// $apikey = 'AIzaSyDvNg5enf6G6R88pALlXRbsLUOzTv92tN4';
//$apikey = 'AIzaSyDFd_rOk2q-kC_deCS7ROs7eSTRsETLgDo';
//$apikey = 'AIzaSyBu-EdogFJe60KxbM14MaAQwc8dfN2c9Cw';
//$apikey = 'AIzaSyDfoZgGnbD6JeoBF_6PVxn8R5kmJjd9S1M';

// YouTube v3 playlist query url
$url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url .= '&playlistId=PLqfg5W4pjsRa4_IsK9iQUD0g9JcQY2fdM';
$url .= '&order=viewCount&maxResults=50';
$url .= '&key='.$apikey;

$headers = [
  'Accepts: application/json'
];


function getAPI($u,$a) {
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

$results.= getAPI($url,$apikey);
$json_results = array();
$json_results[] = json_decode($results,true); // decode API JSON to PHP array 
$items = array();
$items = $json_results[0]["items"];  // save playlist items to items array

// Loop through nextPage queries for 50 items
for( $i=0; $i<=2;$i++) {
    if($json_results[$i]["nextPageToken"]) {
        $urlnext = $url."&pageToken=".$json_results[$i]["nextPageToken"]; // create URL with nextpageToken
        $results2 = getAPI($urlnext,$apikey); // get nextPage results
        $json_results[] = json_decode($results2,true);
        $j = $i + 1;  // counter for nextPage results array index
   
        $items =  array_merge($items,$json_results[$j]["items"]); // append nextPage items to items array

    }
}

$json_return = json_encode($items);  // encode PHP array as JSON
print_r($json_return);
?>