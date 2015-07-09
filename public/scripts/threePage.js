var camera, scene, renderer;
var geometry, material, mesh;


init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 100, 70 / 70, 1, 10000 );
    camera.position.z = 1000;
    controls = new THREE.TrackballControls( camera );
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    var loader = new THREE.ObjectLoader();

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = true;

    scene = new THREE.Scene();

    loader.load("assets/happy-buddha.json", function (obj) {
      obj.position.set(0, 60, 100);
      scene.add(obj);
      material = new THREE.MeshPhongMaterial({specular: '#a9fcff', color: '#00abb1', emissive: '#006063', shininess: 500});
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
       material = new THREE.MeshPhongMaterial({specular: '#a9fcff', color: '#00abb1', emissive: '#006063', shininess: 500});
       return new THREE.Mesh(sphere, material);
   };


   var closedSpline = new THREE.ClosedSplineCurve3( [
					new THREE.Vector3( -100, -100,  60 ),
					new THREE.Vector3( -150,   20,  60 ),
					new THREE.Vector3( -60,  150,  60 ),
					new THREE.Vector3(  60,   20, -60 ),
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
    material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('assets/iris.gif') } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add(mesh);
    var x = 200;
    var y = 180;
    var z = 100;
    lights = [];
    for(var i = 0; i < 14; i++) {
      colorsArray = [0x00ff65, 0xe1ff00, 0xfa00ff, 0x0040ff, 0x00ff04, 0xffaa00];
      lights[i] = new THREE.PointLight(_.sample(colorsArray), 1, 100 );
      lights[i].position.set(_.random(2, 300), _.random(2, 300), _.random(2, 100));
      lights[i].intensity = _.random(2, 300);
      scene.add(lights[i]);
      x -= 10;
      y -= 10;
      z -= 10;
    }
    var radius = 100;
    object = createSphere();
    scene.add(new THREE.AmbientLight(0xff00F0));
    scene.add(object);
    console.log(object);

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize( 500, 500 );

    document.getElementById("threed").appendChild( renderer.domElement );
}

function animate() {
    var time;
    time = new Date().getTime() * 0.0015;
    function lightPosition(light) {
                if (light.position.x > -250) {
                  light.position.x -= 1
                  light.position.y -= 1
                } else {
                  light.position.x += 300
                  light.position.y += 300
                }
    };
    if (object.position.z > -500) {
      object.position.z -= 1;
    }
    else {
      object.position.z = 100;
    }

    //object.materials[0].opacity = 1 + Math.sin(new Date().getTime() * .0025);

    lightPosition(lights[0]);
    lightPosition(lights[1]);
    lightPosition(lights[2]);
    lightPosition(lights[3]);
    lightPosition(lights[4]);
    lightPosition(lights[5]);
    object.rotation.x += 0.01;
    object.position.x += 0.01;
    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame( animate );
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    controls.update();

    renderer.render( scene, camera );

}
