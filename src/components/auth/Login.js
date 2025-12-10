// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Logo() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   // ✅ Signup handler
//   const handleSignup = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://127.0.0.1:5000/api/v1/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!res.ok) throw new Error(`Error: ${res.status}`);

//       const data = await res.json();
//       console.log("Signup success:", data);

//       // ✅ Navigate to main app after signup
//       navigate("/app");
//     } catch (err) {
//       console.error("Signup failed:", err);
//       alert("Signup failed. Try again.");
//     }
//   };

//   // ✅ Login handler
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://127.0.0.1:5000/api/v1/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!res.ok) throw new Error(`Error: ${res.status}`);

//       const data = await res.json();
//       console.log("Login success:", data);

//       // ✅ Navigate to main app after login
//       navigate("/app");
//     } catch (err) {
//       console.error("Login failed:", err);
//       alert("Invalid credentials.");
//     }
//   };

// return (
//   <div className="auth-container">
//     {/* Left Side */}
//     <div className="auth-left">
//       <h1>Come join us!</h1>
//       <p>
//         We are so excited to have you here. If you haven't already, create an
//         account to get access to exclusive offers, rewards, and discounts.
//       </p>
//       <button className="switch-btn">Already have an account? Sign in</button>
//     </div>

//     {/* Right Side */}
//     <div className="auth-right">
//       <h2>Signup</h2>
//       <form className="signup-form">
//         <input type="text" placeholder="Username" required />
//         <input type="password" placeholder="Password" required />
//         <input type="password" placeholder="Confirm Password" required />

//         <label className="checkbox">
//           <input type="checkbox" required />
//           <span>I agree to the Terms and Conditions</span>
//         </label>

//         <button type="submit" className="signup-btn">
//           Signup
//         </button>
//       </form>
//     </div>
//   </div>
// );
// }

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Signup() {
//   const navigate = useNavigate();

//   // ✅ Manage form state
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [agree, setAgree] = useState(false);

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     if (!agree) {
//       alert("You must agree to the Terms and Conditions.");
//       return;
//     }

//     try {
//       const res = await fetch("http://127.0.0.1:5000/api/v1/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!res.ok) throw new Error(`Error: ${res.status}`);

//       // const data = await res.json();
//       // console.log("Signup success:", data);

//       // ✅ Navigate to the app after signup
//       navigate("/app");
//     } catch (err) {
//       console.error("Signup failed:", err);
//       alert("Signup failed. Try again.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       {/* Left Side */}
//       <div className="auth-left">
//         <h1>Come join us!</h1>
//         <p>
//           We are so excited to have you here. If you haven't already, create an
//           account to get access to exclusive offers, rewards, and discounts.
//         </p>
//         <button
//           className="switch-btn"
//           onClick={() => navigate("/login")} // ✅ switch to login
//         >
//           Already have an account? login
//         </button>
//       </div>

//       {/* Right Side */}
//       <div className="auth-right">
//         <h2>Signup</h2>
//         <form className="signup-form" onSubmit={handleSignup}>
//           <input
//             type="text"
//             placeholder="Username"
//             required
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             required
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />

//           <label className="checkbox">
//             <input
//               type="checkbox"
//               required
//               checked={agree}
//               onChange={(e) => setAgree(e.target.checked)}
//             />
//             <span>I agree to the Terms and Conditions</span>
//           </label>

//           <button type="submit" className="signup-btn">
//             Signup
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  // form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agree) {
      setError("You must agree to the Terms and Conditions.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Error: ${res.status}`);
      }

      // optionally read response
      // const data = await res.json();

      // navigate to the protected app (you probably want to log in the user or set auth)
      navigate("/app");
    } catch (err) {
      console.error("Signup failed:", err);
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left promo (hidden on small screens) */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-full max-w-md rounded-3xl border border-white/60 bg-white/60 p-8 shadow-xl shadow-slate-900/10 backdrop-blur-2xl dark:border-slate-700/70 dark:bg-slate-900/60">
              <h2 className="text-lg font-semibold tracking-wide uppercase text-slate-500 mb-3">
                Come join us!
              </h2>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                Build a better day, one task at a time.
              </h1>

              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                Create an account to sync your tasks across devices and unlock
                features like history, reminders and more. Quick signup — no
                fuss.
              </p>

              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100">
                    ✓
                  </span>
                  <span>Sync across devices</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100">
                    ✓
                  </span>
                  <span>Simple and fast UX</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100">
                    ✓
                  </span>
                  <span>Backup and restore (coming soon)</span>
                </li>
              </ul>

              <div className="mt-6">
                <button
                  onClick={() => navigate("/login")}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50
                             dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Already have an account? Login
                </button>
              </div>
            </div>
          </div>

          {/* Right: Signup form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/80 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                    Create account
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Start organizing your day — it only takes a minute.
                  </p>
                </div>
                <div className="hidden sm:block text-sm text-slate-400">
                  Secure
                </div>
              </div>

              <form className="mt-6 space-y-4" onSubmit={handleSignup}>
                {/* username */}
                <label className="block">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    Username
                  </span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition
                               hover:border-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10
                               dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-100 dark:focus:ring-slate-100/10"
                    placeholder="your-username"
                    aria-label="username"
                  />
                </label>

                {/* password */}
                <label className="block">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    Password
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition
                               hover:border-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10
                               dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-100 dark:focus:ring-slate-100/10"
                    placeholder="••••••••"
                    aria-label="password"
                  />
                </label>

                {/* confirm */}
                <label className="block">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    Confirm password
                  </span>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition
                               hover:border-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10
                               dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-100 dark:focus:ring-slate-100/10"
                    placeholder="••••••••"
                    aria-label="confirm password"
                  />
                </label>

                <label className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    required
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-slate-900 accent-slate-900 dark:border-slate-600 dark:bg-slate-800"
                  />
                  <span>I agree to the Terms and Conditions</span>
                </label>

                {error && (
                  <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div className="flex items-center justify-between gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black disabled:opacity-60
                               dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                  >
                    {loading ? "Creating..." : "Create account"}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-50
                               dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Back to login
                  </button>
                </div>
              </form>

              <div className="mt-5 text-center text-xs text-slate-400">
                By creating an account you agree to our Terms & Conditions.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
