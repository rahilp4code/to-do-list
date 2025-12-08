import { useState } from "react";

function isSameDay(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const today = new Date();
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
}

function isSameWeek(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const today = new Date();

  // start of week (Mon) for today
  const day = today.getDay() || 7; // Sun=0 -> 7
  const startOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - (day - 1)
  );
  const endOfWeek = new Date(
    startOfWeek.getFullYear(),
    startOfWeek.getMonth(),
    startOfWeek.getDate() + 6
  );

  return d >= startOfWeek && d <= endOfWeek;
}

export default function TodaySummary({ tasks }) {
  const [mode, setMode] = useState("today"); // 'today' | 'week'

  const filteredTasks =
    mode === "today"
      ? tasks.filter((t) => isSameDay(t.date))
      : tasks.filter((t) => isSameWeek(t.date || new Date().toISOString()));

  const total = filteredTasks.length;
  const done = filteredTasks.filter((t) => t.done).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  const nextTask = filteredTasks.find((t) => !t.done);

  const label = mode === "today" ? "Today" : "This week";

  return (
    <section
      className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-xl shadow-slate-200/70 backdrop-blur
                    dark:border-slate-800/80 dark:bg-gradient-to-br dark:from-[#020617] dark:via-[#020617] dark:to-slate-900
                    dark:shadow-[0_0_40px_rgba(59,130,246,0.35)]"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold tracking-wide text-slate-900 dark:text-slate-50">
          {label}&apos;s Overview
        </h3>

        {/* pill toggle */}
        <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 p-0.5 text-[11px] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          <button
            type="button"
            onClick={() => setMode("today")}
            className={`rounded-full px-3 py-1 transition ${
              mode === "today"
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-50"
                : "hover:text-slate-900 dark:hover:text-slate-100"
            }`}
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => setMode("week")}
            className={`rounded-full px-3 py-1 transition ${
              mode === "week"
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-50"
                : "hover:text-slate-900 dark:hover:text-slate-100"
            }`}
          >
            Week
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Progress ring */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full bg-slate-100 dark:bg-slate-800" />
          <div
            className="relative flex h-full w-full items-center justify-center rounded-full border-4 border-indigo-100 dark:border-indigo-900/70"
            style={{
              background: `conic-gradient(#4f46e5 ${
                percent * 3.6
              }deg, transparent 0deg)`,
            }}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-800 shadow-sm dark:bg-slate-900 dark:text-slate-50">
              {percent}%
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-1 text-sm">
          <p className="text-slate-700 dark:text-slate-200">
            <span className="font-semibold">{done}</span> of{" "}
            <span className="font-semibold">{total}</span> tasks done.
          </p>
          {nextTask ? (
            <p className="text-slate-500 dark:text-slate-400">
              Next up:{" "}
              <span className="font-medium text-slate-800 dark:text-slate-100">
                {nextTask.quantity}× {nextTask.description}
              </span>
            </p>
          ) : (
            <p className="text-slate-500 dark:text-slate-400">
              You&apos;re all caught up. Add something new or take a break ✨
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
