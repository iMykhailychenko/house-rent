import Camera from '../camera/camera';
import { OrbitControls } from '../lib/OrbitControls';

export default class Controls extends OrbitControls {
    constructor(camera: Camera, domElement: HTMLCanvasElement) {
        super(camera, domElement);

        this.maxPolarAngle = Math.PI * 0.495;
        this.target.set(-20, 40, 0);
        this.minDistance = 40.0;
        this.maxDistance = 200.0;
        this.update();
    }
}
