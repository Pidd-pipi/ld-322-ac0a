export const MetricCard = ({ label, value, note }: { label: string; value: string; note: string }) => (
  <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
    <p className="text-sm text-slate-500">{label}</p>
    <strong className="mt-2 block text-3xl font-black">{value}</strong>
    <span className="mt-1 block text-sm text-slate-600">{note}</span>
  </article>
);
