import * as THREE from 'three';

import { Water as WaterThree } from '../../lib/Water';

export default class Sun extends WaterThree {
    constructor() {
        super(new THREE.PlaneGeometry(10000, 10000), {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load('/waternormals.jpeg', function (texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            }),
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
        });

        this.rotation.x = -Math.PI / 2;
    }
}
