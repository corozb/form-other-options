import { useState, useRef } from 'react'

import { POLL_SEGMENT_2 } from '../utils/polls'
import Check from './Check/Check'
import ButtonPrimaryGeneric from '../components/Button/ButtonPrimaryGeneric'
import LinkAnchor from '../components/LinkAnchor'

function SurveyTwo() {
  const formRef = useRef()

  const initialState = JSON.parse(JSON.stringify(POLL_SEGMENT_2))
  const [pollObject, setPollObject] = useState(initialState)
  const [fullFilled, setFullFilled] = useState(false)
  const [handleData, setHandleData] = useState({})

  const handleChange = (item, key) => {
    if (pollObject[key].render === 'checkbox') {
      // cleareabled: is a element that can be cleared if none checkbox it's selected
      if (pollObject[key].clearable) {
        if (item.clearOpts) {
          // if none it's selected put all fields in false
          for (const opt of pollObject[key].options) {
            opt.checked = false
          }
          pollObject[key].answers = []
        } else {
          // last element in list of checkbox (none) should be unchecked
          pollObject[key].options[pollObject[key].options.length - 1].checked = false
          // Save answers selected in current question
          pollObject[key].answers.push(item.item)
        }
      }

      if (item.checked) {
        item.checked = false
        const answerIndex = pollObject[key].answers.indexOf(item.item)

        if (answerIndex >= 0) {
          // Avoid duplicated data
          pollObject[key].answers = pollObject[key].answers.filter((v) => v !== item.item)
        }
      } else {
        item.checked = true
      }
    } else if (pollObject[key].render === 'radio') {
      for (const opt of pollObject[key].options) {
        opt.checked = false
      }
      item.checked = true
      pollObject[key].answer = item.item

      // Validate if there's another info capture in other fields
      if (item.hasOwnProperty('show_options')) {
        if (pollObject[key].extraOptions.hasOwnProperty('show')) {
          pollObject[key].extraOptions.show = item.show_options

          // if value 'no' it's selected clear input
          if (!item.show_options && pollObject[key].hasOwnProperty('free_text_input')) {
            pollObject[key].free_text_input = ''
          }
        } else {
          // Assing show_options value to object
          pollObject[key].extraOptions[1].show = item.show_options

          // if 'no' value it's selected assing false value to show extraOptions
          if (!item.show_options) {
            for (const keyE in pollObject[key].extraOptions) {
              pollObject[key].extraOptions[keyE].show = item.show_options

              if (pollObject[key].extraOptions[keyE].toRender.hasOwnProperty('options')) {
                // Assing false value in extraOptions by default if it's a checkbox
                for (const opt of pollObject[key].extraOptions[keyE].toRender.options) {
                  opt.checked = false
                }
              } else {
                // if is an input assing a empty string for value
                pollObject[key].free_text_input = ''
              }
            }
          }
        }
      }
    }

    setPollObject({ ...pollObject })
    checkFullFilled()
  }

  const handleChangeExtra = (item, key, kextra) => {
    // if extra element is a checkbox
    if (pollObject[key].extraOptions[kextra].toRender.type === 'checkbox') {
      item.checked = !item.checked

      if (item.hasOwnProperty('show_answer')) {
        if (item.checked) {
          pollObject[key].extraOptions[item.show_key].show = true
        } else {
          let showNext = false
          for (const opt of pollObject[key].extraOptions[kextra].toRender.options) {
            // if has show answer and checked validate showNext
            if (opt.hasOwnProperty('show_answer')) {
              if (opt.checked) {
                showNext = true
                break
              }
            }
          }

          // If show next input field is false, clear input value
          pollObject[key].extraOptions[parseInt(kextra) + 1].show = showNext
          if (!showNext) {
            pollObject[key].free_text_input = ''
          }
        }
      }

      if (!item.checked) {
        // Select index to avoid duplicated data
        const answerIndex = pollObject[key].answers_related.indexOf(item.item)
        if (answerIndex >= 0) {
          pollObject[key].answers_related = pollObject[key].answers_related.filter((v) => v !== item.item)
        }
      } else {
        // Push element selected item to answers_related array
        pollObject[key].answers_related.push(item.item)
      }
    }

    setPollObject({ ...pollObject })
    checkFullFilled()
  }

  const checkFullFilled = () => {
    let fullFilled = []
    for (const key in pollObject) {
      let questionOk = false
      if (pollObject[key].render === 'checkbox' || pollObject[key].render === 'radio') {
        let showOptions = false

        for (const opt of pollObject[key].options) {
          // True value for every answer option checked and show option
          if (opt.checked) {
            questionOk = true
          }
          if (opt.checked && opt.show_options) {
            showOptions = true
          }

          if (pollObject[key].render === 'radio' && opt.checked) {
            break
          }
        }

        // Another options in radio or checkbox input
        if (showOptions) {
          questionOk = false

          // Validate aditional field if checkbox is selected. Validate if contains another extra fields
          if (pollObject[key].extraOptions.hasOwnProperty(1)) {
            let extraValid = false
            for (const kExtra in pollObject[key].extraOptions) {
              // It's extra checkbox checked? pass variable to true
              if (pollObject[key].extraOptions[kExtra].toRender.type === 'checkbox') {
                for (const opt of pollObject[key].extraOptions[kExtra].toRender.options) {
                  if (opt.checked) {
                    extraValid = true
                  }

                  // if checkbox is selected and show extra options but the next field is an empty input the survey it's not correctly filled out
                  if (opt.checked && opt.show_answer) {
                    if (pollObject[key].extraOptions[parseInt(kExtra) + 1].toRender.type === 'input') {
                      if (!pollObject[key].free_text_input.length > 0) {
                        questionOk = false
                        extraValid = false
                      }
                    }
                  }
                }
              } else if (pollObject[key].extraOptions[kExtra].toRender.type === 'radio') {
                extraValid = false
                for (const opt of pollObject[key].extraOptions[kExtra].toRender) {
                  if (opt.checked) {
                    extraValid = true
                    break
                  }
                }
              }
              if (extraValid) {
                questionOk = true
              }
            }
          } else {
            if (pollObject[key].extraOptions.show) {
              // if input is empty it's a falsy value
              if (pollObject[key].extraOptions.toRender.type === 'input') {
                if (!pollObject[key].free_text_input.length > 0) {
                  questionOk = false
                } else {
                  questionOk = true
                }
              } else if (pollObject[key].extraOptions.toRender.type === 'checkbox') {
                for (const opt of pollObject[key].extraOptions.toRender.options) {
                  if (opt.checked) {
                    questionOk = true
                  }
                }
              }
            }
          }
        }
      } else if (pollObject[key].render === 'input') {
        if (!pollObject[key].answer.length > 0) {
          questionOk = false
        }
      }
      fullFilled.push(questionOk)
    }

    let allValid = true

    for (const valid of fullFilled) {
      if (!valid) {
        allValid = false
        break
      }
    }

    setFullFilled(allValid)
  }

  const handleChangeInputExtra = (e, key) => {
    const edit = e.target.value.length === 0 || /^[a-zA-Z0-9)(,.\sáéíóúüñ]+$/g.test(e.target.value)

    if (edit) {
      pollObject[key].free_text_input = e.target.value
      setPollObject({ ...pollObject })
    }
  }

  const handlePoll = async (e) => {
    e.preventDefault()
    const auxObject = JSON.parse(JSON.stringify(pollObject))

    const dataObject = {
      segment: 2,
      questions: auxObject,
      termsAccepted: true,
    }

    // clear key no required to sent to server
    for (const key in auxObject) {
      delete auxObject[key].render
      delete auxObject[key].clearable
      delete auxObject[key].options

      if (auxObject[key].hasOwnProperty('extraOptions')) {
        delete auxObject[key].extraOptions
      }

      if (auxObject[key].hasOwnProperty('placeholder')) {
        delete auxObject[key].placeholder
      }
    }

    delete auxObject[6]

    setHandleData(dataObject)

    // try {
    //   await axios({
    //     url: API_SET_PATIENT_SEGMENT,
    //     method: 'POST',
    //     headers: {
    //       Authorization: patientToken,
    //     },
    //     data: dataObject,
    //   })
    //   // Add second segment to user
    //   setSegmentPacient((oldArray) => [1, 2])
    // setShowModal(true)
    // } catch (error) {}
  }

  return (
    <>
      <h2>Encuesta 1</h2>
      <div className='container px-4'>
        <p className='pt-4'>Responde estas preguntas</p>
        <form onSubmit={handlePoll} ref={formRef}>
          <div className='mb-5 pb-4'>
            {Object.keys(pollObject).map((key, index) => (
              <div key={index} className='mt-2 pt-2'>
                <p className='message__paragraph mb-3'>
                  {/* Add question number and text */}
                  {pollObject.hasOwnProperty(parseInt(key) + 1) ? parseInt(key) + '.' : ''}{' '}
                  {/* Avoid Privacy Policy text and add link */}
                  {pollObject[key].name.replace('Política de Privacidad.', '')}
                  {pollObject[key].name.includes('Política de Privacidad.') && (
                    <LinkAnchor
                      linkPage='https://www.oncosalud.pe/politicas-de-privacidad-datos-personales'
                      text='Política de Privacidad.'
                    />
                  )}
                </p>
                {pollObject[key].options.map((item, i) => (
                  <Check
                    key={i}
                    text={item.item}
                    questionID={key}
                    type={pollObject[key].render}
                    checked={item.checked}
                    dataType={pollObject[key].type}
                    eventState={() => handleChange(item, key)}
                  />
                ))}

                {/* render if contains extra options */}
                {pollObject[key].hasOwnProperty('extraOptions') && (
                  <>
                    {pollObject[key].extraOptions.hasOwnProperty(1) ? (
                      <>
                        {/* if has extraOption array */}
                        {Object.keys(pollObject[key].extraOptions).map((kextra, kindex) => (
                          <div key={kindex}>
                            <>
                              {pollObject[key].extraOptions[kextra].toRender.hasOwnProperty('options') ? (
                                <>
                                  {pollObject[key].extraOptions[kextra].show && (
                                    <>
                                      <p className='message__paragraph mb-3'>
                                        {pollObject[key].extraOptions[kextra].text}
                                      </p>
                                      {pollObject[key].extraOptions[kextra].toRender.options.map((opt, iopt) => (
                                        <Check
                                          key={iopt}
                                          text={opt.item}
                                          questionID={iopt}
                                          type='checkbox'
                                          checked={opt.checked}
                                          dataType={pollObject[key].extraOptions[kextra].type}
                                          eventState={() => handleChangeExtra(opt, key, kextra)}
                                        />
                                      ))}
                                    </>
                                  )}
                                </>
                              ) : (
                                <>
                                  {pollObject[key].extraOptions[kextra].show && (
                                    <div>
                                      <label className='message__paragraph mb-3'>
                                        {pollObject[key].extraOptions[kextra].text}
                                      </label>
                                      <input
                                        className='form-control'
                                        required
                                        placeholder={pollObject[key].extraOptions[kextra].toRender.placeholder}
                                        name={`question_${kindex}_related`}
                                        value={pollObject[key].free_text_input}
                                        onChange={(e) => {
                                          handleChangeInputExtra(e, key)
                                        }}
                                        onBlur={checkFullFilled}
                                      />
                                    </div>
                                  )}
                                </>
                              )}
                            </>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {/* if after checked required an input field */}
                        {pollObject[key].extraOptions.show && (
                          <div>
                            <label className='message__paragraph mb-3'>
                              {pollObject[key].extraOptions.toRender.text}
                            </label>
                            <input
                              className='form-control'
                              required
                              placeholder={pollObject[key].extraOptions.toRender.placeholder}
                              name={`question_${key}_related`}
                              value={pollObject[key].free_text_input}
                              onChange={(e) => handleChangeInputExtra(e, key)}
                              onBlur={checkFullFilled}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
          <div className='mt-4'>
            <ButtonPrimaryGeneric twoButtons={false} type='submit' button='Enviar' isDisabled={!fullFilled} />
          </div>
          {JSON.stringify(handleData, null, 2)}
        </form>
      </div>
    </>
  )
}

export default SurveyTwo
