import * as THREE from 'three';
import { Sky as ThreeSky } from 'three/addons/objects/Sky.js';
import { MathUtils } from 'three/src/math/MathUtils.js';

export default class Sky {
	constructor() {
		// const skyGeo = new THREE.SphereGeometry(4000, 32, 15);
		// const skyMat = new THREE.ShaderMaterial({ 
		// 	vertexShader: lighting.vertexShader,
		// 	fragmentShader: lighting.fragmentShader,
		// 	uniforms: lighting.uniforms,
		// 	side: THREE.BackSide 
		// });
		// this.sky = new THREE.Mesh(skyGeo, skyMat);
		// this.sky.material.uniforms.topColor.value.setRGB(0.90,0.90,0.35);
		// this.sky.material.uniforms.bottomColor.value.setRGB(1,1,1);
		
		this.sky = new ThreeSky();
		this.sky.scale.setScalar(450000);

		const phi = MathUtils.degToRad(45);
		const theta = MathUtils.degToRad(180);
		const sunPosition = new THREE.Vector3().setFromSphericalCoords(1, phi, theta);

		this.sky.material.uniforms.sunPosition.value.copy(sunPosition);
	}

	instance() {
		return this.sky;
	}
}
