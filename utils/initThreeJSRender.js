import * as THREE from 'three';

export default function initThree(three, threeContainer){

  const fov = 45;

  const width = window.innerWidth;

  const height = window.innerHeight;

  const aspect = width / height;

  const near = 1;

  const far = 10*1000*1000; // needs to be far to support Cesium's world-scale rendering



  three.scene = new THREE.Scene();

  three.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  three.renderer = new THREE.WebGLRenderer({alpha: true});
  
  three.renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById(threeContainer).appendChild(three.renderer.domElement);  

}
