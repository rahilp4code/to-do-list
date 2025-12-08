import { useState } from "react";
import Form from "./Form";
import List from "./List";
import Stat from "./Stat";
import TodaySummary from "./TodaySummary";
import FocusFooter from "./FocusFooter";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  function handleTask(newTask) {
    setTasks((prev) => [...prev, newTask]);
  }

  function handleDeleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function handleCheckbox(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function clearAll() {
    if (!tasks.length) return;
    if (!window.confirm("Clear all tasks?")) return;
    setTasks([]);
  }

  const todayLabel = new Date().toLocaleDateString();

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#e0e7ff_0,_#f9fafb_45%,_#e5e7eb_100%)] dark:bg-[radial-gradient(circle_at_top,_#1f2937_0,_#020617_45%,_#000000_100%)]">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 text-slate-900 dark:text-slate-50 lg:px-8">
          {/* Header */}
          <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500">
                To-do
              </div>
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">
                Today&apos;s Grind
              </h1>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <span className="hidden rounded-full bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-wide text-indigo-600 shadow-sm dark:bg-slate-800/80 dark:text-indigo-300 sm:inline-flex">
                {todayLabel}
              </span>

              {/* dark mode toggle */}
              <button
                onClick={() => setDarkMode((v) => !v)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm transition
             hover:bg-slate-50
             dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-900 dark:shadow-[0_0_20px_rgba(129,140,248,0.45)]"
              >
                <span className="h-4 w-7 rounded-full bg-slate-200 shadow-inner dark:bg-slate-700 flex items-center px-[2px]">
                  <span
                    className={`h-3 w-3 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.9)] transition-transform ${
                      darkMode ? "translate-x-3" : ""
                    }`}
                  />
                </span>
                {darkMode ? "Dark" : "Light"} mode
              </button>

              <span className="hidden text-xs sm:inline">
                Welcome back <span className="ml-1">👋</span>
              </span>
            </div>
          </header>

          {/* Main */}
          <main className="flex-1">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.95fr)]">
              {/* Left column */}
              <div className="space-y-4">
                <Form addTask={handleTask} />

                <section
                  className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-xl shadow-slate-200/70 backdrop-blur
                    dark:border-slate-800/80 dark:bg-gradient-to-br dark:from-slate-950/95 dark:via-slate-900/95 dark:to-slate-950/95
                    dark:shadow-neon"
                >
                  <List
                    tasks={tasks}
                    onDeleteTask={handleDeleteTask}
                    checkBox={handleCheckbox}
                    clearAll={clearAll}
                  />
                  <Stat task={tasks} />
                </section>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                <TodaySummary tasks={tasks} />
                <section className="rounded-2xl border border-indigo-50 bg-indigo-50/80 p-4 text-sm shadow-md shadow-indigo-100 dark:border-indigo-900/60 dark:bg-indigo-950/50 dark:text-indigo-100">
                  <h3 className="mb-2 text-sm font-semibold text-indigo-900 dark:text-indigo-100">
                    Small tip for today
                  </h3>
                  <p>
                    Pick <span className="font-semibold">one task</span> that
                    actually moves you forward and do it first. Everything else
                    is optional.
                  </p>
                </section>
              </div>
            </div>

            <FocusFooter tasks={tasks} />
          </main>
        </div>
      </div>
    </div>
  );
}
