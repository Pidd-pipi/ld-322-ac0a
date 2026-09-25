# 温室环境监测面板

**项目类型标签：全栈Web应用**

温室环境监测面板 是 现代农业温室管理者 的物联网环境监测系统。

## 快速启动

首次启动前复制环境变量：

```bash
cp .env.example .env
docker compose up -d
```

访问地址：`http://localhost:18622`
后端健康检查：`http://localhost:19622/api/health`

## 主要功能

- 传感器数据接入：多节点环境数据接收
- 实时监测仪表盘：自动刷新和异常警示
- 历史曲线查询：多参数对比和 CSV 导出
- 阈值报警通知：WebSocket 推送报警
- 设备远程控制：风机、灌溉和补光灯
- 多温室管理：总览和详情切换
- 环境分析报告：日报周报和 PDF 导出

## Demo API

- `GET /api/health`：健康检查
- `GET /api/dashboard/overview`：温室总览、传感器、报警、设备、报告和历史趋势聚合数据
- `GET /api/dashboard/greenhouses/{greenhouseId}/history`：按温室查询历史曲线数据
- `POST /api/dashboard/sensor-readings`：模拟传感器数据接入
- `POST /api/dashboard/alarms/{id}/handle`：标记报警已处理
- `POST /api/dashboard/devices/{id}/toggle`：远程切换设备状态
- `WS /ws`：模拟实时传感器快照推送

## 本地开发方式

前端：

```bash
cd frontend
npm install
npm run dev
```

后端：

```bash
cd backend
npm install && npm run dev
```

本地开发后端默认监听 `3000`，前端开发服务器已代理 `/api` 和 `/ws` 到该端口。

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
├── frontend
│   ├── src
│   ├── Dockerfile
│   └── nginx.conf
├── backend
│   ├── src 或 app
│   └── Dockerfile
├── database
│   └── init.sql
├── docker-compose.yml
├── .env.example
└── README.md
```

## 环境变量说明

| 变量 | 说明 |
| --- | --- |
| COMPOSE_PROJECT_NAME | Compose 项目名，默认 cygreenenv |
| FRONTEND_PORT | 前端映射端口，默认 18622 |
| BACKEND_PORT | 后端映射端口，默认 19622 |
| DB_PORT | MySQL 宿主机映射端口，默认 17622 |
| DB_NAME / DB_USER / DB_PASSWORD | 数据库连接信息 |
| JWT_SECRET | JWT 签名密钥 |

## Docker 部署说明

- Compose 顶层 `name: cygreenenv`，并在 `.env` 中提供 `COMPOSE_PROJECT_NAME=cygreenenv`，可在中文目录下启动。
- 前端容器通过 Nginx 托管静态资源，并将 `/api/` 反向代理到后端服务。
- 数据库和 Redis 使用命名卷持久化，避免绑定挂载中文路径。
- 常见问题：端口冲突时修改 `.env` 中的端口值后重新执行 `docker compose up -d`。

## License

MIT
