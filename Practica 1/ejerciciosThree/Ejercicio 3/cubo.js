import * as THREE from '../libs/three.module.js'
 
class cubo extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Creación de la shape de los ejemplos
    var shape = new THREE.Shape();
    shape.moveTo(0, 1);
    shape.lineTo (-5, 1);
    shape.lineTo (-5, 3);
    shape . bezierCurveTo (-5, 3, -2, 9, -1, 4.5) ;
    shape . splineThru ( [new THREE. Vector2 (12 , 5) ,    new THREE. Vector2 (8 , -5) , new THREE. Vector2 (10 , -15) ] ) ;
    shape . quadraticCurveTo (0 , -10, -10, -15) ;
    
    var options1 = { depth : 8 , steps : 2 , bevelEnabled : false } ;
    var geometry1 = new THREE. ExtrudeGeometry ( shape , options1 ) ;
    
    this.shapE = new THREE.Mesh(geometry1, boxMat);
    this.add (this.shapE);
  
  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      sizeX : 1.0,
      sizeY : 1.0,
      sizeZ : 1.0,
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      reset : () => {
        this.guiControls.sizeX = 1.0;
        this.guiControls.sizeY = 1.0;
        this.guiControls.sizeZ = 1.0;
        this.reCreate(1,1,1);
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.01)
      .name ('Tamaño X : ')
      .onChange ( (x) => this.reCreate(x, this.guiControls.sizeY, this.guiControls.sizeZ))
      .listen(); // hacer esto con el resto
    folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.01)
      .name ('Tamaño Y : ')
      .onChange ( (y) => this.reCreate(this.guiControls.sizeX, y, this.guiControls.sizeZ))
      .listen();
    folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.01)
      .name ('Tamaño Z : ')
      .onChange ( (z) => this.reCreate(this.guiControls.sizeX, this.guiControls.sizeY, z))
      .listen();
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  reCreate (width, height, depth) {
    this.box.geometry.dispose();
    this.box.geometry = new THREE.BoxGeometry (width, height, depth);
  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
  }
}
export { cubo };
