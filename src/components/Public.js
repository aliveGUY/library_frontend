import { Link } from "react-router-dom"

const Public = () => {
    const content =(
    <section className="public">

    <header>
        <h1>
            Welcome to <span className="nowrap">Library Store</span>
        </h1>
    </header>
    <main className="public_main">
      <p>
             Библиотека кароче
         </p>
         <address className="public_name">
            Books <br />
            Author <br />
            Reader <br />
         </address>
            <a href="/authors">Автори</a>
         <br />
         </main>
         <footer>
        <Link to="/login">Регайся</Link>
         </footer>
    </section>)
    return content
}
export default Public