import json, pathlib, zipfile, xml.etree.ElementTree as ET
root = pathlib.Path(__file__).resolve().parent.parent
items = json.loads((root/'docs/data.json').read_text())
assert len(items) == len({x['code'] for x in items}) == 242
by_code = {x['code']: x for x in items}
features = json.loads((root/'countries.geojson').read_text())['features']
def ring_count(code):
    feature = next(f for f in features if f['properties']['ADM0_A3'] == code)
    coords = feature['geometry']['coordinates']
    polygons = [coords] if feature['geometry']['type'] == 'Polygon' else coords
    return sum(len(p) for p in polygons)
assert by_code['cn']['d'].count('M') == ring_count('CHN') + ring_count('TWN')
assert by_code['tw']['d'].count('M') == ring_count('TWN')
with zipfile.ZipFile(root/'docs/region-map-icons-svg-library.zip') as archive:
    assert len(archive.namelist()) == 484
    for style in ['outline', 'solid']:
        for item in items:
            relative = f"svg/{style}/{item['code']}.svg"
            content = (root/'docs'/relative).read_bytes()
            svg = ET.fromstring(content)
            assert svg.attrib['viewBox'] == '0 0 512 512'
            assert svg.find('{http://www.w3.org/2000/svg}path').attrib['d'] == item['d']
            assert archive.read(relative) == content
print('PASS: 242 unique shapes; 484 valid SVGs; ZIP and geometry match.')
