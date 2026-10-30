# InSpect project website

Static HTML/CSS/JavaScript website for https://csiro-sd.github.io/InSpect/.
No build step is required.

## 更新 GitHub Pages（现有 main 分支发布方式）

1. 解压发布 ZIP。将其中的文件和文件夹上传到 `CSIRO-SD/InSpect` 仓库根目录，覆盖同名文件。`index.html` 必须直接位于根目录，不能再套一层文件夹；不要只上传 ZIP。
2. 删除旧仓库中已取消的 `docs/en/benchmarks.html`、`about.html`（如果存在）。网页上传不会自动删除旧文件。旧的 `previews/` 演示目录也不需要发布。
3. 提交修改，等待 GitHub Pages 部署完成。沿用现有 Pages 设置，无需重新配置。
4. 若仍显示旧版，强制刷新页面。

ZIP 包含 `.nojekyll`，但不包含 `.github/` 工作流，以免覆盖现有部署设置。若浏览器无法上传隐藏的 `.nojekyll`，保留仓库原有文件即可；也可以在仓库根目录通过 Add file → Create new file 创建。

## 本地预览

在解压目录运行：

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

打开 http://127.0.0.1:8000/。

## 当前页面

- `index.html`：全屏封面。
- `docs/en/introduction.html`：Introduction，保留海报位置。
- `docs/en/background.html`：Why InSpect?
- `docs/en/dataset.html`：数据结构、Annotations Examples（Recognition 与 Segmentation）、工具、贡献、引用和版权。
- `statistics.html`：真实 MapMyVisitors 地图和 GoatCounter 下载入口点击计数。

## 统计

- MapMyVisitors 组件只放在 Statistics 页，记录该页访问。本地打开该页也可能计入。
- GoatCounter 接收 `dataset-link-click` 事件，仅统计两个前往 Hugging Face 数据集页面的下载入口，不统计下载完成。
- 点击事件仅在 `csiro-sd.github.io/InSpect/` 下的正式页面发送，本地预览不发送。不会自动发送 GoatCounter 页面浏览事件。
- GoatCounter 公开计数已启用；当前尚无点击时显示 0。公开总数可能缓存最多四小时；被拦截或无法读取时显示 `—`。
- 配置在 `content.js`；事件逻辑在 `assets/download-clicks.js`。其中为公开站点地址，无需也不要添加私密 API 密钥。

## 内容更新

- 直接修改 HTML，图片放在 `assets/` 并使用相对路径。
- 数据集下载链接与代码链接配置在 `content.js`。
- 正式引用发布后，同时更新 `citation.bib` 和 Dataset 页 BibTeX。
- `search-data.js` 是本地搜索索引，修改文字后同步更新。
- Recognition 与 Segmentation 的素材来源记录在各自资源目录的 `PROVENANCE.json`。

## 模板与许可

网站基于 Jekyll TeXt Theme 的静态适配版；原 MIT 许可保留在 `vendor/text-theme/LICENSE`，页脚保留署名。
数据集版权按用户指定为 CC BY-NC-ND 4.0，模板许可不替代数据、论文或图片各自的许可。
