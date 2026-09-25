# 温室环境监测面板

**项目类型标签：全栈Web应用**

温室环境监测面板 是 现代农业温室管理者 的物联网环境监测系统。

## 快速启动

开发模式：

```bash
npm install
npm run dev
```

访问地址：`http://localhost:18622`

生产构建：

```bash
npm run build
npm run preview
```

## 主要功能

- 传感器数据接入：多节点环境数据接收
- 实时监测仪表盘：自动刷新和异常警示
- 历史曲线查询：多参数对比和 CSV 导出
- 阈值报警通知：WebSocket 推送报警
- 设备远程控制：风机、灌溉和补光灯
- 多温室管理：总览和详情切换
- 环境分析报告：日报周报和 PDF 导出

## 本地开发方式

在项目根目录执行：

```bash
npm install
npm run dev
```

## 技术栈

| 分类 | 技术 |
| --- | --- |
| 前端 | React 18 + TypeScript + Vite + Ant Design + ECharts |
| 后端 | Node.js + Express |
| 数据库 | MySQL 8.0 |
| 缓存 | Redis |
| 实时通信 | WebSocket |

## 项目目录结构

```text
. 
├── src
│   ├── components
│   ├── constants
│   ├── data
│   ├── errors
│   ├── features
│   ├── logger
│   ├── services
│   ├── types
│   └── utils
├── Dockerfile
├── nginx.conf
├── package.json
└── README.md
```

## 环境变量说明

纯前端项目默认不需要后端环境变量。地图或第三方 API Key 可放入本地 .env 文件。

## 使用说明

应用数据存储在浏览器本地。清空浏览器站点数据会重置演示数据。

## License

MIT
