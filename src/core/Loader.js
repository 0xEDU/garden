import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

export default class Loader {
	constructor() {
		this.objLoader = new OBJLoader();
		this.mtlLoader = new MTLLoader();
	}

	loadObj(obj, scene, position = { x: 0, y: -1.4, z: 0 }) {
		this.mtlLoader.load(
			`/models/${obj}.mtl`,
			(materials) => {
				materials.preload();
				this.objLoader.setMaterials(materials);
			},
			(xhr) => {
				console.log((xhr.loaded / xhr.total * 100) + '% material loaded');
			},
			(error) => {
				console.log('An error happened: ', error);
			}
		)

		this.objLoader.load(
			`/models/${obj}.obj`,
			(object) => {
				object.position.set(position.x, position.y, position.z);
				object.castShadow = true;
				scene.add(object);
			},
			(xhr) => {
				console.log((xhr.loaded / xhr.total * 100) + '% object loaded');
			},
			(error) => {
				console.log('An error happened: ', error);
			}
		)
	}
}
