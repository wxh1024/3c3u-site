# 3C3U 非官方网站

《我的世界》无规则服务器 **3c3u.org** 的玩家自建官网（非官方）。

> 本站与 3C3U 服务器运营团队、开发团队及任何官方渠道均无隶属关系。
> 所有资料整理自非官方 Wiki：<https://wiki.3c3u.info>

## 结构

```
.
├── index.html        首页：服务器简介、玩法、两个纪元、大事记节选、组织、入服入口
├── history.html      历史与时间线（2021 → 2026，可按类型筛选）
├── join.html         入服指南、版本对照、QQ 群、常见问题
├── factions.html     组织名录（14 个代表组织的状态、类型、成立时间）
├── assets/
│   ├── css/style.css 全部样式（无框架、无构建）
│   └── js/main.js    导航、复制 IP、滚动显现、数字滚动、时间线筛选、粒子背景
└── .nojekyll         关闭 GitHub Pages 的 Jekyll 处理
```

纯静态站点，零依赖、零构建。字体通过 Google Fonts 加载，离线时自动回退到系统字体。

## 本地预览

直接双击 `index.html`，或在目录内启动任意静态服务器：

```bash
python -m http.server 8080
```

## 部署

推送到 GitHub 仓库后，在 **Settings → Pages** 中选择 `Deploy from a branch`，
分支 `main`、目录 `/ (root)` 即可。首次发布约需 1–2 分钟。

## 内容来源

- 服务器概况、纪元、时间线：<https://wiki.3c3u.info/wiki/新3C3U时期>
- 版本更新记录：<https://wiki.3c3u.info/wiki/版本更新>
- 组织与遗迹分类：`分类:组织` / `分类:建筑与遗迹`
- 最新事故记录：`2026年9月13日硬盘故障事件`

如需更新内容，直接改对应 HTML 文件即可，无需重新构建。
