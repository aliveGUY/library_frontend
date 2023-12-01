import { Link } from "react-router-dom"

const Navbar = () => {

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1 className="logo">Бібліотека</h1>
                </Link>
                <button disabled>
                    login
                </button>
            </div>
        </header>
    )
}

export default Navbar