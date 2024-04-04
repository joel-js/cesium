import * as Cesium from 'cesium';
const rotateEntityToNorth = (entity) => {
  const heading = 0; // North
  const pitch = 0;
  const roll = 0;
  const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
  const orientation = Cesium.Transforms.headingPitchRollQuaternion(entity.position.getValue(Cesium.JulianDate.now()), hpr);
  entity.orientation = orientation;
}

export default rotateEntityToNorth;