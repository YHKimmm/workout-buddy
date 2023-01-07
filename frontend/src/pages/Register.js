import { useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { Link } from "react-router-dom";
const Register = () => {

    const { dispatch } = useUserContext();

    const [registerUser, setRegisterUser] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [isRegister, setIsRegister] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = { firstName, lastName, email, password, passwordConfirm };

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const json = await response.json();
        setRegisterUser(json);
        console.log(json);
        console.log(user);
        dispatch({ type: 'SIGNUP', payload: json })
        console.log('dispatch', dispatch);
    }


    return (
        <div className="register">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                        type="text"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </section>
                <section>
                    <label>Confirm Password: </label>
                    <input
                        type="text"
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        value={passwordConfirm}
                    />
                </section>
                <button>Register</button>
            </form>
            {/* <section>
                Don't have an account? <Link to='/register'>Register</Link> your account!
            </section> */}
            {password !== passwordConfirm ? 'password is not matched' : null}
        </div>
    )
}

export default Register;