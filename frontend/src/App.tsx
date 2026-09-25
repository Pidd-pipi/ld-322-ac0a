import { Dashboard } from './features/Dashboard';
import { AppHeader } from './components/AppHeader';

export default function App() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <AppHeader />
      <Dashboard />
    </main>
  );
}
