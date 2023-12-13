import { Trans } from "react-i18next"
import defaultCover from "images/components/coverless-book.png"

const BookCover = ({ cover }) => (
  <div className="book-cover-container">
    <img src={cover || defaultCover} alt="default cover" width="100%" height="auto" title="book card cover" loading="lazy" />
    {!cover &&
      <span className="no-cover-message">
        <Trans>No Cover</Trans>
      </span>
    }
  </div>
)


export default BookCover