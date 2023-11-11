import { Link } from "react-router-dom"

const Header = () => {

    return (
        <header className="page-header">
            <div className="page-header-container">
                <Link to="/">
                    <b>Бібліотека</b>
                </Link>
            </div>
        </header>
    )
}

export default Header