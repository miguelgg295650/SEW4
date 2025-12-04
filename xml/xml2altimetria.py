import xml.etree.ElementTree as ET

XML_FILE = "xml/circuitoEsquema.xml"
SVG_FILE = "xml/altimetria.svg"

NS = {"u": "http://www.uniovi.es"}

def main():
    tree = ET.parse(XML_FILE)
    root = tree.getroot()

    tramos = root.findall(".//u:tramo", NS)

    distancias = []
    altitudes = []
    total = 0.0

    for tramo in tramos:
        d = float(tramo.find("u:distancia", NS).text)
        a = float(tramo.find("u:punto_final/u:altitud", NS).text)
        total += d
        distancias.append(total)
        altitudes.append(a)

    width = 1000
    height = 400
    margin = 40

    usable_width = width - 2 * margin
    usable_height = height - 2 * margin

    base_alt = 100
    max_alt = round(max(altitudes))

    points = []
    for x_m, alt in zip(distancias, altitudes):
        x = margin + (x_m / distancias[-1]) * usable_width
        y = height - margin - ((alt - base_alt) / (max_alt - base_alt)) * usable_height
        points.append(f"{x},{y}")

    y_base = height - margin

    points.insert(0, f"{margin},{y_base}")
    points.append(f"{margin + usable_width},{y_base}")

    points_str = " ".join(points)

    y_100 = y_base
    y_max = height - margin - ((max_alt - base_alt) / (max_alt - base_alt)) * usable_height

    x_text = margin + usable_width + 10

    with open(SVG_FILE, "w", encoding="utf-8") as f:
        f.write(f'''<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg">

  <polygon points="{points_str}"
           fill="lightgray"
           stroke="red"
           stroke-width="2" />
           
  <text x="{x_text}" y="{y_100 + 5}" text-anchor="start" font-size="14">100m</text>

  <line x1="{margin}" y1="{y_max}" x2="{margin + usable_width}" y2="{y_max}"
        stroke="black" stroke-width="1" />
  <text x="{x_text}" y="{y_max + 5}" text-anchor="start" font-size="14">{max_alt}m</text>

</svg>
''')

if __name__ == "__main__":
    main()
