# 嫌疑人X的献身 — 交互式推理阅读 / Suspect X: Interactive Mystery Reader

## 项目概述

基于东野圭吾小说《嫌疑人X的献身》的沉浸式交互推理阅读体验。通过逐段滚动揭示、线索收集、章节解锁等机制，让读者以侦探的视角参与故事。

## 技术栈

- **框架**: React 19 + TypeScript
- **构建工具**: Vite 6
- **样式**: Tailwind CSS 4
- **动效**: Framer Motion / motion
- **包管理器**: pnpm
- **入口**: src/main.tsx

## 目录结构

```
/workspace/projects/
├── .coze                    # 项目配置入口
├── scripts/                 # 预览和部署脚本
│   ├── coze-preview-build.sh
│   ├── coze-preview-run.sh
│   ├── build.sh             # 部署构建
│   └── run.sh               # 部署运行
├── src/
│   ├── App.tsx              # 主应用
│   ├── components/          # 组件
│   │   ├── ReadingView.tsx
│   │   ├── ChapterSelector.tsx
│   │   └── CluePanel.tsx
│   ├── data/                # 内容数据
│   │   ├── chapters.ts      # 9章段落 + 36条线索
│   │   └── images.ts        # 60张图片映射
│   ├── hooks/               # 自定义钩子
│   │   └── useProgress.ts
│   ├── types/               # TypeScript 类型
│   │   └── story.ts
│   └── lib/                 # 工具库
│       ├── audio.ts
│       └── utils.ts
├── public/images/          # 60张场景插画
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 运行与预览

### 开发预览
```bash
bash scripts/coze-preview-run.sh
# 服务运行在 http://localhost:5000
```

### 部署构建
```bash
bash scripts/build.sh    # 安装依赖 + vite build
bash scripts/run.sh      # serve dist -l 5000
```

## 预览链路配置

- **preview_enable**: enabled
- **dev.build**: `["bash", "scripts/coze-preview-build.sh"]`
- **dev.run**: `["bash", "scripts/coze-preview-run.sh"]`
- **端口**: 5000

## 部署配置

- **deploy.kind**: service
- **deploy.flavor**: web
- **deploy.build**: `["bash", "scripts/build.sh"]`
- **deploy.run**: `["bash", "scripts/run.sh"]`
- **project.entrypoint**: index.html
- **project.requires**: nodejs-24

## 用户偏好与长期约束

1. **pnpm 优先**: Node.js 项目统一使用 pnpm 管理依赖，禁止 npm/yarn
2. **端口规范**: 
   - 预览服务固定 5000 端口
   - 禁止使用 9000 端口
3. **脚本幂等性**: preview/run 脚本必须支持重复执行
4. **环境变量隔离**: 显式声明关键环境变量，不依赖平台继承

## 常见问题和预防

1. **Vite 端口**: package.json 的 dev 脚本默认 3000，预览脚本需直接调用 `node_modules/.bin/vite --port 5000`
2. **构建产物**: Vite 默认输出到 `dist/` 目录，run.sh 使用 `npx serve dist` 提供静态服务
3. **pnpm esbuild 警告**: 需要执行 `pnpm approve-builds` 允许 esbuild 运行构建脚本
