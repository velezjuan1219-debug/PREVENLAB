
// =============================================
// PREVENLAB - MOTOR DE EVALUACIÓN
// =============================================

const recommendations = {

    biomecanico: {
        postura: "Revisar las posturas de trabajo y adaptar el puesto para favorecer posiciones cómodas y seguras.",
        repeticion: "Evaluar la repetitividad de las tareas e implementar pausas y rotación de actividades cuando sea viable.",
        cargas: "Capacitar sobre manipulación manual de cargas y utilizar ayudas mecánicas cuando corresponda.",
        ergonomia: "Ajustar la altura, distribución y características del puesto de trabajo.",
        pausas: "Establecer pausas activas y periodos de recuperación durante la jornada."
    },

    fisico: {
        ruido: "Evaluar los niveles de ruido y aplicar controles en la fuente, el medio y el trabajador.",
        iluminacion: "Mejorar la iluminación y evitar reflejos o deslumbramientos.",
        temperatura: "Revisar la ventilación y las condiciones térmicas del lugar de trabajo.",
        vibracion: "Inspeccionar los equipos y aplicar medidas para reducir la exposición a vibraciones.",
        radiacion: "Verificar las fuentes de radiación y establecer controles de protección adecuados.",
        proteccion: "Revisar la selección, disponibilidad y uso de los elementos de protección personal.",
        ambiente: "Realizar una inspección de las condiciones ambientales del área de trabajo."
    },

    psicosocial: {
        carga: "Revisar la distribución de tareas y ajustar las cargas de trabajo.",
        tiempo: "Evaluar los tiempos asignados y evitar exigencias laborales excesivas.",
        control: "Promover la participación de los trabajadores en la organización de sus actividades.",
        comunicacion: "Fortalecer los canales de comunicación y los espacios de diálogo.",
        apoyo: "Promover el acompañamiento y apoyo entre compañeros y superiores.",
        descanso: "Respetar los tiempos de descanso y promover la desconexión laboral.",
        estres: "Identificar los factores organizacionales que generan tensión y establecer medidas preventivas."
    }

};


// =============================================
// REGLAS DE EVALUACIÓN
// =============================================

// Una respuesta "Sí" indica una condición que requiere revisión.
// Los resultados son orientativos y no sustituyen una evaluación
// profesional de los riesgos laborales.

function evaluateModule(moduleName) {

    const questions = checklists[moduleName];

    if (!questions) {
        alert("No se encontró el módulo seleccionado.");
        return;
    }

    const answers = [];

    for (let index = 0; index < questions.length; index++) {

        const selected = document.querySelector(
            `input[name="${moduleName}-${index}"]:checked`
        );

        if (!selected) {
            alert("Por favor responde todas las preguntas antes de evaluar.");
            return;
        }

        answers.push(selected.value);
    }

    const riskQuestions = questions.filter((question, index) => {
        return answers[index] === "si";
    });

    const total = questions.length;
    const positiveAnswers = riskQuestions.length;
    const percentage = Math.round((positiveAnswers / total) * 100);

    let level;
    let levelClass;

    if (positiveAnswers <= 1) {
        level = "Prioridad baja";
        levelClass = "level-low";
    } else if (positiveAnswers <= 3) {
        level = "Prioridad media";
        levelClass = "level-medium";
    } else {
        level = "Prioridad alta";
        levelClass = "level-high";
    }

    const moduleNames = {
        biomecanico: "Riesgo biomecánico",
        fisico: "Riesgo físico",
        psicosocial: "Riesgo psicosocial"
    };

    const moduleRecommendations = recommendations[moduleName];

    const suggestions = [
        ...new Set(
            riskQuestions.map(question => {
                return moduleRecommendations[question.risk];
            })
        )
    ];

    displayResults({
        moduleName,
        title: moduleNames[moduleName],
        total,
        positiveAnswers,
        percentage,
        level,
        levelClass,
        suggestions
    });

    saveEvaluation({
        moduleName,
        title: moduleNames[moduleName],
        total,
        positiveAnswers,
        percentage,
        level,
        date: new Date().toLocaleString("es-CO")
    });

}


// =============================================
// MOSTRAR RESULTADOS
// =============================================

function displayResults(result) {

    const container = document.getElementById(
        `resultado-${result.moduleName}`
    );

    if (!container) return;

    const suggestionsHTML = result.suggestions.length > 0
        ? `
            <ul class="recommendations">
                ${result.suggestions.map(item => `<li>${item}</li>`).join("")}
            </ul>
        `
        : `
            <p>
                No se identificaron respuestas afirmativas en esta lista.
                Se recomienda mantener las medidas preventivas y realizar
                verificaciones periódicas.
            </p>
        `;

    container.innerHTML = `
        <h3>Resultado de la evaluación</h3>

        <span class="result-level ${result.levelClass}">
            ${result.level}
        </span>

        <p>
            <strong>Módulo:</strong> ${result.title}
        </p>

        <p>
            <strong>Condiciones identificadas:</strong>
            ${result.positiveAnswers} de ${result.total}
        </p>

        <p>
            <strong>Porcentaje de respuestas afirmativas:</strong>
            ${result.percentage}%
        </p>

        <div class="result-progress">
            <div style="width: ${result.percentage}%"></div>
        </div>

        <h3>Recomendaciones preventivas</h3>

        ${suggestionsHTML}

        <p class="result-disclaimer">
            Resultado orientativo basado en las respuestas registradas.
            No constituye una evaluación formal del SG-SST.
        </p>

        <button
            class="primary-button"
            onclick="printReport('${result.moduleName}')"
        >
            Imprimir resultado
        </button>
    `;

    container.classList.add("show");

    container.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}
