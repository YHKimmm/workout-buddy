import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);

        await login(email, password)
    }


    return (
        <div className="login-wrapper">
            <form className="login" onSubmit={handleSubmit} >
                <section className="email">
                    <label>Email: </label>
                    <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </section>
                <section className="password">
                    <label>Password: </label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </section>
                <button disabled={isLoading}>Log In</button>
                {error && <div className="error">{error}</div>}
            </form>
            <section>
                Don't have an account? <Link to='/signup'>Register</Link> your account!
            </section>
        </div>
    );
}

export default LogIn;