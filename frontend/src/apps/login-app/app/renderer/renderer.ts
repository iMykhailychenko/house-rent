import * as THREE from 'three';

export default class Renderer extends THREE.WebGLRenderer {
    constructor(ref: HTMLDivElement) {
        super();
        this.setPixelRatio(window.devicePixelRatio);
        this.setSize(window.innerWidth, window.innerHeight);
        this.toneMapping = THREE.ACESFilmicToneMapping;

        ref.innerHTML = '';
        ref.appendChild(this.domElement);
    }
}
