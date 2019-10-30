var camera, scene, raycaster, renderer, parentTransform, sphereInter
var mouse = new THREE.Vector2()
var r = 100,
  dot = 0

  var scene = new THREE.Scene()

  var camera = new THREE.PerspectiveCamera(
    15,
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


// sample arrays for testing purposes


  var link_order = [] // list of all link values in the module, with k values assigned to each index position
  var k_values = [] // list of all k values generated for corresponding module chart lines
  var active_links = [] //index values of active links
  var active_links2 = [] //index values of active links
  var active_array = [] // placeholder for array values being filtered
  var song_names = [] //list of youtube videos. uses the same index ranking as link_order
  var video_titles = []
  var video_thmbs = []
  var curves = [];
  var xmlhttp = new XMLHttpRequest()

  var rockgenre = ["OqeKV2UYq1Q","ksTFj6L0mao","E5H8DwJI0uA","qR9DjdMrpHg","zJXQSBWO5Qc","wcICuFnkxe4","pB08AUiTP3w","vZA_7FtttRY","cgr8e7da52o","MbxRu7fwR24","6r1-HTiwGiY","TpLhrLzSaFQ","HwgNMrs-i80","QJu611UdfxA","pO3_ZG7wJPc","sSCb-a2McRI","yyayVIXwg74","TkIloV7OMAk","xRFTYRXS3aw","1WaMgWUiYg0","wsF4TVHr42A","trZ244Ih_E4","iG8D1Kb7xgQ","EIpzPVAHpVg","WGnqoZx7_QY","n7zyfArxibk","UNUmSwWq-LU","Rh2YmGujtFI","PE1ges9nn6A","K_5lt23PRVs","DCI5XqT-AZs","QAhMakentwA","aUfu-lEflbQ","YbP-Aa3V6bA","t7Pv3eZEy4k","VZu1Z0oeFzo","_S0esU0n6sY","pOYN1p4Rc6o","mfA9K1hj2eg","OLTeVRvPq04","0_GeShK7aaY","U3iWpewLuyA","ull6hOYs5ZY","Palxbwco9pM","MP8Fd0mN50E","5AHz8HeDk3c","skvGTkW-qG4","-dJXBCBZwQg","aCgTgyBBswA","HcB7ZnkMnB8","DHXYSbs6Rb0","zClCsQnRj-c","yHNB4m1dfKE","4fr8k6O-Bko","w_otXEVPgOk","q-XpcMTnB-A","bU2WUSEC6PY","rQfs5UTzwFQ","8Ux6UnYOLvk","CyDHTJCIfHQ","AwkDVMr4Kso","0Jpqb5IYlEE","l5JhD4wKsrs","8BhdoriXe9Q","KLgWHoGLDx4","iv0ej8cJScM","kXFGQYGFeFU","LEKxlNbjgmE","KYhsehUH5b0","kYKcf7EWEfc","DElGhE2NhtQ","j0iohXlRXKA","_oQIIAdG8xM","Ys4YGRN8hgY","Duot03grNv8","2bHvzuupe4w","FxdnqfyvIkY","Y6BeTnjUqlo","cwHmeFidLbE"];




  


// -------------------------------------------- //


init()
function init () {
  container = document.createElement('div')
  document.body.appendChild(container)


function assignLinks () //this assigns k values to the ranked link ids, so that the highest values occur at the highest chart points for each concentric ring.


  {
  var interval = 20;

  for (var i = 0; i < 8; i++) { //link ids for the innermost petal ring
    k = (i * interval )+ 10;
    link_order.push([k]);
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

  var link_order_length = link_order.length;
  var stop= link_order_length + 12

  for (var i = 0; i < 12; i++) {  //link ids for the middle petal ring
    k = (i * interval )+ 10;
    k = k + 160;
    link_order.push([k]);
  }
  for (var h = 0; h < 10; h++) {
    for (var j = link_order_length; j < stop; j++) {
      k = link_order[j];
      k1 = k - 2 - h;
      k2 = k - (-1) + h;
      link_order.push(k1);
      link_order.push(k2);
    }
  }

  /*var link_order_length = link_order.length;
  var stop= link_order_length + 16

  for (var i = 0; i < 16; i++) {  //link ids for the outer petal ring
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


console.log(link_order)
//console.log(song_names)


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
    color_code,
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
    curves.push(curveObject);
    group.add(curveObject)
  }


//Invisible Spaghetti - add TubeGeometry objects that sheath chart lines representing active geometric links.
function invisibleSpaghetti (k, x, y, z, x0, y0, z0, petalheight, ctrlpt, color_code) {
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
    material.opacity = .5
    object.label = k
    parentTransform.add(object)
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


  parentTransform = new THREE.Object3D()
  group.add(parentTransform)

  group.add(new THREE.Line(geometry, material));

}



/*var groupElements = [];
var groupElements= group.children;
console.log(groupElements);
group.uncache(groupElements);
*/

  

// -------------------------------- // 


drawPetalRing (8, .65, .1, 0x00769d, 160, 20) //center petals

drawPetalRing (12, 1, .1, 0x0289b6, 240, 20)  //middle petals

//drawPetalRing (16, 1, .1,  0x0099cc, 320, 20)  //outer petals

group.position.set( 0, -.24, .75 );


/*console.log(curves);
var object = curves[287];
object.material.color.setHex( 0xFF0000 );
//object.label = 287
//parentTransform.add(object);

var outlier2 = curves[286];
outlier2.material.color.setHex( 0xFF0000 );
//parentTransform.add(outlier2);*/

/*var k = 30;
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
        0xe45e9d
      )*/



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
  //var popularity = song.statistics.viewCount;
  //var genre = song.kind;
  song_names.push([song_name]);
        //video_thmbs[video_thmbs.length] = song.snippet.thumbnails.default.url;
        //video_titles[video_titles.length] = song.snippet.title;
     }
     }
  }
  } 
}

getData();


function getActiveLinks()  //sorts for a given set of values from the data obtained above
{

    console.log(song_names);

    var active_array = song_names;

/*  
    if (song_change_time == "1h") 
      {
        var active_array = song_change_1h;
      }

    if (song_change_time == "24h") 
      {
        var active_array = song_change_24h;
      }

    if (song_change_time == "1w") 
      {
        var active_array = song_change_1w;
      }
*/
    var f = active_array.entries(); 

    for (x of f) {
      var song_value = x[1].toString();
      var song_index = x[0];

      //console.log(song_value);
      //var includes = rockgenre.includes(song_value);
      //console.log(includes);
      //console.log(song_value);

      if (rockgenre.includes(song_value))
      {
        
        active_links.push(song_index);
      }
/*
      if (volume[song_index] < volume_adj) 
      {
        song = null;
      }

      else if (song_value > 20) {
        
        active_links.push(song_index);
      }

      else if (song_value > 10) {
      song_index = song[0]
      active_links2.push(song_index);
      }
*/
      //active_links.push(song_index);
    }
    //console.log(active_links);

}

//console.log(link_order);

function addLinks() {  //adds links for selected values

for (i = 0; i < link_order.length; i++) {

    if (active_links.includes(i)) {

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
        color_code
      )
    }

    if (active_links2.includes(i)) {

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
        color_code
      )
    }


  }
}




  // --- raycaster code


  var geometry = new THREE.SphereBufferGeometry(0.01)
  var material = new THREE.MeshBasicMaterial({ color: 0x45a7c5 })
  sphereInter = new THREE.Mesh(geometry, material)
  sphereInter.visible = false
  scene.add(sphereInter)

  raycaster = new THREE.Raycaster()

  document.addEventListener('mousemove', onDocumentMouseMove, false)
  window.addEventListener('click', onMouseClick, false)
  window.addEventListener('resize', onWindowResize, false)
  
  function onDocumentMouseMove (event) {
    event.preventDefault()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    var intersects = raycaster.intersectObjects(parentTransform.children, true)
    if (intersects.length > 0) {
      sphereInter.visible = true
      sphereInter.position.copy(intersects[0].point)
      /*var k = 30;
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
        0xe45e9d
      )*/
    } else {
      sphereInter.visible = false
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
      //console.log(song_names[l])
      //console.log(URL);
      window.open(URL, 'iframe_a')
       //player.cueVideoById(song_names[l][1]);
    }
  }

  function onWindowResize () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  //animate and render

  camera.position.z = 3.75

  function animate () {

    if (play) {

    requestAnimationFrame(animate)
    render()
    group.rotation.x += 0.0000
    group.rotation.y += 0.0001
    }

    else {

    requestAnimationFrame(animate)
    render()
    }
  }

  animate()

  function render () {
    dot += 0
    renderer.render(scene, camera)
  }
}

//  ---- reference code ----- //  



//document.write(k + " " + links[k] + ", ");

//  ---- reference code ----- //  