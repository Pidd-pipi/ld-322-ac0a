type FeatureItem = {
  id: string;
  title: string;
  description: string;
  status: string;
  score: number;
  tags: string[];
};

export const FeatureCard = ({ item, onAdvance }: { item: FeatureItem; onAdvance: (id: string) => void }) => (
  <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex justify-between gap-3">
      <div>
        <h3 className="text-lg font-black">{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
      </div>
      <span className="text-sm font-bold text-emerald-700">{item.score}</span>
    </div>
    <div className="mt-3 flex flex-wrap gap-2">
      {item.tags.map((tag) => <span key={tag} className="rounded bg-emerald-50 px-2 py-1 text-xs font-bold">{tag}</span>)}
    </div>
    <button className="mt-4 rounded-md bg-emerald-700 px-3 py-2 text-sm font-bold text-white" onClick={() => onAdvance(item.id)}>
      推进
    </button>
  </article>
);
