import Camera from './camera/camera';
import Controls from './controls/controls';
import Sky from './models/sky/sky';
import Sun from './models/sun/sun';
import Water from './models/water/water';
import Renderer from './renderer/renderer';
import Scene from './scene/scene';

export default class LoginApp {
    private readonly renderer: Renderer;
    private readonly scene: Scene;
    private readonly camera: Camera;
    private readonly controls: Controls;
    private readonly sun: Sun;
    private readonly water: Water;
    private readonly sky: Sky;

    constructor(ref: HTMLDivElement) {
        this.renderer = new Renderer(ref);
        this.scene = new Scene();
        this.camera = new Camera();
        this.controls = new Controls(this.camera, this.renderer.domElement);

        // models
        this.sun = new Sun(this.renderer);
        this.water = new Water();
        this.scene.add(this.water);

        this.sky = new Sky();
        this.scene.add(this.sky);
    }

    onResize = (): void => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    animate = (): void => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.water.material.uniforms['time'].value += 1.0 / 60.0;
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate);
    };

    start = (): void => {
        this.sun.update();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.sky.material.uniforms['sunPosition'].value.copy(this.sun);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.water.material.uniforms['sunDirection'].value.copy(this.sun).normalize();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.scene.environment = this.sun.pmremGenerator.fromScene(this.sky).texture;

        this.animate();
        window.addEventListener('resize', this.onResize);
    };

    unsubscribe = (): void => {
        this.animate = () => undefined;
        window.removeEventListener('resize', this.onResize);
    };
}
