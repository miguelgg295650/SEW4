// cronometro.js

class Cronometro {
    constructor() {
      this.tiempo = 0;       // milisegundos transcurridos
      this.inicio = null;    // instante de arranque (Temporal.Instant o Date)
      this.corriendo = null; // id de setInterval
    }
  
    arrancar() {
        if(this.corriendo === null){
            try {
                if (typeof Temporal !== "undefined" && Temporal.Now) {
                  this.inicio = Temporal.Now.instant();
                } else {
                  throw new Error("Temporal no disponible");
                }
              } catch (_) {
                this.inicio = new Date();
              }
              this.corriendo = setInterval(this.actualizar.bind(this), 100);
        }else{
            this.reiniciar();
            this.arrancar();
        }
      
    }
  
    actualizar() {
        let ahora;
        if (typeof Temporal !== "undefined" && Temporal.Now) {
          ahora = Temporal.Now.instant();
          this.tiempo = ahora.epochMilliseconds - this.inicio.epochMilliseconds;
        } else {
          ahora = new Date();
          this.tiempo = ahora.getTime() - this.inicio.getTime();
        }
        
        this.mostrar();
      
    }
  

  
    mostrar() {
      const minutos = parseInt(this.tiempo / 60000, 10);
      const segundos = parseInt((this.tiempo % 60000) / 1000, 10);
      const decimas  = parseInt((this.tiempo % 1000) / 100, 10);
  
      const mm = String(minutos).padStart(2, "0");
      const ss = String(segundos).padStart(2, "0");
      const s  = String(decimas); 

      const cadena = `${mm}:${ss}.${s}`;

      const p = document.querySelector("main p");

      p.textContent = cadena;
      
    }
  
    
    parar() {
      if (this.corriendo !== null) {
        clearInterval(this.corriendo);
        this.corriendo = null;
      }
    }
  
    
    reiniciar() {
      if (this.corriendo !== null) {
        clearInterval(this.corriendo);
        this.corriendo = null;
      }
      this.tiempo = 0;
      this.mostrar();
    }
  }
  
  