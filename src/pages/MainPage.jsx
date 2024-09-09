import logo from "../assets/img/rainy-day.png";
import * as THREE from "three";
import { useEffect, useRef } from "react";

export function MainPage() {
  const Three = () => {
    const canvasRef = useRef();

    useEffect(() => {
      // Scene
      const scene = new THREE.Scene();

      // Create a sphere shape
      const geometry = new THREE.SphereGeometry(5, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: "#00ff83",
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Lights
      const light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(0, 10, 10);
      scene.add(light);

      // Camera
      const camera = new THREE.PerspectiveCamera(45, 800 / 600);
      camera.position.z = 20;
      scene.add(camera);

      // Renererd
      // const canvas = new document.querySelector('.webgl');
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current || undefined,
      });
      renderer.setSize(800, 600);
      renderer.render(scene, camera);

      const al = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(al);

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();
    }, []); // Empty dependency array ensures that this effect runs once when the component mounts

    return (
      <>
        <div className="container-fluid">
          <div className="row mt-5 d-flex justify-content-center">
            <div className="col-8 d-flex justify-content-center">
              <img src={logo} alt="" className="img-fluid" />
            </div>
          </div>
          <div className="row d-flex justify-content-center mt-3">
            <h1 className="text-center text-light fw-bold">87 degrees</h1>
            <div className="col-6 d-flex justify-content-between">
              <span className="fs-3 text-light">Low: 65</span>
              <span className="fs-3 text-light">High: 90</span>
            </div>
          </div>
          <div>
            <canvas ref={canvasRef} className="webgl"></canvas>
          </div>
        </div>
      </>
    );
  };
}
