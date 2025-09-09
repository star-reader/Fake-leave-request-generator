# 虚假请假条生成器

一个用于生成模拟请假条和挂号单的网页应用。使用 React、TypeScript 和 Ant Design 构建的现代化前端应用

注：目前没有录入医院选择功能，将在后续开发；因作者在广州，所以只留了中山一院的数据

**todo**

[ ] 医院选择或输入

[ ] 其他形式的请假信息开发

## 免责声明

本应用仅供**娱乐和概念演示之用**。严禁将生成的文档用于任何非法用途。任何滥用行为的责任由用户自行承担

## 功能特点

- 适配桌面和移动设备的响应式设计
- 自由选择时间、科室等情况
- 一键导出文档为图片
- 便捷的表单填写界面

## 技术栈与库

- React 18
- TypeScript
- Ant Design & Ant Design Mobile
- html2canvas
- CSS Modules

## 快速开始

### 环境要求

- Node.js (v16 或更高版本)
- npm 或 yarn

### 安装步骤

1. 克隆仓库

```bash
git clone git@github.com:star-reader/Fake-leave-request-generator.git
cd Fake-leave-request-generator
```

2. 安装依赖

```bash
npm install
# 或
yarn install
```

3. 启动开发服务器

```bash
npm run dev
# 或
yarn dev
```

4. 构建生产版本

```bash
npm run build
# 或
yarn build
```

## 使用说明

1. 选择要生成的文档类型（现在只有挂号单捏）
2. 在表单中填写所需信息（姓名、日期、时间段等）
3. 预览生成的截图
4. 点击"保存为图片"按钮将文档导出为图片截图格式

## 开发相关

### 可用脚本命令

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run preview` - 预览生产版本
- `npm run lint` - 运行 ESLint 代码检查

### 项目结构

```
src/
  ├── components/        # 组件目录
  │   ├── Form/         # 表单组件
  │   ├── Header/       # 页头组件
  │   ├── Preview/      # 预览组件
  │   └── SelectionPage/# 选择页面组件
  ├── config/           # 配置文件目录
  ├── assets/           # 静态资源
  └── App.tsx           # 应用主组件
```

## 开源许可

本项目基于 Creative Commons Legal Code，CC0 1.0 Universal 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 参与贡献

欢迎贡献代码、提出问题和功能建议！

## 联系方式

如果您有任何问题或建议，请随时提出 issue
