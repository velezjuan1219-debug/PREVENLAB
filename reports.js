
// =============================================
// PREVENLAB - HISTORIAL Y REPORTES
// =============================================

const HISTORY_KEY = "prevenlab_evaluations";


// =============================================
// GUARDAR EVALUACIONES
// =============================================

function saveEvaluation(evaluation) {

    const history = getEvaluationHistory();

    history.unshift({
        ...evaluation,
        id: Date.now()
    });

    localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(history)
    );

    renderHistory();
}


// =============================================
// OBTENER HISTORIAL
// =============================================

function getEvaluationHistory() {

    try {
        return JSON.parse(
            localStorage.getItem(HISTORY_KEY)
        ) || [];
    } catch (error) {
        console.error("Error al leer el historial:", error);
        return [];
    }

}


// =============================================
// MOSTRAR HISTORIAL
// =============================================

function renderHistory() {

    const container = document.getElementById("history-list");

    if (!container) return;

    const history = getEvaluationHistory();

    if (history.length === 0) {

        container.innerHTML = `
            <p class="empty-message">
                Todavía no hay evaluaciones registradas.
            </p>
        `;

        return;
    }

    container.innerHTML = history.map(item => {

        let levelClass = "level-low";

        if (item.level === "Prioridad media") {
            levelClass = "level-medium";
        }

        if (item.level === "Prioridad alta") {
            levelClass = "level-high";
        }

        return `
            <div class="history-item">

                <div>
                    <strong>${item.title}</strong>
                    <small>${item.date}</small>
                    <small>
                        ${item.positiveAnswers} de ${item.total}
                        condiciones identificadas
                    </small>
                </div>

                <span class="result-level ${levelClass}">
                    ${item.level}
                </span>

            </div>
        `;

    }).join("");

}


// =============================================
// ELIMINAR HISTORIAL
// =============================================

function clearHistory() {

    const history = getEvaluationHistory();

    if (history.length === 0) {
        alert("No hay evaluaciones para eliminar.");
        return;
    }

    const confirmation = confirm(
        "¿Estás seguro de que deseas eliminar todo el historial?"
    );

    if (!confirmation) return;

    localStorage.removeItem(HISTORY_KEY);

    renderHistory();

    alert("El historial se ha eliminado.");
}


// =============================================
// REPORTE IMPRIMIBLE
// =============================================

function printReport(moduleName) {

    const questions = checklists[moduleName];

    if (!questions) {
        alert("No se encontró el módulo.");
        return;
    }

    const answers = questions.map((question, index) => {

        const selected = document.querySelector(
            `input[name="${moduleName}-${index}"]:checked`
        );

        return {
            question: question.question,
            answer: selected ? selected.value.toUpperCase() : "Sin respuesta"
        };

    });

    const result = getEvaluationHistory().find(
        item => item.moduleName === moduleName
    );

    if (!result) {
        alert("Primero debes realizar una evaluación.");
        return;
    }

    const rows = answers.map((item, index) => `
        <tr>
            <td>${index + 1}. ${item.question}</td>
            <td>${item.answer}</td>
        </tr>
    `).join("");

    const reportWindow = window.open("", "_blank");

    if (!reportWindow) {
        alert("Permite las ventanas emergentes para generar el reporte.");
        return;
    }

    reportWindow.document.write(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Reporte PREVENLAB</title>

            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 35px;
                    color: #263746;
                }

                h1 {
                    color: #167d72;
                    margin-bottom: 5px;
                }

                h2 {
                    margin-top: 30px;
                }

                .subtitle {
                    color: #667783;
                    font-size: 13px;
                }

                .summary {
                    background: #edf5f7;
                    padding: 20px;
                    border-radius: 8px;
                    margin-top: 25px;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }

                th, td {
                    border: 1px solid #ddd;
                    padding: 12px;
                    text-align: left;
                    font-size: 12px;
                }

                th {
                    background: #167d72;
                    color: white;
                }

                .footer {
                    margin-top: 40px;
                    color: #667783;
                    font-size: 11px;
                }

                @media print {
                    body {
                        padding: 10px;
                    }
                }
            </style>
        </head>

        <body>

            <h1>PREVENLAB</h1>

            <p class="subtitle">
                Reporte de identificación orientativa de condiciones de riesgo laboral
            </p>

            <div class="summary">

                <h2>${result.title}</h2>

                <p><strong>Fecha:</strong> ${result.date}</p>

                <p><strong>Prioridad:</strong> ${result.level}</p>

                <p>
                    <strong>Condiciones identificadas:</strong>
                    ${result.positiveAnswers} de ${result.total}
                </p>

                <p>
                    <strong>Porcentaje de respuestas afirmativas:</strong>
                    ${result.percentage}%
                </p>

            </div>

            <h2>Respuestas registradas</h2>

            <table>
                <thead>
                    <tr>
                        <th>Pregunta</th>
                        <th>Respuesta</th>
                    </tr>
                </thead>

                <tbody>
                    ${rows}
                </tbody>
            </table>

            <div class="footer">
                <p>
                    PREVENLAB - Proyecto educativo de Seguridad y Salud en el Trabajo.
                </p>

                <p>
                    Este reporte es orientativo y no reemplaza una evaluación
                    profesional ni la metodología de valoración del SG-SST.
                </p>
            </div>

            <script>
                window.onload = function() {
                    window.print();
                };
            <\/script>

        </body>
        </html>
    `);

    reportWindow.document.close();

}


// =============================================
// INICIALIZAR HISTORIAL
// =============================================

function initializeReports() {
    renderHistory();
}
