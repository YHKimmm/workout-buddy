import { useEffect } from "react";
import { Link } from "react-router-dom"
import { useUserContext } from "../hooks/useUserContext";

const Navbar = () => {
    const { user } = useUserContext();

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Workout Buddy</h1>
                </Link>
                <p>Hello {!user ? null : user.firstName}</p>
            </div>
        </header>
    )
}

export default Navbar;