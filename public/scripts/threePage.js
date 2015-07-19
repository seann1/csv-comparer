var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 100, 70 / 70, 1, 10000 );
    camera.position.z = 700;
    controls = new THREE.TrackballControls( camera );
    controls.rotateSpeed = 3.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    var loader = new THREE.ObjectLoader();

    controls.noZoom = false;
    controls.noPan = false;

    scene = new THREE.Scene();

    loader.load("assets/happy-buddha.json", function (obj) {
      obj.position.set(0, 30, 50);
      obj.castShadow = true;
      scene.add(obj.children[1]);
    });

    createSphere = function(radius, segments, rings) {
       var material, sphere;
       if (radius == null) {
         radius = 50;
       }
       if (segments == null) {
         segments = 10;
       }
       if (rings == null) {
         rings = 16;
       }
       sphere = new THREE.SphereGeometry(radius, segments, rings);
       sphere.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 50, 0, 100) );
       material = new THREE.MeshPhongMaterial({specular: '#a9fcff', emissive: '#006063', shininess: 500, transparent: true});
       material.opacity = 0.7;
       return new THREE.Mesh(sphere, material);
   };

   createOtherSphere = function(radius, segments, rings) {
     var material, sphere;
     if (radius == null) {
       radius = 50;
     }
     if (segments == null) {
       segments = 10;
     }
     if (rings == null) {
       rings = 16;
     }
     sphere2 = new THREE.SphereGeometry(radius, segments, rings);
     _.each(sphere2.faces, function(face) {
         face.color.setRGB( Math.random(),Math.random(), Math.random());
     });
     material2 = new THREE.MeshPhongMaterial({ vertexColors: THREE.VertexColors });
     return new THREE.Mesh(sphere2, material2);
   }


   var closedSpline = new THREE.ClosedSplineCurve3( [
					new THREE.Vector3( -100, -100,  60 ),
					new THREE.Vector3( -150,   40,  60 ),
					new THREE.Vector3( -60,  150,  60 ),
					new THREE.Vector3(  60,   200, -60 ),
					new THREE.Vector3(  60, -100, -60 )
		] );
   var extrudeSettings = {
    	steps			: 100,
    	bevelEnabled	: false,
    	extrudePath		: closedSpline
	 };

   var pts = [], count = 6;

       for ( var i = 0; i < count; i ++ ) {
         var l = 20;
         var a = 2 * i / count * Math.PI;
         pts.push( new THREE.Vector2 ( Math.cos( a ) * l, Math.sin( a ) * l ) );

       }

    var shape = new THREE.Shape( pts );

    var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    var texture = THREE.ImageUtils.loadTexture('assets/iris.gif');
    texture.wrapS = THREE.RepeatWrapping;

    material = new THREE.MeshPhongMaterial( { map: texture, shininess: 500, transparent: true, opacity: 1.0 } );

    mesh = new THREE.Mesh( geometry, material );
    mesh2 = new THREE.Mesh( geometry, material );
    scene.add(mesh);
    scene.add(mesh2);
    console.log(mesh.material.opacity);

    var opacityTween = new TWEEN.Tween(mesh.material)
    .to({ opacity: 0.1 }, 5000)
    .easing(TWEEN.Easing.Quadratic.In);

    var opacityBack = new TWEEN.Tween(mesh.material)
    .to({opacity: 1.0}, 5000)
    .easing(TWEEN.Easing.Quadratic.In);


    opacityTween.chain(opacityBack);
    opacityBack.chain(opacityTween);
    opacityTween.start();

    var x = 200;
    var y = 180;
    var z = 100;
    lights = [];
    for(var i = 0; i < 14; i++) {
      colorsArray = [0x00ff65, 0xe1ff00, 0xfa00ff, 0x0040ff, 0x00ff04, 0xffaa00];
      lights[i] = new THREE.PointLight(_.sample(colorsArray), 1, 100 );
      lights[i].position.set(_.random(20, 60), _.random(0, 200), _.random(-60, 80));
      lights[i].intensity = _.random(2, 10);
      scene.add(lights[i]);
      x -= 50;
      y -= 50;
      z -= 50;
    }
    var radius = 100;
    object = createSphere();
    otherObject = createOtherSphere();
    ambLight = new THREE.AmbientLight(0xff00F0);
    scene.add(ambLight);
    scene.add(otherObject);
    scene.add(object);

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize( window.innerWidth, (window.innerWidth / 2) );

    var start = { r: 0.0, g: 0.2, b: 0.7 };
    var end = { r: 0.6, g: 0.8, b: 0.5 };
    var currentLight = { r: 0.0, g: 0.0, b: 0.0 };

    var lightTween = new TWEEN.Tween(currentLight)
    .to(end, 2000)
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(function() {
      ambLight.color.r = currentLight.r;
      ambLight.color.g = currentLight.g;
      ambLight.color.b = currentLight.b;
    });

    var lightBack = new TWEEN.Tween(currentLight)
    .to(start, 2000)
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(function() {
      ambLight.color.r = currentLight.r;
      ambLight.color.g = currentLight.g;
      ambLight.color.b = currentLight.b;
    });

    lightTween.chain(lightBack);
    lightBack.chain(lightTween);
    lightTween.start();

    var thisTween = new TWEEN.Tween(object.material.color)
    .to({r: .896, g: .27644, b: 0.78999 }, 2000)
    .onUpdate(function() {
      object.material.color.r = this.r;
      object.material.color.g = this.g;
      object.material.color.b = this.b;

    }).easing(TWEEN.Easing.Quadratic.In);

    var tweenBack = new TWEEN.Tween(object.material.color)
    .to({r: .34, g: .24, b: 0 }, 2000)
    .onUpdate(function() {
      object.material.color.r = this.r;
      object.material.color.g = this.g;
      object.material.color.b = this.b;

    }).easing(TWEEN.Easing.Quadratic.In);

    thisTween.chain(tweenBack);
    tweenBack.chain(thisTween);

    var position = { x : 0, z: 300 };
    var target = { x : 200, z: -300 };

    var update	= function(){
      object.position.z = current.z;
    }
    var current = {z:100};

    var sphereTween = new TWEEN.Tween(current)
    .to({z: -150}, 2300)
    .easing(TWEEN.Easing.Elastic.In)
    .onUpdate(update);

    var sphereBack = new TWEEN.Tween(current)
    .to({z: 150}, 2300)
    .easing(TWEEN.Easing.Elastic.In)
    .onUpdate(update);

    sphereTween.chain(sphereBack);
    sphereBack.chain(sphereTween);

    thisTween.start();
    sphereTween.start();

    document.onkeydown = checkKeycode;

    function checkKeycode(e) {
      var keycode;
      if (window.event) keycode = window.event.keyCode;
      else if (e) keycode = e.which;

      switch (keycode) {
        case 88:
          if (controls.enabled === true) {
            controls.enabled = false;
          } else {
            controls.enabled = true;
          }
          break;

        case 66:
          if (ambLight.visible === true) {
            ambLight.visible = false;
          } else {
            ambLight.visible = true;
          }
          break;
      }
    }

    document.getElementById("threed").appendChild( renderer.domElement );
    console.log(scene);
}

function animate() {
    var time;
    time = new Date().getTime() * 0.0015;
    function lightPosition(light) {
                if (light.position.x > -250) {
                  light.position.x -= 1
                  light.position.y -= 1
                } else {
                  light.position.x += _.random(100, 300)
                  light.position.y += _.random(100, 300)
                }
    };

    lightPosition(lights[0]);
    lightPosition(lights[1]);
    lightPosition(lights[2]);
    lightPosition(lights[3]);
    lightPosition(lights[4]);
    lightPosition(lights[5]);
    object.rotation.x += 0.01;
    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame( animate );
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    mesh2.rotation.x -= 0.01;
    mesh2.rotation.y -= 0.01;
    controls.update();
    TWEEN.update();

    renderer.render( scene, camera );

}
