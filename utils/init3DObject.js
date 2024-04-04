import * as Cesium from "cesium";
import createEntity from "./createEntity";

const init3DObject = async(cesium) => {
  let handler = new Cesium.ScreenSpaceEventHandler(cesium.viewer.scene.canvas);

  handler.setInputAction((movement) => {
    const cartesian = cesium.viewer.camera.pickEllipsoid(
      movement.position,
      cesium.viewer.scene.globe.ellipsoid
    );

    if (cartesian) {
      const cartographic = Cesium.Cartographic.fromCartesian(cartesian);

      const longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
      const latitudeString = Cesium.Math.toDegrees(cartographic.latitude);

      createEntity(cesium, longitudeString, latitudeString);
    }
  }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
};

export default init3DObject;
