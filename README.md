# 今日一卦

一个纯静态的每日卦象小站。页面会根据用户的生日、星座、属相和当天日期，生成“今天属于这个人的卦象”，并展示原典出处、白话释义、今日转译、宜做和少做建议。

## 本地预览

直接打开 [index.html](/Users/hepanpan/Documents/小网站/index.html) 即可查看。

如果你想用本地地址测试，也可以在项目目录运行：

```bash
python3 -m http.server 4173
```

然后访问：

```text
http://localhost:4173
```

## 项目结构

- [index.html](/Users/hepanpan/Documents/小网站/index.html)
  页面结构
- [styles.css](/Users/hepanpan/Documents/小网站/styles.css)
  页面样式
- [app.js](/Users/hepanpan/Documents/小网站/app.js)
  卦象生成逻辑、生日推导、本地存储、页面渲染
- [hexagram-content.js](/Users/hepanpan/Documents/小网站/hexagram-content.js)
  六十四卦内容库

## 上线方式

这是一个无构建步骤的静态网站，适合直接部署到：

- GitHub Pages
- Netlify
- Vercel

### 方式一：Netlify

1. 新建一个 GitHub 仓库并把当前项目上传
2. 登录 Netlify
3. 选择 `Add new site` -> `Import an existing project`
4. 连接 GitHub 仓库
5. 构建设置保持为空
6. 发布目录填写 `.`
7. 点击部署

### 方式二：Vercel

1. 新建一个 GitHub 仓库并把当前项目上传
2. 登录 Vercel
3. 选择 `Add New` -> `Project`
4. 导入当前仓库
5. Framework Preset 选择 `Other`
6. Build Command 留空
7. Output Directory 留空
8. 点击部署

### 方式三：GitHub Pages

1. 新建一个 GitHub 仓库并上传当前项目
2. 在 GitHub 仓库中进入 `Settings` -> `Pages`
3. Source 选择 `Deploy from a branch`
4. Branch 选择 `main`，目录选择 `/root`
5. 保存后等待 GitHub 生成公开链接

## 测试建议

发给朋友测试前，建议重点观察：

- 不同生日是否会得到不同卦象
- 同一人隔天是否会出现不同卦象
- 原典出处、白话释义、今日转译是否容易理解
- “保存资料”和“开启今日卦象”流程是否顺手
- 手机端阅读是否舒适
