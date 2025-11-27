<?php
/* ===============================================================
   CONFIGURACIÓN BD – TODO EN UN ÚNICO ARCHIVO
   Cabra Edition™
   Hace:
   ✔ Reiniciar tablas
   ✔ Eliminar base de datos completa
   ✔ Exportar CSV
   Y ya está. No recrea BD porque no lo quieres.
================================================================ */

class Configuracion {

    private $host = "localhost";
    private $user = "root";
    private $pass = "";
    private $dbname = "uo295650_db";

    /* =============================
       CONECTAR A LA BD EXISTENTE
    ==============================*/
    private function conectarBD() {
        return new mysqli($this->host, $this->user, $this->pass, $this->dbname);
    }

    /* =============================
       CONECTAR AL SERVIDOR MYSQL
       (sin seleccionar BD)
    ==============================*/
    private function conectarServer() {
        return new mysqli($this->host, $this->user, $this->pass, "");
    }

    /* =============================
       1. REINICIAR BD (vaciar tablas)
    ==============================*/
    public function reiniciarBD() {
        $db = $this->conectarBD();

        // Borrar datos en orden correcto
        $db->query("DELETE FROM tcomentarios");
        $db->query("DELETE FROM tresultados");
        $db->query("DELETE FROM tusuarios");

        return true;
    }

    /* =============================
       2. ELIMINAR LA BASE DE DATOS
    ==============================*/
    public function eliminarBD() {
        $server = $this->conectarServer();
        return $server->query("DROP DATABASE IF EXISTS $this->dbname");
    }

    /* =============================
       3. EXPORTAR A CSV
    ==============================*/
    public function exportarCSV($tabla) {
        $db = $this->conectarBD();
        $result = $db->query("SELECT * FROM $tabla");

        $filename = "export_" . $tabla . "_" . date("Ymd_His") . ".csv";
        $file = fopen($filename, "w");

        // Cabeceras CSV
        $columns = $result->fetch_fields();
        $header = [];
        foreach ($columns as $c) {
            $header[] = $c->name;
        }
        fputcsv($file, $header);

        // Datos
        while ($row = $result->fetch_assoc()) {
            fputcsv($file, $row);
        }

        fclose($file);

        return $filename;
    }

    /* =============================
       MENSAJE ESTÉTICO
    ==============================*/
    public function msg($txt) {
        echo "<div style='background:#eee;padding:10px;border-left:5px solid #333;margin:10px;font-family:Arial'>
                $txt
              </div>";
    }
}

$cfg = new Configuracion();
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Configuración de Base de Datos</title>
</head>

<body style="font-family: Arial; padding: 20px;">

<h1>Configuración – MotoGP Desktop</h1>

<form method="post">
    <button name="accion" value="reiniciar">Reiniciar BD (vaciar tablas)</button>
    <button name="accion" value="eliminar">Eliminar BD completa</button>
</form>

<h2>Exportar Tabla</h2>
<form method="post">
    <select name="tabla">
        <option value="tusuarios">tusuarios</option>
        <option value="tresultados">tresultados</option>
        <option value="tcomentarios">tcomentarios</option>
    </select>
    <button name="accion" value="exportar">Exportar CSV</button>
</form>

<?php
// CONTROLADOR
if (!empty($_POST["accion"])) {

    switch ($_POST["accion"]) {

        case "reiniciar":
            $cfg->reiniciarBD();
            $cfg->msg("✔ BD reiniciada: todas las tablas han sido vaciadas.");
            break;

        case "eliminar":
            $cfg->eliminarBD();
            $cfg->msg("❌ Base de datos eliminada COMPLETAMENTE.");
            break;

        case "exportar":
            $file = $cfg->exportarCSV($_POST["tabla"]);
            $cfg->msg("📤 Exportación lista: <strong>$file</strong>");
            break;
    }
}
?>

</body>
</html>
