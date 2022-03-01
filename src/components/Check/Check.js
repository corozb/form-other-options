import './Check.scss'

function Check({ text, value, type, dataType, questionID, required, eventState, checked }) {
  return (
    <div className='check-container'>
      <label>
        <input
          type={type}
          data-type={dataType}
          name={`question_${questionID}`}
          required={required}
          checked={checked}
          onChange={() => eventState()}
        />
        <span className={`${type}mark`}></span>
      </label>
      <p>{text}</p>
    </div>
  )
}

export default Check
