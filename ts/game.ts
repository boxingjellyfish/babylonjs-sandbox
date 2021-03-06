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
        //let camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
        //let camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 5, -10), scene);
        let camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, Math.PI / 4, 10, new BABYLON.Vector3(0, 0, 0), scene);

        // target the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // attach the camera to the canvas
        camera.attachControl(this.canvas, false);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        let light = new BABYLON.HemisphericLight("HemisphericLight", new BABYLON.Vector3(0, 1, 0), scene);
        //let light = new BABYLON.PointLight("PointLight", new BABYLON.Vector3(5, 10, 2), scene);

        // Sphere material creation
        let sphereMaterial = new BABYLON.StandardMaterial("Material", scene)
        sphereMaterial.diffuseColor = new BABYLON.Color3(0.5, 0, 0);
        sphereMaterial.specularColor = new BABYLON.Color3(0.5, 0, 0);
        //sphereMaterial.emissiveColor = new BABYLON.Color3(0.5, 0, 0);
        //sphereMaterial.ambientColor = new BABYLON.Color3(0.5, 0, 0);

        // create a built-in "sphere" shape; with 16 segments and diameter of 2
        let sphere = BABYLON.MeshBuilder.CreateSphere("Sphere", { segments: 16, diameter: 2 }, scene);
        sphere.material = sphereMaterial;

        // move the sphere upward 1/2 of its height
        sphere.position.y = 1;

        // Ground material creation
        let groundMaterial = new BABYLON.StandardMaterial("Material", scene)
        groundMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0.5);
        groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0.5);
        //groundMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0.5);
        groundMaterial.ambientColor = new BABYLON.Color3(0, 0, 0.5);

        // create a built-in "ground" shape
        let ground = BABYLON.MeshBuilder.CreateGround("Ground", { width: 6, height: 6, subdivisions: 2 }, scene);
        ground.material = groundMaterial;

        // add gui layer
        this.createUI(scene);

        // Sphere basic animation
        let sphereAnimatable = BABYLON.Animation.CreateAndStartAnimation("SphereScale", sphere, "scaling", 30, 90, new BABYLON.Vector3(1.0, 1.0, 1.0), new BABYLON.Vector3(2.0, 2.0, 2.0));
        sphereAnimatable.pause();

        //When click event is raised
        window.addEventListener("click", function () {
            // We try to pick an object
            let pickResult = scene.pick(scene.pointerX, scene.pointerY);
            if (pickResult.hit && pickResult.pickedMesh.name == "Sphere") {
                sphereAnimatable.restart();
            }
        });

        return scene;
    }

    createScene2(): BABYLON.Scene {
        // create a basic BJS Scene object
        let scene = new BABYLON.Scene(this.engine);
        scene.clearColor = new BABYLON.Color4(0.25, 0.25, 0.25, 1);

        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        //let camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
        //let camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 5, -10), scene);
        let camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, Math.PI / 4, 10, new BABYLON.Vector3(0, 0, 0), scene);

        // target the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // attach the camera to the canvas
        camera.attachControl(this.canvas, false);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        //let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 1), scene);
        let light = new BABYLON.PointLight("PointLight", new BABYLON.Vector3(5, 10, 2), scene);

        // Box material creation
        let boxMaterial = new BABYLON.StandardMaterial("Material", scene)
        boxMaterial.diffuseColor = new BABYLON.Color3(0, 0.5, 0);
        boxMaterial.specularColor = new BABYLON.Color3(0, 0.5, 0);
        //boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.5, 0);
        //boxMaterial.ambientColor = new BABYLON.Color3(0, 0.5, 0);

        // create a built-in "box" shape
        let box = BABYLON.MeshBuilder.CreateBox("Box", { size: 2 }, scene);
        box.material = boxMaterial;

        // move the box upward 1/2 of its height
        box.position.y = 1;

        // Ground material creation
        let groundMaterial = new BABYLON.StandardMaterial("Material", scene)
        groundMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0.5);
        groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0.5);
        //groundMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0.5);
        groundMaterial.ambientColor = new BABYLON.Color3(0, 0, 0.5);

        // create a built-in "ground" shape
        let ground = BABYLON.MeshBuilder.CreateGround("Ground", { width: 6, height: 6, subdivisions: 2 }, scene);
        ground.material = groundMaterial;

        // add gui layer
        this.createUI(scene);

        // Box animation
        // An array with all animation keys
        let keys = [];
        keys.push({
            frame: 0,
            value: new BABYLON.Vector3(1.0, 1.0, 1.0)
        });
        keys.push({
            frame: 30,
            value: new BABYLON.Vector3(1.2, 1.2, 1.2)
        });
        keys.push({
            frame: 60,
            value: new BABYLON.Vector3(1.0, 1.0, 1.0)
        });

        let animationBox = new BABYLON.Animation("myAnimation", "scaling", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        animationBox.setKeys(keys);

        // Creating an easing function
        let easingFunction = new BABYLON.QuadraticEase();
        easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        animationBox.setEasingFunction(easingFunction)

        box.animations = [];
        box.animations.push(animationBox);

        let boxAnimatable = scene.beginAnimation(box, 0, 60, true);

        //When click event is raised
        window.addEventListener("click", function () {
            // We try to pick an object
            let pickResult = scene.pick(scene.pointerX, scene.pointerY);
            if (pickResult.hit && pickResult.pickedMesh.name == "Box") {
                boxAnimatable.reset();
            }
        });

        return scene;
    }

    createUI(scene: BABYLON.Scene): void {
        let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        let buttonHoverSound = new BABYLON.Sound("buttonHoverSound", "snd/beep-29.wav", scene);
        let buttonClickSound = new BABYLON.Sound("buttonClickSound", "snd/button-35.wav", scene);

        let btnScene1 = BABYLON.GUI.Button.CreateSimpleButton("btnScene1", "S1");
        btnScene1.width = "100px";
        btnScene1.height = "40px";
        btnScene1.color = "white";
        btnScene1.background = "grey";
        btnScene1.top = "20px";
        btnScene1.left = "20px";
        btnScene1.fontFamily = "Share Tech Mono";
        //btnScene1.fontFamily = "Nova Mono";
        btnScene1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        btnScene1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        btnScene1.onPointerUpObservable.add(() => {
            buttonClickSound.play();
            var handle = window.setTimeout(() => {
                this.scene.dispose();
                this.scene = this.createScene1();
            }, 200);
        });
        btnScene1.onPointerEnterObservable.add(() => {
            buttonHoverSound.play();
        });
        advancedTexture.addControl(btnScene1);

        let btnScene2 = BABYLON.GUI.Button.CreateSimpleButton("btnScene2", "S2");
        btnScene2.width = "100px";
        btnScene2.height = "40px";
        btnScene2.color = "white";
        btnScene2.background = "grey";
        btnScene2.top = "20px";
        btnScene2.left = "140px";
        btnScene2.fontFamily = "Share Tech Mono";
        //btnScene2.fontFamily = "Nova Mono";
        btnScene2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        btnScene2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        btnScene2.onPointerUpObservable.add(() => {
            buttonClickSound.play();
            var handle = window.setTimeout(() => {
                this.scene.dispose();
                this.scene = this.createScene2();
            }, 200);
        });
        btnScene2.onPointerEnterObservable.add(() => {
            buttonHoverSound.play();
        });
        advancedTexture.addControl(btnScene2);

        let btnDebug = BABYLON.GUI.Button.CreateSimpleButton("btnDebug", "Debug");
        btnDebug.width = "100px";
        btnDebug.height = "40px";
        btnDebug.color = "white";
        btnDebug.background = "grey";
        btnDebug.top = "-20px";
        btnDebug.left = "20px";
        btnDebug.fontFamily = "Share Tech Mono";
        //btnDebug.fontFamily = "Nova Mono";
        btnDebug.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        btnDebug.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        btnDebug.onPointerUpObservable.add(() => {
            buttonClickSound.play();
            if (scene.debugLayer.isVisible()) {
                scene.debugLayer.hide();
            } else {
                scene.debugLayer.show();
            }
        });
        btnDebug.onPointerEnterObservable.add(() => {
            buttonHoverSound.play();
        });
        advancedTexture.addControl(btnDebug);
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