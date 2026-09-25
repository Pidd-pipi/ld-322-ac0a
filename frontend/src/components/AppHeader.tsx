import { Tag } from 'antd';
import { APP_NAME } from '../constants/app.constants';

export const AppHeader = () => (
  <header className="border-b border-emerald-900/10 bg-white">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
      <div>
        <p className="text-sm font-semibold text-emerald-700">现代农业物联网中心</p>
        <h1 className="text-2xl font-black">{APP_NAME}</h1>
      </div>
      <Tag color="green">30 秒自动刷新 / WebSocket 推送</Tag>
    </div>
  </header>
);
