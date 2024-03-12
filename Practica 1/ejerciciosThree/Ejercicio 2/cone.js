import * as THREE from '../libs/three.module.js'
 
class cone extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var coneGeom = new THREE.ConeGeometry(1, 1, 3);

    // Como material se crea uno a partir de un color
    var coneMat = new THREE.MeshNormalMaterial();
    
    // Ya podemos construir el Mesh
    this.cone = new THREE.Mesh (coneGeom, coneMat);

    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.cone);
    
  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      radius : 1,
      height : 1,
      radialSegments : 3,
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      reset : () => {
        this.guiControls.radius = 1;
        this.guiControls.height = 1;
        this.guiControls.radialSegments = 3;
        this.reCreate(1,1,3);
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radius', 1, 5, 0.01)
      .name ('Radio : ')
      .onChange ( (radius) => this.reCreate(radius, this.guiControls.height, this.guiControls.radialSegments))
      .listen();
    folder.add (this.guiControls, 'height', 1, 5, 0.01)
      .name ('Altura : ')
      .onChange ( (height) => this.reCreate(this.guiControls.radius, height, this.guiControls.radialSegments))
      .listen();
    folder.add (this.guiControls, 'radialSegments', 3, 32, 1)
      .name ('Resolución : ')
      .onChange ( (radialSegments) => this.reCreate(this.guiControls.radius, this.guiControls.height, radialSegments))
      .listen();

    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  reCreate(radius, height, radialSegments) {
    this.cone.geometry.dispose();
    this.cone.geometry = new THREE.ConeGeometry(radius, height, radialSegments);
  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    
    this.rotation.x += 0.01;
    this.rotation.y += 0.01;
    this.rotation.z += 0.01;
  }
}
export { cone };
