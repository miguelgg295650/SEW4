<?php

class Configuracion {

    private $host = "localhost";
    private $user = "DBUSER2025";
    private $pass = "DBPSWD2025";
    private $dbname = "uo295650_db";

    private function conectarBD() {
        $db = new mysqli($this->host, $this->user, $this->pass, $this->dbname);
        if ($db->connect_error) {
            die("Error de conexión");
        }
        return $db;
    }

    private function conectarServidor() {
        return new mysqli($this->host, $this->user, $this->pass);
    }

    public function reiniciarBD() {
        $db = $this->conectarBD();
        $db->query("SET FOREIGN_KEY_CHECKS=0");
        $db->query("TRUNCATE tobservaciones_facilitador");
        $db->query("TRUNCATE tresultados");
        $db->query("TRUNCATE tusuarios");
        $db->query("SET FOREIGN_KEY_CHECKS=1");
    }

    public function eliminarBD() {
        $server = $this->conectarServidor();
        $server->query("DROP DATABASE IF EXISTS {$this->dbname}");
    }

    public function exportarCSV() {

        $db = $this->conectarBD();

        $tablas = [
            "tusuarios",
            "tresultados",
            "tobservaciones_facilitador"
        ];

        $archivo = "datos.csv";
        $f = fopen($archivo, "w");
        foreach ($tablas as $tabla) {

            $res = $db->query("SELECT * FROM $tabla");
            if (!$res) continue;

            

            $campos = $res->fetch_fields();
            $cabecera = [];

            foreach ($campos as $campo) {
                $cabecera[] = $campo->name;
            }

            fputcsv($f, $cabecera);

            while ($fila = $res->fetch_assoc()) {
                fputcsv($f, $fila);
            }
        }
        fclose($f);
    }

}

$cfg = new Configuracion();

if (isset($_POST["accion"])) {
    switch ($_POST["accion"]) {
        case "reiniciar":
            $cfg->reiniciarBD();
            break;
        case "eliminar":
            $cfg->eliminarBD();
            break;
        case "exportar":
            $cfg->exportarCSV();
            break;
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Configuración Test Usabilidad</title>
    <link rel="stylesheet" href="../estilo/estilo.css">
    <link rel="stylesheet" href="../estilo/layout.css">
</head>

<body>
<main>
    <h2>Configuración del Test de Usabilidad</h2>
    <section>

        <form method="post">
            <button name="accion" value="reiniciar">Reiniciar Base de Datos</button>
            <button name="accion" value="exportar">Exportar Datos CSV</button>
            <button name="accion" value="eliminar">Eliminar Base de Datos</button>
        </form>
    </section>
</main>
</body>
</html>
