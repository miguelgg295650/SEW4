class Carrusel {

    #busqueda;
    #actual;
    #maximo;
    constructor(busqueda) {
        this.#busqueda = busqueda;
        this.#actual = 0;
        this.#maximo = 4;
    }

   getFotografias() {
        const flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne";

        return $.ajax({
            url: flickrAPI,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            data: {
                tags: this.#busqueda,
                tagmode: "any",
                format: "json"
            }
        }).then(data => {
            const fotos = data.items.map(item => {
                return {
                    // Se utiliza el sufijo _z de Flickr para solicitar imágenes de 640px en el borde mayor.
                    // Flickr no garantiza que todas las imágenes tengan disponible este tamaño,
                    // devolviendo en algunos casos la máxima resolución existente.

                    titulo: item.title,
                    url: item.media.m.replace("_m", "_z") 
                };
            });

            return fotos; 
        });
    }

    procesarJSONFotografias(json) {
        const resultado = [];

        for (let i = 0; i < 5; i++) {
            resultado[i] = [i + 1, json[i].url];
        }

        return resultado;
    }

    mostrarFotografias(fotosProcesadas) {
        const primera = fotosProcesadas[0][1]; 

        const article = $("<article></article>");
        const h2 = $(`<h2>Imágenes del circuito del Circuito de Barcelona</h2>`);
        const img = $(`<img src="${primera}" alt="Imagen del circuito">`);

        article.append(h2);
        article.append(img);
        $("main").append(article);


        setInterval(this.cambiarFotografia.bind(this, fotosProcesadas), 3000);
    }

    cambiarFotografia(fotos) {
        this.#actual++;

        if (this.#actual > this.#maximo) {
            this.#actual = 0;
        }
        const nuevaURL = fotos[this.#actual][1];

        $("article img").attr("src", nuevaURL);

    }


}



