
// =============================================
// PREVENLAB - APLICACIÓN PRINCIPAL
// =============================================

document.addEventListener("DOMContentLoaded", function () {

    // =========================================
    // ELEMENTOS PRINCIPALES
    // =========================================

    const sections = document.querySelectorAll(".content-section");
    const navLinks = document.querySelectorAll(".nav-link");
    const pageTitle = document.getElementById("page-title");

    const titles = {
        inicio: "Panel principal",
        biomecanico: "Riesgo biomecánico",
        fisico: "Riesgo físico",
        psicosocial: "Riesgo psicosocial",
        historial: "Historial de evaluaciones"
    };


    // =========================================
    // NAVEGACIÓN ENTRE SECCIONES
    // =========================================

    function showSection(sectionName) {

        const targetSection = document.getElementById(sectionName);

        if (!targetSection) return;

        sections.forEach(section => {
            section.classList.remove("active");
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
        });

        targetSection.classList.add("active");

        const activeLink = document.querySelector(
            `.nav-link[data-section="${sectionName}"]`
        );

        if (activeLink) {
            activeLink.classList.add("active");
        }

        if (pageTitle) {
            pageTitle.textContent = titles[sectionName] || "PREVENLAB";
        }

        if (sectionName === "historial") {
            renderHistory();
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    // =========================================
    // BOTONES DEL MENÚ LATERAL
    // =========================================

    navLinks.forEach(link => {

        link.addEventListener("click", function () {

            const sectionName = this.dataset.section;

            showSection(sectionName);

        });

    });


    // =========================================
    // BOTONES PARA CAMBIAR DE SECCIÓN
    // =========================================

    document.querySelectorAll("[data-go]").forEach(button => {

        button.addEventListener("click", function () {

            const sectionName = this.dataset.go;

            showSection(sectionName);

        });

    });


    // =========================================
    // CARGAR LAS LISTAS DE VERIFICACIÓN
    // =========================================

    loadAllChecklists();


    // =========================================
    // EVALUAR LOS MÓDULOS
    // =========================================

    document.querySelectorAll(".evaluate-button").forEach(button => {

        button.addEventListener("click", function () {

            const moduleName = this.dataset.module;

            evaluateModule(moduleName);

        });

    });


    // =========================================
    // BOTÓN PARA ELIMINAR HISTORIAL
    // =========================================

    const clearButton = document.getElementById("clear-history");

    if (clearButton) {

        clearButton.addEventListener("click", function () {

            clearHistory();

        });

    }


    // =========================================
    // INICIALIZAR REPORTES E HISTORIAL
    // =========================================

    initializeReports();


    // =========================================
    // MENSAJE DE INICIO EN CONSOLA
    // =========================================

    console.log("PREVENLAB se ha iniciado correctamente.");

});
