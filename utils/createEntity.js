import * as Cesium from "cesium";
const createEntity = (cesium, x, y) => {
  const heading = Cesium.Math.toRadians(10);
  const pitch = 0;
  const roll = 0;
  const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
  console.log('here', x,y);
  const position = Cesium.Cartesian3.fromDegrees(x,y);
  const orientation = Cesium.Transforms.headingPitchRollQuaternion(position,hpr);
  
    const entity = {
      name: "wall.glb",
      position: position,
      orientation: orientation,
      model: {
        uri: "100mWall.glb",
        scale: 1,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      },
    };
    
    cesium.viewer.entities.add(entity);
};

export default createEntity;