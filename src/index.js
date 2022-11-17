import * as THREE from 'three';
import { TextureLoader } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// import jupiterTexture from '../img/jupiterTexture.jpg';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    1000
);
camera.position.set(0, 40, 80);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();


const textureLoader = new THREE.TextureLoader();

// const light = new THREE.AmbientLight(0xffffff); // soft white light
// scene.add(light);

//Create a DirectionalLight and turn on shadows for the light
const light = new THREE.PointLight( 0xffffff, 0.5, 40 );
light.position.set( 0, 25, 0 ); //default; light shining from top
// light.rotateY(-90);
light.castShadow = true; // default false
scene.add( light );

//Set up shadow properties for the light
light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default

//Create a helper for the shadow camera (optional)
const helper = new THREE.CameraHelper( light.shadow.camera );
scene.add( helper );

// //Create a box that cast shadows (but does not receive them)
// const boxGeometry = new THREE.BoxGeometry( 5, 5, 5 );
// const boxMaterial = new THREE.MeshStandardMaterial({
//     color: 0x049ef4,
//     emissive: 0x000000,
//     roughness: 0,
//     metalness: 0.5
// });
// const box = new THREE.Mesh( boxGeometry, boxMaterial );
// box.castShadow = true; //default is false
// box.receiveShadow = false; //default
// scene.add( box );

const distanceSpotlight = 35;
const heightSpotlight = -8;

//Create a SpotLight and turn on shadows for the light
const spotlight = new THREE.SpotLight( 0xffffff, 0.5);
spotlight.position.set( -20, heightSpotlight, distanceSpotlight - 5 );
spotlight.castShadow = true; // default false

//Set up shadow properties for the light
spotlight.shadow.mapSize.width = 1024;
spotlight.shadow.mapSize.height = 1024;

spotlight.shadow.camera.near = 0.5;
spotlight.shadow.camera.far = 60;
spotlight.shadow.camera.fov = 20;

scene.add( spotlight );

//Create a SpotLight and turn on shadows for the light
const spotlight2 = new THREE.SpotLight( 0xffffff, 0.5);
spotlight2.position.set( 0, heightSpotlight, distanceSpotlight );
spotlight2.castShadow = true; // default false

//Set up shadow properties for the light
spotlight2.shadow.mapSize.width = 1024;
spotlight2.shadow.mapSize.height = 1024;

spotlight2.shadow.camera.near = 0.5;
spotlight2.shadow.camera.far = 60;
spotlight2.shadow.camera.fov = 20;
scene.add( spotlight2 );

//Create a SpotLight and turn on shadows for the light
const spotlight3 = new THREE.SpotLight( 0xffffff , 0.5);
spotlight3.position.set( 20, heightSpotlight, distanceSpotlight - 5 );
spotlight3.castShadow = true; // default false

//Set up shadow properties for the light
spotlight3.shadow.mapSize.width = 1024;
spotlight3.shadow.mapSize.height = 1024;

spotlight3.shadow.camera.near = 0.5;
spotlight3.shadow.camera.far = 60;
spotlight3.shadow.camera.fov = 20;
scene.add( spotlight3 );

// //Create a helper for the shadow camera (optional)
// const helperSpotLight = new THREE.CameraHelper( spotlight.shadow.camera );
// scene.add( helperSpotLight );

// //Create a helper for the shadow camera (optional)
// const helperSpotLight2 = new THREE.CameraHelper( spotlight2.shadow.camera );
// scene.add( helperSpotLight2 );

// const helperSpotLight3 = new THREE.CameraHelper( spotlight3.shadow.camera );
// scene.add( helperSpotLight3 );

//Create a ground that receives shadows (but does not cast them)
const groundGeometry = new THREE.BoxGeometry( 35, 5, 35 );
const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x049ef4,
    emissive: 0x000000,
    roughness: 0,
    metalness: 0.5
});
const ground = new THREE.Mesh( groundGeometry, groundMaterial );
ground.position.y = -10;
ground.castShadow = true; //default is false
ground.receiveShadow = true; //default
scene.add( ground );

var clock = new THREE.Clock;

//Moon1
const moon1Speed = 1.8;
const moon1Size = 0.6;
const moon1Orbit = 5.5;

//Moon2
const moon2Speed = -0.7;
const moon2Size = 1;
const moon2Orbit = moon1Orbit + 3;

//Moon3
const moon3Speed = 0.4;
const moon3Size = 0.7;
const moon3Orbit = moon2Orbit + 3;

//Mooon4
const moon4Speed = -0.16;
const moon4Size = 0.7;
const moon4Orbit = moon3Orbit + 3;

//Milk Way
const estrelaGeometry = new THREE.SphereGeometry(320, 64, 64);
const estrelaMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('../img/star_texture.jpg'),
    side: THREE.BackSide
});
const estrelaMesh = new THREE.Mesh(estrelaGeometry, estrelaMaterial);
scene.add(estrelaMesh);

//Jupiter
const jupiterGeometry = new THREE.SphereGeometry(4, 64, 64);
const jupiterMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load('../img/jupiterTexture.jpg')
});
const jupiterMesh = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
jupiterMesh.castShadow = true; //default is false
jupiterMesh.receiveShadow = false; //default
scene.add(jupiterMesh);

//Moon1
const moon1Geometry = new THREE.SphereGeometry(moon1Size, 32, 32);
const moon1Material = new THREE.MeshStandardMaterial({
    map: textureLoader.load('../img/moon1_texture.jpg')
});
const moon1Mesh = new THREE.Mesh(moon1Geometry, moon1Material);
moon1Mesh.position.set(moon1Orbit, 0, 0);
moon1Mesh.castShadow = true; //default is false
moon1Mesh.receiveShadow = false; //default
scene.add(moon1Mesh);

//Moon2
const moon2Geometry = new THREE.SphereGeometry(moon2Size, 32, 32);
const moon2Material = new THREE.MeshStandardMaterial({
    map: textureLoader.load('../img/moon2_texture.jpg')
});
const moon2Mesh = new THREE.Mesh(moon2Geometry, moon2Material);
moon2Mesh.position.set(moon2Orbit, 0, 0);
moon2Mesh.castShadow = true; //default is false
moon2Mesh.receiveShadow = false; //default
scene.add(moon2Mesh);

//Moon3
const moon3Geometry = new THREE.SphereGeometry(moon3Size, 32, 32);
const moon3Material = new THREE.MeshStandardMaterial({
    map: textureLoader.load('../img/moon3_texture.jpg')
});
const moon3Mesh = new THREE.Mesh(moon3Geometry, moon3Material);
moon3Mesh.position.set(moon3Orbit, 0, 0);
moon3Mesh.castShadow = true; //default is false
moon3Mesh.receiveShadow = false; //default
scene.add(moon3Mesh);

//Moon4
const moon4Geometry = new THREE.SphereGeometry(moon4Size, 32, 32);
const moon4Material = new THREE.MeshStandardMaterial({
    map: textureLoader.load('../img/moon4_texture.jpg')
});
const moon4Mesh = new THREE.Mesh(moon4Geometry, moon4Material);
moon4Mesh.position.set(moon4Orbit, 0, 0);
moon4Mesh.castShadow = true; //default is false
moon4Mesh.receiveShadow = false; //default
scene.add(moon4Mesh);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

//controls.update() must be called after any manual changes to the camera's transform
controls.update();

function animate() {

    let time = clock.getElapsedTime();

    // Orbita da lua 1 em torno de Jupiter
    moon1Mesh.position.x = -Math.cos(time * moon1Speed) * moon1Orbit;
    moon1Mesh.position.z = -Math.sin(time * moon1Speed) * moon1Orbit;
    moon1Mesh.rotation.y += 0.02;
    // Orbita da lua 2 em torno de Jupiter
    moon2Mesh.position.x = -Math.cos(time * moon2Speed) * moon2Orbit;
    moon2Mesh.position.z = -Math.sin(time * moon2Speed) * moon2Orbit;
    moon2Mesh.rotation.y += 0.02;

    // Orbita da lua 3 em torno de Jupiter
    moon3Mesh.position.x = -Math.cos(time * moon3Speed) * moon3Orbit;
    moon3Mesh.position.z = -Math.sin(time * moon3Speed) * moon3Orbit;
    moon3Mesh.rotation.y += 0.02;

    // Orbita da lua 4 em torno de Jupiter
    moon4Mesh.position.x = -Math.cos(time * moon4Speed) * moon4Orbit;
    moon4Mesh.position.z = -Math.sin(time * moon4Speed) * moon4Orbit;
    moon4Mesh.rotation.y += 0.02;

    jupiterMesh.rotation.y += 0.01;

    requestAnimationFrame(animate);

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    renderer.render(scene, camera);

}

animate();

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);