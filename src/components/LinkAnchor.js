// import { Link } from 'react-router-dom'

const LinkAnchor = ({ linkPage, text = 'aquí).' }) => (
  <>
    <a
      href={linkPage}
      // target='_blank'
      className='button__question message__subtitle'
    >
      {text}
    </a>
  </>
)

export default LinkAnchor
