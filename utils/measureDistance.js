import * as Cesium from "cesium";

const calculateDistance = (startPoint, endPoint) => {
  
  const startCartographic = Cesium.Cartographic.fromCartesian(startPoint);
  const startLongitude = Cesium.Math.toDegrees(startCartographic.longitude);
  const startLatitude = Cesium.Math.toDegrees(startCartographic.latitude);

  const endCartographic = Cesium.Cartographic.fromCartesian(endPoint);
  const endLongitude = Cesium.Math.toDegrees(endCartographic.longitude);
  const endLatitude = Cesium.Math.toDegrees(endCartographic.latitude);

  console.log("startPoint longitude", startLongitude, "latitude", startLatitude);
  console.log("endPoint longitude", endLongitude, "latitude", endLatitude);
  const distance = Cesium.Cartesian3.distance(startPoint, endPoint);
  console.log("startPoint", startPoint, "endPoint", endPoint);
  console.log("distance --->", distance);
};

const measureDistance = (cesium) => {
  let handler = new Cesium.ScreenSpaceEventHandler(cesium.viewer.scene.canvas);

  let startPoint, endPoint;

  handler.setInputAction(function (movement) {
    const cartesian = cesium.viewer.camera.pickEllipsoid(
      movement.position,
      cesium.viewer.scene.globe.ellipsoid
    );
    console.log("movement point -->", movement);
    console.log("cartesian point -->", cartesian);
    if (!startPoint) {
      startPoint = cartesian;
    } else if (!endPoint) {
      endPoint = cartesian;
      calculateDistance(startPoint, endPoint);
      startPoint = null;
      endPoint = null;
    }
  }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
};

export default measureDistance;
