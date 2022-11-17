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
    500
);
camera.position.set(50, 10, 0);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

// // DirectionalLight
// const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
// directionalLight.position.set(0, 10, 5);
// directionalLight.castShadow = true; // default false
// scene.add( directionalLight )

// //Set up shadow properties for the light
// directionalLight.shadow.mapSize.width = 512; // default
// directionalLight.shadow.mapSize.height = 512; // default
// directionalLight.shadow.camera.near = 0.5; // default
// directionalLight.shadow.camera.far = 500; // default

const textureLoader = new THREE.TextureLoader();

const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);

// //Create a helper for the shadow camera (optional)
// const helper = new THREE.CameraHelper( directionalLight.shadow.camera );
// scene.add( helper );

// // SpotLight
// const spotLight = new THREE.SpotLight( 0xffffff );
// spotLight.position.set(0, 10, -5);
// spotLight.castShadow = true;

// spotLight.shadow.mapSize.width = 1024;
// spotLight.shadow.mapSize.height = 1024;

// spotLight.shadow.camera.near = 0.5;
// spotLight.shadow.camera.far = 50;
// spotLight.shadow.camera.fov = 20;

// scene.add( spotLight );

// //Create a helper for the shadow camera (optional)
// const helperSpotLight = new THREE.CameraHelper( spotLight.shadow.camera );
// scene.add( helperSpotLight );

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

// //Create a ground that receives shadows (but does not cast them)
// const groundGeometry = new THREE.BoxGeometry( 30, 0.15, 50 );
// const groundMaterial = new THREE.MeshStandardMaterial({
//     color: 0x049ef4,
//     emissive: 0x000000, 
//     roughness: 0,
//     metalness: 0.5
// });
// const ground = new THREE.Mesh( groundGeometry, groundMaterial );
// ground.position.y = -10;
// ground.castShadow = false; //default is false
// ground.receiveShadow = true; //default
// scene.add( ground );

var clock = new THREE.Clock;

//Moon1
const moon1Speed = 1.5;
const moon1Size = 2.5;
const moon1Orbit = 20;

//Moon2
const moon2Speed = 0.8;
const moon2Size = 3.2;
const moon2Orbit = 30;

//Moon3
const moon3Speed = 0.4;
const moon3Size = 2.8;
const moon3Orbit = 40;

//Mooon4
const moon4Speed = 0.2;
const moon4Size = 3.6;
const moon4Orbit = 50;

const estrelaGeometry = new THREE.SphereGeometry(240, 64, 64);
const estrelaMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load('../img/star_texture.jpg'),
    side: THREE.BackSide
});
const estrelaMesh = new THREE.Mesh(estrelaGeometry, estrelaMaterial);
scene.add(estrelaMesh);

//Jupiter
const jupiterGeometry = new THREE.SphereGeometry(10, 64, 64);
const jupiterMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load('../img/jupiterTexture.jpg')
});

const jupiterMesh = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
scene.add(jupiterMesh);

//Moon1
const moon1Geometry = new THREE.SphereGeometry(moon1Size, 32, 32);
const moon1Material = new THREE.MeshStandardMaterial({
    map: textureLoader.load('../img/moon1_texture.jpg')
});
const moon1Mesh = new THREE.Mesh(moon1Geometry, moon1Material);
moon1Mesh.position.set(moon1Orbit, 0, 0);
scene.add(moon1Mesh);

//Moon2
const moon2Geometry = new THREE.SphereGeometry(moon2Size, 32, 32);
const moon2Material = new THREE.MeshStandardMaterial({
    map: textureLoader.load('../img/moon2_texture.jpg')
});
const moon2Mesh = new THREE.Mesh(moon2Geometry, moon2Material);
moon2Mesh.position.set(moon2Orbit, 0, 0);
scene.add(moon2Mesh);

//Moon3
const moon3Geometry = new THREE.SphereGeometry(moon3Size, 32, 32);
const moon3Material = new THREE.MeshStandardMaterial({
    map: textureLoader.load('../img/moon3_texture.jpg')
});
const moon3Mesh = new THREE.Mesh(moon3Geometry, moon3Material);
moon3Mesh.position.set(moon3Orbit, 0, 0);
scene.add(moon3Mesh);

//Moon4
const moon4Geometry = new THREE.SphereGeometry(moon4Size, 32, 32);
const moon4Material = new THREE.MeshStandardMaterial({
    map: textureLoader.load('../img/moon4_texture.jpg')
});
const moon4Mesh = new THREE.Mesh(moon4Geometry, moon4Material);
moon4Mesh.position.set(moon4Orbit, 0, 0);
scene.add(moon4Mesh);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

//controls.update() must be called after any manual changes to the camera's transform
controls.update();

function animate() {

    // box.rotation.x += 0.01;
    // box.rotation.y += 0.02;
    // box.rotation.z += 0.03;

    let time = clock.getElapsedTime();

    // Orbita da lua 1 em torno de Jupiter
    moon1Mesh.position.x = -Math.cos(time * moon1Speed) * moon1Orbit;
    moon1Mesh.position.z = -Math.sin(time * moon1Speed) * moon1Orbit;

    // Orbita da lua 2 em torno de Jupiter
    moon2Mesh.position.x = -Math.cos(time * moon2Speed) * moon2Orbit;
    moon2Mesh.position.z = -Math.sin(time * moon2Speed) * moon2Orbit;

    // Orbita da lua 3 em torno de Jupiter
    moon3Mesh.position.x = -Math.cos(time * moon3Speed) * moon3Orbit;
    moon3Mesh.position.z = -Math.sin(time * moon3Speed) * moon3Orbit;

    // Orbita da lua 4 em torno de Jupiter
    moon4Mesh.position.x = -Math.cos(time * moon4Speed) * moon4Orbit;
    moon4Mesh.position.z = -Math.sin(time * moon4Speed) * moon4Orbit;

    jupiterMesh.rotation.y += 0.005;

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