# Forma Icons

242 个国家及地区的纯矢量地图轮廓，**空心 / 实心**两种样式，共 484 个 SVG。图形内不带文字，适合大尺寸使用。

**[在线图标库](https://zhangv.github.io/forma-icons/)** · **[下载全部 SVG](https://zhangv.github.io/forma-icons/forma-svg-library.zip)** · **[English / geometry & license](#geometry-and-coverage)**

## 安装

npm 包名：`forma-country-icons`。公开注册表发布完成后可使用：

```sh
npm install forma-country-icons
```

无需等待 npm 注册表发布，可安装已经打包的版本：

```sh
npm install https://zhangv.github.io/forma-icons/forma-country-icons-1.1.0.tgz
```

也可以直接从 GitHub 安装（需要 Node.js 18+ 和 npm；安装时自动生成模块）：

```sh
npm install github:zhangv/forma-icons
```

React 和 Vue 为可选 peer dependencies：只需安装你使用的框架。原生 JS 不依赖任何框架。包为 ESM，包含 TypeScript 类型声明。

## React / Next.js

```jsx
import { FormaIcon } from 'forma-country-icons/react';
import china from 'forma-country-icons/icons/cn';
import japan from 'forma-country-icons/icons/jp';

export default function CountryArt() {
  return (
    <div>
      <FormaIcon icon={china} variant="solid" size={360}
        color="#305b47" title="中国轮廓" />
      <FormaIcon icon={japan} variant="outline" size={320}
        strokeWidth={3} className="country-art" />
    </div>
  );
}
```

使用标准 SVG 元素，可用于 SSR；不需要运行时请求或 `dangerouslySetInnerHTML`。`className`、`style`、`onClick`、`aria-*` 等 SVG 属性会传给根元素。Next.js 中添加事件处理时，在调用组件中按 Next.js 的客户端组件规则使用 `'use client'`。

## Vue 3

```vue
<script setup>
import { FormaIcon } from 'forma-country-icons/vue';
import china from 'forma-country-icons/icons/cn';
import italy from 'forma-country-icons/icons/it';
</script>

<template>
  <FormaIcon :icon="china" variant="solid" :size="360"
    color="#305b47" title="中国轮廓" />
  <FormaIcon :icon="italy" variant="outline" :size="320"
    :stroke-width="3" class="country-art" />
</template>
```

支持 Vue 3 和 SSR。`class`、`style`、`@click`、`aria-*` 等属性传给根 SVG；不需要 `v-html`。Vue 2 可使用下方 SVG URL 或静态资源方式。

## 原生 JavaScript（Vite / Webpack / 其他 ESM 构建工具）

```js
import { createSvg, toSvg } from 'forma-country-icons';
import china from 'forma-country-icons/icons/cn';

// 创建 SVG DOM 元素，保留后续 JS / CSS 控制能力。
const element = createSvg(china, {
  variant: 'outline', size: 360, color: '#305b47',
  strokeWidth: 3, title: '中国轮廓',
});
document.querySelector('#map').replaceChildren(element);

// SSR / Node.js / 模板引擎：返回 SVG 字符串。
const markup = toSvg(china, { variant: 'solid', size: 320 });
```

`createSvg` 仅在有 `document` 的浏览器里调用；`toSvg` 可用于 Node.js，自动转义颜色、尺寸和标题。请使用本库导出的图标定义。

## 不安装 npm：直接在 HTML 引用

```html
<img src="https://zhangv.github.io/forma-icons/svg/solid/cn.svg"
     width="360" height="360" alt="中国轮廓">
<img src="https://zhangv.github.io/forma-icons/svg/outline/jp.svg"
     width="320" height="320" alt="日本轮廓">
```

通用地址：`https://zhangv.github.io/forma-icons/svg/{outline|solid}/{code}.svg`。

也可以通过 Vite 等支持 SVG 资源导入的构建工具，使用 npm 中的静态文件：

```js
import chinaUrl from 'forma-country-icons/svg/solid/cn.svg';
document.querySelector('img').src = chinaUrl;
```

这些都是 SVG 矢量文件，任意放大。`<img>` 引用的 SVG 不继承页面颜色；需要自定义颜色时用组件、原生 JS API、内联 SVG 或 CSS mask。

## CSS mask：用纯 CSS 着色

```html
<span class="country" role="img" aria-label="中国轮廓"></span>
<style>
.country {
  display: inline-block;
  width: 360px;
  height: 360px;
  background: #305b47;
  mask: url('https://zhangv.github.io/forma-icons/svg/solid/cn.svg') center / contain no-repeat;
  -webkit-mask: url('https://zhangv.github.io/forma-icons/svg/solid/cn.svg') center / contain no-repeat;
}
</style>
```

## 参数与无障碍

- `icon`：必填，由 `forma-country-icons/icons/<code>` 导入的图标定义。
- `variant`：`outline`（默认）或 `solid`。
- `size`：默认 `256`，接受数字或 CSS 尺寸字符串，例如 `"12rem"`。
- `color`：默认 `currentColor`，可继承父元素的 CSS `color`。
- `strokeWidth`：默认 `2`，单位为 512 × 512 画布坐标，仅影响空心样式。
- `title`：可选的无障碍标题，只加入 SVG `<title>` 与辅助属性，不在图形内画文字。默认作为装饰图形，`aria-hidden="true"`；有独立含义时请提供标题或组件上的 `aria-label`。

## 按需导入与图标代码

每个国家定义是独立 ESM 文件，React / Vue 适配器不内置整套图形。只导入需要的 `icons/cn`、`icons/jp` 等，减少应用体积。大部分使用小写 ISO 两位代码，额外地区用源数据代码区分。

完整清单与名称、洲别和路径见 [data.json](https://zhangv.github.io/forma-icons/data.json)。`cn` 图形包含台湾轮廓，同时保留 `tw` 独立图标。

## 本地开发与发布

```sh
python3 scripts/generate.py  # 从 GeoJSON 生成 SVG 和 ZIP
python3 scripts/check.py     # 验证形状、文件和 ZIP 一致性
npm run build               # 生成 lib/ 模块与类型
npm test                    # 测试原生 JS API
npm pack                    # 验证并生成 npm 安装包
python3 -m http.server 4180 --directory docs
```

GitHub Pages 发布 `main:/docs`，推送 main 后自动更新网页。npm 发布需维护者登录后执行 `npm publish --access public`；更新已有 npm 版本需要先提高 `package.json` 的版本号。

## Geometry and coverage

Source: [Natural Earth 1:50m Admin 0 Countries](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_admin_0_countries.geojson). The source GeoJSON is retained for reproducible generation. A local latitude-adjusted projection is fitted independently to each icon; this is a design asset library, not a GIS measurement tool. Offshore territories and islands are retained and can increase whitespace.

The 242 entries include countries and regions, not a list of 242 sovereign states. The China icon includes Taiwan's geometry at its geographic position; a separate Taiwan icon is also retained. Other geometries follow the bundled source dataset.

## License

Project code and generated SVG assets: [MIT](LICENSE). Source Natural Earth data is in the [public domain](https://www.naturalearthdata.com/about/terms-of-use/); see [DATA-LICENSE.md](DATA-LICENSE.md).
