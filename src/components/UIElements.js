export default class UIElements {
	constructor() {
		this.positionText = document.getElementById('position-text');
	}

	init(scene, camera) {
		this._scene = scene;
		this._camera = camera;

		document.addEventListener('mousemove', this._updateCameraPositionText.bind(this));
	}

	_updateCameraPositionText() {
		this.positionText.innerHTML = `${this._camera.position.x.toFixed(2)}, ${this._camera.position.y.toFixed(2)}, ${this._camera.position.z.toFixed(2)}`;
	}
}
