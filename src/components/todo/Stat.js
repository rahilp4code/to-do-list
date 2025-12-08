export default function Stat({ task }) {
  if (task.length === 0) {
    return (
      <footer className="mt-3 border-t border-slate-200 pt-3 text-center text-sm text-slate-500">
        <em>Start adding your goals for today</em>
      </footer>
    );
  }

  const taskLength = task.length;
  const taskDone = task.filter((t) => t.done).length;
  const completePercent = Math.round((taskDone / taskLength) * 100);

  if (completePercent === 100) {
    return (
      <footer className="mt-3 border-t border-slate-200 pt-3 text-center text-sm font-medium text-emerald-600">
        <em>Today&apos;s tasks are completed 🔥</em>
      </footer>
    );
  }

  return (
    <footer className="mt-3 border-t border-slate-200 pt-3 text-center text-sm text-slate-600">
      <em>
        💪 You have {taskLength} tasks in your list, and you already completed{" "}
        {taskDone} ({completePercent}%)
      </em>
    </footer>
  );
}
