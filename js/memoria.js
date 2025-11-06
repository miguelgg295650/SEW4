class Memoria {
    constructor() {
      this.tablero_bloqueado = true;
      this.primera_carta = null;
      this.segunda_carta = null;

    }
  
    voltearCarta(carta) {
      carta.dataset.state = 'flip'; 
    }

    barajarCartas(){
      const main = document.querySelector("main");

      const cartas = Array.from(main.querySelectorAll("article"));

      for (let i = cartas.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        var aux = cartas[i];
        cartas[i] = cartas[j];
        cartas[j] = aux;
      }

      cartas.forEach(carta => main.append(carta));
    }

    reiniciarAtributos(){
      this.tablero_bloqueado = true;
      this.primera_carta = null;
      this.segunda_carta = null;
    }

    deshabilitarCartas(){
      this.primera_carta.dataset.state = 'revelada';
      this.segunda_carta.dataset.state = 'revelada';

      this.reiniciarAtributos();
      this.comprobarJuego();
    }

    comprobarJuego(){
      const main = document.querySelector("main");

      const cartas = Array.from(main.querySelectorAll("article"));

      for(let i = 0;i<cartas.length;i++){
        if(cartas[i].dataset.state !== 'revelada'){
          return false;
        }
      }
    }

    cubrirCartas(){
      this.tablero_bloqueado = true;

      setTimeout(1500);
      this.primera_carta.dataset.state = '';
      this.segunda_carta.dataset.state = '';

      this.reiniciarAtributos();
    }

    comprobarPareja(){
      this.primera_carta.
    }
  
 
  