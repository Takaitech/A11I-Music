import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Loader 
const loader = new THREE.TextureLoader();
var fontLoader = new THREE.FontLoader();


loader.load('/textures/static-w-topog.jpg' , function(texture)
            {
             scene.background = texture;  
            });
            
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry =  new THREE.SphereGeometry( 18, 60, 32 );
const torusGeometryRight = new THREE.TorusGeometry( 10, .034, 30, 200, 1.50994943534413 );
const torusGeometryLeft = new THREE.TorusGeometry( 10, .034, 30, 200, 1.50994943534413 );

const torusCircleGeometry = new THREE.TorusGeometry( .6, .034, 30, 200 );

const planeGeometry = new THREE.PlaneGeometry( 200, 100 );
const planeGeometry = new THREE.PlaneGeometry( 200, 100 );



// A11I Font
fontLoader.load( '/fonts/Arnaiz_Regular.js', function ( font ) {
    var textMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});

    const textGeometry = new THREE.TextGeometry( 'A11I', {
		font: font,
		size: 1.5,
		height: .12,
		curveSegments: 12,
	} );

    var textMesh = new THREE.Mesh(textGeometry, textMaterial);

    textMesh.position.z = 18
    textMesh.position.x = -3.7
    textMesh.position.y = -1
    scene.add(textMesh);

} );


//Texture
const texture = loader.load( '/textures/sphere-texture-hires.png' );
texture.center.y = 1
let material = new THREE.MeshBasicMaterial( { map: texture,  transparent: true, opacity: 0.6, depthTest: false, side:  THREE.DoubleSide } )
let torusMaterial = new THREE.MeshBasicMaterial({color: 0xffffff})
let planeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff,  transparent: true, opacity: 0.2,})


// Mesh
const sphere = new THREE.Mesh(geometry,material)
sphere.rotation.x = 4.7
sphere.rotation.z = 4.7

const torusRight = new THREE.Mesh(torusGeometryRight, torusMaterial)
const torusLeft = new THREE.Mesh(torusGeometryRight, torusMaterial)
torusRight.rotation.x = Math.PI
torusRight.position.z = 15
torusRight.position.y = .2
torusLeft.position.z = 15
torusLeft.position.y = .2
torusLeft.rotation.z = Math.PI

const torusCircle = new THREE.Mesh(torusCircleGeometry, torusMaterial)
torusCircle.position.z = 15
torusCircle.position.y = -9.8

const plane = new THREE.Mesh( planeGeometry, planeMaterial );


scene.add(sphere)
scene.add(torusRight)
scene.add(torusLeft)
scene.add(torusCircle)
scene.add( plane );

// Lights

const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 20
scene.add(pointLight)


// var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -10);
// var raycaster = new THREE.Raycaster();
// var mouse = new THREE.Vector2();
// var pointOfIntersection = new THREE.Vector3();
// canvas.addEventListener("mousemove", onMouseMove, false);

// function onMouseMove(event){
//   mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
// 	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
//   raycaster.setFromCamera(mouse, camera);
//   raycaster.ray.intersectPlane(plane, pointOfIntersection);
//   sphere.lookAt(pointOfIntersection);
// }

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 35
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor( 0x000000, 1 );

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // top.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()