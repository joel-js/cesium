window.CESIUM_BASE_URL = "/static/Cesium/";

import * as Cesium from 'cesium';
import * as THREE from "three";
import "./CesiumMeasurer.css";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { ION_TOKEN } from "./utils/token";

Cesium.Ion.defaultAccessToken = ION_TOKEN;

// Initialize the Cesium Viewer in the HTML element with the cesiumContainer ID.
const viewer = new Cesium.Viewer("app", {
  terrain: Cesium.Terrain.fromWorldTerrain(),
});

viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400), // longitude, latitude, and height.
  orientation: {
    heading: Cesium.Math.toRadians(0.0),
    pitch: Cesium.Math.toRadians(-15.0),
  },
});


// Initialize Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.pointerEvents = "none";
document.getElementById("three").appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

console.log(
  (viewer.camera.frustum.fovy),
  window.innerWidth / window.innerHeight,
  viewer.camera.frustum.near,
  viewer.camera.frustum.far
);

// Render function
function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
animate();
