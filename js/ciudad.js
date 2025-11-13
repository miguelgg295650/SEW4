class Ciudad {
    #nombre;
    #pais;
    #gentilicio;
    #poblacion;
    #coordenadas;

    constructor(nombre, pais, gentilicio) {
        this.#nombre = nombre;
        this.#pais = pais;
        this.#gentilicio = gentilicio;
        this.#poblacion = null;
        this.#coordenadas = { lat: null, lon: null };
    }

    rellenarCampos(poblacion, coordenadas) {
        this.#poblacion = poblacion;
        this.#coordenadas = coordenadas;
    }

    getNombreCiudad() {
        return this.#nombre;
    }

    getNombrePais() {
        return this.#pais;
    }

    getInfo() {
        return `${this.#gentilicio} · ${this.#poblacion} habitantes`;
    }

    writeCoord() {
        const lat = Number(this.#coordenadas.lat);
        const lon = Number(this.#coordenadas.lon);

        const p = document.createElement("p");
        p.textContent = `Coordenadas: (${lat}, ${lon})`;
        document.body.appendChild(p);
    }

    writeParagraph(texto) {
        const p = document.createElement("p");
        p.innerHTML = texto;
        document.body.appendChild(p);
    }

    writeTitle(texto) {
        const h = document.createElement("h3");
        h.textContent = texto;
        document.body.appendChild(h);
    }
}
