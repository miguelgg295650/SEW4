class Cronometro {
  #tiempo;
  #inicio;
  #corriendo;

  constructor() {
    this.#tiempo = 0;       
    this.#corriendo = null;
    this.#addListeners();
  }

  #addListeners() {
    const botones = document.querySelectorAll("main button");

     if (botones.length >= 3) {
      botones[0].addEventListener("click", () => this.arrancar());
      botones[1].addEventListener("click", () => this.parar());
      botones[2].addEventListener("click", () => this.reiniciar());
    }
  }

  arrancar() {
  if (this.#corriendo === null) {

    try {
      if (typeof Temporal !== "undefined" && Temporal.Now) {
        const ahora = Temporal.Now.instant();
        if (this.#tiempo > 0) {
          this.#inicio = Temporal.Instant.fromEpochMilliseconds(
            ahora.epochMilliseconds - this.#tiempo
          );
        } else {
          this.#inicio = ahora;
        }

      } else {
        throw new Error("Temporal no disponible");
      }

    } catch (_) {
      const ahora = new Date();

      if (this.#tiempo > 0) {
        this.#inicio = new Date(ahora.getTime() - this.#tiempo);
      } else {
        this.#inicio = ahora;
      }
    }

    this.#corriendo = setInterval(() => this.#actualizar(), 100);
  }
}


  #actualizar() {
    let ahora;

    if (typeof Temporal !== "undefined" && Temporal.Now) {
      ahora = Temporal.Now.instant();
      this.#tiempo = ahora.epochMilliseconds - this.#inicio.epochMilliseconds;
    } else {
      ahora = new Date();
      this.#tiempo = ahora.getTime() - this.#inicio.getTime();
    }

    this.#mostrar();
  }

  #mostrar() {
    const minutos = parseInt(this.#tiempo / 60000, 10);
    const segundos = parseInt((this.#tiempo % 60000) / 1000, 10);
    const decimas  = parseInt((this.#tiempo % 1000) / 100, 10);

    const mm = String(minutos).padStart(2, "0");
    const ss = String(segundos).padStart(2, "0");
    const s  = String(decimas);

    const cadena = `${mm}:${ss}.${s}`;

    const p = document.querySelector("main p");
    if (p) {
      p.textContent = cadena;
    }
  }
  parar() {
    if (this.#corriendo !== null) {
      clearInterval(this.#corriendo);
      this.#corriendo = null;
    }
  }

  reiniciar() {
    if (this.#corriendo !== null) {
      clearInterval(this.#corriendo);
      this.#corriendo = null;
    }
    this.#tiempo = 0;
    this.#mostrar();
  }
}
