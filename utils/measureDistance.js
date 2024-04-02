import * as Cesium from "cesium";

function calculateDistance(startPoint, endPoint) {
  
  const distance = Cesium.Cartesian3.distance(startPoint, endPoint);
  console.log('startPoint', startPoint, 'endPoint', endPoint);
  console.log('distance --->', distance);
}

export default function measureDistance(cesium) {
  let handler = new Cesium.ScreenSpaceEventHandler(cesium.viewer.scene.canvas);

  let startPoint, endPoint;

  handler.setInputAction(function (movement) {
    const cartesian = cesium.viewer.camera.pickEllipsoid(
      movement.position,
      cesium.viewer.scene.globe.ellipsoid
    );
    console.log('movement point -->', movement);
    console.log('cartesian point -->', cartesian);
    if(!startPoint) {
      startPoint = cartesian;
    } else {
      if(!endPoint) {
        endPoint = cartesian;
        calculateDistance(startPoint, endPoint);
        startPoint = null;
        endPoint = null;
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
}
