/// <reference path="../node_modules/babylonjs/babylon.d.ts" />
/// <reference path="../node_modules/babylonjs-gui/babylon.gui.d.ts" />
var Game = /** @class */ (function () {
    function Game(canvasElement) {
        var _this = this;
        // Create canvas and engine
        this.canvas = document.getElementById(canvasElement);
        this.engine = new BABYLON.Engine(this.canvas, true);
        // Initi scene collection
        this.scenes = [];
        this.currentSceneIndex = 0;
        // Listen for browser/canvas resize events
        window.addEventListener("resize", function () {
            _this.engine.resize();
        });
        // Disable right click
        this.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        };
    }
    Game.prototype.createScene = function () {
        // create a basic BJS Scene object
        var scene = new BABYLON.Scene(this.engine);
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);
        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        this.camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
        // target the camera to scene origin
        this.camera.setTarget(BABYLON.Vector3.Zero());
        // attach the camera to the canvas
        this.camera.attachControl(this.canvas, false);
        // create a basic light, aiming 0,1,0 - meaning, to the sky
        this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
        // create a built-in "sphere" shape; with 16 segments and diameter of 2
        var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: 16, diameter: 2 }, scene);
        // move the sphere upward 1/2 of its height
        sphere.position.y = 1;
        // create a built-in "ground" shape
        var ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 6, height: 6, subdivisions: 2 }, scene);
        // Show debug layer
        scene.debugLayer.show();
        // GUI
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Change Scene");
        button1.width = 0.2;
        button1.height = "40px";
        button1.color = "white";
        button1.cornerRadius = 20;
        button1.background = "blue";
        button1.left = "20px";
        button1.onPointerUpObservable.add(this.changeScene);
        advancedTexture.addControl(button1);
        // Add to scene collection
        this.scenes.push(scene);
    };
    Game.prototype.createScene2 = function () {
        // create a basic BJS Scene object
        var scene = new BABYLON.Scene(this.engine);
        scene.clearColor = new BABYLON.Color4(0.5, 0.5, 0.5, 1);
        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        this.camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
        // target the camera to scene origin
        this.camera.setTarget(BABYLON.Vector3.Zero());
        // attach the camera to the canvas
        this.camera.attachControl(this.canvas, false);
        // GUI
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Change Scene");
        button1.width = 0.2;
        button1.height = "40px";
        button1.color = "white";
        button1.cornerRadius = 20;
        button1.background = "green";
        button1.onPointerUpObservable.add(this.changeScene);
        advancedTexture.addControl(button1);
        // Add to scene collection
        this.scenes.push(scene);
    };
    Game.prototype.changeScene = function () {
        this.currentSceneIndex = this.currentSceneIndex == 0 ? 1 : 0;
        console.log("Scene changed to: " + this.currentSceneIndex);
    };
    Game.prototype.run = function () {
        var _this = this;
        // run the render loop
        this.engine.runRenderLoop(function () {
            _this.scenes[_this.currentSceneIndex].render();
        });
    };
    return Game;
}());
// Create the game using the 'renderCanvas'
var game = new Game('renderCanvas');
console.log("Game object created");
// Create both scenes
game.createScene();
game.createScene2();
console.log("Scene objects created");
// start animation
game.run();
console.log("Run started");
