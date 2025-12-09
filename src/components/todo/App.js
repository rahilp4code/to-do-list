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

  //   return (
  //     <div className={darkMode ? "dark" : ""}>
  //       {/* <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950"> */}
  //       <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950">
  //         <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 text-slate-900 dark:text-slate-50 sm:px-6 lg:px-10 xl:max-w-7xl">
  //           {/* Header */}
  //           {/* <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"> */}
  //           <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:mb-10">
  //             <div>
  //               {/* <div className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500 lg:text-xs"> */}
  //               <div className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500 lg:text-xs">
  //                 To-do
  //               </div>
  //               {/* <h2 className="text-lg font-semibold flex items-center gap-2"> */}
  //               <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 sm:text-3xl lg:text-4xl">
  //                 <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
  //                 Today's Grind
  //               </h2>
  //             </div>

  //             <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
  //               <span className="hidden rounded-full bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-wide text-indigo-600 shadow-sm dark:bg-slate-800/80 dark:text-indigo-300 sm:inline-flex">
  //                 {todayLabel}
  //               </span>

  //               {/* dark mode toggle */}
  //               <button
  //                 onClick={() => setDarkMode((v) => !v)}
  //                 className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm
  //              transition hover:bg-slate-50
  //              dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
  //               >
  //                 <span className="h-4 w-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center px-[2px]">
  //                   <span
  //                     className={`h-3 w-3 rounded-full bg-slate-500 transition-transform dark:bg-slate-300 ${
  //                       darkMode ? "translate-x-3" : ""
  //                     }`}
  //                   />
  //                 </span>
  //                 {darkMode ? "Dark" : "Light"} mode
  //               </button>

  //               {/* <span className="hidden text-xs sm:inline">
  //                 Welcome back <span className="ml-1">👋</span>
  //               </span> */}
  //             </div>
  //           </header>

  //           {/* Main */}
  //           <main className="flex-1">
  //             {/* <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.95fr)]"> */}
  //             <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-8">
  //               {/* Left column */}
  //               <div className="space-y-4">
  //                 <Form addTask={handleTask} />

  //                 {/* <section
  //                   className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/80 backdrop-blur-sm
  //                     dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
  //                 > */}
  //                 <section
  //                   className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/80 backdrop-blur-sm
  //                     dark:border-slate-800 dark:bg-slate-900 dark:shadow-none
  //                     sm:p-5 lg:p-6"
  //                 >
  //                   <List
  //                     tasks={tasks}
  //                     onDeleteTask={handleDeleteTask}
  //                     checkBox={handleCheckbox}
  //                     clearAll={clearAll}
  //                   />
  //                   <Stat task={tasks} />
  //                 </section>
  //               </div>

  //               {/* Right column */}
  //               <div className="space-y-4">
  //                 <TodaySummary tasks={tasks} />
  //                 {/* <section
  //                   className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/80 backdrop-blur-sm
  //                     dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
  //                 > */}
  //                 <section
  //                   className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/80 backdrop-blur-sm
  //                     dark:border-slate-800 dark:bg-slate-900 dark:shadow-none
  //                     sm:p-5 lg:p-6"
  //                 >
  //                   <h3 className="mb-2 text-sm font-semibold text-indigo-900 dark:text-indigo-100">
  //                     Small tip for today
  //                   </h3>
  //                   <p>
  //                     Pick <span className="font-semibold">one task</span> that
  //                     actually moves you forward and do it first. Everything else
  //                     is optional.
  //                   </p>
  //                 </section>
  //               </div>
  //             </div>

  //             <FocusFooter tasks={tasks} />
  //           </main>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="relative min-h-screen overflow-x-hidden">
        {/* LAYER 1: different gradient for light vs dark */}
        <div
          className="
            absolute inset-0 -z-20
            bg-[radial-gradient(circle_at_0%_0%,#bfdbfe_0,#e0e7ff_30%,#f9fafb_70%,#ffffff_100%)]
            dark:bg-[radial-gradient(circle_at_0%_0%,#020617_0,#020617_40%,#020617_100%)]
          "
        />

        {/* LAYER 2: soft color blobs (subtle, optional) */}
        <div
          className="
            pointer-events-none absolute inset-0 -z-10
            bg-[radial-gradient(circle_at_80%_10%,rgba(129,140,248,0.3),transparent_55%),radial-gradient(circle_at_10%_90%,rgba(148,163,184,0.35),transparent_55%)]
            dark:bg-[radial-gradient(circle_at_80%_10%,rgba(15,23,42,0.9),transparent_55%),radial-gradient(circle_at_10%_90%,rgba(30,64,175,0.7),transparent_55%)]
          "
        />

        {/* GLASS SHELL: your whole todo app lives inside this */}
        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-10">
          <div
            className="rounded-3xl border border-white/60 bg-white/60 p-5 shadow-xl shadow-slate-900/10 backdrop-blur-2xl
                          dark:border-slate-700/70 dark:bg-slate-900/60 dark:shadow-none sm:p-6 lg:p-8"
          >
            {/* ⬇️ put your existing header + main here */}
            <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:mb-10">
              <div>
                {/* <div className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500 lg:text-xs"> */}
                <div className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500 lg:text-xs">
                  To-do
                </div>
                {/* <h2 className="text-lg font-semibold flex items-center gap-2"> */}
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 sm:text-3xl lg:text-4xl">
                  <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                  Today's Grind
                </h2>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="hidden rounded-full bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-wide text-indigo-600 shadow-sm dark:bg-slate-800/80 dark:text-indigo-300 sm:inline-flex">
                  {todayLabel}
                </span>

                {/* dark mode toggle */}
                <button
                  onClick={() => setDarkMode((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm
             transition hover:bg-slate-50
             dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <span className="h-4 w-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center px-[2px]">
                    <span
                      className={`h-3 w-3 rounded-full bg-slate-500 transition-transform dark:bg-slate-300 ${
                        darkMode ? "translate-x-3" : ""
                      }`}
                    />
                  </span>
                  {darkMode ? "Dark" : "Light"} mode
                </button>

                {/* <span className="hidden text-xs sm:inline">
                Welcome back <span className="ml-1">👋</span>
              </span> */}
              </div>
            </header>

            {/* Main */}
            <main className="flex-2">
              {/* <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.95fr)]"> */}
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-8">
                {/* Left column */}
                <div className="space-y-4">
                  <Form addTask={handleTask} />

                  {/* <section
                  className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/80 backdrop-blur-sm
                    dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
                > */}
                  <section
                    className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/80 backdrop-blur-sm
                    dark:border-slate-800 dark:bg-slate-900 dark:shadow-none
                    sm:p-5 lg:p-6"
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
                  {/* <section
                  className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/80 backdrop-blur-sm
                    dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
                > */}
                  <section
                    className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/80 backdrop-blur-sm
                    dark:border-slate-800 dark:bg-slate-900 dark:shadow-none
                    sm:p-5 lg:p-6"
                  >
                    <h3 className="mb-2 text-sm font-semibold text-indigo-900 dark:text-indigo-100">
                      Small tip for today
                    </h3>
                    <p>
                      Pick <span className="font-semibold">one task</span> that
                      actually moves you forward and do it first. Everything
                      else is optional.
                    </p>
                  </section>
                </div>
              </div>

              <FocusFooter tasks={tasks} />
            </main>
            {/* ⬆️ keep everything exactly as you already have it inside */}
          </div>
        </div>
      </div>
    </div>
  );
}
