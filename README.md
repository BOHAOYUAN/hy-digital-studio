# HY Digital Studio — official site

独立软件工作室官网（Haoyuan Bo / 薄皓元）。单页、手写 HTML/CSS/JS，无框架、无构建步骤、无统计脚本。

- **线上**：<https://bohaoyuan.github.io/hy-digital-studio/>
- **仓库**：<https://github.com/BOHAOYUAN/hy-digital-studio>
- **内容**：工作室定位、四套系统（3 个公开仓库 + 1 个私有项目）、四项能力、创始人介绍、联系方式

## 设计要点

- **排版**：Space Grotesk（标题）+ Instrument Serif（斜体强调）+ 等宽标签；两个字体都是 OFL 协议，已本地化到 `assets/fonts/`，无外链请求。
- **交互**：自定义光标、作品行悬停预览图、手风琴式案例详情、磁吸按钮、滚动进度、滚动渐显、跑马灯。
- **双语**：默认按浏览器语言自动选中文/英文，右上角可切换，选择记在 localStorage。
- **可访问性 / 降级**：`prefers-reduced-motion` 时关闭全部动效；`?static=1` 用于截图与打印。

## 结构

```
index.html                页面（英文为英文基线，data-zh 存中文）
assets/css/style.css      全部样式（含响应式与中文排版修正）
assets/js/main.js         语言切换 / 光标 / 预览图 / 手风琴 / 渐显 / 时钟
assets/fonts/             space-grotesk.woff2、instrument-serif(-italic).woff2
assets/img/               人像、项目预览卡、社交分享图 og.jpg
.nojekyll                 跳过 Jekyll 构建
```

## 本地预览

直接双击 `index.html` 即可；或起一个本地服务器：

```powershell
cd E:\project\hy-digital-studio
python -m http.server 8123
# http://127.0.0.1:8123/  ·  http://127.0.0.1:8123/?static=1
```

## 更新与发布

```powershell
cd E:\project\hy-digital-studio
git add -A
git commit -m "更新内容"
git push
```

GitHub Pages 走 `main` 分支根目录，push 后约 30 秒生效。

## 内容规则（数字必须可复现）

| 项目 | 仓库 | 可写进页面的数字 |
| --- | --- | --- |
| CodeBuddy | github.com/BOHAOYUAN/CodeBuddy | 62 单测；基准 3/4；$0.019164；剪枝 67.15%（benchmarks/2026-10-13-gpt-oss-120b.json） |
| WEB-Agent-OS | github.com/BOHAOYUAN/WEB-Agent-OS | 442 测试 / 50 文件；≈16k 行 TS；MIT；v0.1.0 |
| Veloxis | github.com/BOHAOYUAN/Veloxis | 46 测试（it.each 展开后）；13 Zod；9 路由 |
| LeadSnapper | 私有，无远端 | 只写 Manifest V3 / LLM 打分 / 人工在环，不写 LOC 与提交数 |

合计公开测试 **550**（62 + 442 + 46）。核对日期：2026-11-14。

不放打不开的链接、不写客户名/收入/满意度；「2024 年成立」属创始人自述。

## 验证

- 截图与交互冒烟测试脚本在 `_shots/`（已 gitignore，不进仓库）：
  `capture.mjs`（CDP 全页截图）、`smoke.mjs`（图片加载 / 手风琴 / 语言切换 / 横向溢出 / 控制台报错）。
- 最近一次冒烟结果：图片全部加载、手风琴可用、中英切换正常、无横向溢出、无 console 报错。

## 字体

Space Grotesk（Florian Karsten）与 Instrument Serif（Instrument）均为 SIL Open Font License 1.1，允许在网页中自托管使用。
