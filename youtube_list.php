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


$genre = "rock";
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


$genre = "punk";

$url3 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url3 .= '&playlistId='.$playlistId[1];
$url3 .= '&order=viewCount&maxResults=50';
$url3 .= '&key='.$apikey;

$results3.= getAPI($url3);
$json_results3 = array();
$json_results3[] = json_decode($results3,true); // decode API JSON to PHP array
$items_c = array(); 
$items_c = $json_results3[0]["items"];  // save playlist items to items array

foreach($json_results3[0]["items"] as $key3 => $item3) {
    $items_c[$key3]["kind"] = $genre; // update "kind" value to reflect playlist genre
}

$items = array_merge($items,$items_c);

//}

foreach($items as $item) {
         //$item["snippet"]["resourceId"]["kind"] = $genre;
         //$kind .= $item["snippet"] ["resourceId"]["kind"] .',';
         $vid_ids .= $item["snippet"]["resourceId"]["videoId"].','; // get string of videoIds 
}

//  ------

$genre = "pop";

$url4 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url4 .= '&playlistId='.'PLEuUPYukC_M6b7S5d2DP06fvusTySkEej';
$url4 .= '&order=viewCount&maxResults=50';
$url4 .= '&key='.$apikey;

$results4.= getAPI($url4);
$json_results4 = array();
$json_results4[] = json_decode($results4,true); // decode API JSON to PHP array
$items_d = array(); 
$items_d = $json_results4[0]["items"];  // save playlist items to items array

foreach($json_results4[0]["items"] as $key4 => $item4) {
    $items_d[$key4]["kind"] = $genre; // update "kind" value to reflect playlist genre
}

$items = array_merge($items,$items_d);

//}

foreach($items as $item) {
         //$item["snippet"]["resourceId"]["kind"] = $genre;
         //$kind .= $item["snippet"] ["resourceId"]["kind"] .',';
         $vid_ids .= $item["snippet"]["resourceId"]["videoId"].','; // get string of videoIds 
}

//  ------

$genre = "country";

$url5 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url5 .= '&playlistId='.'PLEuUPYukC_M4BkdDKRlisAV9w9fyM_4Xm';
$url5 .= '&order=viewCount&maxResults=50';
$url5 .= '&key='.$apikey;

$results5.= getAPI($url5);
$json_results5 = array();
$json_results5[] = json_decode($results5,true); // decode API JSON to PHP array
$items_e = array(); 
$items_e = $json_results5[0]["items"];  // save playlist items to items array

foreach($json_results5[0]["items"] as $key5 => $item5) {
    $items_e[$key5]["kind"] = $genre; // update "kind" value to reflect playlist genre
}

$items = array_merge($items,$items_e);

foreach($items as $item) {
         //$item["snippet"]["resourceId"]["kind"] = $genre;
         //$kind .= $item["snippet"] ["resourceId"]["kind"] .',';
         $vid_ids .= $item["snippet"]["resourceId"]["videoId"].','; // get string of videoIds 
}

//  ------

$genre = "funk";

$url6 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url6 .= '&playlistId='.'PLEuUPYukC_M79gw7nE0f0RjghzCsb25i8';
$url6 .= '&order=viewCount&maxResults=50';
$url6 .= '&key='.$apikey;

$results6.= getAPI($url6);
$json_results6 = array();
$json_results6[] = json_decode($results6,true); // decode API JSON to PHP array
$items_f = array(); 
$items_f = $json_results6[0]["items"];  // save playlist items to items array

foreach($json_results6[0]["items"] as $key6 => $item6) {
    $items_f[$key6]["kind"] = $genre; // update "kind" value to reflect playlist genre
}

$items = array_merge($items,$items_f);

foreach($items as $item) {
         //$item["snippet"]["resourceId"]["kind"] = $genre;
         //$kind .= $item["snippet"] ["resourceId"]["kind"] .',';
         $vid_ids .= $item["snippet"]["resourceId"]["videoId"].','; // get string of videoIds 
}

//  ------


$genre = "folk";

$url7 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url7 .= '&playlistId='.'PLEuUPYukC_M45mTtI3P3bQYEiucPifeRM';
$url7 .= '&order=viewCount&maxResults=50';
$url7 .= '&key='.$apikey;

$results7.= getAPI($url7);
$json_results7 = array();
$json_results7[] = json_decode($results7,true); // decode API JSON to PHP array
$items_g = array(); 
$items_g = $json_results7[0]["items"];  // save playlist items to items array

foreach($json_results7[0]["items"] as $key7 => $item7) {
    $items_g[$key7]["kind"] = $genre; // update "kind" value to reflect playlist genre
}

$items = array_merge($items,$items_g);

foreach($items as $item) {
         //$item["snippet"]["resourceId"]["kind"] = $genre;
         //$kind .= $item["snippet"] ["resourceId"]["kind"] .',';
         $vid_ids .= $item["snippet"]["resourceId"]["videoId"].','; // get string of videoIds 
}

//  ------


$genre = "metal";

$url8 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url8 .= '&playlistId='.'PLEuUPYukC_M56ScMWNyCcp7r6C3eOj3Za';
$url8 .= '&order=viewCount&maxResults=50';
$url8 .= '&key='.$apikey;

$results8.= getAPI($url8);
$json_results8 = array();
$json_results8[] = json_decode($results8,true); // decode API JSON to PHP array
$items_h = array(); 
$items_h = $json_results8[0]["items"];  // save playlist items to items array

foreach($json_results8[0]["items"] as $key8 => $item8) {
    $items_h[$key8]["kind"] = $genre; // update "kind" value to reflect playlist genre
}

$items = array_merge($items,$items_h);

foreach($items as $item) {
         //$item["snippet"]["resourceId"]["kind"] = $genre;
         //$kind .= $item["snippet"] ["resourceId"]["kind"] .',';
         $vid_ids .= $item["snippet"]["resourceId"]["videoId"].','; // get string of videoIds 
}

//  ------


$genre = "jazz";

$url9 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url9 .= '&playlistId='.'PLEuUPYukC_M7-BEQT2jnaP-QV6Zar_u5r';
$url9 .= '&order=viewCount&maxResults=50';
$url9 .= '&key='.$apikey;

$results9.= getAPI($url9);
$json_results9 = array();
$json_results9[] = json_decode($results9,true); // decode API JSON to PHP array
$items_i = array(); 
$items_i = $json_results9[0]["items"];  // save playlist items to items array

foreach($json_results9[0]["items"] as $key9 => $item9) {
    $items_i[$key9]["kind"] = $genre; // update "kind" value to reflect playlist genre
}

$items = array_merge($items,$items_i);

foreach($items as $item) {
         //$item["snippet"]["resourceId"]["kind"] = $genre;
         //$kind .= $item["snippet"] ["resourceId"]["kind"] .',';
         $vid_ids .= $item["snippet"]["resourceId"]["videoId"].','; // get string of videoIds 
}

//  ------

$genre = "psych";

$url10 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url10 .= '&playlistId='.'PLEuUPYukC_M7-BEQT2jnaP-QV6Zar_u5r';
$url10 .= '&order=viewCount&maxResults=50';
$url10 .= '&key='.$apikey;

$results10.= getAPI($url10);
$json_results10 = array();
$json_results10[] = json_decode($results10,true); // decode API JSON to PHP array
$items_j = array(); 
$items_j = $json_results10[0]["items"];  // save playlist items to items array

foreach($json_results10[0]["items"] as $key10 => $item10) {
    $items_j[$key10]["kind"] = $genre; // update "kind" value to reflect playlist genre
}

$items = array_merge($items,$items_j);

foreach($items as $item) {
         //$item["snippet"]["resourceId"]["kind"] = $genre;
         //$kind .= $item["snippet"] ["resourceId"]["kind"] .',';
         $vid_ids .= $item["snippet"]["resourceId"]["videoId"].','; // get string of videoIds 
}

//  ------

$genre = "hiphop";

$url11 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url11 .= '&playlistId='.'PLEuUPYukC_M4l67BM76cnsAXofuqIKF-_';
$url11 .= '&order=viewCount&maxResults=50';
$url11 .= '&key='.$apikey;

$results11.= getAPI($url11);
$json_results11 = array();
$json_results11[] = json_decode($results11,true); // decode API JSON to PHP array
$items_k = array(); 
$items_k = $json_results11[0]["items"];  // save playlist items to items array

foreach($json_results11[0]["items"] as $key11 => $item11) {
    $items_k[$key11]["kind"] = $genre; // update "kind" value to reflect playlist genre
}

$items = array_merge($items,$items_k);

foreach($items as $item) {
         //$item["snippet"]["resourceId"]["kind"] = $genre;
         //$kind .= $item["snippet"] ["resourceId"]["kind"] .',';
         $vid_ids .= $item["snippet"]["resourceId"]["videoId"].','; // get string of videoIds 
}

//  ------

$genre = "electronica";

$url12 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url12 .= '&playlistId='.'PLEuUPYukC_M6KVFhuJfFwg7seSlHIYqiZ';
$url12 .= '&order=viewCount&maxResults=50';
$url12 .= '&key='.$apikey;

$results12.= getAPI($url12);
$json_results12 = array();
$json_results12[] = json_decode($results12,true); // decode API JSON to PHP array
$items_l = array(); 
$items_l = $json_results12[0]["items"];  // save playlist items to items array

foreach($json_results12[0]["items"] as $key12 => $item12) {
    $items_l[$key12]["kind"] = $genre; // update "kind" value to reflect playlist genre
}

$items = array_merge($items,$items_l);

foreach($items as $item) {
         //$item["snippet"]["resourceId"]["kind"] = $genre;
         //$kind .= $item["snippet"] ["resourceId"]["kind"] .',';
         $vid_ids .= $item["snippet"]["resourceId"]["videoId"].','; // get string of videoIds 
}

//  ------



$vid_ids = rtrim($vid_ids, ','); // remove final comma
//echo($vid_ids);

// YouYube v3 statistics call
$url2 = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=".$vid_ids;    
$url2 .= "&key=".$apikey;

$results2 = getAPI($url2);
$json_results2 = array();
$json_results2[] = json_decode($results2,true);

//print_r($json_results2[0]);

foreach($json_results2[0]["items"] as $key => $item) {
    $items[$key]["statistics"] = $item["statistics"]; // attach statistics to main playlist JSON
}


//print_r($items);

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

    //print_r($items_next);

    //print_r($json_results_next[$i]["items"]); 
    $items =  array_merge($items,$items_next);
    $nextPage = $json_results_next[$i]["nextPageToken"];
    }
}



usort($items, function($a, $b) { //Sort the array using a user defined function
    return $a["statistics"]["viewCount"] > $b["statistics"]["viewCount"] ? -1 : 1; //Compare the scores
});

$json_return = json_encode($items);  // encode PHP array as JSON


//print_r($json_results[0]);

print_r($json_return);



?>