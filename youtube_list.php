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


// YouTube v3 API playlistItems call 

//for( $i=0; $i<=1;$i++) {

//echo ($vid_ids);


// YouYube v3 statistics call
$url = "https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=OqeKV2UYq1Q,ksTFj6L0mao,E5H8DwJI0uA,qR9DjdMrpHg,zJXQSBWO5Qc,wcICuFnkxe4,pB08AUiTP3w,vZA_7FtttRY,cgr8e7da52o,MbxRu7fwR24,6r1-HTiwGiY,TpLhrLzSaFQ,HwgNMrs-i80,QJu611UdfxA,pO3_ZG7wJPc,sSCb-a2McRI,yyayVIXwg74,TkIloV7OMAk,xRFTYRXS3aw,1WaMgWUiYg0,wsF4TVHr42A,trZ244Ih_E4,iG8D1Kb7xgQ,EIpzPVAHpVg,WGnqoZx7_QY,n7zyfArxibk,UNUmSwWq-LU,Rh2YmGujtFI,PE1ges9nn6A,K_5lt23PRVs,DCI5XqT-AZs,QAhMakentwA,aUfu-lEflbQ,YbP-Aa3V6bA,t7Pv3eZEy4k,VZu1Z0oeFzo,_S0esU0n6sY,pOYN1p4Rc6o,mfA9K1hj2eg,OLTeVRvPq04,0_GeShK7aaY,U3iWpewLuyA,ull6hOYs5ZY,Palxbwco9pM,MP8Fd0mN50E,5AHz8HeDk3c,skvGTkW-qG4,-dJXBCBZwQg,aCgTgyBBswA,HcB7ZnkMnB8";    
$url .= "&key=".$apikey;

$results = getAPI($url);
$json_results = array();
$json_results[] = json_decode($results,true); // decode API JSON to PHP array
$items = array(); 
$items = $json_results[0]["items"];  // save playlist items to items array

// YouYube v3 statistics call
$url1 = "https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=uIP0iIxHLY4,E9yTHSyZeKg,VkavEUCwm0M,rddu5TgrTmE,OqeKV2UYq1Q,ksTFj6L0mao,E5H8DwJI0uA,qR9DjdMrpHg,zJXQSBWO5Qc,wcICuFnkxe4,pB08AUiTP3w,vZA_7FtttRY,cgr8e7da52o,MbxRu7fwR24,6r1-HTiwGiY,TpLhrLzSaFQ,HwgNMrs-i80,QJu611UdfxA,pO3_ZG7wJPc,sSCb-a2McRI,yyayVIXwg74,TkIloV7OMAk,xRFTYRXS3aw,1WaMgWUiYg0,wsF4TVHr42A,trZ244Ih_E4,iG8D1Kb7xgQ,EIpzPVAHpVg,WGnqoZx7_QY,n7zyfArxibk,UNUmSwWq-LU,Rh2YmGujtFI,PE1ges9nn6A,K_5lt23PRVs,DCI5XqT-AZs,QAhMakentwA,aUfu-lEflbQ,YbP-Aa3V6bA,t7Pv3eZEy4k,VZu1Z0oeFzo,_S0esU0n6sY,pOYN1p4Rc6o,mfA9K1hj2eg,OLTeVRvPq04,0_GeShK7aaY,U3iWpewLuyA,ull6hOYs5ZY,Palxbwco9pM,MP8Fd0mN50E,5AHz8HeDk3c";    
$url1 .= "&key=".$apikey;

$results1 = getAPI($url1);
$json_results1 = array();
$json_results1[] = json_decode($results1,true); // decode API JSON to PHP array
$items_a = array(); 
$items_a = $json_results1[0]["items"];  // save playlist items to items array


$items =  array_merge($items,$items_a);

// YouYube v3 statistics call

$url2 = "https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=skvGTkW-qG4,-dJXBCBZwQg,aCgTgyBBswA,HcB7ZnkMnB8,hPsdjlPVaJU,0deHAT_KOqE,YypAGqIBrX0,s_vgHgIKPQs,JOUmxw0DPsg,LesJtYAG8zM,pCgEUBf5y18,4qljGaHJbCs,FNFYq8O7DTY,cr5uFjA4TNI,VTd4JCIqL7U,OFOowKu7WjA,_ZydMszfZlQ,LJbtcit8Byg,Hu0wknFNTOk,rFP4gxn_uME,cQhGxSge7aA,5SeI6r8lI_U,WWWKRqzvxMg,LS7KFVYUQT4,uS1PyjaR8WM,LH7XPoWPz-4,hBF8YGF17rQ,0nt2Yn1M0oU,K0q6EYTGXXQ,8QcTCIsFJ2Q,";    
$url2 .= "&key=".$apikey;

$results2 = getAPI($url2);
$json_results2 = array();
$json_results2[] = json_decode($results2,true); // decode API JSON to PHP array
$items_b = array(); 
$items_b = $json_results2[0]["items"];  // save playlist items to items array


$items =  array_merge($items,$items_b);

// YouTube v3 API playlistItems call - 

// YouTube v3 API playlistItems call - 


$url3 = "https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=E7fzUGR8ZH4,pnfryoGog0A,Cqp-hL-I90A,YGv-OSvQwKY,IbE4ynQd_qQ,yQYu51hlkLk,w39qx5X_Owg,gK04XhlTLOM,XMUxca7gXv4,iLilpPtY2JU,X9BWRh92ifs,srwAMHbHVAE,yntvBrlZNeA,_P63qccOdzs,7hneF9Iu71g,Cg4c0RA2DJQ,uA4RNW3HkcQ,WJi9MXfl3zA,c-kLsqvD6q8,3MfJ9qMXBVQ,fPEoI43MMhs,3jWQzkoPFTg,c8H7Anvad6E,KqXN_5G_kuo,rVqIhE53D_w,9x6Mxs5DyxI,weW-VnINl-E,bS22uZHDr54,gahV15Oe9Xs,Bm1g5Yg0hUw,OCVgWq9B_HE,GiZHmwzNAqE,vtS54c9sP0U";    
$url3 .= "&key=".$apikey;

$results3.= getAPI($url3);
$json_results3 = array();
$json_results3[] = json_decode($results3,true); // decode API JSON to PHP array
$items_c = array(); 
$items_c = $json_results3[0]["items"];  // save playlist items to items array

$items =  array_merge($items,$items_c);

/*/ YouTube v3 API playlistItems call - 

$url4 = "https://www.googleapis.com/youtube/v3/videos?part=statistics&snippet&id=VZu1Z0oeFzo,_S0esU0n6sY,pOYN1p4Rc6o,mfA9K1hj2eg,OLTeVRvPq04";    
$url4 .= "&key=".$apikey;

$results4.= getAPI($url4);
$json_results4 = array();
$json_results4[] = json_decode($results4,true); // decode API JSON to PHP array
$items_d = array(); 
$items_d = $json_results4[0]["items"];  // save playlist items to items array

$items =  array_merge($items,$items_d);

// YouTube v3 API playlistItems call - 


$url5 = "https://www.googleapis.com/youtube/v3/videos?part=statistics&snippet&id=VZu1Z0oeFzo,_S0esU0n6sY,pOYN1p4Rc6o,mfA9K1hj2eg,OLTeVRvPq04";    
$url5 .= "&key=".$apikey;

$results5.= getAPI($url5);
$json_results5 = array();
$json_results5[] = json_decode($results5,true); // decode API JSON to PHP array
$items_e = array(); 
$items_e = $json_results5[0]["items"];  // save playlist items to items array

$items =  array_merge($items,$items_e);

// YouTube v3 API playlistItems call - 


$url6 = "https://www.googleapis.com/youtube/v3/videos?part=statistics&snippet&id=8Ux6UnYOLvk,CyDHTJCIfHQ,AwkDVMr4Kso,0Jpqb5IYlEE,l5JhD4wKsrs,8BhdoriXe9Q,KLgWHoGLDx4,iv0ej8cJScM,kXFGQYGFeFU,LEKxlNbjgmE,KYhsehUH5b0,kYKcf7EWEfc,DElGhE2NhtQ,j0iohXlRXKA,_oQIIAdG8xM,Ys4YGRN8hgY,Duot03grNv8,2bHvzuupe4w,FxdnqfyvIkY,Y6BeTnjUqlo,cwHmeFidLbE,hPsdjlPVaJU,0deHAT_KOqE,YypAGqIBrX0,s_vgHgIKPQs,JOUmxw0DPsg,LesJtYAG8zM,pCgEUBf5y18,4qljGaHJbCs,FNFYq8O7DTY,cr5uFjA4TNI,VTd4JCIqL7U,OFOowKu7WjA,_ZydMszfZlQ,LJbtcit8Byg,Hu0wknFNTOk,rFP4gxn_uME,cQhGxSge7aA,5SeI6r8lI_U,WWWKRqzvxMg,LS7KFVYUQT4,uS1PyjaR8WM,LH7XPoWPz-4,hBF8YGF17rQ,0nt2Yn1M0oU";    
$url6 .= "&key=".$apikey;

$results6.= getAPI($url6);
$json_results6 = array();
$json_results6[] = json_decode($results6,true); // decode API JSON to PHP array
$items_f = array(); 
$items_f = $json_results6[0]["items"];  // save playlist items to items array

$items =  array_merge($items,$items_f);

// YouTube v3 API playlistItems call - 


$url7 = "https://www.googleapis.com/youtube/v3/videos?part=statistics&snippet&id=8Ux6UnYOLvk,CyDHTJCIfHQ,AwkDVMr4Kso,0Jpqb5IYlEE,l5JhD4wKsrs,8BhdoriXe9Q,KLgWHoGLDx4,iv0ej8cJScM,kXFGQYGFeFU,LEKxlNbjgmE,KYhsehUH5b0,kYKcf7EWEfc,DElGhE2NhtQ,j0iohXlRXKA,_oQIIAdG8xM,Ys4YGRN8hgY,Duot03grNv8,2bHvzuupe4w,FxdnqfyvIkY,Y6BeTnjUqlo,cwHmeFidLbE,hPsdjlPVaJU,0deHAT_KOqE,YypAGqIBrX0,s_vgHgIKPQs,JOUmxw0DPsg,LesJtYAG8zM,pCgEUBf5y18,4qljGaHJbCs,FNFYq8O7DTY,cr5uFjA4TNI,VTd4JCIqL7U,OFOowKu7WjA,_ZydMszfZlQ,LJbtcit8Byg,Hu0wknFNTOk,rFP4gxn_uME,cQhGxSge7aA,5SeI6r8lI_U,WWWKRqzvxMg,LS7KFVYUQT4,uS1PyjaR8WM,LH7XPoWPz-4,hBF8YGF17rQ,0nt2Yn1M0oU";    
$url7 .= "&key=".$apikey;

$results7.= getAPI($url7);
$json_results7 = array();
$json_results7[] = json_decode($results7,true); // decode API JSON to PHP array
$items_g = array(); 
$items_g = $json_results7[0]["items"];  // save playlist items to items array

$items =  array_merge($items,$items_g);


// YouTube v3 API playlistItems call - 


$url8 = "https://www.googleapis.com/youtube/v3/videos?part=statistics&snippet&id=8Ux6UnYOLvk,CyDHTJCIfHQ,AwkDVMr4Kso,0Jpqb5IYlEE,l5JhD4wKsrs,8BhdoriXe9Q,KLgWHoGLDx4,iv0ej8cJScM,kXFGQYGFeFU,LEKxlNbjgmE,KYhsehUH5b0,kYKcf7EWEfc,DElGhE2NhtQ,j0iohXlRXKA,_oQIIAdG8xM,Ys4YGRN8hgY,Duot03grNv8,2bHvzuupe4w,FxdnqfyvIkY,Y6BeTnjUqlo,cwHmeFidLbE,hPsdjlPVaJU,0deHAT_KOqE,YypAGqIBrX0,s_vgHgIKPQs,JOUmxw0DPsg,LesJtYAG8zM,pCgEUBf5y18,4qljGaHJbCs,FNFYq8O7DTY,cr5uFjA4TNI,VTd4JCIqL7U,OFOowKu7WjA,_ZydMszfZlQ,LJbtcit8Byg,Hu0wknFNTOk,rFP4gxn_uME,cQhGxSge7aA,5SeI6r8lI_U,WWWKRqzvxMg,LS7KFVYUQT4,uS1PyjaR8WM,LH7XPoWPz-4,hBF8YGF17rQ,0nt2Yn1M0oU";    
$url8 .= "&key=".$apikey;

$results8.= getAPI($url8);
$json_results8 = array();
$json_results8[] = json_decode($results8,true); // decode API JSON to PHP array
$items_h = array(); 
$items_h = $json_results8[0]["items"];  // save playlist items to items array

$items =  array_merge($items,$items_h);

// YouTube v3 API playlistItems call - 


$url9 = "https://www.googleapis.com/youtube/v3/videos?part=statistics&snippet&id=8Ux6UnYOLvk";    
$url9 .= "&key=".$apikey;

$results9.= getAPI($url9);
$json_results9 = array();
$json_results9[] = json_decode($results9,true); // decode API JSON to PHP array
$items_i = array(); 
$items_i = $json_results9[0]["items"];  // save playlist items to items array

$items =  array_merge($items,$items_i);

// YouTube v3 API playlistItems call - 


$url10 = "https://www.googleapis.com/youtube/v3/videos?part=statistics&snippet&id=8Ux6UnYOLvk";    
$url10 .= "&key=".$apikey;

$results10.= getAPI($url10);
$json_results10 = array();
$json_results10[] = json_decode($results10,true); // decode API JSON to PHP array
$items_j = array(); 
$items_j = $json_results10[0]["items"];  // save playlist items to items array

$items =  array_merge($items,$items_j);

// YouTube v3 API playlistItems call - 


$url11 = "https://www.googleapis.com/youtube/v3/videos?part=statistics&snippet&id=8Ux6UnYOLvk,CyDHTJCIfHQ,AwkDVMr4Kso,0Jpqb5IYlEE,l5JhD4wKsrs,8BhdoriXe9Q,KLgWHoGLDx4,iv0ej8cJScM,kXFGQYGFeFU,LEKxlNbjgmE,KYhsehUH5b0,kYKcf7EWEfc,DElGhE2NhtQ,j0iohXlRXKA,_oQIIAdG8xM,Ys4YGRN8hgY,Duot03grNv8,2bHvzuupe4w,FxdnqfyvIkY,Y6BeTnjUqlo,cwHmeFidLbE,hPsdjlPVaJU,0deHAT_KOqE,YypAGqIBrX0,s_vgHgIKPQs,JOUmxw0DPsg,LesJtYAG8zM,pCgEUBf5y18,4qljGaHJbCs,FNFYq8O7DTY,cr5uFjA4TNI,VTd4JCIqL7U,OFOowKu7WjA,_ZydMszfZlQ,LJbtcit8Byg,Hu0wknFNTOk,rFP4gxn_uME,cQhGxSge7aA,5SeI6r8lI_U,WWWKRqzvxMg,LS7KFVYUQT4,uS1PyjaR8WM,LH7XPoWPz-4,hBF8YGF17rQ,0nt2Yn1M0oU";    
$url11 .= "&key=".$apikey;

$results11.= getAPI($url11);
$json_results11 = array();
$json_results11[] = json_decode($results11,true); // decode API JSON to PHP array
$items_k = array(); 
$items_k = $json_results11[0]["items"];  // save playlist items to items array

$items =  array_merge($items,$items_k);

// YouTube v3 API playlistItems call - 


$url12 = "https://www.googleapis.com/youtube/v3/videos?part=statistics&snippet&id=8Ux6UnYOLvk,CyDHTJCIfHQ,AwkDVMr4Kso,0Jpqb5IYlEE,l5JhD4wKsrs,8BhdoriXe9Q,KLgWHoGLDx4,iv0ej8cJScM,kXFGQYGFeFU,LEKxlNbjgmE,KYhsehUH5b0,kYKcf7EWEfc,DElGhE2NhtQ,j0iohXlRXKA,_oQIIAdG8xM,Ys4YGRN8hgY,Duot03grNv8,2bHvzuupe4w,FxdnqfyvIkY,Y6BeTnjUqlo,cwHmeFidLbE,hPsdjlPVaJU,0deHAT_KOqE,YypAGqIBrX0,s_vgHgIKPQs,JOUmxw0DPsg,LesJtYAG8zM,pCgEUBf5y18,4qljGaHJbCs,FNFYq8O7DTY,cr5uFjA4TNI,VTd4JCIqL7U,OFOowKu7WjA,_ZydMszfZlQ,LJbtcit8Byg,Hu0wknFNTOk,rFP4gxn_uME,cQhGxSge7aA,5SeI6r8lI_U,WWWKRqzvxMg,LS7KFVYUQT4,uS1PyjaR8WM,LH7XPoWPz-4,hBF8YGF17rQ,0nt2Yn1M0oU";    
$url12 .= "&key=".$apikey;

$results12.= getAPI($url12);
$json_results12 = array();
$json_results12[] = json_decode($results12,true); // decode API JSON to PHP array
$items_l = array(); 
$items_l = $json_results12[0]["items"];  // save playlist items to items array

$items =  array_merge($items,$items_l);
/*


//  ------


//print_r($items);

//print_r($json_results2[0]["items"][0]);
*/

usort($items, function($a, $b) { //Sort the array using a user defined function
    return $a["statistics"]["viewCount"] > $b["statistics"]["viewCount"] ? -1 : 1; //Compare the scores
});

$json_return = json_encode($items);  // encode PHP array as JSON


//echo ($vid_ids);

//print_r($json_results[0]);

print_r($json_return);



?>