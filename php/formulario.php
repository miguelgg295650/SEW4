<?php

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

    public function getSegundos() {
        return round($this->tiempo);
    }
}
session_start();


if (!isset($_SESSION["crono"])) {
    $_SESSION["crono"] = new Cronometro();
}

$crono = $_SESSION["crono"];

$db = new mysqli(
    "localhost",
    "DBUSER2025",
    "DBPSWD2025",
    "uo295650_db"
);

if ($db->connect_error) {
    die("Error de conexión");
}


if (isset($_POST["arrancar"])) {
    $crono->arrancar();
}

if (isset($_POST["terminar"])) {

    $crono->parar();
    $tiempo = $crono->getSegundos();

    $stmt = $db->prepare(
    "INSERT INTO tusuarios (PROFESION, EDAD, ID_GENERO, PERICIA_INFORMATICA)
     VALUES (?, ?, ?, ?)"
);

$stmt->bind_param(
    "siii",
    $_POST["profesion"],
    $_POST["edad"],
    $_POST["genero"],  
    $_POST["pericia"]
);

$stmt->execute();
$id_usuario = $stmt->insert_id;


    $stmt = $db->prepare(
    "INSERT INTO tresultados
     (ID_USUARIO, ID_DISPOSITIVO, TIEMPO_SEGUNDOS, COMPLETADA,
      COMENTARIOS_USUARIO, PROPUESTAS_MEJORA, VALORACION)
     VALUES (?, ?, ?, ?, ?, ?, ?)"
);

    $completada = 1;

    $stmt->bind_param(
        "isiiisi",
        $id_usuario,
        $_POST["dispositivo"],
        $tiempo,
        $completada,
        $_POST["comentarios_usuario"],
        $_POST["propuestas_mejora"],
        $_POST["valoracion"]
    );


    $stmt->execute();
    $stmt->close();

   $stmt = $db->prepare(
    "INSERT INTO tobservaciones_facilitador (ID_USUARIO, COMENTARIO)
     VALUES (?, ?)"
);

$stmt->bind_param(
    "is",
    $id_usuario,
    $_POST["comentario_facilitador"]
);


    $stmt->execute();
    $stmt->close();

    unset($_SESSION["crono"]);

    echo "<p>Prueba guardada correctamente</p>";
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Test de Usabilidad</title>
    <link rel="stylesheet" href="../estilo/estilo.css">
    <link rel="stylesheet" href="../estilo/layout.css">
</head>

<body>
<main>
<h2>Test de Usabilidad – MotoGP Desktop</h2>




<form method="post">
    <button type="submit" name="arrancar">Iniciar prueba</button>
</form>

<form method="post">
<fieldset>
<legend>Datos del participante</legend>

<p>Profesión <input type="text" name="profesion" required></p>
<p>Edad <input type="number" name="edad" required></p>

<p>
Género
<input type="radio" name="genero" value="1"> Hombre
<input type="radio" name="genero" value="2"> Mujer
<input type="radio" name="genero" value="3"> Otro

</p>

<p>Pericia informática (0–10)
<input type="number" name="pericia" min="0" max="10" required>
</p>

<p>
Dispositivo
<select name="dispositivo">
    <option value="1">Ordenador</option>
    <option value="2">Tableta</option>
    <option value="3">Teléfono</option>
</select>

</select>
</p>
</fieldset>

<fieldset>
<legend>Preguntas del test</legend>

<p>1. ¿Cuántos podios consiguió Brad Binder durante la temporada 2024?
<input type="text" name="p1" required></p>

<p>2. ¿Qué título mundial consiguió Brad Binder en 2016?
<input type="text" name="p2" required></p>

<p>3. ¿Cuál ha sido su mejor resultado final en MotoGP?
<input type="text" name="p3" required></p>

<p>4. ¿En qué año debutó en MotoGP?
<input type="number" name="p4" required></p>

<p>5. ¿Cuánto tiempo te llevó el juego de cartas?
<input type="text" name="p5" required></p>

<p>6. ¿Quién fue el vencedor de la carrera?
<input type="text" name="p6" required></p>

<p>7. ¿Qué tiempo hizo el día de la carrera?
<input type="text" name="p7" required></p>

<p>8. ¿Cuál es la longitud del circuito?
<input type="text" name="p8" required></p>

<p>9. ¿Dónde se llevó a cabo la carrera?
<input type="text" name="p9" required></p>

<p>10. ¿Cuántos habitantes tiene la localidad?
<input type="number" name="p10" required></p>
</fieldset>

<fieldset>
<legend>Comentarios</legend>

<p>Comentarios del participante
<textarea name="comentarios_usuario" required></textarea></p>

<p>Propuestas de mejora
<textarea name="propuestas_mejora" required></textarea></p>

<p>Valoración (0–10)
<input type="number" name="valoracion" min="0" max="10" required></p>

<p>Comentarios del facilitador
<textarea name="comentario_facilitador" required></textarea></p>
</fieldset>


<button type="submit" name="terminar">Terminar prueba</button>


</form>
</main>
</body>
</html>
