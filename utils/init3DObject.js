import * as Cesium from "cesium";
import createEntity from "./createEntity";

export default async function init3DObject(cesium, menu) {
  let handler = new Cesium.ScreenSpaceEventHandler(cesium.viewer.scene.canvas);

  handler.setInputAction(function (movement) {
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
}
