/// <reference path="../node_modules/babylonjs/babylon.d.ts" />
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
    }
    Game.prototype.createScene = function () {
        // create a basic BJS Scene object
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);
        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        this.camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), this.scene);
        // target the camera to scene origin
        this.camera.setTarget(BABYLON.Vector3.Zero());
        // attach the camera to the canvas
        this.camera.attachControl(this.canvas, false);
        // create a basic light, aiming 0,1,0 - meaning, to the sky
        this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this.scene);
        // create a built-in "sphere" shape; with 16 segments and diameter of 2
        var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: 16, diameter: 2 }, this.scene);
        // move the sphere upward 1/2 of its height
        sphere.position.y = 1;
        // create a built-in "ground" shape
        var ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 6, height: 6, subdivisions: 2 }, this.scene);
        // Show debug layer
        this.scene.debugLayer.show();
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
// Create the game using the 'renderCanvas'
var game = new Game('renderCanvas');
console.log("Game object created");
// Create the scene
game.createScene();
console.log("Scene object created");
// start animation
game.run();
console.log("Run started");
