<?php
class Clasificacion {

    private $documento = "xml/circuitoEsquema.xml";
    private $xml;

    public function __construct() {
        $datos = file_get_contents($this->documento);
        if ($datos !== false) {
            $this->xml = new SimpleXMLElement($datos);
            $this->xml->registerXPathNamespace("u", "http://www.uniovi.es");
        }
    }

    public function mostrarResultadoCarrera() {
        $vencedor = $this->xml->xpath("//u:resultado_carrera/u:vencedor")[0];
        $tiempo   = $this->xml->xpath("//u:resultado_carrera/u:tiempo_total")[0];

        echo "<section>";
        echo "<h3>Resultado de la carrera</h3>";
        echo "<p>Vencedor: {$vencedor}</p>";
        echo "<p>Tiempo total: {$tiempo}</p>";
        echo "</section>";
    }

    public function mostrarClasificacionMundial() {
        $pilotos = $this->xml->xpath("//u:clasificacion_mundial/u:piloto");

        echo "<section>";
        echo "<h3>Clasificación del mundial</h3>";
        echo "<ul>";

        foreach ($pilotos as $piloto) {
            $posicion = $piloto["posicion"];
            $nombre = trim((string)$piloto);
            echo "<li>Posición {$posicion}: {$nombre}</li>";
        }

        echo "</ul>";
        echo "</section>";
    }
}

$clasificacion = new Clasificacion();
?>

<!DOCTYPE HTML>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <title>MotoGP-Clasificaciones</title>
    <meta name="author" content="Miguel Gutierrez Garcia"/>
    <meta name="description" content="Portal web sobre MotoGP" />
    <meta name="keywords" content="MotoGP,moto,racing" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="icon" href="multimedia/favicon.ico">
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
</head>

<body>
    <header>
        <h1><a href="index.html">MotoGP Desktop</a></h1>
        <nav>
            <a href="index.html">Inicio</a>
            <a href="piloto.html">Piloto</a>
            <a href="circuito.html">Circuito</a>
            <a href="meteorologia.html">Meteorología</a>
            <a href="clasificaciones.php" class="active">Clasificaciones</a>
            <a href="juegos.html">Juegos</a>
            <a href="ayuda.html">Ayuda</a>
        </nav>
    </header>

    <p>Estás en: <a href="index.html">Inicio</a> >> <strong>Clasificaciones</strong></p>

    <main>
        <h2>Clasificaciones de MotoGP Desktop</h2>

        <?php
            $clasificacion->mostrarResultadoCarrera();
            $clasificacion->mostrarClasificacionMundial();
        ?>
    </main>
</body>
</html>
