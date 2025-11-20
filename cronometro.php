<?php
session_start();

class Cronometro {
    private $inicio = 0;
    private $fin = 0;
    private $tiempo = 0;

    public function arrancar() {
        $this->inicio = microtime(true);
    }

    public function parar() {
        $this->fin = microtime(true);
        $this->tiempo = $this->fin - $this->inicio;
    }

    public function mostrar() {
        $totalSegundos = $this->tiempo;
        $minutos = floor($totalSegundos / 60);
        $segundos = $totalSegundos - ($minutos * 60);
        return sprintf("%02d:%04.1f", $minutos, $segundos);
    }
}

$salida = "";

if (!isset($_SESSION["crono"])) {
    $_SESSION["crono"] = new Cronometro();
}

$crono = $_SESSION["crono"];

if (count($_POST) > 0) {
    if (isset($_POST['arrancar'])) $crono->arrancar();
    if (isset($_POST['parar'])) $crono->parar();
    if (isset($_POST['mostrar'])) $salida = $crono->mostrar();
}
?>
<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>MotoGP</title>
    

    <meta name ="author" content ="Miguel Gutierrez Garcia"/>
    <meta name ="description" content ="Portal web sobre MotoGP" />
    
    <meta name ="keywords" content ="MotoGP,moto,racing,Jack Miller" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />

    <link rel="icon" href="multimedia/favicon.ico">
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />

</head>

<body>
    <!-- Datos con el contenidos que aparece en el navegador -->
    <header>
        <h1><a href="index.html"> MotoGP Desktop</a></h1>
        <nav>
            <a href="index.html" class="active"  title="Pagina principal de MotoGP Desktop">Inicio</a>
            <a href="piloto.html" title="Brad Binder">Piloto</a>
            <a href="circuito.html" title="Circuito de Barcelona">Circuito</a>
            <a href="meteorologia.html" title="Pronostico del tiempo para el circuito MotoGP Desktop">Meteorologia</a>
            <a href="clasificaciones.php" title="Clasificaciones MotoGP Desktop">Clasificaciones</a>
            <a href="juegos.html" class="active" title="Juegos MotoGP Desktop">Juegos</a>
            <a href="ayuda.html" title="Ayuda para el uso de MotoGP Desktop">Ayuda</a>
        </nav>
    </header>

    <p>Estás en: <a href="index.html">Inicio</a> >> <a href="juegos.html">Juegos</a> >> <strong>Cronómetro PHP</strong></p>

    <main>
        <h3>Cronometro</h3>

        <form action="#" method="post" name="botones">
            <input type="submit" class="button" name="arrancar" value="Arrancar"/>
            <input type="submit" class="button" name="parar" value="Parar"/>
            <input type="submit" class="button" name="mostrar" value="Mostrar"/>
        </form>

        <p><?php echo $salida; ?></p>
    </main>

    </body>
</html>


