type FeatureItem = { title: string; description: string; status: string; tags: string[] };

export const ControlPanel = ({ items, onFilter }: { items: FeatureItem[]; onFilter: (value: string) => void }) => (
  <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
    <h2 className="text-xl font-black">工作台筛选</h2>
    <input className="mt-3 w-full rounded-md border px-3 py-2" placeholder="搜索功能、标签或状态" onChange={(event) => onFilter(event.target.value)} />
    <p className="mt-3 text-sm text-slate-600">当前共 {items.length} 条演示记录。</p>
  </section>
);
