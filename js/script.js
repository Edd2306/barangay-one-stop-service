// =========================================================
// BARANGAY ONE-STOP SERVICE PORTAL
// MAIN JAVASCRIPT
// =========================================================


// =========================================================
// 1. ELEMENT SELECTORS
// =========================================================

// Splash Screen
const splashScreen = document.querySelector(".splash-screen");

// Navigation
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");

// Service Modal
const serviceModal = document.getElementById("service-modal");
const modalClose = document.getElementById("modal-close");
const modalRequestButton = document.getElementById("modal-request");

// Request Modal
const requestModal = document.getElementById("request-modal");
const requestModalClose = document.getElementById("request-modal-close");
const requestForm = document.getElementById("request-form");

// Success Modal
const successModal = document.getElementById("success-modal");
const successCloseButton = document.getElementById("success-close");

// Appointment Modal
const appointmentModal = document.getElementById("appointment-modal");
const appointmentModalClose = document.getElementById("appointment-modal-close");
const appointmentForm = document.getElementById("appointment-form");

// Appointment Success Modal
const appointmentSuccessModal = document.getElementById(
    "appointment-success-modal"
);

const appointmentSuccessCloseButton = document.getElementById(
    "appointment-success-close"
);


// =========================================================
// 2. SPLASH SCREEN
// =========================================================

window.addEventListener("load", () => {

    if (!splashScreen) return;

    setTimeout(() => {

        splashScreen.classList.add("hidden");

    }, 2500);

});


// =========================================================
// 3. MOBILE NAVIGATION
// =========================================================

function closeMobileNavigation() {

    if (navLinks) {
        navLinks.classList.remove("active");
    }

    if (hamburger) {

        hamburger.textContent = "☰";

        hamburger.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


if (hamburger && navLinks) {

    hamburger.addEventListener("click", () => {

        const isOpen =
            navLinks.classList.toggle("active");


        if (isOpen) {

            hamburger.textContent = "✕";

            hamburger.setAttribute(
                "aria-expanded",
                "true"
            );

        } else {

            hamburger.textContent = "☰";

            hamburger.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


// =========================================================
// 4. NAVIGATION LINKS
// =========================================================

navItems.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId) return;

        const targetSection = document.querySelector(targetId);

        if (!targetSection) return;

        event.preventDefault();


        // Remove active from all navigation links
        navItems.forEach((item) => {
            item.classList.remove("active");
        });


        // Set clicked link as active
        link.classList.add("active");


        // Get navbar height
        const navbar = document.querySelector(".navbar");

        const navbarHeight = navbar
            ? navbar.offsetHeight
            : 0;


        // Get exact section position
        const sectionPosition =
            targetSection.getBoundingClientRect().top +
            window.pageYOffset -
            navbarHeight;


        // Scroll directly to section
        window.scrollTo({
            top: sectionPosition,
            behavior: "smooth"
        });


        // Close mobile menu
        closeMobileNavigation();

    });

});

// =========================================================
// 5. NAVBAR LOGO → HOME
// =========================================================

const navLogo =
    document.querySelector(".nav-logo");


if (navLogo) {

    navLogo.addEventListener("click", (event) => {

        event.preventDefault();


        const homeSection =
            document.getElementById("home-section");

        if (!homeSection) return;


        // Set Home active
        navItems.forEach((item) => {

            item.classList.remove("active");

        });


        const homeLink =
            document.querySelector(
                '.nav-link[href="#home-section"]'
            );


        if (homeLink) {

            homeLink.classList.add("active");

        }


        // Scroll to Home
        homeSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


        // Close mobile navigation
        closeMobileNavigation();

    });

}


// =========================================================
// 6. MODAL HELPER FUNCTIONS
// =========================================================

function openModal(modal) {

    if (!modal) return;

    modal.classList.add("active");

    document.body.classList.add("modal-open");

}


function closeModal(modal) {

    if (!modal) return;

    modal.classList.remove("active");


    const activeModal =
        document.querySelector(
            ".service-modal.active, " +
            ".request-modal.active, " +
            ".success-modal.active, " +
            ".appointment-modal.active, " +
            ".appointment-success-modal.active"
        );


    if (!activeModal) {

        document.body.classList.remove(
            "modal-open"
        );

    }

}


// =========================================================
// 7. SERVICE DETAILS MODAL
// =========================================================

const serviceButtons =
    document.querySelectorAll(".service-button");


serviceButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const serviceCard =
            button.closest(".service-card");

        if (!serviceCard) return;


        // Get service name
        const serviceName =
            serviceCard.dataset.service ||
            serviceCard
                .querySelector("h3")
                ?.textContent
                .trim() ||
            "Barangay Service";


        // Get description
        const serviceDescription =
            serviceCard
                .querySelector("p")
                ?.textContent
                .trim() ||
            "Service information is currently unavailable.";


        // Modal elements
        const modalTitle =
            document.getElementById(
                "modal-title"
            );


        const modalDescription =
            document.getElementById(
                "modal-description"
            );


        // Update modal
        if (modalTitle) {

            modalTitle.textContent =
                serviceName;

        }


        if (modalDescription) {

            modalDescription.textContent =
                serviceDescription;

        }


        // Remember selected service
        if (serviceModal) {

            serviceModal.dataset.service =
                serviceName;

        }


        // Open service details
        openModal(serviceModal);

    });

});


// =========================================================
// 8. CLOSE SERVICE MODAL
// =========================================================

if (modalClose) {

    modalClose.addEventListener("click", () => {

        closeModal(serviceModal);

    });

}


// =========================================================
// 9. OPEN REQUEST SERVICE MODAL
// =========================================================

const welcomeRequestButton =
    document.getElementById(
        "welcome-request-button"
    );


const ctaRequestButton =
    document.getElementById(
        "cta-request-button"
    );


function openRequestModal(serviceName = "") {

    if (!requestModal) return;


    const requestTitle =
        document.getElementById(
            "request-service-title"
        );


    if (requestTitle) {

        requestTitle.textContent =
            serviceName ||
            "Barangay Service";

    }


    closeModal(serviceModal);

    openModal(requestModal);

}


// Home Request button
if (welcomeRequestButton) {

    welcomeRequestButton.addEventListener(
        "click",
        () => {

            openRequestModal();

        }
    );

}


// Contact Request button
if (ctaRequestButton) {

    ctaRequestButton.addEventListener(
        "click",
        () => {

            openRequestModal();

        }
    );

}


// Service Details → Request Service
if (modalRequestButton) {

    modalRequestButton.addEventListener(
        "click",
        () => {

            const selectedService =
                serviceModal?.dataset.service ||
                "";


            openRequestModal(
                selectedService
            );

        }
    );

}


// =========================================================
// 10. CLOSE REQUEST MODAL
// =========================================================

if (requestModalClose) {

    requestModalClose.addEventListener(
        "click",
        () => {

            closeModal(requestModal);

        }
    );

}


// =========================================================
// 11. APPOINTMENT MODAL
// =========================================================

const appointmentButton =
    document.getElementById(
        "appointment-button"
    );


if (appointmentButton) {

    appointmentButton.addEventListener(
        "click",
        () => {

            openModal(
                appointmentModal
            );

        }
    );

}


// =========================================================
// 12. CLOSE APPOINTMENT MODAL
// =========================================================

if (appointmentModalClose) {

    appointmentModalClose.addEventListener(
        "click",
        () => {

            closeModal(
                appointmentModal
            );

        }
    );

}


// =========================================================
// 13. REQUEST FORM SUBMISSION
// =========================================================

if (requestForm) {

    requestForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            // Generate Request ID
            const requestID =
                generateRequestID();


            // Display Request ID
            const requestIDElement =
                document.getElementById(
                    "success-request-id"
                );


            if (requestIDElement) {

                requestIDElement.textContent =
                    requestID;

            }


            // Close request form
            closeModal(requestModal);


            // Open success message
            openModal(successModal);


            // Reset form
            requestForm.reset();

        }
    );

}


// =========================================================
// 14. APPOINTMENT FORM SUBMISSION
// =========================================================

if (appointmentForm) {

    appointmentForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            // Generate Appointment ID
            const appointmentID =
                generateAppointmentID();


            // Display Appointment ID
            const appointmentIDElement =
                document.getElementById(
                    "appointment-id"
                );


            if (appointmentIDElement) {

                appointmentIDElement.textContent =
                    appointmentID;

            }


            // Get form values
            const appointmentService =
                document.getElementById(
                    "appointment-service"
                );


            const appointmentDate =
                document.getElementById(
                    "appointment-date"
                );


            const appointmentTime =
                document.getElementById(
                    "appointment-time"
                );


            // Confirmed service
            const confirmedService =
                document.getElementById(
                    "confirmed-service"
                );


            if (
                confirmedService &&
                appointmentService
            ) {

                confirmedService.textContent =
                    appointmentService.options[
                        appointmentService.selectedIndex
                    ].text;

            }


            // Confirmed date
            const confirmedDate =
                document.getElementById(
                    "confirmed-date"
                );


            if (
                confirmedDate &&
                appointmentDate
            ) {

                confirmedDate.textContent =
                    formatAppointmentDate(
                        appointmentDate.value
                    );

            }


            // Confirmed time
            const confirmedTime =
                document.getElementById(
                    "confirmed-time"
                );


            if (
                confirmedTime &&
                appointmentTime
            ) {

                confirmedTime.textContent =
                    appointmentTime.value ||
                    "Not specified";

            }


            // Close appointment form
            closeModal(
                appointmentModal
            );


            // Open appointment success
            openModal(
                appointmentSuccessModal
            );


            // Reset form
            appointmentForm.reset();

        }
    );

}


// =========================================================
// 15. CLOSE REQUEST SUCCESS
// =========================================================

if (successCloseButton) {

    successCloseButton.addEventListener(
        "click",
        () => {

            closeModal(
                successModal
            );

        }
    );

}


// =========================================================
// 16. CLOSE APPOINTMENT SUCCESS
// =========================================================

if (appointmentSuccessCloseButton) {

    appointmentSuccessCloseButton.addEventListener(
        "click",
        () => {

            closeModal(
                appointmentSuccessModal
            );


            // Return to Home
            const homeSection =
                document.getElementById(
                    "home-section"
                );


            if (homeSection) {

                homeSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }


            // Set Home active
            navItems.forEach((item) => {

                item.classList.remove("active");

            });


            const homeLink =
                document.querySelector(
                    '.nav-link[href="#home-section"]'
                );


            if (homeLink) {

                homeLink.classList.add(
                    "active"
                );

            }

        }
    );

}


// =========================================================
// 17. CLOSE MODAL BY CLICKING OUTSIDE
// =========================================================

const allModals = [

    serviceModal,
    requestModal,
    successModal,
    appointmentModal,
    appointmentSuccessModal

];


allModals.forEach((modal) => {

    if (!modal) return;


    modal.addEventListener(
        "click",
        (event) => {

            // Close only when background is clicked
            if (event.target === modal) {

                closeModal(modal);

            }

        }
    );

});


// =========================================================
// 18. ESC KEY
// =========================================================

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Escape") return;


        allModals.forEach((modal) => {

            if (
                modal &&
                modal.classList.contains("active")
            ) {

                closeModal(modal);

            }

        });

    }
);


// =========================================================
// 19. GENERATE REQUEST ID
// =========================================================

function generateRequestID() {

    const randomNumber =
        Math.floor(
            1000 +
            Math.random() * 9000
        );


    return `REQ-${new Date().getFullYear()}-${randomNumber}`;

}


// =========================================================
// 20. GENERATE APPOINTMENT ID
// =========================================================

function generateAppointmentID() {

    const randomNumber =
        Math.floor(
            1000 +
            Math.random() * 9000
        );


    return `APT-${new Date().getFullYear()}-${randomNumber}`;

}


// =========================================================
// 21. FORMAT APPOINTMENT DATE
// =========================================================

function formatAppointmentDate(
    dateValue
) {

    if (!dateValue) {

        return "Not specified";

    }


    const date =
        new Date(
            dateValue + "T00:00:00"
        );


    if (isNaN(date.getTime())) {

        return dateValue;

    }


    return date.toLocaleDateString(
        "en-US",
        {
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    );

}


// =========================================================
// 22. MINIMUM APPOINTMENT DATE
// =========================================================

const appointmentDateInput =
    document.getElementById(
        "appointment-date"
    );


if (appointmentDateInput) {

    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    appointmentDateInput.min =
        `${year}-${month}-${day}`;

}


// =========================================================
// 23. PREVENT PAST DATE
// =========================================================

if (appointmentDateInput) {

    appointmentDateInput.addEventListener(
        "change",
        () => {

            if (!appointmentDateInput.value) {
                return;
            }


            const selectedDate =
                new Date(
                    appointmentDateInput.value +
                    "T00:00:00"
                );


            const today =
                new Date();


            today.setHours(
                0,
                0,
                0,
                0
            );


            if (selectedDate < today) {

                alert(
                    "Please select a valid appointment date."
                );


                appointmentDateInput.value = "";

            }

        }
    );

}


// =========================================================
// 24. HAMBURGER ACCESSIBILITY
// =========================================================

if (hamburger) {

    hamburger.setAttribute(
        "aria-label",
        "Toggle navigation"
    );


    hamburger.setAttribute(
        "aria-expanded",
        "false"
    );

}


// =========================================================
// 25. CONSOLE MESSAGE
// =========================================================

console.log(
    "Barangay One-Stop Service Portal JavaScript loaded successfully."
);