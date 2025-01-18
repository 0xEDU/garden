import * as THREE from 'three';

export default class Floor {
	constructor() {
		const floorGeometry = new THREE.PlaneGeometry(2000, 2000);
		const floorMaterial = new THREE.MeshPhongMaterial({
			color: 0x009900,
			side: THREE.DoubleSide
		});

		this.floor = new THREE.Mesh(floorGeometry, floorMaterial);
		this.floor.position.y = -1.5;
		this.floor.rotation.x = Math.PI / 2;
		this.floor.receiveShadow = true;
	}
	
	instance() {
		return this.floor;
	}
}
