import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/persona");
  };

  return (
    <div className="auth-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="auth-box"
      >
        <h1>Welcome Back</h1>
        <p>Login to your ET IntelliBrief account</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            required
          />

          <button type="submit" className="button">
            Login
          </button>
        </form>

        <p className="link-text">
          Don’t have an account?{" "}
          <Link to="/register" className="link-highlight">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
