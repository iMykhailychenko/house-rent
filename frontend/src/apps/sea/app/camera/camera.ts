import * as THREE from 'three';

export default class Camera extends THREE.PerspectiveCamera {
    constructor() {
        super(55, window.innerWidth / window.innerHeight, 1, 20000);
        this.position.set(30, 30, 100);
    }
}
