# HY Digital Studio — official site

独立 AI 工程工作室官网，单页、手写 HTML/CSS/JS，无框架、无构建步骤、无外部字体与统计脚本。

- **线上**：<https://bohaoyuan.github.io/hy-digital-studio/>
- **仓库**：<https://github.com/BOHAOYUAN/hy-digital-studio>
- **内容**：工作室定位、三套旗舰系统、四项能力、创始人（薄皓元 Haoyuan Bo）介绍、联系方式

## 结构

```
index.html              页面（中文为默认，data-en 存英文）
assets/css/style.css    全部样式
assets/js/main.js       中英切换 / sticky 导航 / 滚动渐显 / 当前章节高亮
assets/img/             人像、项目截图、社交分享图 og.jpg
.nojekyll               跳过 Jekyll 构建
```

## 本地预览

直接双击 `index.html` 即可；要跑本地服务器：

```powershell
cd E:\project\hy-digital-studio
python -m http.server 8123
# 打开 http://127.0.0.1:8123/
```

- `?lang=en` 直接打开英文版；`?static=1` 关闭滚动渐显（截图/打印用）。

## 更新与发布

```powershell
cd E:\project\hy-digital-studio
git add -A
git commit -m "更新内容"
git push
```

GitHub Pages 走 `main` 分支根目录，push 后约 30 秒生效。

## 内容规则（与个人作品集一致）

1. 每个数字都要能追到仓库里的测试或已提交的基准文件：CodeBuddy 62 tests / 3-of-4 / $0.019164 / 67.15% 剪枝；
   WEB-Agent-OS 446 tests（49 文件）；Veloxis 46 tests / 13 Zod / 49 commits。合计 554。
2. 不放打不开的 live 链接；演示站已下线的项目明确写「本地运行」。
3. 不写客户名、收入、满意度这类没有数据源的数字。
4. 「2024 年成立」来自创始人履历，属自述信息。

## 截图验证

`_shots/` 下是渲染检查用的脚本与截图（不进仓库）：

```powershell
node _shots/capture.mjs   # desktop / en / mobile 全页截图
node _shots/inspect.mjs   # 分节截图
```
