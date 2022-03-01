import './Button.scss'

const ButtonPrimaryGeneric = ({ button, onClick, type, isDisabled = false }) => {
  const onClickEvent = (e) => {
    if (onClick !== null) {
      onClick(e)
    }
  }

  return (
    <div className='button__primary fixed-bottom pb-2'>
      <hr className='mb-2 mt-0' />
      <div className='px-4 row mx-auto' style={{ maxWidth: '500px' }}>
        <button
          type={type}
          onClick={onClick ? onClickEvent : null}
          className='btn btn-block btn-primary'
          disabled={isDisabled}
        >
          {button}
        </button>
      </div>
    </div>
  )
}

export default ButtonPrimaryGeneric
