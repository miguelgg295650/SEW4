class Circuito {

    constructor() {
        this.comprobarApiFile();
    }

    comprobarApiFile() {
        if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
            const p = document.createElement("p");
            p.textContent =
                "¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!";
            document.body.appendChild(p);
        }
    }

    leerArchivoHTML(files) {

        const archivo = files[0];
        const errorArchivo = document.getElementById("errorLectura");

        const tipoTexto = /text.*/;

        if (!archivo.type.match(tipoTexto)) {
            errorArchivo.textContent = "Error: ¡¡¡ Archivo no válido !!!";
            return;
        }

        const lector = new FileReader();

        lector.onload = (evento) => {
            this.procesarYMostrarHTML(evento.target.result);
        };

        lector.readAsText(archivo);
    }

        procesarYMostrarHTML(textoHTML) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(textoHTML, "text/html");

        const mainOrigen = doc.querySelector("main");

        const sectionDestino = document.querySelector("main section");

        //Vaciar section para meter nuevo contenido
        sectionDestino.innerHTML = "";

        const titulo = mainOrigen.querySelector("h1");
        if (titulo) {
            const h2 = document.createElement("h2");
            h2.textContent = titulo.textContent;
            sectionDestino.appendChild(h2);
        }

        const secciones = mainOrigen.querySelectorAll("section");

        secciones.forEach(secOrig => {

            const section = document.createElement("section");

            const h2Orig = secOrig.querySelector("h2");
            if (h2Orig) {
                const h3 = document.createElement("h3");
                h3.textContent = h2Orig.textContent;
                section.appendChild(h3);
            }

            secOrig.querySelectorAll("p").forEach(pOrig => {
                const p = document.createElement("p");
                p.textContent = pOrig.textContent;
                section.appendChild(p);
            });

            secOrig.querySelectorAll("ul").forEach(ulOrig => {
                const ul = document.createElement("ul");

                ulOrig.querySelectorAll("li").forEach(liOrig => {
                    const li = document.createElement("li");

                    const enlace = liOrig.querySelector("a");
                    if (enlace) {
                        const a = document.createElement("a");
                        a.href = enlace.href;
                        a.target = "_blank";
                        a.rel = "noopener noreferrer";
                        a.textContent = enlace.textContent;
                        li.appendChild(a);
                    } else {
                        li.textContent = liOrig.textContent;
                    }

                    ul.appendChild(li);
                });

                section.appendChild(ul);
            });

            secOrig.querySelectorAll("img").forEach(imgOrig => {
                const img = document.createElement("img");
                img.src = imgOrig.getAttribute("src");
                img.alt = imgOrig.getAttribute("alt") || "";
                section.appendChild(img);
            });

            secOrig.querySelectorAll("figure").forEach(figureOrig => {

                const figure = document.createElement("figure");

                const videoOrig = figureOrig.querySelector("video");
                if (videoOrig) {
                    const video = document.createElement("video");
                    video.controls = true;

                    videoOrig.querySelectorAll("source").forEach(sourceOrig => {
                        const source = document.createElement("source");
                        source.src = sourceOrig.getAttribute("src");
                        source.type = sourceOrig.getAttribute("type");
                        video.appendChild(source);
                    });

                    figure.appendChild(video);
                }

                const figcaptionOrig = figureOrig.querySelector("figcaption");
                if (figcaptionOrig) {
                    const figcaption = document.createElement("figcaption");
                    figcaption.textContent = figcaptionOrig.textContent;
                    figure.appendChild(figcaption);
                }

                section.appendChild(figure);
            });


            sectionDestino.appendChild(section);
        });
    }

}

class CargadorSVG {

    constructor() {
        this.comprobarApiFile();
    }

    comprobarApiFile() {
        if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
            const p = document.createElement("p");
            p.textContent =
                "¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!";
            document.body.appendChild(p);
        }
    }

    leerArchivoSVG(files) {

        const archivo = files[0];
        const tipoSVG = /image\/svg\+xml/;

        if (!archivo || !archivo.type.match(tipoSVG)) {
            alert("Error: ¡¡¡ Archivo SVG no válido !!!");
            return;
        }

        const lector = new FileReader();

        lector.onload = (evento) => {
            this.insertarSVG(evento.target.result);
        };

        lector.readAsText(archivo);
    }

    insertarSVG(contenidoSVG) {

        const parser = new DOMParser();
        const documentoSVG = parser.parseFromString(contenidoSVG, "image/svg+xml");
        const elementoSVG = documentoSVG.documentElement;

        const sections = document.querySelectorAll("main section");
        const sectionDestino = sections[sections.length - 2];


        sectionDestino.innerHTML = "";
         
        const h3 = document.createElement("h3");
        h3.textContent = "Altimetría del circuito";
        sectionDestino.appendChild(h3);
        sectionDestino.appendChild(elementoSVG);
    }

}


class CargadorKML {

    constructor() {
        this.comprobarApiFile();
        this.mapa = null;
    }

    comprobarApiFile() {
        if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
            const p = document.createElement("p");
            p.textContent = "¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!";
            document.body.appendChild(p);
        }
    }

    leerArchivoKML(files) {
        const archivo = files[0];

        if (!archivo || !archivo.name.endsWith(".kml")) {
            alert("Error: archivo KML no válido");
            return;
        }

        const lector = new FileReader();

        lector.onload = (evento) => {
            this.procesarKML(evento.target.result);
        };

        lector.readAsText(archivo);
    }

    procesarKML(textoKML) {
        const parser = new DOMParser();
        const xml = parser.parseFromString(textoKML, "text/xml");

        const primerPunto = xml.querySelector("Placemark Point coordinates");
        if (!primerPunto) return;

        const [lon0, lat0] = primerPunto.textContent.trim().split(",").map(Number);
        const origen = { lat: lat0, lng: lon0 };

        const linea = xml.querySelector("LineString coordinates");
        if (!linea) return;

        const coordenadas = linea.textContent.trim().split(/\s+/).map(p => {
            const [lon, lat] = p.split(",").map(Number);
            return { lat, lng: lon };
        });

        this.insertarCapaKML(origen, coordenadas);
    }

    insertarCapaKML(origen, coordenadas) {

    const sections = document.querySelectorAll("main section");
    const sectionDestino = sections[sections.length - 1];

    sectionDestino.innerHTML = "";

    const h3 = document.createElement("h3");
    h3.textContent = "Mapa del circuito";
    sectionDestino.appendChild(h3);

    const divMapa = document.createElement("div");
    sectionDestino.appendChild(divMapa);

    if (!this.mapa) {
        this.mapa = new google.maps.Map(divMapa, {
            center: origen,
            zoom: 16,
            mapId: "fd5a6044ca6d575a22f9694c"
        });
    }

    new google.maps.marker.AdvancedMarkerElement({
        map: this.mapa,
        position: origen,
        title: "Inicio del circuito"
    });

    new google.maps.Polyline({
        path: coordenadas,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 3,
        map: this.mapa
    });
}

}


