const Section = ({ className, children }) => {
  return (
    <section className={`section ${className}`}>
      <div className="container">
        <div className="grid">
          {children}
        </div>
      </div>
    </section>
  )
}

export default Section