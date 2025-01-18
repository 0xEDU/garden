import * as THREE from 'three';

export default class Lighting {
	D = 300;

	constructor() {
		this.hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
		this.hemiLight.color.setHSL(0.6, 0.75, 0.5);
		this.hemiLight.groundColor.setHSL(0.095, 0.5, 0.5);
		this.hemiLight.position.set(0, 500, 0);
		this.hemiLight.castShadow = true;

		this.dirLight = new THREE.DirectionalLight(0xffffff, 1);
		this.dirLight.position.set(1, 0.75, 0);
		this.dirLight.position.multiplyScalar(50);
		this.dirLight.shadowCameraVisible = true;
		this.dirLight.intensity = 10;
		this.dirLight.shadowDarkness = 0.7;
		this.dirLight.castShadow = true;
		this.dirLight.shadowMapWidth = this.dirLight.shadowMapHeight = 1024 * 2;
		this.dirLight.shadowCameraFar = 3500;
		this.dirLight.shadowBias = -0.0001;
		this.dirLight.shadowDarkness = 0.35;

		this.dirLight.shadowCameraLeft = -this.D;
		this.dirLight.shadowCameraRight = this.D;
		this.dirLight.shadowCameraTop = this.D;
		this.dirLight.shadowCameraBottom = -this.D;

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
