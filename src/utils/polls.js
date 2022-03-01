export const POLL_SEGMENT_2 = {
  1: {
    type: 'multi-select-simple',
    name: '¿Varios de estos factores de riesgo?',
    render: 'checkbox',
    clearable: true,
    options: [
      {
        id: 1,
        item: 'Hipertensión',
        checked: false,
      },
      {
        id: 2,
        item: 'Diabetes',
        checked: false,
      },
      {
        id: 3,
        item: 'Colesterol',
        checked: false,
      },
      {
        id: 4,
        item: 'Asma',
        checked: false,
      },
      {
        id: 5,
        item: 'Obesidad',
        checked: false,
      },
      {
        id: 6,
        item: 'Ninguno',
        checked: false,
        clearOpts: true,
      },
    ],
    answers: [],
  },
  2: {
    type: 'yes-no-complex',
    name: '¿Medicamento como parte de tratamiento?',
    render: 'radio',
    clearable: false,
    options: [
      {
        id: 1,
        item: 'Sí',
        checked: false,
        show_options: true,
      },
      {
        id: 2,
        item: 'No',
        checked: false,
        show_options: false,
      },
    ],
    extraOptions: {
      show: false,
      toRender: {
        type: 'input',
        text: 'Si, ¿Qué medicamentos son?',
        placeholder: 'Ej: Metformina, Enalapril, etc.',
      },
    },
    answer: '',
    answers_related: [],
    free_text_input: '',
  },
  3: {
    type: 'yes-no-complex',
    name: '¿Tienes algún diagnóstico de enfermedad o condición crónica que no hayas mencionado?',
    render: 'radio',
    clearable: false,
    options: [
      {
        id: 1,
        item: 'Sí',
        show_options: true,
        checked: false,
      },
      {
        id: 2,
        item: 'No',
        show_options: false,
        checked: false,
      },
    ],
    extraOptions: {
      show: false,
      toRender: {
        type: 'input',
        text: 'Si lo tienes, ¿cuál enfermedad?',
        placeholder: 'Ej. Artritis, insuficiencia renal, etc.',
      },
    },
    answer: '',
    answers_related: [],
    free_text_input: '',
  },
  4: {
    type: 'yes-no-simple',
    name: '¿Te has realizado chequeo preventivo?',
    render: 'radio',
    answer: '',
    clearable: false,
    options: [
      {
        id: 1,
        item: 'Sí',
        checked: false,
      },
      {
        id: 2,
        item: 'No',
        checked: false,
      },
    ],
  },
  5: {
    type: 'yes-no-complex',
    name: '¿Tienes algún seguro de salud?',
    render: 'radio',
    clearable: false,
    options: [
      {
        id: 1,
        item: 'Si',
        show_options: true,
        checked: false,
      },
      {
        id: 2,
        item: 'No',
        show_options: false,
        checked: false,
      },
    ],
    extraOptions: {
      1: {
        text: 'Si tienes marca cuál o cuales',
        show: false,
        type: 'multi-select-complex',
        toRender: {
          type: 'checkbox',
          options: [
            {
              id: 1,
              item: 'EsSalud',
              checked: false,
            },
            {
              id: 2,
              item: 'SIS',
              checked: false,
            },
            {
              id: 3,
              item: 'EPS',
              show_answer: true,
              show_key: 2,
              checked: false,
            },
            {
              id: 4,
              item: 'Seguro Privado',
              show_answer: true,
              show_key: 2,
              checked: false,
            },
          ],
        },
      },
      2: {
        show: false,
        text: 'En caso de EPS o Seguro privado, pon nombre:',
        toRender: {
          type: 'input',
          placeholder: 'Ej. Rimac, Pacífico, etc.',
        },
      },
    },
    answer: '',
    answers_related: [],
    free_text_input: '',
  },
  6: {
    type: 'multi-select-simple',
    name: 'Aceptar, Política de Privacidad.',
    render: 'checkbox',
    clearable: false,
    options: [
      {
        id: 1,
        item: 'He leído y acepto la Política de Privacidad',
        checked: false,
      },
    ],
    answers: [],
  },
}

export const POLL_SEGMENT_3 = {
  1: {
    type: 'yes-no-simple',
    name: '¿Conoces clínicas?',
    answer: '',
    render: 'radio',
    clearable: false,
    options: [
      {
        id: 1,
        item: 'Si',
        checked: false,
      },
      {
        id: 2,
        item: 'No',
        checked: false,
      },
    ],
  },
  2: {
    type: 'yes-no-complex',
    name: '¿Te has atendido en algunas clínicas?',
    render: 'radio',
    clearable: false,
    options: [
      {
        id: 1,
        item: 'Si',
        show_options: true,
        checked: false,
      },
      {
        id: 2,
        item: 'No',
        checked: false,
        show_options: false,
      },
    ],
    extraOptions: {
      show: false,
      toRender: {
        type: 'checkbox',
        text: 'Si , ¿en cuál?',
        options: [
          {
            id: 1,
            item: '360 - Digital',
            checked: false,
          },
          {
            id: 2,
            item: 'Chiclayo - Chiclayo',
            checked: false,
          },
          {
            id: 3,
            item: 'Delgado - Lima',
            checked: false,
          },
          {
            id: 4,
            item: 'Miraflores - Piura',
            checked: false,
          },
          {
            id: 5,
            item: 'Parque infantil - Piura',
            checked: false,
          },
          {
            id: 6,
            item: 'Vallesur - Arequipa',
            checked: false,
          },
          {
            id: 7,
            item: 'Bellavista - Callao',
            checked: false,
          },
          {
            id: 8,
            item: 'Camino Real - Trujillo',
            checked: false,
          },
          {
            id: 9,
            item: 'Guardia Civil - Lima',
            checked: false,
          },
        ],
      },
    },
    answer: '',
    answers_related: [],
  },
  3: {
    type: 'input',
    clearable: false,
    render: 'input',
    name: '¿Cuál especialidad sueles atender?',
    placeholder: 'Ej. Medicina general, dermatología, etc.',
    free_text_input: '',
  },
  4: {
    type: 'yes-no-simple',
    clearable: false,
    name: '¿Modalidad de consulta?',
    render: 'radio',
    options: [
      {
        id: 1,
        item: 'Presencial',
        checked: false,
      },
      {
        id: 2,
        item: 'Teleconsulta',
        checked: false,
      },
    ],
    answer: '',
  },
  5: {
    type: 'input',
    clearable: false,
    name: 'Indica tu peso actual (kilogramos)',
    render: 'input',
    placeholder: 'Ej. 60',
    free_text_input: '',
  },
  6: {
    type: 'input',
    clearable: false,
    render: 'input',
    name: 'Indica tu talla (en metros)',
    placeholder: 'Ej. 1.85',
    free_text_input: '',
  },
  7: {
    type: 'yes-no-complex',
    name: '¿Fumas actualmente?',
    render: 'radio',
    answer: '',
    clearable: false,
    options: [
      {
        id: 1,
        item: 'Si',
        show_options: true,
        checked: false,
      },
      {
        id: 2,
        item: 'No',
        checked: false,
        show_options: false,
      },
    ],
    extraOptions: {
      1: {
        show: false,
        text: 'Si ¿Con qué frecuencia?',
        toRender: {
          type: 'radio',
          options: [
            {
              id: 1,
              item: 'Diario',
              checked: false,
              show_extra: true,
            },
            {
              id: 2,
              item: 'Semanal',
              checked: false,
              show_extra: true,
            },
            {
              id: 3,
              item: 'Ocasional',
              checked: false,
              show_extra: true,
            },
          ],
        },
      },
      2: {
        show: false,
        text: 'Si ¿Cuántas cajetillas a la semana?',
        toRender: {
          type: 'radio',
          options: [
            {
              id: 1,
              item: '1 a 2 cajetillas',
              checked: false,
            },
            {
              id: 2,
              item: '3 a 4 cajetillas',
              checked: false,
            },
            {
              id: 3,
              item: 'Más de 5 cajetillas',
              checked: false,
            },
          ],
        },
      },
    },
    answers_related: [],
  },
  8: {
    type: 'yes-no-complex',
    name: '¿Consumes Bebidas alcohólicas?',
    answer: '',
    render: 'radio',
    clearable: false,
    options: [
      {
        id: 1,
        item: 'Si',
        show_options: true,
        checked: false,
      },
      {
        id: 2,
        item: 'No',
        checked: false,
        show_options: false,
      },
    ],
    extraOptions: {
      show: false,
      text: 'Si, ¿con qué frecuencia?',
      toRender: {
        type: 'radio',
        options: [
          {
            id: 1,
            item: 'Diario',
            checked: false,
          },
          {
            id: 2,
            item: 'Semanal',
            checked: false,
          },
          {
            id: 3,
            item: 'Ocasional',
            checked: false,
          },
        ],
      },
    },
    answers_related: [],
  },
  9: {
    type: 'yes-no-simple',
    name: '¿Minutos realizas actividad física?',
    answer: '',
    render: 'radio',
    clearable: false,
    options: [
      {
        id: 1,
        item: 'Más de 150 minutos por semana',
        checked: false,
      },
      {
        id: 2,
        item: 'Menos de 150 minutos por semana',
        checked: false,
      },
    ],
  },
  10: {
    type: 'multi-select-complex',
    name: 'Algún familiar de primer grado presenta uno o varias de estas enfermedades',
    clearable: true,
    render: 'checkbox',
    options: [
      {
        id: 1,
        item: 'Hipertensión',
        checked: false,
      },
      {
        id: 2,
        item: 'Diabetes',
        checked: false,
      },
      {
        id: 3,
        item: 'Colesterol',
        checked: false,
      },
      {
        id: 4,
        item: 'Asma',
        checked: false,
      },
      {
        id: 5,
        item: 'Hipotiroidismo',
        checked: false,
      },
      {
        id: 6,
        item: 'Otro tipo de diagnósticos',
        show_answer: true,
        checked: false,
      },
      {
        id: 7,
        item: 'Ninguno',
        show_answer: false,
        clearOpts: true,
        checked: false,
      },
    ],
    extraOptions: {
      show: false,
      toRender: {
        text: "Si marcaste 'Otro tipo de diagnósticos', por favor, indica cuál o cuáles son:",
        type: 'input',
        placeholder: 'Ej. Artritis, insuficiencia renal, etc.',
      },
    },
    answers: [],
    free_text_input: '',
  },
  11: {
    type: 'yes-no-simple',
    name: '¿Consumes mínimo 5 porciones de frutas y verduras al día?',
    render: 'radio',
    clearable: false,
    options: [
      {
        id: 1,
        item: 'Si',
        checked: false,
      },
      {
        id: 2,
        item: 'No',
        checked: false,
      },
    ],
    answer: '',
  },
  12: {
    type: 'yes-no-simple',
    name: '¿Consumes carnes rojas?',
    render: 'radio',
    clearable: false,
    options: [
      {
        id: 1,
        item: 'Si',
        checked: false,
      },
      {
        id: 2,
        item: 'No',
        checked: false,
      },
    ],
    answer: '',
  },
  13: {
    type: 'yes-no-simple',
    name: '¿Consumes alimentos salados?',
    render: 'radio',
    clearable: false,
    answer: '',
    options: [
      {
        id: 1,
        item: 'Si',
        checked: false,
      },
      {
        id: 2,
        item: 'No',
        checked: false,
      },
    ],
  },
  14: {
    type: 'yes-no-simple',
    name: '¿Consumes alimentos con alto contenido de grasa?',
    render: 'radio',
    clearable: false,
    answer: '',
    options: [
      {
        id: 1,
        item: 'Si',
        checked: false,
      },
      {
        id: 2,
        item: 'No',
        checked: false,
      },
    ],
  },
  15: {
    type: 'yes-no-simple',
    name: '¿Cuál es tu promedio de horas de sueño al día?',
    answer: '',
    render: 'radio',
    clearable: false,
    options: [
      {
        id: 1,
        item: 'Menos de 7 horas',
        checked: false,
      },
      {
        id: 2,
        item: 'Más de 7 horas',
        checked: false,
      },
    ],
  },
  16: {
    type: 'yes-no-simple',
    name: '¿Con qué frecuencia haces deposiciones?',
    answer: 'Diaria',
    render: 'radio',
    clearable: false,
    options: [
      {
        id: 1,
        item: 'Diaria',
        checked: false,
      },
      {
        id: 2,
        item: 'Interdiaria',
        checked: false,
      },
      {
        id: 3,
        item: 'Cada 3 días',
        checked: false,
      },
    ],
  },
  17: {
    type: 'yes-no-complex',
    name: '¿Te has hecho la prueba de papanicolaou?',
    answer: '',
    render: 'radio',
    clearable: false,
    options: [
      {
        id: 1,
        item: 'Si',
        show_options: true,
        checked: false,
      },
      {
        id: 2,
        item: 'No',
        checked: false,
        show_options: false,
      },
    ],
    extraOptions: {
      show: false,
      toRender: {
        type: 'input',
        text: 'Si te hiciste la prueba, ¿cuándo fue la última vez?',
        placeholder: 'Ej. 15 de Enero del 2022',
      },
    },
    free_text_input: '',
  },
  18: {
    type: 'yes-no-simple',
    render: 'radio',
    name: '¿Te has realizado una colonoscopia en los último 5 años?',
    answer: '',
    clearable: false,
    options: [
      {
        id: 1,
        item: 'Si',
        checked: false,
      },
      {
        id: 2,
        item: 'No',
        checked: false,
      },
    ],
  },
  19: {
    type: 'multi-select-simple',
    name: 'Al aceptar, doy mi consentimiento de su Política de Privacidad.',
    render: 'checkbox',
    clearable: false,
    options: [
      {
        id: 1,
        item: 'Acepto la Política de Privacidad.',
        checked: false,
      },
    ],
    answers: [],
  },
}
