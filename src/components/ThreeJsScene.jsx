import { useEffect } from "react";

import * as THREE from "three";
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { VOXLoader } from 'three/examples/jsm/loaders/VOXLoader';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import SceneInit from "../services/SceneInit.js";

function App() {
  useEffect(() => {
    const test = new SceneInit("myThreeJsCanvas");
    test.initialize();
    test.animate();

    // const boxGeometry = new THREE.BoxGeometry(8, 8, 8);
    // const boxMaterial = new THREE.MeshNormalMaterial();
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // test.scene.add(boxMesh);

    let loadedModel;
    const glftLoader = new GLTFLoader();
    const al = new THREE.AmbientLight(0xffffff, 1);
    glftLoader.load("src/assets/cloud_high_poly/scene.gltf", (gltfScene) => {
      loadedModel = gltfScene;
      console.log(al);

      gltfScene.scene.rotation.y = Math.PI / 8;
      gltfScene.scene.position.y = 0;
      gltfScene.scene.position.x = 1;
      gltfScene.scene.scale.set(-100, -100, -100);
      test.scene.add(gltfScene.scene);
      test.scene.add(al);
    });

    const animate = () => {
      if (loadedModel) {
        // loadedModel.scene.rotation.x += 0.001;
        // loadedModel.scene.rotation.y += 0.001;
        // loadedModel.scene.rotation.z += 0.001;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}
export default App;
