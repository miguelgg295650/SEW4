
class Ciudad {
    constructor (nombre,pais,gentilicio){
        this.nombre=nombre;
        this.pais=pais;
        this.gentilicio=gentilicio;
        this.poblacion=null;
        this.coordenadas = { lat: null, lon: null };
    }


    rellenarCampos(poblacion,coordenadas){
        this.poblacion = poblacion;
        this.coordenadas = coordenadas;
    }

    getNombreCiudad(){
        return this.nombre;
    }

    getNombrePais(){
        return this.pais;
    }

    
    getInfo(){
        return `<ul>
                 <li> ${this.gentilicio} </li> 
                 <li> ${this.poblacion} habitantes</li> 
               </ul>`;
    }
    
    writeCoord(){
        const lat = Number(this.coordenadas.lat);
        const lon = Number(this.coordenadas.lon);
        document.write(`<p>Coordenadas: (${lat}, ${lon})</p>`);
    }
}
c = new Ciudad("Barcelona","España","Barceloneses");
c.rellenarCampos(17300000,{lat:41.403619, lon:2.175564});

document.write(`<h3> ${c.getNombreCiudad()}</h3>`)
document.write(`<p> País: ${c.getNombrePais()}</p>`)
document.write(`<p> Gentilicio y poblacion: ${c.getInfo()}</p>`)
c.writeCoord();

    