import json,math,pathlib,zipfile
root=pathlib.Path(__file__).resolve().parent.parent
features=json.loads((root/'countries.geojson').read_text())['features']; items=[]
def polygons(feature):
 coordinates=feature['geometry']['coordinates']
 return [coordinates] if feature['geometry']['type']=='Polygon' else coordinates

taiwan=next(f for f in features if f['properties']['ADM0_A3']=='TWN')
for f in features:
 p=f['properties']; code=p.get('ISO_A2_EH') or p.get('ISO_A2'); code=code if code and code!='-99' else p['ADM0_A3']; code=code.lower()
 if any(x['code']==code for x in items):
  old=next(x for x in items if x['code']==code)
  if p['NAME_EN']==p.get('SOVEREIGNT'): old['code']=old['source'].lower()
  else: code=p['ADM0_A3'].lower()
 polys=list(polygons(f))
 if p['ADM0_A3']=='CHN': polys.extend(polygons(taiwan))
 pts=[pt for poly in polys for ring in poly for pt in ring]; lons=sorted(set(pt[0]%360 for pt in pts)); gaps=[((lons[(i+1)%len(lons)]-v)%360,i) for i,v in enumerate(lons)]; _,i=max(gaps); start=lons[(i+1)%len(lons)]
 lat=sum(pt[1] for pt in pts)/len(pts); c=max(.15,math.cos(math.radians(lat)))
 def project(pt):return (((pt[0]%360-start)%360)*c,-pt[1])
 coords=[project(pt) for pt in pts]; xmin=min(x for x,y in coords); xmax=max(x for x,y in coords); ymin=min(y for x,y in coords); ymax=max(y for x,y in coords); scale=440/max(xmax-xmin,ymax-ymin); ox=(512-(xmax-xmin)*scale)/2; oy=(512-(ymax-ymin)*scale)/2
 paths=[]
 for poly in polys:
  for ring in poly:
   xy=[project(pt) for pt in ring]; paths.append('M'+'L'.join(f'{(x-xmin)*scale+ox:.2f},{(y-ymin)*scale+oy:.2f}' for x,y in xy)+'Z')
 d=''.join(paths); item={'code':code,'name':p['NAME_EN'],'zh':p.get('NAME_ZH',p['NAME_EN']),'continent':p['CONTINENT'],'d':d,'source':p['ADM0_A3']}; items.append(item)
items.sort(key=lambda x:x['name'])
(root/'docs/data.json').write_text(json.dumps(items,ensure_ascii=False,separators=(',',':')))
for style in ['outline','solid']:
 folder=root/'docs/svg'/style; folder.mkdir(parents=True,exist_ok=True)
 for x in items:
  attrs='fill="currentColor"' if style=='solid' else 'fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"'
  target=folder/(x['code']+'.svg'); temporary=target.with_suffix('.svg.tmp')
  temporary.write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path {attrs} fill-rule="evenodd" d="{x["d"]}"/></svg>')
  temporary.replace(target)
with zipfile.ZipFile(root/'docs/forma-svg-library.zip','w',zipfile.ZIP_DEFLATED) as z:
 for path in (root/'docs/svg').rglob('*.svg'):z.write(path,'svg/'+str(path.relative_to(root/'docs/svg')))
print(f'{len(items)} shapes, {len(items)*2} SVGs')
