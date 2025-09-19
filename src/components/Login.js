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

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  // ✅ Manage form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!agree) {
      alert("You must agree to the Terms and Conditions.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error(`Error: ${res.status}`);

      // const data = await res.json();
      // console.log("Signup success:", data);

      // ✅ Navigate to the app after signup
      navigate("/app");
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="auth-container">
      {/* Left Side */}
      <div className="auth-left">
        <h1>Come join us!</h1>
        <p>
          We are so excited to have you here. If you haven't already, create an
          account to get access to exclusive offers, rewards, and discounts.
        </p>
        <button
          className="switch-btn"
          onClick={() => navigate("/login")} // ✅ switch to login
        >
          Already have an account? login
        </button>
      </div>

      {/* Right Side */}
      <div className="auth-right">
        <h2>Signup</h2>
        <form className="signup-form" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <label className="checkbox">
            <input
              type="checkbox"
              required
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span>I agree to the Terms and Conditions</span>
          </label>

          <button type="submit" className="signup-btn">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
