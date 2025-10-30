// js/memoria.js
class Memoria {
    constructor() {}
  
    voltearCarta(carta) {
      carta.dataset.estado = "volteada";
    }
  }
  
  // instancia global para usar en los onclick de las cartas
  const memoria = new Memoria();
  