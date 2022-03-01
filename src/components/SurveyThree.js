import { useState, useRef } from 'react'

import { POLL_SEGMENT_3 } from '../utils/polls'
import Check from './Check/Check'
import ButtonPrimaryGeneric from '../components/Button/ButtonPrimaryGeneric'
import LinkAnchor from '../components/LinkAnchor'

function SurveyThree({ setLevel }) {
  const formRef = useRef()

  const initialState = JSON.parse(JSON.stringify(POLL_SEGMENT_3))
  const [pollObject, setPollObject] = useState(initialState)
  const [fullFilled, setFullFilled] = useState(false)
  const [handleData, setHandleData] = useState({})

  const handleChange = (item, key) => {
    if (pollObject[key].render === 'checkbox') {
      if (pollObject[key].clearable) {
        if (item.clearOpts) {
          for (const opt of pollObject[key].options) {
            opt.checked = false
          }
          pollObject[key].answers = []
        } else {
          pollObject[key].options[pollObject[key].options.length - 1].checked = false
        }
      }

      if (item.checked) {
        item.checked = false
        const answerIndex = pollObject[key].answers.indexOf(item.item)

        if (answerIndex >= 0) {
          pollObject[key].answers = pollObject[key].answers.filter((v) => v !== item.item)
        }
      } else {
        item.checked = true
        if (!item.clearOpts) {
          pollObject[key].answers.push(item.item)
        }
      }

      if (item.hasOwnProperty('show_answer')) {
        if (item.show_answer) {
          if (item.checked) {
            pollObject[key].extraOptions.show = true
          } else {
            pollObject[key].extraOptions.show = false
          }
        } else {
          pollObject[key].extraOptions.show = false
          pollObject[key].free_text_input = ''
        }
      }
    } else if (pollObject[key].render === 'radio') {
      for (const opt of pollObject[key].options) {
        opt.checked = false
      }
      item.checked = true
      pollObject[key].answer = item.item
      if (item.hasOwnProperty('show_options')) {
        if (pollObject[key].extraOptions.hasOwnProperty('show')) {
          pollObject[key].extraOptions.show = item.show_options
          if (!item.show_options && pollObject[key].hasOwnProperty('free_text_input')) {
            pollObject[key].free_text_input = ''
          }
          if (pollObject[key].extraOptions.toRender.hasOwnProperty('options')) {
            for (const opt of pollObject[key].extraOptions.toRender.options) {
              opt.checked = false
            }
            pollObject[key].answers_related = []
          }
        } else {
          if (pollObject[key].extraOptions.hasOwnProperty(1)) {
            pollObject[key].extraOptions[1].show = item.show_options

            for (const keyE in pollObject[key].extraOptions) {
              if (!item.show_options) {
                pollObject[key].extraOptions[keyE].show = false
              }
              if (!item.show_options) {
                if (pollObject[key].extraOptions[keyE].toRender.hasOwnProperty('options')) {
                  for (const opt of pollObject[key].extraOptions[keyE].toRender.options) {
                    opt.checked = false
                  }
                  if (pollObject[key].hasOwnProperty('answers')) {
                    pollObject[key].answers = []
                  } else if (pollObject[key].hasOwnProperty('answers_related')) {
                    pollObject[key].answers_related = []
                  }
                } else {
                  pollObject[key].free_text_input = ''
                }
              } else {
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
    if (pollObject[key].extraOptions.hasOwnProperty(1)) {
      if (pollObject[key].extraOptions[kextra].toRender.type === 'checkbox') {
        item.checked = !item.checked
        if (item.hasOwnProperty('show_answer')) {
          if (item.checked) {
            pollObject[key].extraOptions[item.show_key].show = true
          } else {
            let showNext = false
            for (const opt of pollObject[key].extraOptions[kextra].toRender.options) {
              if (opt.hasOwnProperty('show_answer')) {
                if (opt.checked) {
                  showNext = true
                  break
                }
              }
            }
            pollObject[key].extraOptions[parseInt(kextra) + 1].show = showNext
            if (!showNext) {
              pollObject[key].free_text_input = ''
            }
          }
        }
        if (!item.checked) {
          const answerIndex = pollObject[key].answers_related.indexOf(item.item)
          if (answerIndex >= 0) {
            pollObject[key].answers_related = pollObject[key].answers_related.filter((v) => v !== item.item)
          }
        } else {
          pollObject[key].answers_related.push(item.item)
        }
      } else if (pollObject[key].extraOptions[kextra].toRender.type === 'radio') {
        let previousSelected = ''
        for (const opt of pollObject[key].extraOptions[kextra].toRender.options) {
          if (opt.checked) {
            previousSelected = opt.item
          }
          opt.checked = false
        }

        if (pollObject[key].hasOwnProperty('answers')) {
          pollObject[key].answers = pollObject[key].answers.filter((v) => v !== previousSelected)
          pollObject[key].answers.push(item.item)
        } else if (pollObject[key].hasOwnProperty('answers_related')) {
          pollObject[key].answers_related = pollObject[key].answers_related.filter((v) => v !== previousSelected)
          pollObject[key].answers_related.push(item.item)
        }

        item.checked = true
        if (item.hasOwnProperty('show_extra')) {
          if (item.show_extra) {
            pollObject[key].extraOptions[2].show = true
          }
        }
      }
    } else {
      if (pollObject[key].extraOptions.toRender.type === 'radio') {
        let previousSelected = ''
        for (const opt of pollObject[key].extraOptions.toRender.options) {
          if (opt.checked) {
            previousSelected = opt.item
          }
          opt.checked = false
        }

        if (pollObject[key].hasOwnProperty('answers')) {
          pollObject[key].answers = pollObject[key].answers.filter((v) => v !== previousSelected)
          pollObject[key].answers.push(item.item)
        } else if (pollObject[key].hasOwnProperty('answers_related')) {
          pollObject[key].answers_related = pollObject[key].answers_related.filter((v) => v !== previousSelected)
          pollObject[key].answers_related.push(item.item)
        }
        item.checked = true
      } else if (pollObject[key].extraOptions.toRender.type === 'checkbox') {
        if (pollObject[key].clearable) {
          if (item.clearOpts) {
            for (const opt of pollObject[key].extraOptions.toRender.options) {
              opt.checked = false
            }
            pollObject[key].answers_related = []
          } else {
            pollObject[key].extraOptions.toRender.options[
              pollObject[key].extraOptions.toRender.options.length - 1
            ].checked = false
          }
        }

        if (item.checked) {
          item.checked = false
          const answerIndex = pollObject[key].answers_related.indexOf(item.item)

          if (answerIndex >= 0) {
            pollObject[key].answers_related = pollObject[key].answers_related.filter((v) => v !== item.item)
          }
        } else {
          item.checked = true
          if (!item.clearOpts) {
            pollObject[key].answers_related.push(item.item)
          }
        }
      }
    }

    setPollObject({ ...pollObject })
    checkFullFilled()
  }

  const handleChangeInputExtra = (e, key) => {
    const edit = e.target.value.length === 0 || /^[a-zA-Z0-9)(,.\sáéíóúüñ]+$/g.test(e.target.value)

    if (edit) {
      pollObject[key].free_text_input = e.target.value
      setPollObject({ ...pollObject })
    }
  }

  const checkFullFilled = () => {
    let fullFilled = []
    for (const key in pollObject) {
      let questionOk = false
      if (pollObject[key].render === 'checkbox' || pollObject[key].render === 'radio') {
        let showOptions = false
        for (const opt of pollObject[key].options) {
          if (opt.checked) {
            questionOk = true
          }
          if (opt.checked && opt.show_options) {
            showOptions = true
          }
          if (opt.checked && opt.show_answer) {
            showOptions = true
          }
          if (pollObject[key].render === 'radio' && opt.checked) {
            break
          }
        }
        if (showOptions) {
          questionOk = false
          if (pollObject[key].extraOptions.hasOwnProperty(1)) {
            let extraValid = false
            for (const kExtra in pollObject[key].extraOptions) {
              if (pollObject[key].extraOptions[kExtra].toRender.type === 'checkbox') {
                for (const opt of pollObject[key].extraOptions[kExtra].toRender.options) {
                  if (opt.checked) {
                    extraValid = true
                  }
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

                for (const opt of pollObject[key].extraOptions[kExtra].toRender.options) {
                  if (opt.checked) {
                    extraValid = true
                  }
                  if (opt.checked && opt.show_extra) {
                    if (pollObject[key].extraOptions[parseInt(kExtra) + 1].toRender.type === 'input') {
                      if (!pollObject[key].free_text_input.length > 0) {
                        questionOk = false
                        extraValid = false
                      }
                    } else {
                      extraValid = false
                      questionOk = false
                      for (const opt2 of pollObject[key].extraOptions[parseInt(kExtra) + 1].toRender.options) {
                        if (opt2.checked) {
                          extraValid = true
                          questionOk = true
                        }
                      }
                    }
                  }
                }
                if (extraValid) {
                  questionOk = true
                }
              }
            }
          } else {
            if (pollObject[key].extraOptions.show) {
              if (pollObject[key].extraOptions.toRender.type === 'input') {
                if (!pollObject[key].free_text_input.length > 0) {
                  questionOk = false
                } else {
                  questionOk = true
                }
              } else if (
                pollObject[key].extraOptions.toRender.type === 'checkbox' ||
                pollObject[key].extraOptions.toRender.type === 'radio'
              ) {
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
        questionOk = true
        if (!pollObject[key].free_text_input.length > 0) {
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

  const handlePoll = async (e) => {
    e.preventDefault()
    const auxObject = JSON.parse(JSON.stringify(pollObject))

    const dataObject = {
      segment: 3,
      questions: auxObject,
      termsAccepted: true,
    }

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

    delete auxObject[19]
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
    //   setSegmentPacient((oldArray) => [1, 2, 3])
    //   setSegmentPacient((oldArray) => [1, 2, 3])
    //   ls.set(LS.SEGMENT, [1, 2, 3])
    //   setShowModal(true)
    // } catch (error) {}
  }

  return (
    <>
      <h2>Encuesta 2</h2>
      <div className='container px-4'>
        <p className='pt-4'>Responde estas preguntas para acceder a más beneficios</p>
        <form onSubmit={handlePoll} ref={formRef}>
          <div className='mb-5 pb-4'>
            {Object.keys(pollObject).map((key, index) => (
              <div key={index} className='mt-2 pt-2'>
                <p className='message__paragraph mb-3'>
                  {pollObject.hasOwnProperty(parseInt(key) + 1) ? parseInt(key) + '.' : ''}{' '}
                  {pollObject[key].name.replace('Política de Privacidad.', '')}
                  {pollObject[key].name.includes('Política de Privacidad.') && (
                    <LinkAnchor
                      linkPage='https://www.oncosalud.pe/politicas-de-privacidad-datos-personales'
                      text='Política de Privacidad.'
                    />
                  )}
                </p>
                {pollObject[key].hasOwnProperty('options') ? (
                  pollObject[key].options.map((item, i) => (
                    <Check
                      key={i}
                      text={item.item}
                      questionID={`question_principal_${pollObject[key].render}_${key}`}
                      type={pollObject[key].render}
                      checked={item.checked}
                      dataType={pollObject[key].type}
                      eventState={() => handleChange(item, key)}
                    />
                  ))
                ) : (
                  <div>
                    <input
                      className='form-control'
                      required
                      type={parseInt(key) === 5 || parseInt(key) === 6 ? 'number' : 'string'}
                      min='0'
                      step='.01'
                      max={parseInt(key) === 6 ? '3.00' : '200'}
                      placeholder={pollObject[key].placeholder}
                      name={`question_${key}`}
                      value={pollObject[key].free_text_input}
                      onChange={(e) => handleChangeInputExtra(e, key)}
                      onBlur={checkFullFilled}
                    />
                  </div>
                )}
                {pollObject[key].hasOwnProperty('extraOptions') && (
                  <>
                    {pollObject[key].extraOptions.hasOwnProperty(1) ? (
                      <>
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
                                          questionID={`question_${pollObject[key].extraOptions[kextra].toRender.type}_${kextra}`}
                                          type={pollObject[key].extraOptions[kextra].toRender.type}
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
                        {pollObject[key].extraOptions.show && (
                          <>
                            {pollObject[key].extraOptions.toRender.type === 'input' && (
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
                            {pollObject[key].extraOptions.toRender.type !== 'input' && (
                              <>
                                <p className='message__paragraph mb-3'>{pollObject[key].extraOptions.text}</p>
                                {pollObject[key].extraOptions.toRender.options.map((opt, iopt) => (
                                  <Check
                                    key={iopt}
                                    text={opt.item}
                                    questionID={`question_extra_${key}`}
                                    type={pollObject[key].extraOptions.toRender.type}
                                    checked={opt.checked}
                                    dataType={pollObject[key].extraOptions.toRender.type}
                                    eventState={() => handleChangeExtra(opt, key)}
                                  />
                                ))}
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
          <div className='mt-5 pt-4'>
            <ButtonPrimaryGeneric type='submit' button='Enviar' isDisabled={!fullFilled} />
          </div>
          {JSON.stringify(handleData, null, 2)}
        </form>
      </div>
    </>
  )
}

export default SurveyThree
