const btnEmpezar = document.getElementById("btnEmpezar");
const ULTIMO_NIVEL = 2;
/* divs btns */
const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this);
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.siguienteNivel, 500)
    
  }
  inicializar() {
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.colorElegido = this.colorElegido.bind(this)
    this.togglebtnInicio();
    this.nivel = 1;
    this.colores = {
      celeste: celeste,
      violeta: violeta,
      naranja: naranja,
      verde: verde
    };
  }
  togglebtnInicio(){
    if(btnEmpezar.classList.contains('hide')){
      btnEmpezar.classList.remove("hide");
    }else{
      btnEmpezar.classList.add("hide");
    }
  }

  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL)
      .fill(0)
      .map(n => Math.floor(Math.random() * 4));
  }

  siguienteNivel() {
    this.subnivel = 0;
    this.iluminarSecuencia();
    this.validarClicks();
  }

  transformarNumeroAColor(nColor) {
    switch (nColor) {
    case 0:
      return 'celeste';
    case 1:
      return 'violeta';
    case 2:
      return 'naranja';
    case 3:
      return 'verde';
    }
  }
  
  transformarColorANumero(nombColor) {
    switch (nombColor) {
      case 'celeste':
        return 0;
      case 'violeta':
        return 1;
      case 'naranja':
        return 2;
      case 'verde':
        return 3;   
    } 
  }

  iluminarSecuencia() {
    for (let index = 0; index < this.nivel; index++) {
      const color = this.transformarNumeroAColor(this.secuencia[index])
      setTimeout(() => this.iluminarColor(color), 1000 * index)
    }

  }
  /* Ilumiunar y apagar */
  iluminarColor(color){
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), 350)
  }
  apagarColor(color){
    this.colores[color].classList.remove('light')
  }

  /* validar clicks de juego */
  validarClicks(){
    this.colores.celeste.addEventListener('click', this.colorElegido)
    this.colores.violeta.addEventListener('click', this.colorElegido)
    this.colores.naranja.addEventListener('click', this.colorElegido)
    this.colores.verde.addEventListener('click', this.colorElegido)
  }

  eliminarClicks(){
    this.colores.celeste.removeEventListener('click', this.colorElegido)
    this.colores.violeta.removeEventListener('click', this.colorElegido)
    this.colores.naranja.removeEventListener('click', this.colorElegido)
    this.colores.verde.removeEventListener('click', this.colorElegido)
  }

  colorElegido(ev){
    const colorEscogido = ev.target.dataset.color;
    const numeroEscogido = this.transformarColorANumero(colorEscogido);
    this.iluminarColor(colorEscogido) 
    if(numeroEscogido === this.secuencia[this.subnivel]){
      this.subnivel++
      if (this.subnivel === this.nivel) {
        swal({
          icon: 'success',
          text: 'Pasaste el nivel: ' + this.nivel,
          title: 'Felicidades'
        }).then(() => {
          this.nivel++
          this.eliminarClicks()
          if (this.nivel === (ULTIMO_NIVEL + 1)) {
            this.ganoJuego();
          }else{
            this.generarSecuencia();
            setTimeout(this.siguienteNivel, 1000);
          }
        })
      }
    }else{
      this.perdioJuego();

    }    
  }

  ganoJuego() {
    swal("Felicidades! =D", "Pasaste el juego vuelve a jugar!", "success")
    .then(() => {
      this.inicializar();
    })
  }

  perdioJuego() {
    swal({
      icon: 'warning',
      title: 'Oopss... =(',
      text: 'Perdiste Inténtalo de nuevo!'
    })
    .then(() => {
      this.eliminarClicks();
      this.inicializar();
    })
  }


}

empezarJuego = () => {
  window.juego = new Juego();
};
