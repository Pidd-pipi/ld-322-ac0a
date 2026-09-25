type DashboardItem = { id: string; title: string; description: string; status: string; score: number; tags: string[] };
export const dashboardItems:DashboardItem[]=[
  {
    "id": "item-1",
    "title": "传感器数据接入",
    "description": "传感器数据接入：多节点环境数据接收",
    "status": "进行中",
    "score": 68,
    "tags": [
      "本地数据",
      "可编辑"
    ]
  },
  {
    "id": "item-2",
    "title": "实时监测仪表盘",
    "description": "实时监测仪表盘：自动刷新和异常警示",
    "status": "待处理",
    "score": 72,
    "tags": [
      "本地数据",
      "可编辑"
    ]
  },
  {
    "id": "item-3",
    "title": "历史曲线查询",
    "description": "历史曲线查询：多参数对比和 CSV 导出",
    "status": "待处理",
    "score": 76,
    "tags": [
      "本地数据",
      "可编辑"
    ]
  },
  {
    "id": "item-4",
    "title": "阈值报警通知",
    "description": "阈值报警通知：WebSocket 推送报警",
    "status": "进行中",
    "score": 80,
    "tags": [
      "本地数据",
      "可编辑"
    ]
  },
  {
    "id": "item-5",
    "title": "设备远程控制",
    "description": "设备远程控制：风机、灌溉和补光灯",
    "status": "待处理",
    "score": 84,
    "tags": [
      "本地数据",
      "可编辑"
    ]
  },
  {
    "id": "item-6",
    "title": "多温室管理",
    "description": "多温室管理：总览和详情切换",
    "status": "待处理",
    "score": 88,
    "tags": [
      "本地数据",
      "可编辑"
    ]
  },
  {
    "id": "item-7",
    "title": "环境分析报告",
    "description": "环境分析报告：日报周报和 PDF 导出",
    "status": "进行中",
    "score": 92,
    "tags": [
      "本地数据",
      "可编辑"
    ]
  }
];
