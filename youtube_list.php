<?php

// YouTube API keys
$apikey = 'AIzaSyDCAot4lETPRwRlYRwGWUVfrDMagOyOqGU';
$apikey2 = 'AIzaSyDvNg5enf6G6R88pALlXRbsLUOzTv92tN4';
$apikey3 = 'AIzaSyDFd_rOk2q-kC_deCS7ROs7eSTRsETLgDo';
$apikey4 = 'AIzaSyBu-EdogFJe60KxbM14MaAQwc8dfN2c9Cw';
$apikey5 = 'AIzaSyDfoZgGnbD6JeoBF_6PVxn8R5kmJjd9S1M';


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
$items = array(); 
$items = $json_results[0]["items"];  // save playlist items to items array

foreach($items as $item) {
         $vid_ids .= $item["snippet"]["resourceId"]["videoId"].','; // get string of videoIds 
}

$vid_ids = rtrim($vid_ids, ','); // remove final comma


// YouYube v3 statistics call
$url2 = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=".$vid_ids;    
$url2 .= "&key=".$apikey;

$results2 = getAPI($url2);
$json_results2 = array();
$json_results2[] = json_decode($results2,true);

foreach($json_results2[0]["items"] as $key => $item) {
    $items[$key]["statistics"] = $item["statistics"]; // attach statistics to main playlist JSON
    $items[$key]["kind"] = $genre; // update "kind" value to reflect playlist genre
}

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

    //print_r($vid_ids);

    //echo '<br><br>';

    $url2 = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=".$vid_ids;
    $url2 .= "&key=".$apikey;

    $results_next2 = getAPI($url2);
    $json_results_next2 = array();
    $json_results_next2[] = json_decode($results_next2,true);

    //print_r($json_results_next2[0]);

    //echo '<br><br>';

    //print_r($json_results_next2[0]["items"]);

    foreach($json_results_next2[0]["items"] as $key => $item) {
            $items_next[$key]["statistics"] = $item["statistics"]; // attach statistics to main playlist JSON
            $items_next[$key]["kind"] = $genre; // update "kind" value to reflect playlist genre
    }

    //print_r($items_next);

    $items =  array_merge($items,$items_next);
    $nextPage = $json_results_next[$i]["nextPageToken"];
    }
}

//end "Loop"

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

$vid_ids = '';  
foreach($items_c as $item) {
         $vid_ids .= $item["snippet"]["resourceId"]["videoId"].','; // get string of videoIds 
}

$vid_ids = rtrim($vid_ids, ','); // remove final comma  

//print_r($vid_ids);

$url32 = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=".$vid_ids;
$url32 .= "&key=".$apikey;

$results_32 = getAPI($url32);
$json_results_32 = array();
$json_results_32[] = json_decode($results_32,true);

//print_r($json_results_32[0]);


foreach($json_results_32[0]["items"] as $key => $item) {
            $items_c[$key]["statistics"] = $item["statistics"]; // attach statistics to main playlist JSON
            $items_c[$key]["kind"] = $genre; // update "kind" value to reflect playlist genre
}

$items =  array_merge($items,$items_c);


//  ------

$genre = "pop";

$url4 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url4 .= '&playlistId='.'PLEuUPYukC_M6b7S5d2DP06fvusTySkEej';
$url4 .= '&order=viewCount&maxResults=50';
$url4 .= '&key='.$apikey2;

$results4.= getAPI($url4);
$json_results4 = array();
$json_results4[] = json_decode($results4,true); // decode API JSON to PHP array
$items_d = array(); 
$items_d = $json_results4[0]["items"];  // save playlist items to items array

$vid_ids = '';  
foreach($items_d as $item) {
         $vid_ids .= $item["snippet"]["resourceId"]["videoId"].','; // get string of videoIds 
}

$vid_ids = rtrim($vid_ids, ','); // remove final comma  

$url4a = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=".$vid_ids;
$url4a.= "&key=".$apikey2;

$results_4a = getAPI($url4a);
$json_results_4a = array();
$json_results_4a[] = json_decode($results_4a,true);


foreach($json_results_4a[0]["items"] as $key => $item) {
            $items_d[$key]["statistics"] = $item["statistics"]; // attach statistics to main playlist JSON
            $items_d[$key]["kind"] = $genre; // update "kind" value to reflect playlist genre
}

$items = array_merge($items,$items_d);


//  ------

$genre = "country";

$url5 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url5 .= '&playlistId='.'PLEuUPYukC_M4BkdDKRlisAV9w9fyM_4Xm';
$url5 .= '&order=viewCount&maxResults=50';
$url5 .= '&key='.$apikey2;

$results5.= getAPI($url5);
$json_results5 = array();
$json_results5[] = json_decode($results5,true); // decode API JSON to PHP array
$items_e = array(); 
$items_e = $json_results5[0]["items"];  // save playlist items to items array

$vid_ids = '';  
foreach($items_e as $item) {
         $vid_ids .= $item["snippet"]["resourceId"]["videoId"].','; // get string of videoIds 
}

$vid_ids = rtrim($vid_ids, ','); // remove final comma  

$url5a = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=".$vid_ids;
$url5a.= "&key=".$apikey2;

$results_5a = getAPI($url5a);
$json_results_5a = array();
$json_results_5a[] = json_decode($results_5a,true);

foreach($json_results_5a[0]["items"] as $key => $item) {
            $items_e[$key]["statistics"] = $item["statistics"]; // attach statistics to main playlist JSON
            $items_e[$key]["kind"] = $genre; // update "kind" value to reflect playlist genre
}

$items = array_merge($items,$items_e);

//  ------

$genre = "funk";

$url6 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url6 .= '&playlistId='.'PLEuUPYukC_M79gw7nE0f0RjghzCsb25i8';
$url6 .= '&order=viewCount&maxResults=50';
$url6 .= '&key='.$apikey3;

$results6.= getAPI($url6);
$json_results6 = array();
$json_results6[] = json_decode($results6,true); // decode API JSON to PHP array
$items_f = array(); 
$items_f = $json_results6[0]["items"];  // save playlist items to items array

$vid_ids = '';  
foreach($items_f as $item) {
         $vid_ids .= $item["snippet"]["resourceId"]["videoId"].','; // get string of videoIds 
}

$vid_ids = rtrim($vid_ids, ','); // remove final comma  

$url6a = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=".$vid_ids;
$url6a.= "&key=".$apikey3;

$results_6a = getAPI($url6a);
$json_results_6a = array();
$json_results_6a[] = json_decode($results_6a,true);

foreach($json_results_6a[0]["items"] as $key => $item) {
            $items_f[$key]["statistics"] = $item["statistics"]; // attach statistics to main playlist JSON
            $items_f[$key]["kind"] = $genre; // update "kind" value to reflect playlist genre
}

$items = array_merge($items,$items_f);


//  ------


$genre = "folk";

$url7 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url7 .= '&playlistId='.'PLEuUPYukC_M45mTtI3P3bQYEiucPifeRM';
$url7 .= '&order=viewCount&maxResults=50';
$url7 .= '&key='.$apikey3;

$results7.= getAPI($url7);
$json_results7 = array();
$json_results7[] = json_decode($results7,true); // decode API JSON to PHP array
$items_g = array(); 
$items_g = $json_results7[0]["items"];  // save playlist items to items array

$vid_ids = '';  
foreach($items_g as $item) {
         $vid_ids .= $item["snippet"]["resourceId"]["videoId"].','; // get string of videoIds 
}

$vid_ids = rtrim($vid_ids, ','); // remove final comma  

$url7a = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=".$vid_ids;
$url7a.= "&key=".$apikey3;

$results_7a = getAPI($url7a);
$json_results_7a = array();
$json_results_7a[] = json_decode($results_7a,true);

foreach($json_results_7a[0]["items"] as $key => $item) {
            $items_g[$key]["statistics"] = $item["statistics"]; // attach statistics to main playlist JSON
            $items_g[$key]["kind"] = $genre; // update "kind" value to reflect playlist genre
}

$items = array_merge($items,$items_g);

//  ------


$genre = "metal";

$url8 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url8 .= '&playlistId='.'PLEuUPYukC_M56ScMWNyCcp7r6C3eOj3Za';
$url8 .= '&order=viewCount&maxResults=50';
$url8 .= '&key='.$apikey4;

$results8.= getAPI($url8);
$json_results8 = array();
$json_results8[] = json_decode($results8,true); // decode API JSON to PHP array
$items_h = array(); 
$items_h = $json_results8[0]["items"];  // save playlist items to items array

$vid_ids = '';  
foreach($items_h as $item) {
         $vid_ids .= $item["snippet"]["resourceId"]["videoId"].','; // get string of videoIds 
}

$vid_ids = rtrim($vid_ids, ','); // remove final comma  

$url8a = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=".$vid_ids;
$url8a.= "&key=".$apikey4;

$results_8a = getAPI($url8a);
$json_results_8a = array();
$json_results_8a[] = json_decode($results_8a,true);

foreach($json_results_8a[0]["items"] as $key => $item) {
            $items_h[$key]["statistics"] = $item["statistics"]; // attach statistics to main playlist JSON
            $items_h[$key]["kind"] = $genre; // update "kind" value to reflect playlist genre
}

$items = array_merge($items,$items_h);

//  ------

$genre = "jazz";

$url9 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url9 .= '&playlistId='.'PLEuUPYukC_M7-BEQT2jnaP-QV6Zar_u5r';
$url9 .= '&order=viewCount&maxResults=50';
$url9 .= '&key='.$apikey4;

$results9.= getAPI($url9);
$json_results9 = array();
$json_results9[] = json_decode($results9,true); // decode API JSON to PHP array
$items_i = array(); 
$items_i = $json_results9[0]["items"];  // save playlist items to items array

$vid_ids = '';  
foreach($items_i as $item) {
         $vid_ids .= $item["snippet"]["resourceId"]["videoId"].','; // get string of videoIds 
}

$vid_ids = rtrim($vid_ids, ','); // remove final comma  

$url9a = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=".$vid_ids;
$url9a.= "&key=".$apikey4;

$results_9a = getAPI($url9a);
$json_results_9a = array();
$json_results_9a[] = json_decode($results_9a,true);

foreach($json_results_9a[0]["items"] as $key => $item) {
            $items_i[$key]["statistics"] = $item["statistics"]; // attach statistics to main playlist JSON
            $items_i[$key]["kind"] = $genre; // update "kind" value to reflect playlist genre
}

$items = array_merge($items,$items_i);

//  ------

$genre = "psych";

$url10 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url10 .= '&playlistId='.'PLEuUPYukC_M7-BEQT2jnaP-QV6Zar_u5r';
$url10 .= '&order=viewCount&maxResults=50';
$url10 .= '&key='.$apikey5;

$results10.= getAPI($url10);
$json_results10 = array();
$json_results10[] = json_decode($results10,true); // decode API JSON to PHP array
$items_j = array(); 
$items_j = $json_results10[0]["items"];  // save playlist items to items array

$vid_ids = '';  
foreach($items_j as $item) {
         $vid_ids .= $item["snippet"]["resourceId"]["videoId"].','; // get string of videoIds 
}

$vid_ids = rtrim($vid_ids, ','); // remove final comma  

$url10a = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=".$vid_ids;
$url10a.= "&key=".$apikey5;

$results_10a = getAPI($url10a);
$json_results_10a = array();
$json_results_10a[] = json_decode($results_10a,true);

foreach($json_results_10a[0]["items"] as $key => $item) {
            $items_j[$key]["statistics"] = $item["statistics"]; // attach statistics to main playlist JSON
            $items_j[$key]["kind"] = $genre; // update "kind" value to reflect playlist genre
}

$items = array_merge($items,$items_j);


//  ------

$genre = "hiphop";

$url11 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url11 .= '&playlistId='.'PLEuUPYukC_M4l67BM76cnsAXofuqIKF-_';
$url11 .= '&order=viewCount&maxResults=50';
$url11 .= '&key='.$apikey5;

$results11.= getAPI($url11);
$json_results11 = array();
$json_results11[] = json_decode($results11,true); // decode API JSON to PHP array
$items_k = array(); 
$items_k = $json_results11[0]["items"];  // save playlist items to items array

$vid_ids = '';  
foreach($items_k as $item) {
         $vid_ids .= $item["snippet"]["resourceId"]["videoId"].','; // get string of videoIds 
}

$vid_ids = rtrim($vid_ids, ','); // remove final comma  

$url11a = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=".$vid_ids;
$url11a.= "&key=".$apikey5;

$results_11a = getAPI($url11a);
$json_results_11a = array();
$json_results_11a[] = json_decode($results_11a,true);

foreach($json_results_11a[0]["items"] as $key => $item) {
            $items_k[$key]["statistics"] = $item["statistics"]; // attach statistics to main playlist JSON
            $items_k[$key]["kind"] = $genre; // update "kind" value to reflect playlist genre
}

$items = array_merge($items,$items_k);

//  ------

$genre = "electronica";

$url12 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url12 .= '&playlistId='.'PLEuUPYukC_M6KVFhuJfFwg7seSlHIYqiZ';
$url12 .= '&order=viewCount&maxResults=50';
$url12 .= '&key='.$apikey5;

$results12.= getAPI($url12);
$json_results12 = array();
$json_results12[] = json_decode($results12,true); // decode API JSON to PHP array
$items_l = array(); 
$items_l = $json_results12[0]["items"];  // save playlist items to items array

$vid_ids = '';  
foreach($items_l as $item) {
         $vid_ids .= $item["snippet"]["resourceId"]["videoId"].','; // get string of videoIds 
}

$vid_ids = rtrim($vid_ids, ','); // remove final comma  

$url12a = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=".$vid_ids;
$url12a.= "&key=".$apikey5;

$results_12a = getAPI($url12a);
$json_results_12a = array();
$json_results_12a[] = json_decode($results_12a,true);

foreach($json_results_12a[0]["items"] as $key => $item) {
            $items_l[$key]["statistics"] = $item["statistics"]; // attach statistics to main playlist JSON
            $items_l[$key]["kind"] = $genre; // update "kind" value to reflect playlist genre
}

$items = array_merge($items,$items_l);


//  ------

$genre = "blues";

$url1 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url1 .= '&playlistId='.'PLEuUPYukC_M6nw3FhBEf8xzdjcxZwCxt_';
$url1 .= '&order=viewCount&maxResults=50';
$url1 .= '&key='.$apikey4;

$results1.= getAPI($url1);
$json_results1 = array();
$json_results1[] = json_decode($results1,true); // decode API JSON to PHP array
$items_a = array(); 
$items_a = $json_results1[0]["items"];  // save playlist items to items array

$vid_ids = '';  
foreach($items_a as $item) {
         $vid_ids .= $item["snippet"]["resourceId"]["videoId"].','; // get string of videoIds 
}

$vid_ids = rtrim($vid_ids, ','); // remove final comma  

$url1a = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=".$vid_ids;
$url1a.= "&key=".$apikey4;

$results_1a = getAPI($url1a);
$json_results_1a = array();
$json_results_1a[] = json_decode($results_1a,true);

foreach($json_results_1a[0]["items"] as $key => $item) {
            $items_a[$key]["statistics"] = $item["statistics"]; // attach statistics to main playlist JSON
            $items_a[$key]["kind"] = $genre; // update "kind" value to reflect playlist genre
}

$items = array_merge($items,$items_a);


//  ------



//print_r($items);

//print_r($json_results2[0]["items"][0]);


usort($items, function($a, $b) { //Sort the array using a user defined function
    return $a["statistics"]["viewCount"] > $b["statistics"]["viewCount"] ? -1 : 1; //Compare the scores
});

$json_return = json_encode($items);  // encode PHP array as JSON


//echo ($vid_ids);

//print_r($json_results[0]);

print_r($json_return);



?>