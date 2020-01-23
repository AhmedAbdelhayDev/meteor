var control;
mapboxgl.accessToken = 'pk.eyJ1IjoibG9vbmV5MTk5MSIsImEiOiJjazVoMjFpdnUwZTI4M2tzM3o5aXIxajE2In0.qhXrX28wBpacn59yd4N0Fw';
var map = (window.map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 16,
    center: [-73.8648863, 40.6960703],
    pitch: 60,
    light: {
        "anchor": "viewport",
        "color": "white",
        "intensity": 0.8
    },
    antialias: true // create the gl context with MSAA antialiasing, so custom layers are antialiased
}));

// parameters to ensure the model is georeferenced correctly on the map


////////////////////////////
var modelOrigin = [-73.8648863, 40.6960703];
var modelAltitude = 0;
var modelRotate = [Math.PI / 2, 0, 0];

var modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
    modelOrigin,
    modelAltitude
);

/////////////////////////////



//////////////////////////

// transformation parameters to position, rotate and scale the 3D model onto the map
var modelTransform = {
    translateX: modelAsMercatorCoordinate.x,
    translateY: modelAsMercatorCoordinate.y,
    translateZ: modelAsMercatorCoordinate.z,
    rotateX: modelRotate[0],
    rotateY: modelRotate[1],
    rotateZ: modelRotate[2],
    /* Since our 3D model is in real world meters, a scale transform needs to be
     * applied since the CustomLayerInterface expects units in MercatorCoordinates.
     */
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * 1
};
//////--__-----

/////.....................

var THREE = window.THREE;

// configuration of the custom layer for a 3D model per the CustomLayerInterface
var customLayer = {
    id: '3d-model',
    type: 'custom',
    renderingMode: '3d',
    onAdd: function (map, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();



        var hemisphereLight = new THREE.HemisphereLight(0xfbf8ef, 0x2a120a, 9);
        hemisphereLight.position.set(0, 1, -2);
        this.scene.add(hemisphereLight);
        console.log('x ' + modelAsMercatorCoordinate.x);
        console.log('y ' + modelAsMercatorCoordinate.y);
        console.log('z ' + modelAsMercatorCoordinate.z);




        // use the three.js GLTF loader to add the 3D model to the three.js scene
        var loader = new THREE.GLTFLoader();
        loader.load(
            // 'models/gltf/1/Building_86_05_forest_avenue.glb',
            'http://localhost:3000/models/gltf/3/106E_116th_NewYork_NewYork_Building.glb',
            function (gltf) {

                this.scene.add(gltf.scene);
            }.bind(this)
        );

        var loader2 = new THREE.GLTFLoader();
        loader2.load(
            // 'models/gltf/1/scene.glb',
            'http://localhost:3000/models/gltf/3/106E_116th_NewYork_NewYork_SmallMeshes.glb',
            function (gltf) {
                this.scene.add(gltf.scene);
                //this.scene.gltf.position.x=
            }.bind(this)
        );

        this.map = map;



        // use the Mapbox GL JS map canvas for three.js
        this.renderer = new THREE.WebGLRenderer({
            canvas: map.getCanvas(),
            context: gl,
            antialias: true
        });

        this.renderer.autoClear = false;
    },
    render: function (gl, matrix) {


        ///--------------------------------MODELO 1------------------------------------------
        /////////////////////////////ROTACION MODELO 1///////////////////////////
        var rotationX = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(1, 0, 0),
            modelTransform.rotateX
        );
        var rotationY = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 1, 0),
            modelTransform.rotateY
        );
        var rotationZ = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 0, 1),
            modelTransform.rotateZ
        );


        /////////////////////////////////POSICION Y ROTACIONMODELO 1 ////////////////////////

        var m = new THREE.Matrix4().fromArray(matrix);
        var l = new THREE.Matrix4()
            .makeTranslation(
                modelTransform.translateX,
                modelTransform.translateY,
                modelTransform.translateZ
            )
            .scale(
                new THREE.Vector3(
                    modelTransform.scale, -modelTransform.scale,
                    modelTransform.scale


                )
            )
            .multiply(rotationX)
            .multiply(rotationY)
            .multiply(rotationZ);


        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.state.reset();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
    }
};

map.on('style.load', function () {
    map.addLayer(customLayer, 'waterway-label');
});