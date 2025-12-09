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
      {/* <ul className="grid gap-2 md:grid-cols-2"> */}
      <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 lg:gap-3">
        {sortedTask.map((task) => (
          <Task
            key={task.id}
            data={task}
            onDeleteTask={onDeleteTask}
            checkBox={checkBox}
          />
        ))}
        {sortedTask.length === 0 && (
          <li
            className="rounded-xl border border-slate-300/40 bg-white p-5 text-center text-sm text-slate-500 shadow-sm
                dark:border-slate-700/50 dark:bg-slate-900 dark:text-slate-400"
          >
            <span className="text-slate-600 dark:text-slate-300">
              No tasks yet. Add your first one above ✨
            </span>
          </li>
        )}
      </ul>

      <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          // className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition
          //  focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/30
          //  dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100
          //  dark:placeholder-slate-400 dark:focus:ring-indigo-500/30 dark:focus:border-indigo-500"
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition
           hover:border-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10
           dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100
           dark:hover:border-slate-500 dark:focus:border-slate-100 dark:focus:ring-slate-100/10
           dark:placeholder-slate-400"
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="done">Sort by completed tasks</option>
        </select>

        <button
          onClick={clearAll}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 shadow-sm
             transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
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
    // <li
    //   className={`animate-fade-in-up flex items-start justify-between gap-3 rounded-xl border px-3 py-2.5 text-sm shadow-sm transition
    // ${
    //   data.done
    //     ? "border-slate-200 bg-slate-50 opacity-80 dark:border-slate-800 dark:bg-slate-900/70"
    //     : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-900"
    // }`}
    // >
    <li
      className={`animate-fade-in-up flex items-start justify-between gap-3 rounded-xl border px-3 py-2.5 text-sm shadow-sm transition
    ${
      data.done
        ? "border-slate-200 bg-slate-50 opacity-80 dark:border-slate-800 dark:bg-slate-900/70"
        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-900"
    }
    lg:px-4 lg:py-3 lg:text-[0.95rem]`}
    >
      <div className="flex flex-1 items-start gap-2">
        <input
          type="checkbox"
          checked={data.done}
          onChange={() => checkBox(data.id)}
          className="h-4 w-4 cursor-pointer rounded
             accent-indigo-600
             dark:accent-indigo-400"
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
        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
    }`}
            >
              {data.done ? "Completed" : "Pending"}
            </span>

            {hasDate && (
              <span
                className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600
               dark:bg-slate-800 dark:text-slate-300"
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
