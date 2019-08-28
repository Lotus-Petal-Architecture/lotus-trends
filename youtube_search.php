<?php
// $apikey = 'AIzaSyCSh_E1LSG00mNIcev8ammwnXpEtKYfnZ4';

$apikey = 'AIzaSyABLkiT7dTxc34S4XLktTkHhT7BHaaQNrQ'; 
// $apikey = 'AIzaSyDgoJX7iFY18B94ezuAsgneZB3-nUPz-xc';
// $apikey = 'AIzaSyAZ2BlKOSLtdWvWcOZKQrN2P9YfqZeE4OE';
// $apikey = 'AIzaSyCSh_E1LSG00mNIcev8ammwnXpEtKYfnZ4';

$url = 'https://www.googleapis.com/youtube/v3/search?part=snippet';
//$url .= '&location=45.515459,-122.679346&locationRadius=50mi';
$url .= '&type=video&q=indie+music';
$url .= '&duration=any&order=viewCount&maxResults=50';
$url .= '&paid-content=false&format=5&fields=nextPageToken,items(id,snippet)';
$url .= '&relevanceLanguage=en&safeSearch=none&videoEmbeddable=true';
$url .= '&key='.$apikey;

$headers = [
  'Accepts: application/json'
];


function getAPI($u,$a) {
$ch = curl_init();

curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $u);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_VERBOSE, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);     // set the headers
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);         // ask for raw response instead of bool
    $response = curl_exec($ch);

    curl_close($ch);
    $data = json_decode($response,true);
    $value = json_decode(json_encode($data), true);

    $nextPage = $data["nextPageToken"];

    foreach($data["items"] as $item) {
    	$vid_ids .= $item["id"]["videoId"].',';
    }

    $vid_ids = rtrim($vid_ids, ',');

    $url2 = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=".$vid_ids;
    $url2 .= "&key=".$a;



$ch = curl_init();

curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $url2);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_VERBOSE, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);     // set the headers
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);         // ask for raw response instead of bool
    $response2 = curl_exec($ch);

    curl_close($ch);
    $data2 = json_decode($response2,true);
    $value2 = json_decode(json_encode($data2), true);

    foreach($data2["items"] as $key => $item) { 
	 //   print_r($data["items"][$key]);
	
	$data["items"][$key]["statistics"] = $item["statistics"]; 
    }

    return json_encode($data);
}

$results.= getAPI($url,$apikey);
//print_r($results);
$json_results = array();
$json_results[] = json_decode($results,true);
$items = $json_results[0]["items"];

for( $i=0; $i<=5;$i++) {
//	print_r('foo'.$json_results[$i]["nextPageToken"]);
if($json_results[$i]["nextPageToken"]) {
    $urlnext = $url."&pageToken=".$json_results[$i]["nextPageToken"];
    $results2 = getAPI($urlnext,$apikey);
    $json_results[] = json_decode($results2,true);
    $items = array_merge($items,$json_results[$i]["items"]); 
}
}


$json_return = json_encode($items);
print_r($json_return);


?>
