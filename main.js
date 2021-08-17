import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

//vars
let aspectRatio = window.innerWidth / window.innerHeight;

//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
camera.position.setZ(30);

//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//geometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
          //const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe:true});
const material = new THREE.MeshStandardMaterial({color: 0xBB6347 , wireframe:false});
const torus = new THREE.Mesh(geometry, material);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xfff76d});
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}

//light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,20);

const ambientLight = new THREE.AmbientLight(0xffffff);
//helpers
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);

//controls
const controls = new OrbitControls(camera,renderer.domElement);
//image loading
const spaseTexture = new THREE.TextureLoader().load('4136551.jpg');
//scene.background = spaseTexture;
//adding
scene.add(torus, pointLight, lightHelper, ambientLight); 
scene.add(gridHelper)
//mainLoop
Array(200).fill().forEach(addStar);
function animate(){
  requestAnimationFrame(animate);
  
  let a = 0.01;
  if (torus.rotation.x < 1000) {
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005; 
    torus.rotation.z += 0.01;
  }else{
    torus.rotation.x = 0.01;
    torus.rotation.y = 0.005; 
    torus.rotation.z = 0.01;
  }

  controls.update();

  renderer.render(scene, camera);
}

animate();