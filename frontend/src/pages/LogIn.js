import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "../hooks/useUserContext";

const LogIn = () => {
    const navigate = useNavigate();

    const { dispatch } = useUserContext();


    const [loginUser, setLoginUser] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = { email, password }

        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const json = await response.json();
        setLoginUser(json);
        dispatch({ type: 'LOGIN', payload: json })
        console.log('login user', loginUser);

    }


    return (
        <div className="login">
            <form className="logIn" onSubmit={handleSubmit} encType="multipart/form-data">
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
                        type="text"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </section>
                <button>
                    Log In
                </button>
            </form>
            <section>
                Don't have an account? <Link to='/register'>Register</Link> your account!
            </section>
        </div>
    );
}

export default LogIn;