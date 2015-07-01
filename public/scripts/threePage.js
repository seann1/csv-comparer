var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 75, 30 / 70, 1, 10000 );
    camera.position.z = 1000;

    scene = new THREE.Scene();

    createSphere = function(radius, segments, rings) {
       var material, sphere;
       if (radius == null) {
         radius = 50;
       }
       if (segments == null) {
         segments = 16;
       }
       if (rings == null) {
         rings = 16;
       }
       sphere = new THREE.SphereGeometry(radius, segments, rings);
       material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('assets/iris.gif') } );
       return new THREE.Mesh(sphere, material);
   };

    geometry = new THREE.TorusGeometry( 200, 40, 16, 100 );
    material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('assets/iris.gif') } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add(mesh);
    light = new THREE.PointLight(0x0040ff, 20, 100 );
    light.position.x = 20;
    light.position.y = 10;
    light.position.z = 3;
    light.intensity = 100;
    object = createSphere();
    scene.add(new THREE.AmbientLight(0xff00F0));
    scene.add(light);
    scene.add(object);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( 170, 160 );

    document.getElementById("threed").appendChild( renderer.domElement );

}

function animate() {
    var time;
    time = new Date().getTime() * 0.0005;
    light.position.x = Math.sin(time * 0.7) * 30;
    object.rotation.x += 0.02;

    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame( animate );

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render( scene, camera );

}
