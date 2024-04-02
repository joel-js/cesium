import * as Cesium from "cesium";
import * as THREE from "three";

export default function renderThreeObj(cesium, three, minWGS84, maxWGS84, _3Dobjects) {

  // register Three.js scene with Cesium
  three.camera.fov = Cesium.Math.toDegrees(cesium.viewer.camera.frustum.fovy) // ThreeJS FOV is vertical
  three.camera.updateProjectionMatrix();

  const cartToVec = (cart) => {
    return new THREE.Vector3(cart.x, cart.y, cart.z);
  };

  // Configure Three.js meshes to stand against globe center position up direction
  for(id in _3Dobjects){
    minWGS84 = _3Dobjects[id].minWGS84;
    maxWGS84 = _3Dobjects[id].maxWGS84;
    // convert lat/long center position to Cartesian3
    const center = Cesium.Cartesian3.fromDegrees((minWGS84[0] + maxWGS84[0]) / 2, (minWGS84[1] + maxWGS84[1]) / 2);

    // get forward direction for orienting model
    const centerHigh = Cesium.Cartesian3.fromDegrees((minWGS84[0] + maxWGS84[0]) / 2, (minWGS84[1] + maxWGS84[1]) / 2,1);

    // use direction from bottom left to top left as up-vector
    const bottomLeft  = cartToVec(Cesium.Cartesian3.fromDegrees(minWGS84[0], minWGS84[1]));
    const topLeft = cartToVec(Cesium.Cartesian3.fromDegrees(minWGS84[0], maxWGS84[1]));
    const latDir  = new THREE.Vector3().subVectors(bottomLeft,topLeft ).normalize();

    // configure entity position and orientation
    _3Dobjects[id].graphMesh.position.copy(center);
    _3Dobjects[id].graphMesh.lookAt(centerHigh);
    _3Dobjects[id].graphMesh.up.copy(latDir);
  }

  // Clone Cesium Camera projection position so the
  // Three.js Object will appear to be at the same place as above the Cesium Globe
  three.camera.matrixAutoUpdate = false;
  const cvm = cesium.viewer.camera.viewMatrix;
  const civm = cesium.viewer.camera.inverseViewMatrix;
  three.camera.matrixWorld.set(
      civm[0], civm[4], civm[8 ], civm[12],
      civm[1], civm[5], civm[9 ], civm[13],
      civm[2], civm[6], civm[10], civm[14],
      civm[3], civm[7], civm[11], civm[15]
  );
  three.camera.matrixWorldInverse.set(
      cvm[0], cvm[4], cvm[8 ], cvm[12],
      cvm[1], cvm[5], cvm[9 ], cvm[13],
      cvm[2], cvm[6], cvm[10], cvm[14],
      cvm[3], cvm[7], cvm[11], cvm[15]
  );
  three.camera.lookAt(new THREE.Vector3(0,0,0));

  const width = ThreeContainer.clientWidth;
  const height = ThreeContainer.clientHeight;
  const aspect = width / height;
  three.camera.aspect = aspect;
  three.camera.updateProjectionMatrix();

  three.renderer.setSize(width, height);
  three.renderer.render(three.scene, three.camera);
}
