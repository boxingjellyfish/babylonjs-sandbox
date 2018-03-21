/// <reference path="../node_modules/babylonjs/babylon.d.ts" />
/// <reference path="../node_modules/babylonjs-gui/babylon.gui.d.ts" />

class Game {
    private canvas: HTMLCanvasElement;
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;

    constructor(canvasElement: string) {
        // Create canvas and engine
        this.canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this.engine = new BABYLON.Engine(this.canvas, true);

        // Listen for browser/canvas resize events
        window.addEventListener("resize", () => {
            this.engine.resize();
        });

        // Disable right click
        this.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        };

        this.scene = this.createScene1();
    }

    createScene1(): BABYLON.Scene {
        // create a basic BJS Scene object
        let scene = new BABYLON.Scene(this.engine);
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        let camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

        // target the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // attach the camera to the canvas
        camera.attachControl(this.canvas, false);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        //this.light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(1, 10, 1), scene);

        // create a built-in "sphere" shape; with 16 segments and diameter of 2
        let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { segments: 16, diameter: 2 }, scene);

        // move the sphere upward 1/2 of its height
        sphere.position.y = 1;

        // create a built-in "ground" shape
        let ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6, subdivisions: 2 }, scene);

        // GUI
        let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        let button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Change Scene");
        button1.width = "220px";
        button1.height = "40px";
        button1.color = "white";
        button1.background = "blue";
        button1.top = "20px";
        button1.left = "20px";
        button1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        button1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        button1.onPointerUpObservable.add(() => {
            this.scene.dispose();
            this.scene = this.createScene2();
        });
        advancedTexture.addControl(button1);

        let button2 = BABYLON.GUI.Button.CreateSimpleButton("but2", "Debug");
        button2.width = "220px";
        button2.height = "40px";
        button2.color = "white";
        button2.background = "orange";
        button2.top = "-20px";
        button2.left = "20px";
        button2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        button2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        button2.onPointerUpObservable.add(() => {
            if (scene.debugLayer.isVisible()) {
                scene.debugLayer.hide();
            } else {
                scene.debugLayer.show();
            }
        });
        advancedTexture.addControl(button2);

        return scene;
    }

    createScene2(): BABYLON.Scene {
        // create a basic BJS Scene object
        let scene = new BABYLON.Scene(this.engine);
        scene.clearColor = new BABYLON.Color4(0.5, 0.5, 0.5, 1);

        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        let camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -20), scene);

        // target the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // attach the camera to the canvas
        camera.attachControl(this.canvas, false);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 1), scene);
        //this.light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(5, 10, 2), scene);

        // create a built-in "sphere" shape; with 16 segments and diameter of 2
        let sphere = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);

        // move the sphere upward 1/2 of its height
        sphere.position.y = 1;

        // create a built-in "ground" shape
        let ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6, subdivisions: 2 }, scene);

        // GUI
        let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        let button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Change Scene");
        button1.width = "220px";
        button1.height = "40px";
        button1.color = "white";
        button1.background = "green";
        button1.top = "20px";
        button1.left = "-20px";
        button1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        button1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        button1.onPointerUpObservable.add(() => {
            this.scene.dispose();
            this.scene = this.createScene1();
        });
        advancedTexture.addControl(button1);

        let button2 = BABYLON.GUI.Button.CreateSimpleButton("but2", "Debug");
        button2.width = "220px";
        button2.height = "40px";
        button2.color = "white";
        button2.background = "orange";
        button2.top = "-20px";
        button2.left = "20px";
        button2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        button2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        button2.onPointerUpObservable.add(() => {
            if (scene.debugLayer.isVisible()) {
                scene.debugLayer.hide();
            } else {
                scene.debugLayer.show();
            }
        });
        advancedTexture.addControl(button2);

        return scene;
    }

    run(): void {
        // run the render loop
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }
}

// Create the game using the "renderCanvas"
let game = new Game("renderCanvas");
console.log("Game object created")

// start animation
game.run();
console.log("Run started")