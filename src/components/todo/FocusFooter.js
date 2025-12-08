export default function FocusFooter({ tasks }) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const remaining = total - done;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  // super rough estimate: 25 min per remaining task
  const totalMinutes = remaining * 25;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const etaText =
    total === 0
      ? "Add a few tasks to plan your focus time."
      : remaining === 0
      ? "You’re done for today. Seriously, go touch grass 🌱"
      : `Roughly ${
          hours ? `${hours}h ` : ""
        }${minutes}min of focused work left.`;

  return (
    <footer
      className="mt-8 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-md shadow-slate-200/70 backdrop-blur
                  dark:border-slate-800/80 dark:bg-gradient-to-r dark:from-slate-950/95 dark:via-slate-900/95 dark:to-slate-950/95
                  dark:shadow-[0_0_45px_rgba(34,197,235,0.35)]"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Left: progress text */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-800">
            Today&apos;s focus snapshot
          </p>
          <p className="text-xs text-slate-500">
            {total === 0 ? (
              <>No tasks yet.</>
            ) : (
              <>
                <span className="font-semibold">{done}</span> of{" "}
                <span className="font-semibold">{total}</span> tasks complete ·{" "}
                <span className="font-semibold">{remaining}</span> left
              </>
            )}
          </p>
        </div>

        {/* Middle: progress bar */}
        <div className="w-full max-w-md">
          <div className="mb-1 flex items-center justify-between text-[11px] text-slate-500">
            <span>Progress</span>
            <span className="font-semibold text-slate-700">{percent}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-500 transition-[width] duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Right: ETA / motivation */}
        <div className="flex flex-col items-start gap-1 text-right text-xs text-slate-500 md:items-end">
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-medium text-indigo-700">
            ⏱ {total === 0 ? "No estimate yet" : "Focus estimate"}
          </span>
          <p className="max-w-xs text-xs text-slate-500">{etaText}</p>
        </div>
      </div>
    </footer>
  );
}
