//Copyright 2019 by Lotus.fm LLC

var camera, scene, raycaster, renderer, parentTransform, sphereInter, activeLink
var mouse = new THREE.Vector2()
var r = 100,
  dot = 0

  var scene = new THREE.Scene()

  var camera = new THREE.PerspectiveCamera(
    27,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  var container = document.getElementById('container')

  containerWidth = window.innerWidth
  containerHeight = window.innerHeight

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  var controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.minDistance = 0
  controls.maxDistance = 100
  controls.maxPolarAngle = Math.PI / 2
  //controls.addEventListener( 'change', () => renderer.render( scene, camera ) );

  var light = new THREE.PointLight(0xffffff)
  light.position.set(-100, 200, 100)
  scene.add(light)

  var play = true;

  var group
  group = new THREE.Group()
  group.position.y = 0
  scene.add(group)

  var link_order_length = 0
  //var linkVisible = true


// sample arrays for testing purposes


  var link_order = [] // list of all link values in the module, with k values assigned to each index position
  var k_values = [] // list of all k values generated for corresponding module chart lines
  var active_links = [] //index values of all active links
  var rock_links = [] //index values of genre links
  var punk_links = [] //index values of genre links
  var pop_links = [] //index values of genre links
  var country_links = [] //index values of genre links
  var folk_links = [] //index values of genre links
  var metal_links = [] //index values of genre links
  var jazz_links = [] //index values of genre links
  var psych_links = [] //index values of genre links
  var hiphop_links = [] //index values of genre links
  var electronica_links = [] //index values of genre links
  var blues_links = [] //index values of genre links
  var funk_links = [] //index values of genre links
  var song_names = [] //list of youtube videos. uses the same index ranking as link_order
  var views = [] //popularity of youtube videas. uses same index ranking as link_order
  var video_titles = []
  var video_thmbs = []
  //var curves = []
  //var pasta = [] // array of active invisibleSpaghetti geometric links objects created
  var xmlhttp = new XMLHttpRequest()

  //These song IDs are periodically queried from the Lotus YouTube genre playlists.  

  var rockgenre = ["uIP0iIxHLY4","E9yTHSyZeKg","VkavEUCwm0M","rddu5TgrTmE","DHXYSbs6Rb0","zClCsQnRj-c","yHNB4m1dfKE","4fr8k6O-Bko","w_otXEVPgOk","q-XpcMTnB-A","bU2WUSEC6PY","rQfs5UTzwFQ","8Ux6UnYOLvk","CyDHTJCIfHQ","AwkDVMr4Kso","0Jpqb5IYlEE","l5JhD4wKsrs","8BhdoriXe9Q","KLgWHoGLDx4","iv0ej8cJScM","kXFGQYGFeFU","LEKxlNbjgmE","KYhsehUH5b0","kYKcf7EWEfc","DElGhE2NhtQ","j0iohXlRXKA","_oQIIAdG8xM","Ys4YGRN8hgY","Duot03grNv8","2bHvzuupe4w","FxdnqfyvIkY","Y6BeTnjUqlo","cwHmeFidLbE","W3m7Uz7hF-s","APrpB-i4d_E","FuFtfhOipNQ","ON6pn6suSzc","BzkHp6EswEM","W05cPXpUHGI","kkcbxjWG9Mc","-DjpNgrocKo","MUfgAbFY4CA","D1vQJFF2TKQ","f-MroGCKDcM","hjg39XRkjVc","E5uAH0vNn2s","rCy1VIy8Hj0","Kc1htX3q-F0","pGOO7EE4Lhw","tRNDB9VqI3Q","qOM107PIxV8","Ti1liRM6cao","V4Yw6A_rlHc","d9MA4rFNf7I","OqeKV2UYq1Q","ksTFj6L0mao","E5H8DwJI0uA","qR9DjdMrpHg","zJXQSBWO5Qc","wcICuFnkxe4","pB08AUiTP3w","vZA_7FtttRY","cgr8e7da52o","MbxRu7fwR24","6r1-HTiwGiY","TpLhrLzSaFQ","HwgNMrs-i80","QJu611UdfxA","pO3_ZG7wJPc","sSCb-a2McRI","yyayVIXwg74","TkIloV7OMAk","xRFTYRXS3aw","1WaMgWUiYg0","wsF4TVHr42A","trZ244Ih_E4","iG8D1Kb7xgQ","EIpzPVAHpVg","WGnqoZx7_QY","n7zyfArxibk","UNUmSwWq-LU","Rh2YmGujtFI","PE1ges9nn6A","K_5lt23PRVs","DCI5XqT-AZs","QAhMakentwA","aUfu-lEflbQ","YbP-Aa3V6bA","t7Pv3eZEy4k","VZu1Z0oeFzo","_S0esU0n6sY","pOYN1p4Rc6o","mfA9K1hj2eg","OLTeVRvPq04","0_GeShK7aaY","U3iWpewLuyA","ull6hOYs5ZY","Palxbwco9pM","MP8Fd0mN50E","5AHz8HeDk3c","skvGTkW-qG4","-dJXBCBZwQg","aCgTgyBBswA","HcB7ZnkMnB8","0deHAT_KOqE"]
  var punkgenre = ["hPsdjlPVaJU","0deHAT_KOqE","YypAGqIBrX0","s_vgHgIKPQs","JOUmxw0DPsg","LesJtYAG8zM","pCgEUBf5y18","4qljGaHJbCs","FNFYq8O7DTY","cr5uFjA4TNI","VTd4JCIqL7U","OFOowKu7WjA","_ZydMszfZlQ","LJbtcit8Byg","Hu0wknFNTOk","rFP4gxn_uME","cQhGxSge7aA","5SeI6r8lI_U","WWWKRqzvxMg","LS7KFVYUQT4","uS1PyjaR8WM","LH7XPoWPz-4","hBF8YGF17rQ","0nt2Yn1M0oU","K0q6EYTGXXQ","8QcTCIsFJ2Q"]
  var popgenre = ["E7fzUGR8ZH4","pnfryoGog0A","Cqp-hL-I90A","YGv-OSvQwKY","IbE4ynQd_qQ","yQYu51hlkLk","w39qx5X_Owg","gK04XhlTLOM","XMUxca7gXv4","iLilpPtY2JU","X9BWRh92ifs","srwAMHbHVAE","yntvBrlZNeA","_P63qccOdzs","7hneF9Iu71g","Cg4c0RA2DJQ","uA4RNW3HkcQ","WJi9MXfl3zA","c-kLsqvD6q8","3MfJ9qMXBVQ","fPEoI43MMhs","3jWQzkoPFTg","c8H7Anvad6E","KqXN_5G_kuo","rVqIhE53D_w","9x6Mxs5DyxI","weW-VnINl-E","bS22uZHDr54","gahV15Oe9Xs","Bm1g5Yg0hUw","OCVgWq9B_HE","GiZHmwzNAqE","vtS54c9sP0U"]
  var countrygenre = ["_86LQH-c1d8","ENODBnQ5ed0","z0lHW09eQRA","SBA_vLLrXr0","c4cBdT5WCoE","nKJeB03TrJg"]
  var folkgenre = ["iPAr7kL-mmg","SBOK9CBjCK8","-Rfqo7OSimw","uJMn4WGaIOc","CmBgxP56R1I","Mub2i2BoHpM","ZyvYIYwLzTw","-ITl4-Kyey0","2wnDyOHPxrE","i94eFYHHAOY","au-mBoepJUA","6RzlgEyS-BE","6P8mfvCGKyg","4K8ou0iA_68","qMol4iSzXis","pfjyV0qtNlk","ba_SMlx-gi0","TN9upnrVwog","p1nmsaPh31E","V0HIfZmn3oU","5xFP4ikGCLk"]
  var metalgenre = ["Ed_16Cblg9s","xuXln0HC-Lg","xxi6VQkCJPY","slua80kJ8zA","s5Eyu9-kchQ","RFmIOaRhOnE","sk4aZSLSkMs","iZtFjqZxBxw","4n8vZyzBWNs","BL8AJFQv9V4","bbt3qhOiH3M","9NrC7pRra9o","nptjor9ee_Q","r6i5PCn7_oY"]
  var jazzgenre = ["6Y_B3wdQLgg","ZEhWfrVOWlE","Ra616vyPBp8","tG2F72T-ixY","t50c2AiAkpw"]
  var psychgenre = ["3zDO7P_P3Aw","A4uAL0T_CUI","KiHrn43djYc","9_N4gVkx9_w","YZJ2rOm-PVA","x9_1ia_nB_E","SVi7fXWKqSk","KR6DysiE9Sk","--w4Ui8Alzc","M1hSddzlxL4","q93hgeROqvk"]
  var hiphopgenre = ["Bi4K58Fd_1o","xL94jLzIGt0","zDoDWbB6RN8","71u8cSuyZrI","W8CrBGhfSiA","njHZdD0MGDs","bqogMblcal0","H_6GtBFCTyQ","RSfii8RLmNM","t1IMifXyJLc","OV2lquaPxSU","AguOdYNF2d4","Z9RsVV-zfgY","QYDXRoHpF0w","mKZBingy2OA","oErErOGaAv0","50ADWH1d3E8","Gv7iV4n7cXM","qepl1N0P-SA","U53SHxO4sbk"]
  var electrogenre = ["MP_2p79Ems4","eg5Emkcjfdo","jt068Vdmfww","6ZowS0dDW1k","yDOi6phVQXM","H7vVXIiisSw","bBMPzOX_VUo","qIhPPceIEV0","f-FOTHUir_4","vAuwQugGdS4","_liZNFe-TDM","2sKF3MHrHEY","XfgAXwaseM8","s9t2QH5zTCQ","iF0IhEpDces","GdK4jqnDNN8","-G1XWvUBXk4","ZGmXbfF8uvM","ms2iYyh6jLI","IgfIh-NBoCw"]
  var bluesgenre = ["-Q53gXuXd5s","uE2R5d6cPYs","AXHi-B2VbU0"]
  var funkgenre = ["DWeB6hWoKyI","SBrMBqFbWok","6u8lUKuaUx8","Pjw-qzT6qBs","yMku_xfki1U","ClVNU2-C3rQ","uL8Dipf5kXc","MJLe_O2J5Xg","599tHbAQVts","8drkE_zLnLk","1jY7kdEIhaA","HmuGq5weoZA","c1UTArVwyZs","U-eK9RcU90s","6SGy0zUCtsk","9IjxNwHkttU","COICJal838M","slqKrANo7Uo","C7r5KziEspU","vxnYp5NyD4k","XTCUjmhWL4Y","Q72ENpHcrDQ"]

// -------------------------------------------- //


init()
function init () {
  container = document.createElement('div')
  document.body.appendChild(container)


  var URL = "https://www.youtube.com/embed/" + "-Rfqo7OSimw" + "?autoplay=1&mute=1"
  window.open(URL, 'iframe_a')
  //document.getElementById("nowplaying").innerHTML = "Now Playing:";  //test placement code


function assignLinks () //this assigns k values to the ranked link ids, so that the highest values occur at the highest chart points for each concentric ring.


  {
  var interval = 20;

  for (var i = 0; i < 8; i++) { //link ids for the innermost petal ring
    k = (i * interval )+ 10;
    link_order.push(k);
  }
  for (var h = 0; h < 9; h++) {
    for (var j = 0; j < 8; j++) {
      k = link_order[j];
      k1 = k - 2 - h;
      k2 = k - (-1) + h;
      link_order.push(k1);
      link_order.push(k2);
    }
  }

  var start = link_order.length;
  var stop= start + 12

  for (var i = 0; i < 12; i++) {  //link ids for the middle petal ring
    k = (i * interval )+ 10;
    k = k + 160;
    link_order.push(k);
  }
  for (var h = 0; h < 9; h++) {
    for (var j = start; j < stop; j++) {
      k = link_order[j];
      k1 = k - 2 - h;
      k2 = k - (-1) + h;
      link_order.push(k1);
      link_order.push(k2);
    }
  }

  /*var link_order_length = link_order.length;
  var stop= link_order_length + 16

  for (var i = 0; i < 16; i++) {          //link ids for the outer petal ring
    k = (i * interval )+ 25;
     k = k + 1300;
    link_order.push([k]);
  }
  for (var h = 0; h < 24; h++) {
    for (var j = link_order_length; j < stop; j++) {
      k = link_order[j];
      k1 = k - 2 - h;
      k2 = k - (-1) + h;
      link_order.push(k1);
      link_order.push(k2);
    }
  }*/


}

assignLinks();


/*console.log(link_order)                   //testing code
var linkstr = link_order.toString();
console.log(linkstr)

var dupes = []
dupes = link_order

var dupestr = dupes.toString();
console.log(dupestr)

dupes.sort();

var dupestr = dupes.toString();
console.log(dupestr)
/*

/*
//This function can be used to sort arrays -- if the data is not already pre-sorted.
function sortLinks() {
  cap_rank = market_cap.sort(function(a, b){return a-b});
}

sortLinks();*/


//Petal Constructor - draws outline of petal
function drawPetal (
    x,
    y,
    z,
    x0,
    y0,
    z0,
    x1,
    y1,
    z1,
    petalheight,
    ctrlpt,
    color_code
  ) {
    var curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x, y, z),
      new THREE.Vector3(x, ctrlpt, z),
      new THREE.Vector3(x0, y0 + petalheight, z0)
    )

    var points = curve.getPoints(50)
    var geometry = new THREE.BufferGeometry().setFromPoints(points)
    var material = new THREE.LineBasicMaterial({ color: color_code })
    var curveObject = new THREE.Line(geometry, material)
    group.add(curveObject)

    var curve2 = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x0, y0 + petalheight, z0),
      new THREE.Vector3(x1, ctrlpt, z1),
      new THREE.Vector3(x1, y1, z1)
    )

    var points = curve2.getPoints(50)
    var geometry = new THREE.BufferGeometry().setFromPoints(points)
    var material = new THREE.LineBasicMaterial({ color: color_code })

    var curveObject = new THREE.Line(geometry, material)
    group.add(curveObject)
  }


  //Chart Position Arc - returns points for top of chart lines
  function chartTop (
    x,
    y,
    z,
    x0,
    y0,
    z0,
    x1,
    y1,
    z1,
    petalheight,
    ctrlpt,
    color_code
  ) {
    var curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x, y, z),
      new THREE.Vector3(x, ctrlpt, z),
      new THREE.Vector3(x0, y0 + petalheight, z0)
    )

    var points1 = curve.getSpacedPoints(25)
    var geometry = new THREE.BufferGeometry().setFromPoints(points1)
    var material = new THREE.LineBasicMaterial({ color: color_code })
    var curveObject = new THREE.Line(geometry, material)
    group.add(curveObject)

    var curve2 = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x0, y0 + petalheight, z0),
      new THREE.Vector3(x1, ctrlpt, z1),
      new THREE.Vector3(x1, y1, z1)
    )

    var points2 = curve2.getSpacedPoints(25)
    var geometry = new THREE.BufferGeometry().setFromPoints(points2)
    var material = new THREE.LineBasicMaterial({ color: color_code })
    var curveObject = new THREE.Line(geometry, material)
    group.add(curveObject)

    var points = points1.concat(points2)
    return points
  }


  
  //Chart Position Arc - returns points for top of chart lines
  function chartTop (
    x,
    y,
    z,
    x0,
    y0,
    z0,
    x1,
    y1,
    z1,
    petalheight,
    ctrlpt,
    color_code
  ) {
    var curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x, y, z),
      new THREE.Vector3(x, ctrlpt, z),
      new THREE.Vector3(x0, y0 + petalheight, z0)
    )

    var points1 = curve.getSpacedPoints(10)
    var geometry = new THREE.BufferGeometry().setFromPoints(points1)
    var material = new THREE.LineBasicMaterial({ color: color_code })
    var curveObject = new THREE.Line(geometry, material)
    //group.add(curveObject)

    var curve2 = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x0, y0 + petalheight, z0),
      new THREE.Vector3(x1, ctrlpt, z1),
      new THREE.Vector3(x1, y1, z1)
    )

    var points2 = curve2.getSpacedPoints(10)
    var geometry = new THREE.BufferGeometry().setFromPoints(points2)
    var material = new THREE.LineBasicMaterial({ color: color_code })
    var curveObject = new THREE.Line(geometry, material)
    //group.add(curveObject)

    var points = points1.concat(points2)
    return points
  }


  //Chart Position - draws chart lines within petal arc
  function chartPosition (x, y, z, x0, y0, z0, petalheight, ctrlpt, color_code) {
    var cPcurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x, y, z),
      new THREE.Vector3(x, ctrlpt, z),
      new THREE.Vector3(x0, y0, z0)
    )

    var points = cPcurve.getPoints(20)
    var geometry = new THREE.BufferGeometry().setFromPoints(points)
    var material = new THREE.LineBasicMaterial({ color: color_code })
    var curveObject = new THREE.Line(geometry, material)
    //curves.push(curveObject);
    group.add(curveObject)
  }


//Invisible Spaghetti - add TubeGeometry objects that sheath chart lines representing active geometric links.
function invisibleSpaghetti (k, x, y, z, x0, y0, z0, petalheight, ctrlpt, color_code, opacity, category) {
    var link_curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x, y, z),
      new THREE.Vector3(x, ctrlpt, z),
      new THREE.Vector3(x0, y0, z0)
    )

    var geometry = new THREE.TubeGeometry(link_curve, 64, 0.004, 8, false)
    var material = new THREE.MeshBasicMaterial({ color: color_code })
    var object = new THREE.Mesh(geometry, material)
    //object.visible = true
    material.transparent = true
    material.opacity = opacity
    object.label = k
    category.add(object)
    category.visible = false
  }

//Draw Petals - draws ring of lotus petals
function drawPetalRing (segmentCount, radius, depth, color_code, chartLines, divisor){
  var geometry = new THREE.Geometry(),
  material = new THREE.LineBasicMaterial({ color: color_code })

  for (var i = 0; i <= segmentCount; i++) {
    var theta = (i / segmentCount) * Math.PI * 2
    var iota = ((i + 0.5) / segmentCount) * Math.PI * 2
    var kappa = ((i + 1) / segmentCount) * Math.PI * 2
    drawPetal(
      Math.cos(theta) * radius,
      0,
      Math.sin(theta) * radius,
      Math.cos(iota) * (radius - depth),
      0,
      Math.sin(iota) * (radius - depth),
      Math.cos(kappa) * radius,
      0,
      Math.sin(kappa) * radius,
      0.5,
      0.45,
      color_code
    )
  }
  group.add(new THREE.Line(geometry, material))


  //Draws Chart Lines 
  var geometry = new THREE.Geometry(),
    material = new THREE.LineBasicMaterial({ color: color_code })

  for (var i = 0; i < chartLines; i++) {
    var k = 0
    var theta = (i / chartLines) * Math.PI * 2
    var iota = ((i + 0.5) / chartLines) * Math.PI * 2
    var kappa = ((i + 1) / chartLines) * Math.PI * 2
    var iota0 = ((i + divisor / 2) / chartLines) * Math.PI * 2
    var kappa0 = ((i + divisor) / chartLines) * Math.PI * 2
    var modulus = i % divisor

    var base_x = Math.cos(theta) * radius
    var base_y = 0
    var base_z = Math.sin(theta) * radius
    var petalheight = 0.5
    var ctrlpt = 0 //ctrl pt for chart lines (within petal)
    var arcpt = 0.45 //ctrl pt for petal arc (outline)

    if (modulus == 0) {

//this resets chart line variables for each new petal drawn

      var chartPoint = chartTop(
        Math.cos(theta) * radius,
        0,
        Math.sin(theta) * radius,
        Math.cos(iota0) * (radius - depth),
        0,
        Math.sin(iota0) * (radius - depth),
        Math.cos(kappa0) * radius,
        base_y,
        Math.sin(kappa0) * radius,
        petalheight,
        arcpt,
        0x00769d
      )

      for (var j = 1; j <= divisor; j++) {
        k = i + j
        k=k-1
        var theta0 = (k / chartLines) * Math.PI * 2
        var base_xk = Math.cos(theta0) * radius
        var base_yk = 0
        var base_zk = Math.sin(theta0) * radius
        if (chartLines==160) {  //this ensures that each k value is unique within the lotus flower
          k=k;
          }
        if (chartLines==240) {
          k=k+160;
          }
        //if (chartLines==800) {
          //k=k+1300;
          //}
        

        chartPosition(
          chartPoint[j].x,
          chartPoint[j].y,
          chartPoint[j].z,
          base_xk,
          base_yk,
          base_zk,
          petalheight,
          ctrlpt,
          color_code
        )


        k_values.push([    //k values each define a unique curve in 3D space. They are not associated with a specific petal ring.
          k,
          chartPoint[j].x,
          chartPoint[j].y,
          chartPoint[j].z,
          base_xk,
          base_yk,
          base_zk,
          petalheight,
          ctrlpt,
        ])
      }
    }


 

    geometry.vertices.push(
      new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius)
    )
  }


  group.add(new THREE.Line(geometry, material));

}



/*var groupElements = [];
var groupElements= group.children;

group.uncache(groupElements);
*/

  

// -------------------------------- // 


drawPetalRing (8, .65, .1, 0x00769d, 160, 20) //center petals

drawPetalRing (12, 1, .1, 0x0289b6, 240, 20)  //middle petals

//drawPetalRing (16, 1, .1,  0x0099cc, 320, 20)  //outer petals

group.position.set( 0, -.17, .75 );
group.rotation.set(0,0,.4);

parentTransform = new THREE.Object3D()
group.add(parentTransform)

//console.log(curves);
//var outlier1 = curves[0];
//outlier1.material.color.setHex( 0xFF0000 );
//console.log (outlier1.id);
//object.label = 287
//parentTransform.add(object);

//var outlier2 = curves[1];
//outlier2.material.color.setHex( 0xFF0000 );
//outlier2.visible = false;
//console.log (outlier2.id);
//parentTransform.add(outlier2);*/


function getData() //processes JSON data and returns arrays for 5 main variables
  {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.addEventListener("load", getActiveLinks);
  xmlhttp.addEventListener("load", addLinks);

  xmlhttp.open("GET", "../youtube_list.php", true);
  xmlhttp.responseType = 'json';
  xmlhttp.send(); 

  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    //console.log('FOO'+this.response);
    //myObj = JSON.parse(this.response);
    //myObj = this.response;
    var entries = this.response;
    //console.log(entries.length);
    if(entries.length > 0) {
    for (var i = 0; i < entries.length; i++) {
    var song = entries[i];
        //var playerUrl = entry.id.$t;
        //var vid = playerUrl.split(':').pop();
        //var song_name = song.id.videoId;
  var song_name = song.id;
  var popularity = song.statistics.viewCount;
  var song_title = song.snippet.title;
  //console.log(song_title);
  //console.log(song_name);
  //console.log(popularity);
  views.push([popularity]);
  song_names.push([song_name]);
  //video_thmbs[video_thmbs.length] = song.snippet.thumbnails.default.url;
  //console.log (video_thmbs)
        //video_titles[video_titles.length] = song.snippet.title;
     }
     }
  }
  } 
}

getData();

function getActiveLinks()  //sorts for a given set of values from the data obtained above
{

    var f = song_names.entries(); 

    for (x of f) {
      var song_value = x[1].toString();
      var song_index = x[0];

            //code to get intro video rank and views to appear -- in the future the opening song will be randomized
      if (song_value == "-Rfqo7OSimw") {

        var l = song_index
        //console.log(l)
        var k = link_order[l];
        showViews(k);
        showRank(k);
      }
      
      
      if (rockgenre.includes(song_value))
      {
        
        rock_links.push(song_index);
      }

      if (punkgenre.includes(song_value)){
        
        punk_links.push(song_index);
      }

      if (popgenre.includes(song_value)){
        
        pop_links.push(song_index);
      }

      if (folkgenre.includes(song_value))
      {
        
        folk_links.push(song_index);
      }

      if (countrygenre.includes(song_value)){
        
        country_links.push(song_index);
      }

      if (metalgenre.includes(song_value)){
        
        metal_links.push(song_index);
      }

      if (psychgenre.includes(song_value))
      {
        
        psych_links.push(song_index);
      }

      if (hiphopgenre.includes(song_value)){
        
        hiphop_links.push(song_index);
      }

      if (jazzgenre.includes(song_value)){
        
        jazz_links.push(song_index);
      }

      if (bluesgenre.includes(song_value))
      {
        
        blues_links.push(song_index);
      }

      if (funkgenre.includes(song_value)){
        
        funk_links.push(song_index);
      }

      if (electrogenre.includes(song_value)){
        
        electronica_links.push(song_index);
      }
    }
}



// generates clickable and color-coded links by category

function addTopSongs() {  // adds links for selected values

topTransform = new THREE.Object3D()
group.add(topTransform) 

for (i = 0; i < 100; i++) {

      var k = link_order[i];
      var color_code = 0x87ceeb;

      invisibleSpaghetti(
        k,
        k_values[k][1],
        k_values[k][2],
        k_values[k][3],
        k_values[k][4],
        k_values[k][5],
        k_values[k][6],
        k_values[k][7],
        k_values[k][8],
        color_code,
        .2,
        topTransform
      )
  }
topTransform.visible = false
}

function addTop8Songs() {  // adds links for selected values

top8Transform = new THREE.Object3D()
group.add(top8Transform) 

for (i = 0; i < 8; i++) {

      var k = link_order[i];
      var color_code = 0x87ceeb;

      invisibleSpaghetti(
        k,
        k_values[k][1],
        k_values[k][2],
        k_values[k][3],
        k_values[k][4],
        k_values[k][5],
        k_values[k][6],
        k_values[k][7],
        k_values[k][8],
        color_code,
        .2,
        top8Transform
      )
  }
top8Transform.visible = true
}

function addTopEmergingSongs() {  // adds links for selected values

topETransform = new THREE.Object3D()
group.add(topETransform) 

for (i = 152; i < 164; i++) {

      var k = link_order[i];
      var color_code = 0x87ceeb;

      invisibleSpaghetti(
        k,
        k_values[k][1],
        k_values[k][2],
        k_values[k][3],
        k_values[k][4],
        k_values[k][5],
        k_values[k][6],
        k_values[k][7],
        k_values[k][8],
        color_code,
        .3,
        topETransform
      )
  }
topETransform.visible = true
}

addTopSongs()
addTop8Songs()
addTopEmergingSongs()

function addLinks() {  // adds links for selected values

console.log (song_names.length) // current actual number of songs being ranked

for (i = 0; i < song_names.length; i++) {

      var k = link_order[i];
      var color_code = 0xffffff;

      invisibleSpaghetti(
        k,
        k_values[k][1],
        k_values[k][2],
        k_values[k][3],
        k_values[k][4],
        k_values[k][5],
        k_values[k][6],
        k_values[k][7],
        k_values[k][8],
        color_code,
        0,
        parentTransform
      )
  }

//rockTransform = new THREE.Object3D()
//group.add(rockTransform) 

addrockLinks()

addpunkLinks()

addpopLinks()

addcountryLinks()

addfolkLinks()

addmetalLinks()

addjazzLinks()

addpsychLinks()

addhiphopLinks()

addelectronicaLinks()

addbluesLinks()

addfunkLinks()

}


function addrockLinks() {  //adds links for selected values

rockTransform = new THREE.Object3D()
group.add(rockTransform) 

for (i = 0; i < link_order.length; i++) {

    if (rock_links.includes(i)) {

      var k = link_order[i];
      var color_code = 0xe45e9d;

       invisibleSpaghetti(
        k,
        k_values[k][1],
        k_values[k][2],
        k_values[k][3],
        k_values[k][4],
        k_values[k][5],
        k_values[k][6],
        k_values[k][7],
        k_values[k][8],
        color_code,
        .4,
        rockTransform
      )
    }
  }
rockTransform.visible=true
}


function addpunkLinks() {  //adds links for selected values

punkTransform = new THREE.Object3D()
group.add(punkTransform) 

for (i = 0; i < link_order.length; i++) {

    if (punk_links.includes(i)) {

      var k = link_order[i];
      var color_code = 0x8BFA05;

       invisibleSpaghetti(
        k,
        k_values[k][1],
        k_values[k][2],
        k_values[k][3],
        k_values[k][4],
        k_values[k][5],
        k_values[k][6],
        k_values[k][7],
        k_values[k][8],
        color_code,
        .2,
        punkTransform
      )
    }
  }
}


function addpopLinks() {  //adds links for selected values

popTransform = new THREE.Object3D()
group.add(popTransform) 

for (i = 0; i < link_order.length; i++) {

    if (pop_links.includes(i)) {

      var k = link_order[i];
      var color_code = 0xffffff;

       invisibleSpaghetti(
        k,
        k_values[k][1],
        k_values[k][2],
        k_values[k][3],
        k_values[k][4],
        k_values[k][5],
        k_values[k][6],
        k_values[k][7],
        k_values[k][8],
        color_code,
        .2,
        popTransform
      )
    }
  }
}


function addcountryLinks() {  //adds links for selected values

countryTransform = new THREE.Object3D()
group.add(countryTransform) 

for (i = 0; i < link_order.length; i++) {

    if (country_links.includes(i)) {

      var k = link_order[i];
      var color_code = 0xFF5733;

       invisibleSpaghetti(
        k,
        k_values[k][1],
        k_values[k][2],
        k_values[k][3],
        k_values[k][4],
        k_values[k][5],
        k_values[k][6],
        k_values[k][7],
        k_values[k][8],
        color_code,
        .5,
        countryTransform
      )
    }
  }
}


function addfolkLinks() {  //adds links for selected values

folkTransform = new THREE.Object3D()
group.add(folkTransform) 

for (i = 0; i < link_order.length; i++) {

    if (folk_links.includes(i)) {

      var k = link_order[i];
      var color_code = 0xffca85;

       invisibleSpaghetti(
        k,
        k_values[k][1],
        k_values[k][2],
        k_values[k][3],
        k_values[k][4],
        k_values[k][5],
        k_values[k][6],
        k_values[k][7],
        k_values[k][8],
        color_code,
        .3,
        folkTransform
      )
    }
  }
folkTransform.visible=true
}


function addmetalLinks() {  //adds links for selected values

metalTransform = new THREE.Object3D()
group.add(metalTransform) 

for (i = 0; i < link_order.length; i++) {

    if (metal_links.includes(i)) {

      var k = link_order[i];
      var color_code = 0xFF0000;

       invisibleSpaghetti(
        k,
        k_values[k][1],
        k_values[k][2],
        k_values[k][3],
        k_values[k][4],
        k_values[k][5],
        k_values[k][6],
        k_values[k][7],
        k_values[k][8],
        color_code,
        .4,
        metalTransform
      )
    }
  }
}


function addpsychLinks() {  //adds links for selected values

psychTransform = new THREE.Object3D()
group.add(psychTransform) 

for (i = 0; i < link_order.length; i++) {

    if (psych_links.includes(i)) {

      var k = link_order[i];
      var color_code = 0xFC24E8;

       invisibleSpaghetti(
        k,
        k_values[k][1],
        k_values[k][2],
        k_values[k][3],
        k_values[k][4],
        k_values[k][5],
        k_values[k][6],
        k_values[k][7],
        k_values[k][8],
        color_code,
        .3,
        psychTransform
      )
    }
  }
}


function addjazzLinks() {  //adds links for selected values

jazzTransform = new THREE.Object3D()
group.add(jazzTransform) 

for (i = 0; i < link_order.length; i++) {

    if (jazz_links.includes(i)) {

      var k = link_order[i];
      var color_code = 0x019028;

       invisibleSpaghetti(
        k,
        k_values[k][1],
        k_values[k][2],
        k_values[k][3],
        k_values[k][4],
        k_values[k][5],
        k_values[k][6],
        k_values[k][7],
        k_values[k][8],
        color_code,
        .6,
        jazzTransform
      )
    }
  }
}


function addhiphopLinks() {  //adds links for selected values

hiphopTransform = new THREE.Object3D()
group.add(hiphopTransform) 

for (i = 0; i < link_order.length; i++) {

    if (hiphop_links.includes(i)) {

      var k = link_order[i];
      var color_code = 0xFCF51B;

       invisibleSpaghetti(
        k,
        k_values[k][1],
        k_values[k][2],
        k_values[k][3],
        k_values[k][4],
        k_values[k][5],
        k_values[k][6],
        k_values[k][7],
        k_values[k][8],
        color_code,
        .2,
        hiphopTransform
      )
    }
  }
}


function addelectronicaLinks() {  //adds links for selected values

electronicaTransform = new THREE.Object3D()
group.add(electronicaTransform) 

for (i = 0; i < link_order.length; i++) {

    if (electronica_links.includes(i)) {

      var k = link_order[i];
      var color_code = 0x24FCD8;

       invisibleSpaghetti(
        k,
        k_values[k][1],
        k_values[k][2],
        k_values[k][3],
        k_values[k][4],
        k_values[k][5],
        k_values[k][6],
        k_values[k][7],
        k_values[k][8],
        color_code,
        .2,
        electronicaTransform
      )
    }
  }
}


function addfunkLinks() {  //adds links for selected values

funkTransform = new THREE.Object3D()
group.add(funkTransform) 

for (i = 0; i < link_order.length; i++) {

    if (funk_links.includes(i)) {

      var k = link_order[i];
      var color_code = 0xA002DC;

       invisibleSpaghetti(
        k,
        k_values[k][1],
        k_values[k][2],
        k_values[k][3],
        k_values[k][4],
        k_values[k][5],
        k_values[k][6],
        k_values[k][7],
        k_values[k][8],
        color_code,
        .4,
        funkTransform
      )
    }
  }
}


function addbluesLinks() {  //adds links for selected values

bluesTransform = new THREE.Object3D()
group.add(bluesTransform) 

for (i = 0; i < link_order.length; i++) {

    if (blues_links.includes(i)) {

      var k = link_order[i];
      var color_code = 0x005CFE;

       invisibleSpaghetti(
        k,
        k_values[k][1],
        k_values[k][2],
        k_values[k][3],
        k_values[k][4],
        k_values[k][5],
        k_values[k][6],
        k_values[k][7],
        k_values[k][8],
        color_code,
        .6,
        bluesTransform
      )
    }
  }
}


  // --- indicator code

function showViews(k) {
  l = link_order.indexOf(k) 
  var songViews= views[l];
  document.getElementById("views").innerHTML = "Views<br>" + songViews;  //test placement code
}

function showRank(k) {
  l = link_order.indexOf(k) 
  document.getElementById("rank").innerHTML = "Rank<br>" + (l+1);  //test placement code
}

function showPointer() {
  document.body.style.cursor = "pointer";
}


/*function toggleLinks(addLinkfunction, removeLinkfunction) {

  if (linkobject.visible == true) {
    group.remove(linkobject);
  }
  else 
  linkfunction()

}
*/


// old code
function toggleLinks(linkobject) {

  //group.remove(linkobject)

  if (linkobject.visible == true) {
    linkobject.visible = false;
  }
  else 
    linkobject.visible = true;
}
//


  // --- raycaster code


  var geometry = new THREE.SphereBufferGeometry(0.01)
  var material = new THREE.MeshBasicMaterial({ color: 0x45a7c5 })

  activeLink = new THREE.Object3D()
  group.add(activeLink)

  raycaster = new THREE.Raycaster()

  document.addEventListener('mousemove', onDocumentMouseMove, false)
  window.addEventListener('click', onMouseClick, false)
  window.addEventListener('resize', onWindowResize, false)

  
  // BUTTONS

  document.getElementById( "rock" ).addEventListener( 'click', function () {
          //toggleLinks(addrockLinks, rockTransform);
          toggleLinks(rockTransform);
        }, false );
  
  document.getElementById( "punk" ).addEventListener( 'click', function () {
          toggleLinks(punkTransform);
        }, false );
  
  document.getElementById( "pop" ).addEventListener( 'click', function () {
          toggleLinks(popTransform);
        }, false );

  document.getElementById( "folk" ).addEventListener( 'click', function () {
          toggleLinks(folkTransform);
        }, false );
  
  document.getElementById( "hiphop" ).addEventListener( 'click', function () {
          toggleLinks(hiphopTransform);
        }, false );
  
  document.getElementById( "country" ).addEventListener( 'click', function () {
          toggleLinks(countryTransform);
        }, false );

  document.getElementById( "electronica" ).addEventListener( 'click', function () {
          toggleLinks(electronicaTransform);
        }, false );
  
  document.getElementById( "metal" ).addEventListener( 'click', function () {
          toggleLinks(metalTransform);
        }, false );
  
  document.getElementById( "psych" ).addEventListener( 'click', function () {
          toggleLinks(psychTransform);
        }, false );

  document.getElementById( "jazz" ).addEventListener( 'click', function () {
          toggleLinks(jazzTransform);
        }, false );
  
  document.getElementById( "funk" ).addEventListener( 'click', function () {
          toggleLinks(funkTransform);
        }, false );
  
  document.getElementById( "blues" ).addEventListener( 'click', function () {
          toggleLinks(bluesTransform);
        }, false );

  /*document.getElementById( "top100" ).addEventListener( 'click', function () {
          toggleLinks(topTransform);
        }, false );*/


  
  function onDocumentMouseMove (event) {
    event.preventDefault()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    var intersects = raycaster.intersectObjects(parentTransform.children, true)
    if (intersects.length > 0) {
      group.remove(activeLink)
      activeLink = new THREE.Object3D()
      group.add(activeLink)
      for (var i = 0; i < intersects.length; i++) 
      {
          var intersection = intersects[i],
          obj = intersection.object
          k = obj.label
          var color_code = 0xCC2D6F; 
          invisibleSpaghetti (
            k,
            k_values[k][1],
            k_values[k][2],
            k_values[k][3],
            k_values[k][4],
            k_values[k][5],
            k_values[k][6],
            k_values[k][7],
            k_values[k][8],
            color_code,
            .8,
            activeLink
      )
          activeLink.visible = true;
          showViews(k);
          showRank(k);
          showPointer();
      }      
    } 
    else {
      //activeLink.visible = false;
      group.remove(activeLink)
      document.body.style.cursor = "default";
    }
  }


  function onMouseClick (event) {
    event.preventDefault()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    var intersects = raycaster.intersectObjects(parentTransform.children, true)
    for (var i = 0; i < intersects.length; i++) {
      var intersection = intersects[i],
      obj = intersection.object
      k = obj.label
      l = link_order.indexOf(k)   //connects the k value -- position on lotus petal graph -- to ID for link value
      var URL = "https://www.youtube.com/embed/" + song_names[l] + "?autoplay=1&mute=0"
      window.open(URL, 'iframe_a')
    }
  }


  function onWindowResize () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  //animate and render

  camera.position.z = 3.75  //this value was originally 3.75, and can be tweaked as needed

  function animate () {

    if (play) {

    requestAnimationFrame(animate)
    render()
    group.rotation.x += 0.0001
    group.rotation.y += 0.0002
    }

    else {

    requestAnimationFrame(animate)
    render()
    }
  }

  animate()

  function render () {
    dot += 0
    renderer.setClearColor(0x0F426A, 1)
    renderer.render(scene, camera)
  }
}

/*/  ---- reference code ----- //  

var blah = {
  'myFunction': function () 
  {
  }
}
blah['myFunction']()
blah.myFunction()


//document.write(k + " " + links[k] + ", ");

Site Colors:  
#656565  - medium grey
#87ceeb - cerulean
#CC2D6F - hot pink

//  ---- reference code ----- /*/  