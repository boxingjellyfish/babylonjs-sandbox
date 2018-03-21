/// <reference path="../node_modules/babylonjs/babylon.d.ts" />
/// <reference path="../node_modules/babylonjs-gui/babylon.gui.d.ts" />
var Game = /** @class */ (function () {
    function Game(canvasElement) {
        var _this = this;
        // Create canvas and engine
        this.canvas = document.getElementById(canvasElement);
        this.engine = new BABYLON.Engine(this.canvas, true);
        // Listen for browser/canvas resize events
        window.addEventListener("resize", function () {
            _this.engine.resize();
        });
        // Disable right click
        this.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        };
        this.scene = this.createScene1();
    }
    Game.prototype.createScene1 = function () {
        var _this = this;
        // create a basic BJS Scene object
        var scene = new BABYLON.Scene(this.engine);
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);
        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        //let camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
        //let camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 5, -10), scene);
        var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, Math.PI / 4, 10, new BABYLON.Vector3(0, 0, 0), scene);
        // target the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
        // attach the camera to the canvas
        camera.attachControl(this.canvas, false);
        // create a basic light, aiming 0,1,0 - meaning, to the sky
        var light = new BABYLON.HemisphericLight("HemisphericLight", new BABYLON.Vector3(0, 1, 0), scene);
        //let light = new BABYLON.PointLight("PointLight", new BABYLON.Vector3(5, 10, 2), scene);
        // Sphere material creation
        var sphereMaterial = new BABYLON.StandardMaterial("Material", scene);
        sphereMaterial.diffuseColor = new BABYLON.Color3(0.5, 0, 0);
        sphereMaterial.specularColor = new BABYLON.Color3(0.5, 0, 0);
        //sphereMaterial.emissiveColor = new BABYLON.Color3(0.5, 0, 0);
        //sphereMaterial.ambientColor = new BABYLON.Color3(0.5, 0, 0);
        // create a built-in "sphere" shape; with 16 segments and diameter of 2
        var sphere = BABYLON.MeshBuilder.CreateSphere("Sphere", { segments: 16, diameter: 2 }, scene);
        sphere.material = sphereMaterial;
        // move the sphere upward 1/2 of its height
        sphere.position.y = 1;
        // Ground material creation
        var groundMaterial = new BABYLON.StandardMaterial("Material", scene);
        groundMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0.5);
        groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0.5);
        //groundMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0.5);
        groundMaterial.ambientColor = new BABYLON.Color3(0, 0, 0.5);
        // create a built-in "ground" shape
        var ground = BABYLON.MeshBuilder.CreateGround("Ground", { width: 6, height: 6, subdivisions: 2 }, scene);
        ground.material = groundMaterial;
        // GUI
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Change Scene");
        button1.width = "220px";
        button1.height = "40px";
        button1.color = "white";
        button1.background = "blue";
        button1.top = "20px";
        button1.left = "20px";
        button1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        button1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        button1.onPointerUpObservable.add(function () {
            _this.scene.dispose();
            _this.scene = _this.createScene2();
        });
        advancedTexture.addControl(button1);
        var button2 = BABYLON.GUI.Button.CreateSimpleButton("but2", "Debug");
        button2.width = "220px";
        button2.height = "40px";
        button2.color = "white";
        button2.background = "orange";
        button2.top = "-20px";
        button2.left = "20px";
        button2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        button2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        button2.onPointerUpObservable.add(function () {
            if (scene.debugLayer.isVisible()) {
                scene.debugLayer.hide();
            }
            else {
                scene.debugLayer.show();
            }
        });
        advancedTexture.addControl(button2);
        return scene;
    };
    Game.prototype.createScene2 = function () {
        var _this = this;
        // create a basic BJS Scene object
        var scene = new BABYLON.Scene(this.engine);
        scene.clearColor = new BABYLON.Color4(0.25, 0.25, 0.25, 1);
        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        //let camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
        //let camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 5, -10), scene);
        var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, Math.PI / 4, 10, new BABYLON.Vector3(0, 0, 0), scene);
        // target the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
        // attach the camera to the canvas
        camera.attachControl(this.canvas, false);
        // create a basic light, aiming 0,1,0 - meaning, to the sky
        //let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 1), scene);
        var light = new BABYLON.PointLight("PointLight", new BABYLON.Vector3(5, 10, 2), scene);
        // Box material creation
        var boxMaterial = new BABYLON.StandardMaterial("Material", scene);
        boxMaterial.diffuseColor = new BABYLON.Color3(0, 0.5, 0);
        boxMaterial.specularColor = new BABYLON.Color3(0, 0.5, 0);
        //boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.5, 0);
        //boxMaterial.ambientColor = new BABYLON.Color3(0, 0.5, 0);
        // create a built-in "box" shape
        var box = BABYLON.MeshBuilder.CreateBox("Box", { size: 2 }, scene);
        box.material = boxMaterial;
        // move the box upward 1/2 of its height
        box.position.y = 1;
        // create a built-in "ground" shape
        var ground = BABYLON.MeshBuilder.CreateGround("Ground", { width: 6, height: 6, subdivisions: 2 }, scene);
        // GUI
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Change Scene");
        button1.width = "220px";
        button1.height = "40px";
        button1.color = "white";
        button1.background = "green";
        button1.top = "20px";
        button1.left = "-20px";
        button1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        button1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        button1.onPointerUpObservable.add(function () {
            _this.scene.dispose();
            _this.scene = _this.createScene1();
        });
        advancedTexture.addControl(button1);
        var button2 = BABYLON.GUI.Button.CreateSimpleButton("but2", "Debug");
        button2.width = "220px";
        button2.height = "40px";
        button2.color = "white";
        button2.background = "orange";
        button2.top = "-20px";
        button2.left = "20px";
        button2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        button2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        button2.onPointerUpObservable.add(function () {
            if (scene.debugLayer.isVisible()) {
                scene.debugLayer.hide();
            }
            else {
                scene.debugLayer.show();
            }
        });
        advancedTexture.addControl(button2);
        return scene;
    };
    Game.prototype.run = function () {
        var _this = this;
        // run the render loop
        this.engine.runRenderLoop(function () {
            _this.scene.render();
        });
    };
    return Game;
}());
// Create the game using the "renderCanvas"
var game = new Game("renderCanvas");
console.log("Game object created");
// start animation
game.run();
console.log("Run started");
