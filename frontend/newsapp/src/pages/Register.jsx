import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="auth-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="auth-box"
      >
        <h1>Create Account</h1>
        <p>Join ET IntelliBrief today</p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            className="input"
            required
          />
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
            Register
          </button>
        </form>

        <p className="link-text">
          Already have an account?{" "}
          <Link to="/" className="link-highlight">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;
