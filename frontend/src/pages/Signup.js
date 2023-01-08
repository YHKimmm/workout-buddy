import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password, firstName, lastName);

        console.log(email, password, firstName, lastName);
    }


    return (
        <div>
            <form onSubmit={handleSubmit} className="signup">
                <section>
                    <label>First Name: </label>
                    <input
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                    />
                </section>
                <section>
                    <label>Last Name: </label>
                    <input
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                    />
                </section>
                <section>
                    <label>Email: </label>
                    <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </section>
                <section>
                    <label>Password: </label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </section>
                <section>
                    <label>Confirm Password: </label>
                    <input
                        type="password"
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        value={passwordConfirm}
                    />
                </section>
                <button disabled={isLoading}>Sign up</button>
                {error && <div className="error">{error}</div>}
            </form>
            {/* <section>
                Don't have an account? <Link to='/register'>Register</Link> your account!
            </section> */}
            {password !== passwordConfirm ? 'password is not matched' : null}
        </div>
    )
}

export default Signup;