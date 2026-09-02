document.addEventListener("DOMContentLoaded", () => {

    console.log("Barangay Parang Portal JS starting...");


    // ELEMENT HELPERS

    const $ = (selector) => document.querySelector(selector);

    const $$ = (selector) => document.querySelectorAll(selector);

    const byId = (id) => document.getElementById(id);


    // SPLASH SCREEN

    const splashScreen = byId("splash-screen");

    if (splashScreen) {

        setTimeout(() => {
            splashScreen.classList.add("hidden");
        }, 5000);

    }


    // MAIN ELEMENTS

    const navMenu = byId("nav-menu");
    const hamburger = byId("hamburger");
    const navBrand = byId("nav-brand");

    const sections = $$(".app-section");
    const navLinks = $$(".nav-link");

    // SECTION NAVIGATION

    function showSection(sectionId) {

        const targetSection = byId(sectionId);

        if (!targetSection) {
            console.warn("Section not found:", sectionId);
            return;
        }


        /* Remove active from all sections */

        sections.forEach((section) => {
            section.classList.remove("active");
        });


        /* Activate selected section */

        targetSection.classList.add("active");


        /* Update navigation */

        navLinks.forEach((link) => {

            link.classList.remove("active");

            if (
                link.dataset.section === sectionId
            ) {
                link.classList.add("active");
            }

        });


        /* Close mobile navigation */

        closeMobileNav();


        /* Return page to top */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        console.log("Showing section:", sectionId);
    }


    // MOBILE NAV

    function openMobileNav() {

        if (!navMenu || !hamburger) {
            return;
        }

        navMenu.classList.add("open");
        hamburger.classList.add("active");

        hamburger.setAttribute(
            "aria-expanded",
            "true"
        );

        console.log("Mobile navigation opened");
    }


    function closeMobileNav() {

        if (!navMenu || !hamburger) {
            return;
        }

        navMenu.classList.remove("open");
        hamburger.classList.remove("active");

        hamburger.setAttribute(
            "aria-expanded",
            "false"
        );
    }


    function toggleMobileNav() {

        if (!navMenu) {
            return;
        }

        const isOpen =
            navMenu.classList.contains("open");

        if (isOpen) {
            closeMobileNav();
        } else {
            openMobileNav();
        }

    }


    if (hamburger) {

        hamburger.addEventListener(
            "click",
            (event) => {

                event.preventDefault();
                event.stopPropagation();

                toggleMobileNav();

            }
        );

    }


    // NAVIGATION BUTTONS HTML USES data-section

    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                const sectionId =
                    link.dataset.section;

                if (sectionId) {
                    showSection(sectionId);
                }

            }
        );

    });


    // NAV BRAND

    if (navBrand) {

        navBrand.addEventListener(
            "click",
            () => {
                showSection("home");
            }
        );

    }


    // HOME QUICK LINKS

    $$(".home-quick-links button").forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                const sectionId =
                    button.dataset.section;

                if (sectionId) {
                    showSection(sectionId);
                }

            }
        );

    });


    // MODAL FUNCTIONS

    function openModal(modal) {

        if (!modal) {
            return;
        }

        modal.classList.add("active");

        document.body.classList.add("modal-open");
    }


    function closeModal(modal) {

        if (!modal) {
            return;
        }

        modal.classList.remove("active");

        document.body.classList.remove("modal-open");
    }


    function closeAllModals() {

        $$(".modal.active").forEach((modal) => {
            closeModal(modal);
        });

    }


    // GENERIC MODAL CLOSE BUTTONS

    $$("[data-close-modal]").forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                const modal =
                    button.closest(".modal");

                closeModal(modal);

            }
        );

    });


    // CLOSE MODAL BY CLICKING OUTSIDE

    $$(".modal").forEach((modal) => {

        modal.addEventListener(
            "click",
            (event) => {

                if (event.target === modal) {
                    closeModal(modal);
                }

            }
        );

    });


    // ESC KEY

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeAllModals();

                closeMobileNav();

            }

        }
    );


    // LEARN MORE

    const learnMoreButton =
        byId("learn-more-button");

    const learnMoreModal =
        byId("learn-more-modal");


    if (
        learnMoreButton &&
        learnMoreModal
    ) {

        learnMoreButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                openModal(learnMoreModal);

            }
        );

    }


    // GET STARTED

    const getStartedButton =
        byId("get-started-button");

    const loginModal =
        byId("login-modal");


    if (
        getStartedButton &&
        loginModal
    ) {

        getStartedButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                openModal(loginModal);

            }
        );

    }


    // REQUEST SERVICE FROM HOME

    const contactRequestButton =
        byId("contact-request-button");


    if (contactRequestButton) {

        contactRequestButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                showSection("services");

            }
        );

    }


    // SERVICE MODAL

    const serviceModal =
        byId("service-modal");

    const serviceModalTitle =
        byId("service-modal-title");

    const serviceModalDescription =
        byId("service-modal-description");

    const serviceModalIcon =
        byId("service-modal-icon");

    const serviceRequirements =
        byId("service-requirements");

    const modalRequestButton =
        byId("modal-request-button");


    let selectedService = "";


    const serviceData = {

        "Barangay Clearance": {
            icon: "📄",
            description:
                "Request a Barangay Clearance for employment, business, and other official requirements.",
            requirements: [
                "Valid Government-Issued ID",
                "Proof of Residency",
                "Completed request information"
            ]
        },

        "Certificate of Residency": {
            icon: "🏠",
            description:
                "Request a Certificate of Residency for various official and personal requirements.",
            requirements: [
                "Valid Government-Issued ID",
                "Proof of Residency",
                "Completed request information"
            ]
        },

        "Barangay Indigency": {
            icon: "📋",
            description:
                "Request a Certificate of Indigency for qualified residents and official purposes.",
            requirements: [
                "Valid Government-Issued ID",
                "Proof of Residency",
                "Supporting documents when applicable"
            ]
        },

        "Business Clearance": {
            icon: "🏢",
            description:
                "Request barangay clearance for business-related requirements and transactions.",
            requirements: [
                "Valid Government-Issued ID",
                "Proof of Business Address",
                "Business-related documents"
            ]
        },

        "Other Services": {
            icon: "📑",
            description:
                "Explore other available barangay documents and services for your needs.",
            requirements: [
                "Valid Government-Issued ID",
                "Proof of Residency",
                "Additional documents depending on the service"
            ]
        }

    };


    function openServiceModal(serviceName) {

        selectedService = serviceName;


        const data =
            serviceData[serviceName];


        if (!data) {
            return;
        }


        if (serviceModalTitle) {
            serviceModalTitle.textContent =
                serviceName;
        }


        if (serviceModalDescription) {
            serviceModalDescription.textContent =
                data.description;
        }


        if (serviceModalIcon) {
            serviceModalIcon.textContent =
                data.icon;
        }


        if (serviceRequirements) {

            serviceRequirements.innerHTML =
                data.requirements
                    .map(
                        (item) =>
                            `<li>${item}</li>`
                    )
                    .join("");

        }


        openModal(serviceModal);

    }


    // SERVICE BUTTONS HTML USES .service-action

    $$(".service-action").forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                const card =
                    button.closest(".service-card");

                if (!card) {
                    return;
                }


                const serviceName =
                    card.dataset.service ||
                    card.querySelector("h3")?.textContent.trim();


                if (serviceName) {
                    openServiceModal(serviceName);
                }

            }
        );

    });


    // MODAL REQUEST SERVICE BUTTON

    const requestModal =
        byId("request-modal");


    if (
        modalRequestButton &&
        requestModal
    ) {

        modalRequestButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                closeModal(serviceModal);

                const requestTitle =
                    byId("request-title");

                if (requestTitle) {
                    requestTitle.textContent =
                        selectedService || "Barangay Service";
                }

                openModal(requestModal);

            }
        );

    }


    // ANNOUNCEMENT READ MORE

    const announcementModal =
        byId("announcement-modal");

    const announcementModalTitle =
        byId("announcement-modal-title");

    const announcementModalDate =
        byId("announcement-modal-date");

    const announcementModalText =
        byId("announcement-modal-text");


    $$(".read-announcement").forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                const card =
                    button.closest(".announcement-card");


                if (!card) {
                    return;
                }


                const title =
                    card.querySelector("h3")
                        ?.textContent.trim() ||
                    "Announcement";


                const date =
                    card.querySelector("time")
                        ?.textContent.trim() ||
                    "";


                const text =
                    card.querySelector("p")
                        ?.textContent.trim() ||
                    "";


                if (announcementModalTitle) {
                    announcementModalTitle.textContent =
                        title;
                }


                if (announcementModalDate) {
                    announcementModalDate.textContent =
                        date;
                }


                if (announcementModalText) {
                    announcementModalText.textContent =
                        text;
                }


                openModal(announcementModal);

            }
        );

    });


    // ANNOUNCEMENT SEARCH

    const announcementSearch =
        byId("announcement-search");

    const announcementCategory =
        byId("announcement-category");

    const announcementSort =
        byId("announcement-sort");

    const announcementGrid =
        byId("announcement-grid");

    const announcementEmpty =
        byId("announcement-empty");


    function filterAnnouncements() {

        if (!announcementGrid) {
            return;
        }


        const search =
            announcementSearch
                ? announcementSearch.value
                    .toLowerCase()
                    .trim()
                : "";


        const category =
            announcementCategory
                ? announcementCategory.value
                : "all";


        const cards =
            Array.from(
                announcementGrid.querySelectorAll(
                    ".announcement-card"
                )
            );


        let visibleCount = 0;


        cards.forEach((card) => {

            const text =
                card.textContent.toLowerCase();


            const cardCategory =
                card.dataset.category || "";


            const matchesSearch =
                !search ||
                text.includes(search);


            const matchesCategory =
                category === "all" ||
                cardCategory === category;


            const visible =
                matchesSearch &&
                matchesCategory;


            card.style.display =
                visible ? "" : "none";


            if (visible) {
                visibleCount++;
            }

        });


        if (announcementEmpty) {

            announcementEmpty.style.display =
                visibleCount === 0
                    ? ""
                    : "none";

        }

    }


    if (announcementSearch) {

        announcementSearch.addEventListener(
            "input",
            filterAnnouncements
        );

    }


    if (announcementCategory) {

        announcementCategory.addEventListener(
            "change",
            filterAnnouncements
        );

    }


    // ANNOUNCEMENT SORT

    if (announcementSort && announcementGrid) {

        announcementSort.addEventListener(
            "change",
            () => {

                const cards =
                    Array.from(
                        announcementGrid.querySelectorAll(
                            ".announcement-card"
                        )
                    );


                cards.sort((a, b) => {

                    const dateA =
                        new Date(
                            a.dataset.date
                        );

                    const dateB =
                        new Date(
                            b.dataset.date
                        );


                    return announcementSort.value === "newest"
                        ? dateB - dateA
                        : dateA - dateB;

                });


                cards.forEach((card) => {

                    announcementGrid.appendChild(
                        card
                    );

                });


                filterAnnouncements();

            }
        );

    }


    // VIEW ALL ANNOUNCEMENTS

    const viewAllAnnouncements =
        byId("view-all-announcements");

    const allAnnouncementsModal =
        byId("all-announcements-modal");

    const allAnnouncementList =
        byId("all-announcement-list");


    if (
        viewAllAnnouncements &&
        allAnnouncementsModal
    ) {

        viewAllAnnouncements.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                if (
                    allAnnouncementList &&
                    announcementGrid
                ) {

                    const cards =
                        announcementGrid.querySelectorAll(
                            ".announcement-card"
                        );


                    allAnnouncementList.innerHTML = "";


                    cards.forEach((card) => {

                        const clone =
                            card.cloneNode(true);


                        const readMore =
                            clone.querySelector(
                                ".read-announcement"
                            );


                        if (readMore) {
                            readMore.remove();
                        }


                        allAnnouncementList.appendChild(
                            clone
                        );

                    });

                }


                openModal(allAnnouncementsModal);

            }
        );

    }


    // REQUEST FORM

    const requestForm =
        byId("request-form");

    const receiptModal =
        byId("receipt-modal");


    if (requestForm) {

        requestForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const name =
                    byId("request-name")
                        ?.value.trim() || "";


                const service =
                    selectedService ||
                    byId("request-title")
                        ?.textContent.trim() ||
                    "Barangay Service";


                if (!name) {

                    alert(
                        "Please enter your full name."
                    );

                    return;

                }


                const requestId =
                    generateRequestId();


                const receiptId =
                    byId("receipt-request-id");

                const receiptService =
                    byId("receipt-service");

                const receiptName =
                    byId("receipt-name");


                if (receiptId) {
                    receiptId.textContent =
                        requestId;
                }


                if (receiptService) {
                    receiptService.textContent =
                        service;
                }


                if (receiptName) {
                    receiptName.textContent =
                        name;
                }


                closeModal(requestModal);

                openModal(receiptModal);


                requestForm.reset();

            }
        );

    }


    // REQUEST ID

    function generateRequestId() {

        const year =
            new Date().getFullYear();


        const random =
            Math.floor(
                1000 +
                Math.random() * 9000
            );


        return `REQ-${year}-${random}`;

    }


    // TRACK REQUEST

    const trackRequestButton =
        byId("track-request-button");

    const trackModal =
        byId("track-modal");


    if (
        trackRequestButton &&
        trackModal
    ) {

        trackRequestButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                openModal(trackModal);

            }
        );

    }


    // TRACK FORM

    const trackForm =
        byId("track-form");

    const trackingResult =
        byId("tracking-result");

    const trackingIdDisplay =
        byId("tracking-id-display");


    if (trackForm) {

        trackForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const input =
                    byId("track-id");


                const requestId =
                    input?.value.trim();


                if (!requestId) {

                    alert(
                        "Please enter your Request ID."
                    );

                    return;

                }


                if (trackingIdDisplay) {

                    trackingIdDisplay.textContent =
                        requestId.toUpperCase();

                }


                if (trackingResult) {

                    trackingResult.classList.add(
                        "show"
                    );

                }

            }
        );

    }


    // APPOINTMENT BTN.

    const appointmentButton =
        byId("appointment-button");

    const contactAppointmentButton =
        byId("contact-appointment-button");

    const appointmentModal =
        byId("appointment-modal");


    function openAppointment() {

        if (appointmentModal) {
            openModal(appointmentModal);
        }

    }


    if (appointmentButton) {

        appointmentButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                openAppointment();

            }
        );

    }


    if (contactAppointmentButton) {

        contactAppointmentButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                openAppointment();

            }
        );

    }


    // APPOINTMENT FORM

    const appointmentForm =
        byId("appointment-form");

    const appointmentReceiptModal =
        byId("appointment-receipt-modal");


    if (appointmentForm) {

        appointmentForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const name =
                    byId("appointment-name")
                        ?.value.trim() || "";


                const contact =
                    byId("appointment-contact")
                        ?.value.trim() || "";


                const service =
                    byId("appointment-service")
                        ?.value || "";


                const date =
                    byId("appointment-date")
                        ?.value || "";


                const time =
                    byId("appointment-time")
                        ?.value || "";


                const purpose =
                    byId("appointment-purpose")
                        ?.value.trim() || "";


                if (
                    !name ||
                    !contact ||
                    !service ||
                    !date ||
                    !time ||
                    !purpose
                ) {

                    alert(
                        "Please complete all required appointment details."
                    );

                    return;

                }


                const appointmentId =
                    generateAppointmentId();


                const receiptId =
                    byId("appointment-receipt-id");

                const receiptService =
                    byId("appointment-receipt-service");

                const receiptDate =
                    byId("appointment-receipt-date");

                const receiptTime =
                    byId("appointment-receipt-time");

                const receiptName =
                    byId("appointment-receipt-name");


                if (receiptId) {
                    receiptId.textContent =
                        appointmentId;
                }


                if (receiptService) {
                    receiptService.textContent =
                        service;
                }


                if (receiptDate) {
                    receiptDate.textContent =
                        formatDate(date);
                }


                if (receiptTime) {
                    receiptTime.textContent =
                        time;
                }


                if (receiptName) {
                    receiptName.textContent =
                        name;
                }


                closeModal(appointmentModal);

                openModal(
                    appointmentReceiptModal
                );


                appointmentForm.reset();

            }
        );

    }


    // APPOINTMENT ID

    function generateAppointmentId() {

        const year =
            new Date().getFullYear();


        const random =
            Math.floor(
                1000 +
                Math.random() * 9000
            );


        return `APT-${year}-${random}`;

    }


    // DATE FORMAT

    function formatDate(value) {

        if (!value) {
            return "—";
        }


        const date =
            new Date(
                `${value}T00:00:00`
            );


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return value;

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


    // SET MINIMUM APPOINTMENT DATE

    const appointmentDate =
        byId("appointment-date");


    if (appointmentDate) {

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


        appointmentDate.min =
            `${year}-${month}-${day}`;

    }


    // INITIAL STATE

       //Make sure Home is the first visible section.

    sections.forEach((section) => {

        section.classList.remove("active");

    });


    const homeSection =
        byId("home");


    if (homeSection) {

        homeSection.classList.add("active");

    }


    navLinks.forEach((link) => {

        link.classList.remove("active");

    });


    const homeNav =
        document.querySelector(
            '.nav-link[data-section="home"]'
        );


    if (homeNav) {
        homeNav.classList.add("active");
    }


    // CLICK OUTSIDE MOBILE NAV

    document.addEventListener(
        "click",
        (event) => {

            if (
                !navMenu ||
                !hamburger
            ) {
                return;
            }


            const clickedInsideNav =
                navMenu.contains(event.target);


            const clickedHamburger =
                hamburger.contains(event.target);


            if (
                !clickedInsideNav &&
                !clickedHamburger
            ) {

                closeMobileNav();

            }

        }
    );

    console.log(
        "Barangay Parang Portal JavaScript loaded successfully."
    );

});
