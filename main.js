// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { GUI } from 'https://cdn.jsdelivr.net/npm/lil-gui@0.17/+esm';


// // Create a scene
// const scene = new THREE.Scene();

// // Create a camera
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
// camera.position.z = 5;

// // Create a renderer
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);


// //
// let light =new THREE.AmbientLight(0xffffff,0.5);
// scene.add(light);

// let directionalLight =new THREE.DirectionalLight(0xffffff,0.5);
// directionalLight.position.set(1,1,1);
// scene.add(directionalLight);




// let loader= new THREE.TextureLoader();
// let color=loader.load('./text/paper_0025_color_1k.jpg');
// let roughness=loader.load('./text/paper_0025_roughness_1k.jpg');
// let normal=loader.load('./text/paper_0025_normal_opengl_1k.png');
// let height=loader.load('./text/paper_0025_height_1k.jpg');


// // Create a box geometry
// const geometry = new THREE.BoxGeometry(3, 1.8, 2);

// // Create a mesh basic material
// const material = new THREE.MeshStandardMaterial({ map: color, roughnessMap: roughness, normalMap: normal, heightMap: height });

// // Create a mesh with the geometry and material
// const cube = new THREE.Mesh(geometry, material);

// // Add the cube to the scene
// scene.add(cube);

// // Create OrbitControls
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true; // Add smooth damping effect
// controls.dampingFactor = 0.05;
// controls.rotateSpeed = 0.5;

// // Function to handle window resize
// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight; // Existing line
//   camera.updateProjectionMatrix(); // Existing line
//   renderer.setSize(window.innerWidth, window.innerHeight); // Existing line
// }

// // Add event listener for window resize
// window.addEventListener('resize', onWindowResize);

// // Initial call to set the correct size
// onWindowResize();

// // Import GUI from lil-gui

// // Create GUI
// const gui = new GUI();

// // Material settings
// const materialFolder = gui.addFolder('Material');
// materialFolder.add(material, 'wireframe');
// materialFolder.add(material, 'flatShading').onChange(() => material.needsUpdate = true);
// materialFolder.add(material, 'roughness', 0, 1);
// materialFolder.add(material, 'metalness', 0, 1);
// materialFolder.addColor(material, 'color');

// // Normal map settings
// const normalScaleFolder = materialFolder.addFolder('Normal Scale');
// normalScaleFolder.add(material.normalScale, 'x', 0, 1).name('X');
// normalScaleFolder.add(material.normalScale, 'y', 0, 1).name('Y');

// // Height map settings
// materialFolder.add(material, 'displacementScale', 0, 1);
// materialFolder.add(material, 'displacementBias', -1, 1);

// // Mesh settings
// const meshFolder = gui.addFolder('Mesh');
// meshFolder.add(cube.rotation, 'x', 0, Math.PI * 2);
// meshFolder.add(cube.rotation, 'y', 0, Math.PI * 2);
// meshFolder.add(cube.rotation, 'z', 0, Math.PI * 2);
// meshFolder.add(cube.position, 'x', -5, 5);
// meshFolder.add(cube.position, 'y', -5, 5);
// meshFolder.add(cube.position, 'z', -5, 5);
// meshFolder.add(cube.scale, 'x', 0.1, 2);
// meshFolder.add(cube.scale, 'y', 0.1, 2);
// meshFolder.add(cube.scale, 'z', 0.1, 2);

// // Function to stop auto-rotation
// function stopAutoRotation() {
//     cube.rotation.x = cube.rotation.x;
//     cube.rotation.y = cube.rotation.y;
// }

// // Add event listeners to stop auto-rotation when GUI is interacted with
// gui.domElement.addEventListener('mousedown', stopAutoRotation);
// gui.domElement.addEventListener('touchstart', stopAutoRotation);


// // Animation loop
// function animate() {
//   requestAnimationFrame(animate);

//   // Rotate the cube
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;

//   renderer.render(scene, camera);
//   controls.update();
// }

// animate();

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;

// Set up camera position
camera.position.z = 5;

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Load HDRI environment map
new RGBELoader()
    // Update this path
    .load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/modern_buildings_2_1k.hdr', function(texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
    });

    const loader = new GLTFLoader();
    loader.load('box_stylized.glb', function(gltf) {
        scene.add(gltf.scene);
    }, undefined, undefined, function(error) {
        console.error(error);
    });
// Add a simple cube to the scene
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Handle window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
