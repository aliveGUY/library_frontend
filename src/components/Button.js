/*
  THEMES:
  1) grullo
*/

const Button = ({ theme, children, href, onClick, className = "" }) => {

  if (href) {
    return (
      <a className={`button button-${theme} ${className}`} href={href}>
        {children}
      </a>
    )
  }

  return (
    <button className={`button button-${theme} ${className}`} onClick={onClick}>
      {children}
    </button>
  )

}

export default Button