import three from 'three.js';

import scene from './utils/scene';
import camera from './utils/camera';
import renderer from './utils/renderer';

// dynamic import
var OBJLoader;
import('https://unpkg.com/three@0.125.2/examples/jsm/loaders/OBJLoader.js').then(controls => { 
    console.log("Ready to use OBJLoader");
    OBJLoader = controls.OBJLoader;
});





class Main {
    constructor() {
        this.scene = new scene();
        console.log(this.scene);
        this.camera = new camera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        var sceneDoom = document.getElementById("scene");
        this.renderer = new renderer();
        this.renderer.setSize(sceneDoom.clientWidth, sceneDoom.clientWidth);
        sceneDoom.appendChild(this.renderer.domElement);

        this.interval = null;
        this.listeners();

        console.log("Scene Ready");
    }


    listeners() {
        window.addEventListener('resize', this.onWindowResize, false);

        window.addEventListener('keydown', (event) => {
            this.keydown(event);
        }, false);


        // Start animate event
        document.getElementById("startRender").addEventListener("click", () => {
            this.startRender();
            this.animate();
        });

        // Stop animate event
        document.getElementById("stopRender").addEventListener("click", () => {
            this.stopRender();
            this.stopAnimate();
        });

        // Add Cube
        document.getElementById("addCube").addEventListener("click", () => {
            this.addBlenderHuman();
        });


    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    keydown(event) {
        switch (event.keyCode) {
            case 37:
                this.camera.position.x -= 0.1;
                break;
            case 38:
                this.camera.position.y += 0.1;
                break;
            case 39:
                this.camera.position.x += 0.1;
                break;
            case 40:
                this.camera.position.y -= 0.1;
                break;
        }
    }

    startRender() {
        this.interval = setInterval(() => {
            this.renderer.render(this.scene, this.camera);
        }, 1000 / 60);
    }
    stopRender() {
        clearInterval(this.interval);
    }
    animate() {        
        requestAnimationFrame(this.animate.bind(this));
    }

    stopAnimate() {
        cancelAnimationFrame(this.animate.bind(this));
    }

    addBlenderHuman() {
        const loader = new OBJLoader();
        var addObject = null;
        const interval = setInterval(() => {
            if (addObject) {
                clearInterval(interval);
                addObject.traverse( function ( child ) {

                    if ( child.isMesh ) child.material.map = texture;

                } );
                this.scene.add(addObject);
            }
        }, 5);
        // load a resource
        loader.load(
            // resource URL
            'dist/male02.obj',
            // called when resource is loaded
            function ( object ) {
                console.log(object);
                //this.scene.add(object);
                addObject = object;
            },
            // called when loading is in progresses
            function ( xhr ) {
        
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        
            },
            // called when loading has errors
            function ( error ) {
        
                console.log( 'An error happened', error );
        
            }
        )
    }

    addMesh() {
        const geometry = new three.BoxGeometry(1, 1, 1);
        const material = new three.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new three.Mesh(geometry, material);
        this.scene.add(cube);
    }

}

const main = new Main();

