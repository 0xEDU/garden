import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

export default class Camera {
	FOV = 75;
	NEAR = 0.1;
	FAR = 1000;
	X_VELOCITY = 100.0;
	Z_VELOCITY = 100.0;
	GRAVITY = 9.8;
	MASS = 62.0;

	constructor(renderer) {
		this._camera = new THREE.PerspectiveCamera(this.FOV, window.innerWidth / window.innerHeight, this.NEAR, this.FAR);

		this._prevTime = performance.now();

		this._velocity = new THREE.Vector3();
		this._direction = new THREE.Vector3();

		this._moveForward = false;
		this._moveBackward = false;
		this._moveLeft = false;
		this._moveRight = false;

		this._controls = new PointerLockControls(this._camera, renderer.domElement);

		document.addEventListener('keydown', this.onKeyDown.bind(this));
		document.addEventListener('keyup', this.onKeyUp.bind(this));
	}

	initialPosition(z) {
		this._camera.position.z = z;
	}

	updateControls() {
		const time = performance.now();

		if (this._controls.isLocked) {
			const delta = (time - this._prevTime) / 1000;

			this._velocity.x -= this._velocity.x * this.X_VELOCITY * delta;
			this._velocity.z -= this._velocity.z * this.Z_VELOCITY * delta;

			this._velocity.y -= this.GRAVITY * this.MASS * delta;

			this._direction.z = Number(this._moveForward) - Number(this._moveBackward);
			this._direction.x = Number(this._moveRight) - Number(this._moveLeft);
			this._direction.normalize(); // this ensures consistent movements

			if (this._moveForward || this._moveBackward)
				this._velocity.z -= this._direction.z * 400.0 * delta;
			if (this._moveLeft || this._moveRight)
				this._velocity.x -= this._direction.x * 400.0 * delta;

			this._controls.moveRight(-this._velocity.x * delta);
			this._controls.moveForward(-this._velocity.z * delta);
		}

		this._prevTime = time;
	}

	onKeyDown(event) {
		switch (event.code) {
			case 'KeyW':
				this._moveForward = true;
				break;
			case 'KeyS':
				this._moveBackward = true;
				break;
			case 'KeyA':
				this._moveLeft = true;
				break;
			case 'KeyD':
				this._moveRight = true;
				break;
		}
	}

	onKeyUp(event) {
		switch (event.code) {
			case 'KeyW':
				this._moveForward = false;
				break;
			case 'KeyS':
				this._moveBackward = false;
				break;
			case 'KeyA':
				this._moveLeft = false;
				break;
			case 'KeyD':
				this._moveRight = false;
				break;
		}
	}

	lockControls() {
		this._controls.lock();
	}

	instance() {
		return this._camera;
	}
}
