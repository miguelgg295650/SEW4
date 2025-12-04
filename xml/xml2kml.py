import xml.etree.ElementTree as ET

XML_FILE = "xml/circuitoEsquema.xml"
KML_FILE = "xml/circuito.kml"

NS = {"u": "http://www.uniovi.es"}

def main():
    tree = ET.parse(XML_FILE)
    root = tree.getroot()

    coordenadas = []
    tramos = root.findall(".//u:tramo", NS)

    for tramo in tramos:
        lon = tramo.find("u:punto_final/u:longitud", NS).text.strip()
        lat = tramo.find("u:punto_final/u:latitud", NS).text.strip()
        alt = tramo.find("u:punto_final/u:altitud", NS).text.strip()
        coordenadas.append((lon, lat, alt))

    with open(KML_FILE, "w", encoding="utf-8") as f:
        f.write("""<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
<Document>
    <name>Circuito</name>
""")

        for idx, (lon, lat, alt) in enumerate(coordenadas, start=1):
            f.write(f"""
    <Placemark>
        <name>{idx}</name>
        <Point>
            <coordinates>{lon},{lat},{alt}</coordinates>
        </Point>
    </Placemark>
""")

        f.write("""
    <Placemark>
        <name>Línea del circuito</name>
        <Style>
            <LineStyle>
                <color>ff0000ff</color>
                <width>3</width>
            </LineStyle>
        </Style>
        <LineString>
            <coordinates>
""")

        for lon, lat, alt in coordenadas:
            f.write(f"                {lon},{lat},{alt}\n")

        f.write("""            </coordinates>
        </LineString>
    </Placemark>

</Document>
</kml>
""")
        
main()