<?php
$errorFormulario = false;

$errorNombre = "";
$errorProfesion = "";
$errorEdad = "";
$errorGenero = "";
$errorPericia = "";
$errorDispositivo = "";
$errorCompletada = "";
$errorComentario = "";
$errorPropuestas = "";
$errorValoracion = "";
$errorComentarioFacilitador = "";

$formularioGET = "";

if (count($_GET) > 0) {

    $formularioGET = $_GET;

    if ($_GET["nombre"] == "") {
        $errorNombre = " *";
        $errorFormulario = true;
    }

    if ($_GET["profesion"] == "") {
        $errorProfesion = " *";
        $errorFormulario = true;
    }

    if ($_GET["edad"] == "" || !is_numeric($_GET["edad"])) {
        $errorEdad = " *";
        $errorFormulario = true;
    }

    if (empty($_GET["genero"])) {
        $errorGenero = " *";
        $errorFormulario = true;
    }

    if ($_GET["pericia"] == "" || !is_numeric($_GET["pericia"])) {
        $errorPericia = " *";
        $errorFormulario = true;
    }

    if (empty($_GET["dispositivo"])) {
        $errorDispositivo = " *";
        $errorFormulario = true;
    }

    if (!isset($_GET["completada"])) {
        $errorCompletada = " *";
        $errorFormulario = true;
    }

    if ($_GET["comentario"] == "") {
        $errorComentario = " *";
        $errorFormulario = true;
    }

    if ($_GET["propuestas"] == "") {
        $errorPropuestas = " *";
        $errorFormulario = true;
    }

    if ($_GET["valoracion"] == "" || !is_numeric($_GET["valoracion"])) {
        $errorValoracion = " *";
        $errorFormulario = true;
    }

    if ($_GET["comentario_facilitador"] == "") {
        $errorComentarioFacilitador = " *";
        $errorFormulario = true;
    }
}
?>

<form action="#" method="get" name="formulario">

    <p>Nombre</p>
    <p>
        <input type="text" name="nombre"/>
        <span><?php echo $errorNombre; ?></span>
    </p>

    <p>Profesión</p>
    <p>
        <input type="text" name="profesion"/>
        <span><?php echo $errorProfesion; ?></span>
    </p>

    <p>Edad</p>
    <p>
        <input type="number" name="edad" step="1"/>
        <span><?php echo $errorEdad; ?></span>
    </p>

    <p>Género</p>
    <p>
        <input type="radio" name="genero" value="H"/> Hombre
        <input type="radio" name="genero" value="M"/> Mujer
        <input type="radio" name="genero" value="O"/> Otro
        <span><?php echo $errorGenero; ?></span>
    </p>

    <p>Pericia informática (0 a 10)</p>
    <p>
        <input type="number" name="pericia" min="0" max="10" step="1"/>
        <span><?php echo $errorPericia; ?></span>
    </p>

    <p>Dispositivo</p>
    <p>
        <select name="dispositivo">
            <option value="ORDENADOR">Ordenador</option>
            <option value="TABLETA">Tableta</option>
            <option value="TELEFONO">Teléfono</option>
        </select>
        <span><?php echo $errorDispositivo; ?></span>
    </p>

    <p>Completada</p>
    <p>
        <input type="radio" name="completada" value="1"/> Sí
        <input type="radio" name="completada" value="0"/> No
        <span><?php echo $errorCompletada; ?></span>
    </p>

    <p>Comentario del participante</p>
    <p>
        <textarea name="comentario" rows="4" cols="40"></textarea>
        <span><?php echo $errorComentario; ?></span>
    </p>

    <p>Propuestas del participante</p>
    <p>
        <textarea name="propuestas" rows="4" cols="40"></textarea>
        <span><?php echo $errorPropuestas; ?></span>
    </p>

    <p>Valoración (0 a 10)</p>
    <p>
        <input type="number" name="valoracion" min="0" max="10" step="1"/>
        <span><?php echo $errorValoracion; ?></span>
    </p>

    <p>Comentario del facilitador</p>
    <p>
        <textarea name="comentario_facilitador" rows="4" cols="40"></textarea>
        <span><?php echo $errorComentarioFacilitador; ?></span>
    </p>

    <p>
        <input type="submit" value="Enviar"/>
    </p>
    
    
</form>
