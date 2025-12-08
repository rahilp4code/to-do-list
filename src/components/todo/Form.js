import { useState } from "react";

export default function Form({ addTask }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!description.trim()) return;

    const newTask = {
      description: description.trim(),
      quantity,
      done: false,
      id: Date.now(),
      date: selectedDate || null,
    };

    addTask(newTask);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-lg shadow-slate-200/70 backdrop-blur
             dark:border-slate-800/80 dark:bg-gradient-to-br dark:from-slate-900/95 dark:via-slate-950/95 dark:to-slate-900/95
             dark:shadow-neon-purple"
    >
      {/* Titles */}
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-900">
          To-do list
        </h2>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
          Plan today in one place
        </p>
      </div>

      {/* Controls */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,0.4fr)_minmax(0,1.3fr)_auto] lg:items-end">
        {/* Date */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:focus:border-indigo-400 dark:focus:ring-indigo-900/40"
          />
        </div>

        {/* Quantity */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Quantity
          </label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:focus:border-indigo-400 dark:focus:ring-indigo-900/40"
          >
            {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Task */}
        <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-1">
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Task
          </label>
          <input
            type="text"
            placeholder="…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Add button */}
        <button
          type="submit"
          className="mt-1 inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-400/40 transition
             hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(129,140,248,0.7)]
             dark:bg-gradient-to-r dark:from-indigo-500 dark:via-purple-500 dark:to-cyan-400 dark:shadow-[0_0_28px_rgba(56,189,248,0.7)]
             dark:hover:from-indigo-400 dark:hover:via-purple-400 dark:hover:to-cyan-300"
        >
          Add
        </button>
      </div>
    </form>
  );
}
