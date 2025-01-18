import * as THREE from 'three';

import UIElements from './components/UIElements.js';
import Camera from './core/Camera.js';
import Loader from './core/Loader.js';
import Floor from './world/Floor.js';
import Lighting from './world/Lighting.js';
import Sky from './world/Sky.js';

const lighting = new Lighting();
const sky = new Sky(lighting);
const loader = new Loader();
const floor = new Floor();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const camera = new Camera(renderer);
camera.initialPosition(20);
renderer.domElement.addEventListener('click', () => {
	camera.lockControls();
});

const scene = new THREE.Scene();

scene.fog = new THREE.Fog(0x222233, 0, 20000);
renderer.setClearColor(scene.fog.color, 1);
scene.fog.color.copy(lighting.uniforms.bottomColor.value);

scene.add(lighting.instance())
scene.add(sky.instance());
scene.add(floor.instance());

const uiElements = new UIElements();
uiElements.init(scene, camera.instance());

loader.loadObj('tree', scene);

function animate() {
	camera.updateControls();

	renderer.render(scene, camera.instance());
}
renderer.setAnimationLoop(animate);

