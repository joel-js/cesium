import * as Cesium from 'cesium';
const rotateEntityClockwise = (entity) => {
  
  const currentOrientation = entity.orientation.getValue(Cesium.JulianDate.now());
  const currentHPR = Cesium.HeadingPitchRoll.fromQuaternion(currentOrientation);
  
  // Increment the current heading by 10 degrees (converted to radians)
  currentHPR.heading += Cesium.Math.toRadians(10);

  // Update the entity's orientation
  const newOrientation = Cesium.Transforms.headingPitchRollQuaternion(entity.position.getValue(Cesium.JulianDate.now()), currentHPR);
  entity.orientation = newOrientation;
};

export default rotateEntityClockwise;