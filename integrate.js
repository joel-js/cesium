window.CESIUM_BASE_URL = "/static/Cesium/";
import { ION_TOKEN } from "./utils/token";
import * as Cesium from "cesium";
import init3DObject from "./utils/init3DObject";
import measureDistance from "./utils/measureDistance";

Cesium.Ion.defaultAccessToken = ION_TOKEN;

const longitude = -74.457398;
const latitude = 40.590537;
const cesiumContainer = "integrate-cesium";

let cesium = {
  viewer: new Cesium.Viewer(cesiumContainer, {
    terrain: Cesium.Terrain.fromWorldTerrain(),
    infoBox: false,
    selectionIndicator: false,
    shadows: true,
    shouldAnimate: true,
  }),
};

const canvas = cesium.viewer.canvas;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
cesium.viewer.resize();

const destination = Cesium.Cartesian3.fromDegrees(longitude, latitude, 100);

const heading = Cesium.Math.toRadians(180);
const pitch = Cesium.Math.toRadians(0);
const roll = 0.0;

const options = {
  destination: destination,
  orientation: {
    heading: heading,
    pitch: pitch,
    roll: roll,
  },
};

cesium.viewer.scene.camera.setView(options);

// const osmBuildingsTileset = await Cesium.createOsmBuildingsAsync();
// cesium.viewer.scene.primitives.add(osmBuildingsTileset);

// init3DObject(cesium);

measureDistance(cesium);