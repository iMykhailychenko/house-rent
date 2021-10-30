import * as THREE from 'three';

import { Sky as SkyThree } from '../../lib/Sky';

export default class Sky extends SkyThree {
    constructor() {
        super();
        this.scale.setScalar(10000);
        const skyUniforms = this.material as THREE.Material & { uniforms: { [key: string]: { value: number } } };

        skyUniforms.uniforms['turbidity'].value = 10;
        skyUniforms.uniforms['rayleigh'].value = 2;
        skyUniforms.uniforms['mieCoefficient'].value = 0.005;
        skyUniforms.uniforms['mieDirectionalG'].value = 0.8;
    }
}
