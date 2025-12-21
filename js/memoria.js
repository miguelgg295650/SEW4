class Memoria {
  #tablero_bloqueado;
  #primera_carta;
  #segunda_carta;

  constructor() {
    this.#tablero_bloqueado = true;
    this.#primera_carta = null;
    this.#segunda_carta = null;

    this.#anadirListener();
    this.#barajarCartas();
    this.#tablero_bloqueado = false;
    cronometro.arrancar();

  }

  #anadirListener() {
    const cartas = document.querySelectorAll("main article");

    for (let carta of cartas) {
      carta.addEventListener("click", (evento) => {
        this.voltearCarta(evento.currentTarget);
      });
    }
  }

  voltearCarta(carta) {
    if (this.#tablero_bloqueado === false && carta.dataset.state !== 'revelada' && carta.dataset.state !== 'flip') {
      carta.dataset.state = 'flip';
      if (this.#primera_carta === null) {
        this.#primera_carta = carta;
      } else {
        this.#segunda_carta = carta;
        this.#comprobarPareja();
      }
    }
  }

  #barajarCartas() {
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

  #reiniciarAtributos() {
    this.#tablero_bloqueado = false;
    this.#primera_carta = null;
    this.#segunda_carta = null;
  }

  #deshabilitarCartas() {
    this.#primera_carta.dataset.state = 'revelada';
    this.#segunda_carta.dataset.state = 'revelada';

    this.#reiniciarAtributos();
    this.#comprobarJuego();
  }

  #comprobarJuego() {
    const main = document.querySelector("main");
    const cartas = Array.from(main.querySelectorAll("article"));

    for (let i = 0; i < cartas.length; i++) {
      if (cartas[i].dataset.state !== 'revelada') {
        return false;
      }
    }
    cronometro.parar();
    alert("¡Has ganado!");
  }

  #cubrirCartas() {
    this.#tablero_bloqueado = true;

    setTimeout(() => {
      this.#primera_carta.dataset.state = '';
      this.#segunda_carta.dataset.state = '';

      this.#reiniciarAtributos();
    }, 1500);
  }

  #comprobarPareja() {
    const img1 = this.#primera_carta.children[1];
    const img2 = this.#segunda_carta.children[1];

    const src1 = img1.getAttribute("src");
    const src2 = img2.getAttribute("src");

    src1 === src2 ? this.#deshabilitarCartas() : this.#cubrirCartas();
  }
}
