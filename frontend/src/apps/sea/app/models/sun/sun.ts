import * as THREE from 'three';

import Renderer from '../../renderer/renderer';

export default class Sun extends THREE.Vector3 {
    pmremGenerator: THREE.PMREMGenerator;

    constructor(renderer: Renderer) {
        super();
        this.pmremGenerator = new THREE.PMREMGenerator(renderer);
    }

    update(): void {
        const phi = THREE.MathUtils.degToRad(88);
        const theta = THREE.MathUtils.degToRad(180);

        this.setFromSphericalCoords(1, phi, theta);
    }
}
