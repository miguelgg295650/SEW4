import xml.etree.ElementTree as ET

XML_FILE = "xml/circuitoEsquema.xml"
HTML_FILE = "xml/InfoCircuito.html"

NS = {"u": "http://www.uniovi.es"}


class Html:
    def __init__(self, f):
        self.f = f

    def start(self, title):
        self.f.write(f'''<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>{title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="estilo/estilo.css">
</head>
<body>
<main>
''')

    def end(self):
        self.f.write("""
</main>
</body>
</html>
""")

    def h1(self, text):
        self.f.write(f"<h1>{text}</h1>\n")

    def h2(self, text):
        self.f.write(f"<h2>{text}</h2>\n")

    def p(self, text):
        self.f.write(f"<p>{text}</p>\n")

    def open_section(self):
        self.f.write("<section>\n")

    def close_section(self):
        self.f.write("</section>\n")

    def open_ul(self):
        self.f.write("<ul>\n")

    def close_ul(self):
        self.f.write("</ul>\n")

    def li(self, text):
        self.f.write(f"<li>{text}</li>\n")

    def img(self, src, alt):
        self.f.write(f'<img src="{src}" alt="{alt}">\n')

    def video(self, src, fmt, title):
        mime = f"video/{fmt}" if fmt else "video/mp4"
        self.f.write(f'''<figure>
    <video controls>
        <source src="{src}" type="{mime}">
        Tu navegador no soporta el elemento de vídeo.
    </video>
    <figcaption>{title}</figcaption>
</figure>
''')


def main():
    tree = ET.parse(XML_FILE)
    root = tree.getroot()

    nombre = root.find("u:nombre", NS).text.strip()
    longitud_elem = root.find("u:longitud_circuito", NS)
    anchura_elem = root.find("u:anchura_media", NS)
    fecha_elem = root.find("u:fecha", NS)
    hora_elem = root.find("u:hora_inicio", NS)

    longitud_val = longitud_elem.text.strip()
    longitud_uni = longitud_elem.get("unidad", "")

    anchura_val = anchura_elem.text.strip()
    anchura_uni = anchura_elem.get("unidad", "")

    fecha_val = fecha_elem.text.strip()
    hora_val = hora_elem.text.strip()

    vueltas = root.find("u:vueltas", NS).text.strip()
    localidad = root.find("u:localidad", NS).text.strip()
    pais = root.find("u:pais", NS).text.strip()
    patrocinador = root.find("u:patrocinador", NS).text.strip()

    referencias = root.findall("u:referencias/u:referencia", NS)
    fotos = root.findall("u:galeria_fotos/u:foto", NS)
    videos = root.findall("u:galeria_videos/u:video", NS)

    resultado = root.find("u:resultado_carrera", NS)
    vencedor = resultado.find("u:vencedor", NS).text.strip()
    tiempo_total = resultado.find("u:tiempo_total", NS).text.strip()

    pilotos = root.findall("u:clasificacion_mundial/u:piloto", NS)

    with open(HTML_FILE, "w", encoding="utf-8") as f:
        html = Html(f)
        html.start(f"Información del circuito - {nombre}")

        html.h1(nombre)

        html.open_section()
        html.h2("Datos básicos")
        html.p(f"Localidad: {localidad} ({pais})")
        html.p(f"Patrocinador: {patrocinador}")
        html.p(f"Longitud del circuito: {longitud_val} {longitud_uni}")
        html.p(f"Anchura media: {anchura_val} {anchura_uni}")
        html.p(f"Fecha del evento: {fecha_val}")
        html.p(f"Hora de inicio: {hora_val} (hora local)")
        html.p(f"Número de vueltas: {vueltas}")
        html.close_section()

        html.open_section()
        html.h2("Referencias")
        html.open_ul()
        for ref in referencias:
            url = ref.text.strip()
            html.li(f'<a href="{url}" target="_blank" rel="noopener noreferrer">{url}</a>')
        html.close_ul()
        html.close_section()

        html.open_section()
        html.h2("Galería de fotos")
        html.open_ul()
        for foto in fotos:
            archivo = foto.get("archivo", "").strip()
            titulo = (foto.get("titulo") or "Foto del circuito").strip()
            f.write("<li>\n")
            html.img(archivo, titulo)
            html.p(titulo)
            f.write("</li>\n")
        html.close_ul()
        html.close_section()

        html.open_section()
        html.h2("Galería de vídeos")
        for video in videos:
            archivo = video.get("archivo", "").strip()
            titulo = (video.get("titulo") or "Vídeo del circuito").strip()
            formato = (video.get("formato") or "mp4").strip()
            html.video(archivo, formato, titulo)
        html.close_section()

        html.open_section()
        html.h2("Resultado de la carrera")
        html.p(f"Vencedor: {vencedor}")
        html.p(f"Tiempo total: {tiempo_total}")
        html.close_section()

        html.open_section()
        html.h2("Top 3 del mundial tras la carrera")
        html.open_ul()
        for piloto in pilotos:
            pos = piloto.get("posicion", "").strip()
            nombre_piloto = piloto.text.strip()
            html.li(f"Posición {pos}: {nombre_piloto}")
        html.close_ul()
        html.close_section()

        html.end()


if __name__ == "__main__":
    main()
