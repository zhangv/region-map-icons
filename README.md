# Forma Icons

242 country and region silhouettes, in **outline** and **solid** styles. Pure SVG, no labels, no runtime dependencies. Designed for large visual compositions.

**[Browse the library](https://zhangv.github.io/forma-icons/)** · **[Download all 484 SVGs](https://zhangv.github.io/forma-icons/forma-svg-library.zip)**

## Use in a website

```html
<img src="https://zhangv.github.io/forma-icons/svg/solid/cn.svg"
     width="320" height="320" alt="China silhouette">
<img src="https://zhangv.github.io/forma-icons/svg/outline/jp.svg"
     width="320" height="320" alt="Japan silhouette">
```

URLs follow `https://zhangv.github.io/forma-icons/svg/{outline|solid}/{code}.svg`.
Most codes are lowercase ISO 3166-1 alpha-2 codes; source-specific codes distinguish additional territories. The complete manifest is [data.json](https://zhangv.github.io/forma-icons/data.json).

To change color with CSS, inline the SVG (the files use `currentColor`) or use it as a mask:

```html
<span class="country" aria-label="China silhouette" role="img"></span>
<style>
.country {
  display: inline-block;
  width: 320px; height: 320px;
  background: #305b47;
  mask: url('https://zhangv.github.io/forma-icons/svg/solid/cn.svg') center / contain no-repeat;
  -webkit-mask: url('https://zhangv.github.io/forma-icons/svg/solid/cn.svg') center / contain no-repeat;
}
</style>
```

Alternatively, download the SVGs and host them with your own app. Image URLs do not inherit the surrounding page's `color`; inline SVG does.

## Gallery

- Outline / solid switching, color and stroke width controls
- Country / region search and continent filtering
- Large preview, SVG copy, individual download and full ZIP
- All icons use a `0 0 512 512` viewBox and preserve their aspect ratio

## Build and preview

Requires Python 3; no third-party packages.

```sh
python3 scripts/generate.py
python3 scripts/check.py
python3 -m http.server 4180 --directory docs
```

GitHub Pages serves `main:/docs`. Pushes to `main` automatically publish the updated static library through GitHub Pages.

## Geometry and coverage

Source: [Natural Earth 1:50m Admin 0 Countries](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_admin_0_countries.geojson). The source GeoJSON is retained for reproducible generation. A local latitude-adjusted projection is fitted independently to each icon; this is a design asset library, not a GIS measurement tool. Offshore territories and islands are retained and can increase whitespace.

The 242 entries include countries and regions, not a list of 242 sovereign states. The China icon includes Taiwan's geometry at its geographic position; a separate Taiwan icon is also retained. Other geometries follow the bundled source dataset.

## License

Project code and generated SVG assets: [MIT](LICENSE). Source Natural Earth data is in the [public domain](https://www.naturalearthdata.com/about/terms-of-use/); see [DATA-LICENSE.md](DATA-LICENSE.md).
