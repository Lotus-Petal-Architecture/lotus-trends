var camera, scene, raycaster, renderer, parentTransform, sphereInter
var mouse = new THREE.Vector2()
var r = 100,
  dot = 0

  var scene = new THREE.Scene()

  var camera = new THREE.PerspectiveCamera(
    40,
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

  var light = new THREE.PointLight(0xffffff)
  light.position.set(-100, 200, 100)
  scene.add(light)

  var group
  group = new THREE.Group()
  group.position.y = 0
  scene.add(group)

  var links = []


// sample arrays for testing purposes


  var link_order = [] // list of all link values in the module, with k values assigned to each index position
  var k_values = [] // list of all k values generated for corresponding module chart lines
  var active_links = [0, 1, 2, 25, 125, 275, 780, 781, 782, 783]
  var coin_names = [] //list of coin names. uses the same index structure as link_order
  var coin_prices = []
  var coin_change_24h = []
  var coin_change_1h = []
  var coin_change_1w = []
  var volume = []
  var market_cap = []
  var cap_rank = []

  


// -------------------------------------------- //


init()
function init () {
  container = document.createElement('div')
  document.body.appendChild(container)


function assignLinks () //this assigns k values to the ranked link ids, so that the highest values occur at the highest points in the module
  {
  var interval = 50;
  for (var i = 0; i < 16; i++) {
    k = (i * interval )+ 25;
    link_order.push([k]);
  }
  for (var h = 0; h < 24; h++) {
    for (var j = 0; j < 16; j++) {
      k = link_order[j];
      k1 = k - 2 - h;
      k2 = k - (-1) + h;
      link_order.push(k1);
      link_order.push(k2);
    }
  }
}

assignLinks();


function getData() //processes JSON data and returns arrays for 5 main variables
  {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    //console.log(this.responseText);
    myObj = JSON.parse(this.responseText);
    //myObj = this.responseText;

if(myObj.data.length > 0) {
  for (var i = 0; i < myObj.data.length; i++) {
    var coin = myObj.data[i];
    //console.log(entry);
    var coin_name = coin.name;
    coin_name = coin_name.replace(/\s/g, "-");
    //var coin_priceusd = coin.quote.USD.price;
    //var percent_change_24h = percent_change_24h;
    //document.write(i+' - '+coin_name+' : $'+coin_priceusd+'<br />');
    coin_names[coin_names.length]=coin_name;
    market_cap[market_cap.length] = coin.quote.USD.market_cap;
    coin_prices[coin_prices.length] = coin.quote.USD.price;
    coin_change_24h[coin_change_24h.length] = coin.quote.USD.percent_change_24h;
    coin_change_1h[coin_change_1h.length] = coin.quote.USD.percent_change_1h;
    coin_change_1w[coin_change_1w.length] = coin.quote.USD.percent_change_7d;
    volume[volume.length] = coin.quote.USD.volume_24h;
    }
}

  }
};
xmlhttp.open("GET", "../cryptocap.php", true);
xmlhttp.send();
}

getData();

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


  //Chart Position - draws chart lines within petal arc
  function chartPosition (x, y, z, x0, y0, z0, petalheight, ctrlpt, color_code) {
    var cPcurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x, y, z),
      new THREE.Vector3(x, ctrlpt, z),
      new THREE.Vector3(x0, y0, z0)
    )

    var points = cPcurve.getPoints(50)
    var geometry = new THREE.BufferGeometry().setFromPoints(points)
    var material = new THREE.LineBasicMaterial({ color: color_code })
    var curveObject = new THREE.Line(geometry, material)
    group.add(curveObject)
  }


  //Invisible Spaghetti - add TubeGeometry objects that sheath chart lines representing active geometric links.
  function invisibleSpaghetti (k, x, y, z, x0, y0, z0, petalheight, ctrlpt) {
    var link_curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x, y, z),
      new THREE.Vector3(x, ctrlpt, z),
      new THREE.Vector3(x0, y0, z0)
    )

    var geometry = new THREE.TubeGeometry(link_curve, 64, 0.001, 8, false)
    var material = new THREE.MeshBasicMaterial({ color: 0xe45e9d })
    var object = new THREE.Mesh(geometry, material)
    material.transparent = true
    object.label = k
    parentTransform.add(object)
  }

  //Outer Petals - draws outer ring of petals
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

        k_values.push([
          k,
          chartPoint[j].x,
          chartPoint[j].y,
          chartPoint[j].z,
          base_xk,
          base_yk,
          base_zk,
          petalheight,
          ctrlpt
        ])
      }
    }

    geometry.vertices.push(
      new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius)
    )
  }

  parentTransform = new THREE.Object3D()
  group.add(parentTransform)

  var link_order_length = link_order.length;


  for (i = 0; i < link_order_length; i++) {

      

    if (active_links.includes(i)) {

      var k = link_order[i];

      invisibleSpaghetti(
        k,
        k_values[k][1],
        k_values[k][2],
        k_values[k][3],
        k_values[k][4],
        k_values[k][5],
        k_values[k][6],
        k_values[k][7],
        k_values[k][8]
      )
    }

    
  }

group.add(new THREE.Line(geometry, material))
}

  console.log(link_order)
  console.log(coin_names)

  // -------------------------------- // 


drawPetalRing (16, 1, .1,  0x0099cc, 800, 50)  //outer petals

drawPetalRing (14, .85, .1, 0x0289b6, 700, 50)  //middle petals

drawPetalRing (12, .65, .1, 0x00769d, 600, 50) //center petals

      

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
      var URL = "https://coinmarketcap.com/currencies/" + coin_names[l]
      window.open(URL, '_blank')
    }
  }

  function onWindowResize () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  //animate and render

  camera.position.z = 5

  function animate () {
    requestAnimationFrame(animate)
    render()
    group.rotation.x += 0.0
    group.rotation.y += 0.0
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
