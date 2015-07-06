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

    loader.load('assets/happy-buddha.json', function (obj) {
      obj.position.set(0, 60, 0);
      scene.add( obj );
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

    geometry = new THREE.TorusGeometry( 200, 40, 16, 100 );
    material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('assets/iris.gif') } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add(mesh);
    var x = 0;
    var y = 50;
    var z = 100;
    lights = [];
    for(var i = 0; i < 7; i++) {
      colorsArray = [0x00ff65, 0xe1ff00, 0xfa00ff, 0x0040ff];
      lights[i] = new THREE.PointLight(_.sample(colorsArray), 1, 100 );
      lights[i].position.set(x, y, z);
      lights[i].intensity = 100;
      scene.add(lights[i]);
      x -= 100;
      y -= 100;
      z -= 100;
    }
    var radius = 100;
    object = createSphere(radius);
    scene.add(new THREE.AmbientLight(0xff00F0));
    scene.add(object);

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize( 500, 500 );

    document.getElementById("threed").appendChild( renderer.domElement );
    console.log(geometry);
    console.log(mesh);
    console.log(lights);
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
