class Noticias {

    constructor(busqueda) {
        this.busqueda = busqueda;
        this.url = "https://api.thenewsapi.com/v1/news/all";
        this.apiKey = "spbeVqwuMye9WKysYupKyVkVZ32Hx2k13Y17jMcE";
    }

    async buscar() {

        const urlCompleta = `${this.url}?search=${encodeURIComponent(this.busqueda)}&language=es&api_token=${this.apiKey}`;

        try {
            const respuesta = await fetch(urlCompleta);

            const datos = await respuesta.json();
            return datos;

        } catch (error) {
            console.error("Error al obtener las noticias:", error.message);
            throw error;
        }
    }

    procesarInformacion(json) {

    const noticiasProcesadas = [];

    for (let i = 0; i < json.data.length; i++) {
        noticiasProcesadas.push({
            titulo: json.data[i].title,
            entradilla: json.data[i].description,
            enlace: json.data[i].url,
            fuente: json.data[i].source
        });
    }

    return noticiasProcesadas;
}


mostrarNoticias(noticias) {

    const section = $("<section></section>");
    const h2 = $("<h3>Noticias sobre MotoGP</h3>");
    section.append(h2);

    for (let i = 0; i < noticias.length; i++) {

        const article = $("<article></article>");

        const h4 = $(`<h4>${noticias[i].titulo}</h4>`);
        const p = $(`<p>${noticias[i].entradilla}</p>`);
        const a = $(`<a href="${noticias[i].enlace}" target="_blank">Leer noticia completa</a>`);
        const fuente = $(`<p><em>Fuente: ${noticias[i].fuente}</em></p>`);

        article.append(h4);
        article.append(p);
        article.append(a);
        article.append(fuente);

        section.append(article);
    }

    $("main").append(section);
}

}
