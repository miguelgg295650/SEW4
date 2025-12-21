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
        return `Gentilicio: ${this.#gentilicio} - Población: ${this.#poblacion} habitantes`;
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

    getMeteorologiaCarrera() {
        const url = "https://archive-api.open-meteo.com/v1/archive";

        return $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            data: {
                latitude: 41.3888,
                longitude: 2.159,

                start_date: "2025-05-17",
                end_date: "2025-05-17",

                daily: "sunrise,sunset",
                hourly: "temperature_2m,relative_humidity_2m,apparent_temperature,rain,wind_speed_10m,wind_direction_10m",
                timezone: "auto"
            }
        });
    }

    procesarJSONCarrera(json) {

        const datosProcesados = {
            fecha: json.daily.time[0],
            amanecer: json.daily.sunrise[0].split("T")[1], //solo las horas
            atardecer: json.daily.sunset[0].split("T")[1],
            horas: []
        };

        for (let i = 0; i < json.hourly.time.length; i++) {

            const hora = json.hourly.time[i].split("T")[1];

            datosProcesados.horas.push({
                fechaHora: hora,
                temperatura: json.hourly.temperature_2m[i],
                sensacion: json.hourly.apparent_temperature[i],
                humedad: json.hourly.relative_humidity_2m[i],
                lluvia: json.hourly.rain[i],
                vientoVelocidad: json.hourly.wind_speed_10m[i],
                vientoDireccion: json.hourly.wind_direction_10m[i]
            });
        }

        return datosProcesados;
    }


   mostrarMeteorologiaCarrera(datos) {

    const section = $("<section></section>");

    const h3Dia = $("<h3>Información general: Día de la carrera</h3>");
    section.append(h3Dia);

    const pFecha = $(`<p>Fecha: ${datos.fecha}</p>`);
    const pAmanecer = $(`<p>Amanecer: ${datos.amanecer}</p>`);
    const pAtardecer = $(`<p>Atardecer: ${datos.atardecer}</p>`);

    section.append(pFecha);
    section.append(pAmanecer);
    section.append(pAtardecer);

    const h4Horas = $("<h4>Datos meteorológicos horarios</h4>");
    section.append(h4Horas);

    const table = $("<table></table>");
    const thead = $(`
        <thead>
            <tr>
                <th>Hora</th>
                <th>Temp (°C)</th>
                <th>Sensación</th>
                <th>Humedad (%)</th>
                <th>Lluvia (mm)</th>
                <th>Viento (km/h)</th>
            </tr>
        </thead>
    `);

    const tbody = $("<tbody></tbody>");

    datos.horas.forEach(hora => {
        const tr = $(`
            <tr>
                <td>${hora.fechaHora}</td>
                <td>${hora.temperatura}</td>
                <td>${hora.sensacion}</td>
                <td>${hora.humedad}</td>
                <td>${hora.lluvia}</td>
                <td>${hora.vientoVelocidad}</td>
            </tr>
        `);
        tbody.append(tr);
    });

    table.append(thead);
    table.append(tbody);

    section.append(table);

    $("main").after(section);
}




    getMeteorologiaEntrenos() {

        const url = "https://archive-api.open-meteo.com/v1/archive";

        return $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            data: {
                latitude: 41.3888,
                longitude: 2.159,
                start_date: "2025-05-14",
                end_date: "2025-05-16",

                hourly: "temperature_2m,rain,wind_speed_10m,relative_humidity_2m",
                timezone: "auto"
            }
        });
    }

    procesarJSONEntrenos(json) {
        const datosProcesados = {
            dias: {}
        };

        // Inicializamos los días
        for (let i = 0; i < json.hourly.time.length; i++) {

            const dia = json.hourly.time[i].split("T")[0];

            if (!datosProcesados.dias[dia]) {
                datosProcesados.dias[dia] = {
                    temperatura: [],
                    lluvia: [],
                    viento: [],
                    humedad: []
                };
            }

            datosProcesados.dias[dia].temperatura.push(json.hourly.temperature_2m[i]);
            datosProcesados.dias[dia].lluvia.push(json.hourly.rain[i]);
            datosProcesados.dias[dia].viento.push(json.hourly.wind_speed_10m[i]);
            datosProcesados.dias[dia].humedad.push(json.hourly.relative_humidity_2m[i]);
        }

        
        const resultado = [];

        for (const dia in datosProcesados.dias) {

            const d = datosProcesados.dias[dia];

            const media = arr =>
                (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2);

            resultado.push({
                fecha: dia,
                temperatura: media(d.temperatura),
                lluvia: media(d.lluvia),
                viento: media(d.viento),
                humedad: media(d.humedad)
            });
        }

        return resultado;
    }

    mostrarMeteorologiaEntrenos(datos) {

    const section = $("<section></section>");
    const h3 = $("<h3>Información general: Días de entrenamiento</h3>");
    section.append(h3);

    const table = $("<table></table>");

    const thead = $(`
        <thead>
            <tr>
                <th>Día</th>
                <th>Temperatura media (°C)</th>
                <th>Lluvia media (mm)</th>
                <th>Viento medio (km/h)</th>
                <th>Humedad media (%)</th>
            </tr>
        </thead>
    `);

    const tbody = $("<tbody></tbody>");

    for (let i = 0; i < datos.length; i++) {
        const d = datos[i];

        const tr = $(`
            <tr>
                <td>${d.fecha}</td>
                <td>${d.temperatura}</td>
                <td>${d.lluvia}</td>
                <td>${d.viento}</td>
                <td>${d.humedad}</td>
            </tr>
        `);

        tbody.append(tr);
    }

    table.append(thead);
    table.append(tbody);
    section.append(table);

    $("main").append(section);
}







}
