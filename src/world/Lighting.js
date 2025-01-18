import * as THREE from 'three';

export default class Lighting {
	D = 200;

	constructor() {
		this.hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
		this.hemiLight.color.setHSL(0.6, 0.75, 0.5);
		this.hemiLight.groundColor.setHSL(0.095, 0.5, 0.5);
		this.hemiLight.position.set(0, 500, 0);

		this.dirLight = new THREE.DirectionalLight(0xffffff, 1);
		this.dirLight.position.set(1, 7, 1);
		this.dirLight.position.multiplyScalar(50);
		this.dirLight.intensity = 2;

		this.dirLight.castShadow = true;
		this.dirLight.shadow.bias = -0.0001;
		this.dirLight.shadow.mapSize.x = 1024;
		this.dirLight.shadow.mapSize.y = 1024;
		this.dirLight.shadow.camera.far = 1000;
		this.dirLight.shadow.camera.near = 1;
		this.dirLight.shadow.camera.left = -this.D;
		this.dirLight.shadow.camera.right = this.D;
		this.dirLight.shadow.camera.top = this.D;
		this.dirLight.shadow.camera.bottom = -this.D;

		this.vertexShader = document.getElementById('vertexShader').textContent;
		this.fragmentShader = document.getElementById('fragmentShader').textContent;

		this.uniforms = {
			topColor:    { type: "c", value: new THREE.Color(0x0077ff) },
			bottomColor: { type: "c", value: new THREE.Color(0xffffff) },
			offset:      { type: "f", value: 33 },
			exponent:    { type: "f", value: 0.6 }
		}
		this.uniforms.topColor.value.copy(this.hemiLight.color);
	}

	instance() {
		return (this.hemiLight, this.dirLight);
	}
}
