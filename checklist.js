
// =============================================
// PREVENLAB - BANCO DE PREGUNTAS
// =============================================

const checklists = {

    biomecanico: [
        {
            question: "¿Realizas actividades que requieren mantener la misma postura durante largos periodos?",
            risk: "postura"
        },
        {
            question: "¿Permaneces sentado o de pie durante gran parte de tu jornada laboral?",
            risk: "postura"
        },
        {
            question: "¿Realizas movimientos repetitivos con manos, brazos o muñecas?",
            risk: "repeticion"
        },
        {
            question: "¿Manipulas o levantas cargas pesadas durante tu trabajo?",
            risk: "cargas"
        },
        {
            question: "¿Adoptas posturas incómodas o forzadas para realizar tus actividades?",
            risk: "postura"
        },
        {
            question: "¿Tu puesto de trabajo tiene una altura o distribución poco adecuada?",
            risk: "ergonomia"
        },
        {
            question: "¿Tienes pocas oportunidades para realizar pausas activas durante tu jornada?",
            risk: "pausas"
        }
    ],

    fisico: [
        {
            question: "¿Estás expuesto a niveles elevados de ruido durante tu jornada?",
            risk: "ruido"
        },
        {
            question: "¿La iluminación de tu lugar de trabajo es insuficiente o excesiva?",
            risk: "iluminacion"
        },
        {
            question: "¿Trabajas en ambientes con temperaturas demasiado altas o bajas?",
            risk: "temperatura"
        },
        {
            question: "¿Utilizas herramientas o equipos que producen vibraciones?",
            risk: "vibracion"
        },
        {
            question: "¿Estás expuesto a radiaciones provenientes de equipos o procesos laborales?",
            risk: "radiacion"
        },
        {
            question: "¿Consideras que los elementos de protección personal disponibles son insuficientes?",
            risk: "proteccion"
        },
        {
            question: "¿Las condiciones ambientales dificultan el desarrollo seguro de tus actividades?",
            risk: "ambiente"
        }
    ],

    psicosocial: [
        {
            question: "¿Consideras que tienes una carga de trabajo excesiva?",
            risk: "carga"
        },
        {
            question: "¿Debes realizar tus actividades bajo presión constante de tiempo?",
            risk: "tiempo"
        },
        {
            question: "¿Sientes que tienes poco control sobre la organización de tus tareas?",
            risk: "control"
        },
        {
            question: "¿Experimentas dificultades frecuentes de comunicación en tu entorno laboral?",
            risk: "comunicacion"
        },
        {
            question: "¿Consideras que recibes poco apoyo de tus superiores o compañeros?",
            risk: "apoyo"
        },
        {
            question: "¿Las situaciones laborales afectan tu descanso o desconexión fuera del trabajo?",
            risk: "descanso"
        },
        {
            question: "¿Has experimentado situaciones frecuentes de tensión o estrés relacionadas con el trabajo?",
            risk: "estres"
        }
    ]

};


// =============================================
// GENERACIÓN AUTOMÁTICA DE PREGUNTAS
// =============================================

function renderChecklist(moduleName) {

    const form = document.getElementById(`form-${moduleName}`);

    if (!form || !checklists[moduleName]) {
        console.error("No se encontró el formulario:", moduleName);
        return;
    }

    form.innerHTML = "";

    checklists[moduleName].forEach((item, index) => {

        const questionHTML = `
            <div class="question-item">

                <p>
                    ${index + 1}. ${item.question}
                </p>

                <div class="answer-options">

                    <label>
                        <input
                            type="radio"
                            name="${moduleName}-${index}"
                            value="si"
                            required
                        >
                        Sí
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="${moduleName}-${index}"
                            value="no"
                        >
                        No
                    </label>

                </div>

            </div>
        `;

        form.insertAdjacentHTML("beforeend", questionHTML);

    });

}


// =============================================
// CARGAR TODOS LOS FORMULARIOS
// =============================================

function loadAllChecklists() {

    Object.keys(checklists).forEach(moduleName => {
        renderChecklist(moduleName);
    });

}
