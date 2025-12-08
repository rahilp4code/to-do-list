import { useState } from "react";

export default function List({ tasks, onDeleteTask, checkBox, clearAll }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedTask = tasks;
  if (sortBy === "description") {
    sortedTask = tasks
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "done") {
    sortedTask = tasks.slice().sort((a, b) => Number(a.done) - Number(b.done));
  }

  return (
    <div className="flex flex-col gap-3">
      <ul className="grid gap-2 md:grid-cols-2">
        {sortedTask.map((task) => (
          <Task
            key={task.id}
            data={task}
            onDeleteTask={onDeleteTask}
            checkBox={checkBox}
          />
        ))}
        {sortedTask.length === 0 && (
          <li className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            No tasks yet. Add your first one above ✨
          </li>
        )}
      </ul>

      <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full max-w-xs rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="done">Sort by completed tasks</option>
        </select>

        <button
          onClick={clearAll}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
        >
          Clear list
        </button>
      </div>
    </div>
  );
}

function Task({ data, onDeleteTask, checkBox }) {
  const hasDate = Boolean(data.date);

  return (
    <li
      className={`animate-fade-in-up flex items-start justify-between gap-3 rounded-xl border px-3 py-2.5 text-sm shadow-sm transition
    ${
      data.done
        ? "border-slate-200 bg-slate-50 opacity-70 dark:border-slate-700 dark:bg-slate-900/60"
        : "border-slate-200 bg-white hover:border-indigo-200 hover:bg-indigo-50/60 hover:shadow-md dark:border-slate-700 dark:bg-slate-950/60 dark:hover:border-cyan-400/70 dark:hover:bg-slate-900/80 dark:hover:shadow-neon"
    }`}
    >
      <div className="flex flex-1 items-start gap-2">
        <input
          type="checkbox"
          checked={data.done}
          onChange={() => checkBox(data.id)}
          className="mt-1 h-4 w-4 cursor-pointer accent-indigo-500"
        />

        <div className="flex-1 space-y-1">
          <div
            className={`break-words text-slate-800 dark:text-slate-100 ${
              data.done ? "line-through text-slate-400 dark:text-slate-500" : ""
            }`}
          >
            {data.quantity}× {data.description}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide
    ${
      data.done
        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200"
        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-200"
    }`}
            >
              {data.done ? "Completed" : "Pending"}
            </span>

            {hasDate && (
              <span
                className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-medium text-indigo-600
             dark:bg-indigo-500/15 dark:text-indigo-200"
              >
                📅 {data.date}
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => onDeleteTask(data.id)}
        className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-base text-red-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/60 dark:hover:text-red-400"
      >
        ✕
      </button>
    </li>
  );
}
