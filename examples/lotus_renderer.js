var camera, scene, raycaster, renderer, parentTransform, sphereInter
var mouse = new THREE.Vector2()
var r = 100,
  dot = 0

  var scene = new THREE.Scene()
  //scene.background = new THREE.Color( 0xf0f0f0 );

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

  var links = [
    null,
    'https://influence.lotus.fm/en/listings/701008-riot-af',
    'https://influence.lotus.fm/en/listings/724530-home-body',
    'https://influence.lotus.fm/en/listings/713610-joseph-ady',
    'http://www.sleater-kinney.com/',
    'http://www.thethermals.com/',
    'https://rosebloodband.bandcamp.com/',
    'https://www.jetechomusic.com/',
    'http://www.smallmillion.com/',
    'https://soundcloud.com/thatfuckingivan',
    'http://www.ramborich.com',
    'https://missrayon.bandcamp.com/',
    'https://dreamwulf.bandcamp.com/',
    'https://deaftelepathy.bandcamp.com',
    'https://velcronightmare.bandcamp.com/',
    'http://www.decemberists.com/',
    'http://www.scottpemberton.com/',
    'https://soundcloud.com/yerathrall/loverload-i-dont-care-demo',
    'https://www.reverbnation.com/geneethorpjr',
    'https://www.karmarivera.com/',
    'https://blackwaterholylight.bandcamp.com',
    'http://www.dirtyrevival.com/',
    'http://www.blitzentrapper.net/',
    'https://savila.bandcamp.com/',
    'http://pinkmartini.com/',
    'https://www.haley-heynderickx.com/',
    'https://thebody.bandcamp.com/',
    'https://alienboypdx.bandcamp.com/',
    'http://galeximusic.com/',
    'https://www.coloringelectriclike.com',
        'https://influence.lotus.fm/en/listings/701008-riot-af',
    'https://influence.lotus.fm/en/listings/724530-home-body',
    'https://influence.lotus.fm/en/listings/713610-joseph-ady',
    'http://www.sleater-kinney.com/',
    'http://www.thethermals.com/',
    'https://rosebloodband.bandcamp.com/',
    'https://www.jetechomusic.com/',
    'http://www.smallmillion.com/',
    'https://soundcloud.com/thatfuckingivan',
    'http://www.ramborich.com',
    'https://missrayon.bandcamp.com/',
    'https://dreamwulf.bandcamp.com/',
    'https://deaftelepathy.bandcamp.com',
    'https://velcronightmare.bandcamp.com/',
    'http://www.decemberists.com/',
    'http://www.scottpemberton.com/',
    'https://soundcloud.com/yerathrall/loverload-i-dont-care-demo',
    'https://www.reverbnation.com/geneethorpjr',
    'https://www.karmarivera.com/',
    'https://blackwaterholylight.bandcamp.com',
    'http://www.dirtyrevival.com/',
    'http://www.blitzentrapper.net/',
    'https://savila.bandcamp.com/',
    'http://pinkmartini.com/',
    'https://www.haley-heynderickx.com/',
    'https://thebody.bandcamp.com/',
    'https://alienboypdx.bandcamp.com/',
    'http://galeximusic.com/',
    'https://www.coloringelectriclike.com',

  ]


// -------------------------------------------- //


init()
function init () {
  container = document.createElement('div')
  document.body.appendChild(container)


  //Petal Constructor - draws outline of petal
  function petal (
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
  function cParc (
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
  function cP (x, y, z, x0, y0, z0, petalheight, ctrlpt, color_code) {
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
  var segmentCount = 16,
    radius = 1,
    depth = 0.1,
    color_code = 0x0099cc,
    geometry = new THREE.Geometry(),
    material = new THREE.LineBasicMaterial({ color: color_code })

  for (var i = 0; i <= segmentCount; i++) {
    var theta = (i / segmentCount) * Math.PI * 2
    var iota = ((i + 0.5) / segmentCount) * Math.PI * 2
    var kappa = ((i + 1) / segmentCount) * Math.PI * 2
    petal(
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


  //Draws Chart Lines - outer petals
  var cPCount = 800,
    radius = 1,
    depth = 0.1,
    color_code = 0xffca8,
    divisor = 50
  ;(geometry = new THREE.Geometry()),
    (material = new THREE.LineBasicMaterial({ color: color_code }))

  //this splice prevents two link values from occupying the same center point at the top of the petal chart
  var blanks = [0]
  for (var i = 0; i < cPCount; i++) {
    var skip = i * divisor + 26
    blanks.push(skip)
  }
  //document.write(blanks);

  //sample arrays for testing purposes
  var some_bands = [1, 2, 3, 4, 7, 19, 22, 25, 26, 27, 29, 42,43,62,34,54,55]
  var count = []
  var k_values = [] //list of all k values with points assigned to them
  k_values.push([0, null, null, null, null, null, null, null, null])

  for (var i = 0; i < cPCount; i++) {
    var k = 0
    var theta = (i / cPCount) * Math.PI * 2
    var iota = ((i + 0.5) / cPCount) * Math.PI * 2
    var kappa = ((i + 1) / cPCount) * Math.PI * 2
    var iota0 = ((i + divisor / 2) / cPCount) * Math.PI * 2
    var kappa0 = ((i + divisor) / cPCount) * Math.PI * 2
    var modulus = i % divisor

    var base_x = Math.cos(theta) * radius
    var base_y = 0
    var base_z = Math.sin(theta) * radius
    var petalheight = 0.5
    var ctrlpt = 0 //ctrl pt for chart lines (within petal)
    var arcpt = 0.45 //ctrl pt for petal arc (outline)

    if (modulus == 0) {
      //this resets chart line variables for each new petal drawn

      var chartPoint = cParc(
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
        var theta0 = (k / cPCount) * Math.PI * 2
        var base_xk = Math.cos(theta0) * radius
        var base_yk = 0
        var base_zk = Math.sin(theta0) * radius

        //document.write(k + " " + links[k] + ", ");

        //color coding can be used with transparent TubeGeometry to represent multiple link categories

        /*if (blanks.includes(k)) {

							    	color_code=0xff41dc;

							    }

							else if (blanks.includes(k+1)) {  
							    	color_code=0xff41dc;

							    }

							else if (some_bands.includes(k)) {  
							    color_code=0xffca85;
							    }

							else color_code=0x0099cc; */

        cP(
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

  var i = 0

  while (i < cPCount) {
    if (blanks.includes(i) && some_bands.includes(i)) {
      i++
      invisibleSpaghetti(
        k_values[i - 1][0],
        k_values[i][1],
        k_values[i][2],
        k_values[i][3],
        k_values[i][4],
        k_values[i][5],
        k_values[i][6],
        k_values[i][7],
        k_values[i][8]
      )
    }

    if (some_bands.includes(i)) {
      i++
      invisibleSpaghetti(
        k_values[i - 1][0],
        k_values[i][1],
        k_values[i][2],
        k_values[i][3],
        k_values[i][4],
        k_values[i][5],
        k_values[i][6],
        k_values[i][7],
        k_values[i][8]
      )
      i = i - 1
    }

    i++
  }

  /*count.forEach(myFunction);

						    function myFunction(item) {
  								document.write(item +", "); 
								}*/

  group.add(new THREE.Line(geometry, material))

  //middle petals
  /*var segmentCount = 14,
			    radius = .85,
			    depth = .1,
			    color_code = 0x0289b6,
			    geometry = new THREE.Geometry(),
			    material = new THREE.LineBasicMaterial({ color: color_code });

			for (var i = 0; i <= segmentCount; i++) {
			    var theta = (i / segmentCount) * Math.PI * 2;
			    var iota = ((i +.5 )/ segmentCount) * Math.PI * 2;
			    var kappa = ((i +1 )/ segmentCount) * Math.PI * 2;
			    petal (Math.cos(theta) * radius,0,Math.sin(theta) * radius,
			    	   Math.cos(iota) * (radius - depth),0,Math.sin(iota) * (radius - depth),
			    	   Math.cos(kappa) * radius,0,Math.sin(kappa) * radius, .6, .55, color_code
			            );       
			}
			group.add(new THREE.Line(geometry, material));



//draws chart lines - middle petals


        	var segmentCount = 700,
			    radius = .85,
			    depth = .1,
			    color_code =   0x0289b6,
			    divisor = 50;
			    geometry = new THREE.Geometry(),
			    material = new THREE.LineBasicMaterial({ color: color_code });

			for (var i = 0; i < segmentCount; i++) {
				var k = 801;
			    var theta = (i / segmentCount) * Math.PI * 2;
			    var iota = ((i +.5 )/ segmentCount) * Math.PI * 2;
			    var kappa = ((i +1 )/ segmentCount) * Math.PI * 2;
			    var iota0 = ((i + (divisor/2))/ segmentCount) * Math.PI * 2;
			    var kappa0 = ((i + divisor)/ segmentCount) * Math.PI * 2;
			    var modulus = i % divisor;

			    var base_x = Math.cos(theta) * radius;
			    var base_y = 0;
			    var base_z = Math.sin(theta) * radius;


			    if (modulus == 0)

			    {

			    var chartPoint = cParc (Math.cos(theta) * radius,0,Math.sin(theta) * radius,
			    Math.cos(iota0) * (radius - depth),0,Math.sin(iota0) * (radius - depth),
			    Math.cos(kappa0) * radius,0,Math.sin(kappa0) * radius, .6, .55, 0x00769d
			            );

			    for (var j = 1; j <= divisor; j++) 
			    {
			    k=i + j;
			    var theta0 = (k / segmentCount) * Math.PI * 2;
			    var base_xk = Math.cos(theta0) * radius;
			    var base_yk = 0;
			    var base_zk = Math.sin(theta0) * radius;

			    			    if (k==37) {
			    	color_code=0xffca85;
			    }

			    else if (k==69) {
			    	color_code=0xff41dc;
			    }


			    else if (k==125) {
			    	color_code=0xff41dc;
			    }

			    else if (k==129) {
			    	color_code=0xff41dc;
			    }

			    else if (k==136) {
			    	color_code=0xff41dc;
			    }

			    else if (k==152) {
			    	color_code=0xffca85;
			    }

			    else if (k==165) {
			    	color_code=0xffca85;
			    }

			    else color_code=0x0099cc;


			    cP (chartPoint[j].x,chartPoint[j].y,chartPoint[j].z,
			    base_xk,0,base_zk, .5, 0, color_code);
			    //document.write(k + ",");
				}
			}

			    geometry.vertices.push(
			        new THREE.Vector3(
			            Math.cos(theta) * radius,
			            0,
			            Math.sin(theta) * radius
			            ));          
			}
			group.add(new THREE.Line(geometry, material));



//center petals
			var segmentCount = 12,
			    radius = .65,
			    depth = .1,
			    color_code =  0x00769d,
			    geometry = new THREE.Geometry(),
			    material = new THREE.LineBasicMaterial({ color: color_code});

			for (var i = 0; i <= segmentCount; i++) {
			    var theta = (i / segmentCount) * Math.PI * 2;
			    var iota = ((i +.5 )/ segmentCount) * Math.PI * 2;
			    var kappa = ((i +1 )/ segmentCount) * Math.PI * 2;
			    petal (Math.cos(theta) * radius,0,Math.sin(theta) * radius,
			    	   Math.cos(iota) * (radius - depth),0,Math.sin(iota) * (radius - depth),
			    	   Math.cos(kappa) * radius,0,Math.sin(kappa) * radius, .7, .65, color_code
			            );          
			}
			group.add(new THREE.Line(geometry, material));



//draws chart lines - center petals


        	var segmentCount = 600,
			    radius = .65,
			    depth = .1,
			    color_code =   0x0289b6,
			    divisor = 50;
			    geometry = new THREE.Geometry(),
			    material = new THREE.LineBasicMaterial({ color: color_code });

			for (var i = 0; i < segmentCount; i++) {
				var k = 801;
			    var theta = (i / segmentCount) * Math.PI * 2;
			    var iota = ((i +.5 )/ segmentCount) * Math.PI * 2;
			    var kappa = ((i +1 )/ segmentCount) * Math.PI * 2;
			    var iota0 = ((i + (divisor/2))/ segmentCount) * Math.PI * 2;
			    var kappa0 = ((i + divisor)/ segmentCount) * Math.PI * 2;
			    var modulus = i % divisor;

			    var base_x = Math.cos(theta) * radius;
			    var base_y = 0;
			    var base_z = Math.sin(theta) * radius;


			    if (modulus == 0)

			    {

			    var chartPoint = cParc (Math.cos(theta) * radius,0,Math.sin(theta) * radius,
			    Math.cos(iota0) * (radius - depth),0,Math.sin(iota0) * (radius - depth),
			    Math.cos(kappa0) * radius,0,Math.sin(kappa0) * radius, .7, .65, 0x00769d
			            );

			    for (var j = 1; j <= divisor; j++) 
			    {
			    k=i + j;
			    var theta0 = (k / segmentCount) * Math.PI * 2;
			    var base_xk = Math.cos(theta0) * radius;
			    var base_yk = 0;
			    var base_zk = Math.sin(theta0) * radius;

			    			    if (k==323) {
			    	color_code=0xff41dc;
			    }


			    else if (k==329) {
			    	color_code=0xff41dc;
			    }

			    else if (k==325) {
			    	color_code=0xffca85;
			    }

			    else if (k==326) {
			    	color_code=0xffca85;
			    }



			    else color_code=0x0099cc;


			    cP (chartPoint[j].x,chartPoint[j].y,chartPoint[j].z,
			    base_xk,0,base_zk, .5, 0, color_code);
			    //document.write(k + ",");
				}
			}

			    geometry.vertices.push(
			        new THREE.Vector3(
			            Math.cos(theta) * radius,
			            0,
			            Math.sin(theta) * radius
			            ));          
			}
			group.add(new THREE.Line(geometry, material)); */

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
      var URL = links[obj.label]
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

var blah = {
  'myFunction': function () 
  {
  }
}
blah['myFunction']()
blah.myFunction()

//document.write(k + " " + links[k] + ", ");

//  ---- reference code ----- //  
