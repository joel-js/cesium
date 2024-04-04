import * as Cesium from "cesium";
import createEntity from "./createEntity";
import rotateEntity from './rotation/rotateEntity';

const init3DObject = async(cesium) => {
  let handler = new Cesium.ScreenSpaceEventHandler(cesium.viewer.scene.canvas);
  let lastCreatedEntity = null;
  handler.setInputAction((movement) => {
    const cartesian = cesium.viewer.camera.pickEllipsoid(
      movement.position,
      cesium.viewer.scene.globe.ellipsoid
    );

    if (cartesian) {
      const cartographic = Cesium.Cartographic.fromCartesian(cartesian);

      const longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
      const latitudeString = Cesium.Math.toDegrees(cartographic.latitude);

      lastCreatedEntity = createEntity(cesium, longitudeString, latitudeString);
      rotateEntity(lastCreatedEntity, 'north');
    }
  }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

  return lastCreatedEntity;
};

export default init3DObject;

