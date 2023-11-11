import { Link } from "react-router-dom"

const DashHeager = () => {
  const content = (
    <header className="dash-header">
        <div className="dash-header__container">
            <Link to="/dash/notes">
                <h1 className="dash-header__title">techNotes</h1>
            </Link>
            <nav className="dash-header__nav">
                {/*ldkkdkd*/}
            </nav>
        </div>
    </header>
  )
  return content
}

export default DashHeager
