import * as THREE from '../libs/three.module.js'

let scale = 4;

class cubo extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    this.create(3, Math.PI * 2);


    var perfilPeon = new THREE.BufferGeometry().setFromPoints(this.points);
    perfilPeon.rotateY(Math.PI/2);
    this.profile = new THREE.Line(perfilPeon, this.mat);
    this.add(this.profile);

  }
  
  create(segments, phiLength) { // Este método crea los dos peones

    // Creamos los puntos a través de pintar un shape
    this.shape = new THREE.Shape();
    this.shape.moveTo(0 / scale, 1 / scale);
    this.shape.lineTo (-5 / scale, 1 / scale);
    this.shape.lineTo (-5 / scale, 3 / scale);
    this.shape.quadraticCurveTo(-1 / scale, 4.5 / scale, -2 / scale, 9 / scale);
    this.shape.quadraticCurveTo(-4 / scale, 12 / scale, 0 / scale, 13 / scale);
    this.points = this.shape.extractPoints (6).shape;

    // Creamos la geometría variable y la estática que solo varían los segmentos
    var geometry = new THREE.LatheGeometry (this.points , segments, 0, phiLength);
    geometry.rotateY(-Math.PI);
    var geometry2 = new THREE.LatheGeometry (this.points , segments, 0, Math.PI * 2);
    geometry2.rotateY(-Math.PI);

    // Usamos el material
    this.mat = new THREE.MeshNormalMaterial({flatShading:true, side:THREE.DoubleSide}); // Creamos el material para que se vean los segmentos y para que se vea por dentro

    // Creamos el mesh
    this.peon = new THREE.Mesh(geometry, this.mat);
    this.peon2 = new THREE.Mesh(geometry2, this.mat);
    this.peon.position.x = 4
    this.peon2.position.x = 8; 
    this.add (this.peon);
    this.add (this.peon2);
  }

  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
        segments : 3,
        phiLength: Math.PI * 2,
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      reset : () => {
        this.guiControls.segments = 3;
        this.guiControls.phiLength = Math.PI * 2
        this.reCreate(3, Math.PI * 2);
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'segments', 3, 20, 1)
      .name ('Resolución : ')
      .onChange ( (segments) => this.reCreate(segments, this.guiControls.phiLength))
      .listen();
    folder.add (this.guiControls, 'phiLength', 1, 6.3, 0.01)
      .name ('Ángulo : ')
      .onChange ( (phiLength) => this.reCreate(this.guiControls.segments, phiLength))
      .listen();    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  reCreate(segments, phiLength) {
    this.peon.geometry.dispose();
    this.peon2.geometry.dispose();
    this.peon.geometry = new THREE.LatheGeometry (this.points , segments, 0, phiLength);
    this.peon2.geometry = new THREE.LatheGeometry (this.points , segments, 0, Math.PI * 2);
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
