/** @jsx React.DOM */

var React = require('react');

var Building = React.createClass({
  render: function() {
    return (
      <div id='foo'>
      </div>
    );
  },
  componentDidMount: function() {
    
      var container, stats;

      var camera, scene, renderer;

      var cube, plane;

      var targetRotation = 0;
      var targetRotationOnMouseDown = 0;

      var mouseX = 0;
      var mouseXOnMouseDown = 0;
      var windowWidth = 500;
      var windowHeight = 400;
      var windowHalfX = windowWidth / 2;
      var windowHalfY = windowHeight / 2;
      
      init();
      animate();

      function init() {

        container = document.createElement( 'div' );
        $('#buildingBlock').append( container );

        camera = new THREE.PerspectiveCamera( 70, windowWidth / windowHeight, 1, 1000 );
        camera.position.y = 150;
        camera.position.z = 500;

        scene = new THREE.Scene();

        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor( 0xf0f0f0 );
        renderer.setSize( windowWidth, windowHeight );

        var textureTop = new THREE.MeshBasicMaterial({
               map: THREE.ImageUtils.loadTexture('images/bld_top.png')
           });
        textureTop.anisotropy = renderer.getMaxAnisotropy();

        var textureFront = new THREE.MeshBasicMaterial({
               map: THREE.ImageUtils.loadTexture('images/bld_front.png')
           });
        textureFront.anisotropy = renderer.getMaxAnisotropy();
        
        var textureSide = new THREE.MeshBasicMaterial({
               map: THREE.ImageUtils.loadTexture('images/bld_side.png')
           });
        textureSide.anisotropy = renderer.getMaxAnisotropy();
        
        var materials = [
           textureSide,
           textureSide,
           textureTop,
           textureTop,
           textureFront,
           textureFront
        ];

        var geometry = new THREE.BoxGeometry( 200, 400, 200 );
        cube = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        cube.position.y = 150;
        scene.add( cube );

        // Plane

        var geometry = new THREE.PlaneBufferGeometry( 200, 200 );
        geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

        var material = new THREE.MeshBasicMaterial( { color: 0xe0e0e0, overdraw: 0.5 } );

        plane = new THREE.Mesh( geometry, material );
        plane.position.y = -80;
        scene.add( plane );

        container.appendChild( renderer.domElement );

        // stats = new Stats();
        // stats.domElement.style.position = 'absolute';
        // stats.domElement.style.top = '0px';
        // container.appendChild( stats.domElement );

        document.addEventListener( 'mousedown', onDocumentMouseDown, false );
        document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        document.addEventListener( 'touchmove', onDocumentTouchMove, false );

        //

        // window.addEventListener( 'resize', onWindowResize, false );

      }

      // function onWindowResize() {

      //   windowHalfX = window.innerWidth / 2;
      //   windowHalfY = window.innerHeight / 2;

      //   camera.aspect = window.innerWidth / window.innerHeight;
      //   camera.updateProjectionMatrix();

      //   renderer.setSize( window.innerWidth, window.innerHeight );

      // }

      //

      function onDocumentMouseDown( event ) {

        event.preventDefault();

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'mouseup', onDocumentMouseUp, false );
        document.addEventListener( 'mouseout', onDocumentMouseOut, false );

        mouseXOnMouseDown = event.clientX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;

      }

      function onDocumentMouseMove( event ) {

        mouseX = event.clientX - windowHalfX;

        targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;

      }

      function onDocumentMouseUp( event ) {

        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

      }

      function onDocumentMouseOut( event ) {

        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

      }

      function onDocumentTouchStart( event ) {

        if ( event.touches.length === 1 ) {

          event.preventDefault();

          mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
          targetRotationOnMouseDown = targetRotation;

        }

      }

      function onDocumentTouchMove( event ) {

        if ( event.touches.length === 1 ) {

          event.preventDefault();

          mouseX = event.touches[ 0 ].pageX - windowHalfX;
          targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

        }

      }

      //

      function animate() {

        requestAnimationFrame( animate );

        render();
        //stats.update();

      }

      function render() {

        plane.rotation.y = cube.rotation.y += ( targetRotation - cube.rotation.y ) * 0.05;
        renderer.render( scene, camera );

      }

  }
  
});

module.exports = Building;