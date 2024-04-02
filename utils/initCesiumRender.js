import * as Cesium from "cesium";

export default function initCesium(cesium, cesiumContainer, minWGS84, maxWGS84) {
  cesium.viewer = new Cesium.Viewer(cesiumContainer, {
    useDefaultRenderLoop: false,

    selectionIndicator: false,

    homeButton: false,

    sceneModePicker: false,

    navigationHelpButton: false,

    infoBox: false,

    navigationInstructionsInitiallyVisible: false,

    animation: false,

    timeline: false,

    fullscreenButton: true,

    allowTextureFilterAnisotropic: false,

    contextOptions: {
      webgl: {
        alpha: false,

        antialias: true,

        preserveDrawingBuffer: true,

        failIfMajorPerformanceCaveat: false,

        depth: true,

        stencil: false,

        anialias: false,
      },
    },

    targetFrameRate: 60,

    resolutionScale: 0.1,

    orderIndependentTranslucency: true,

    // creditContainer: "hidecredit",

    // imageryProvider: , // Use default imagery provider

    baseLayerPicker: false,

    geocoder: false,

    automaticallyTrackDataSourceClocks: false,

    dataSources: null,

    clock: null,

    terrainShadows: Cesium.ShadowMode.DISABLED,
  });

  const center = Cesium.Cartesian3.fromDegrees(
    (minWGS84[0] + maxWGS84[0]) / 2,

    (minWGS84[1] + maxWGS84[1]) / 2 - 1, // why -1 ?

    300000
  );

  cesium.viewer.camera.flyTo({
    destination: center,

    orientation: {
      heading: Cesium.Math.toRadians(0),

      pitch: Cesium.Math.toRadians(-90),

      roll: Cesium.Math.toRadians(0),
    },

    duration: 3,
  });

  const canvas = cesium.viewer.canvas;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cesium.viewer.resize();

}
