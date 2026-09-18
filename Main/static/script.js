const navItems = document.querySelectorAll(".nav-links li");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll(".page");

const background = document.querySelector(".fixed-bg");
const exploreButton = document.querySelector(".explore-btn");

const deviceCards = document.querySelectorAll(".device-card");
const selectedDeviceName = document.querySelector(".selected-device h3");
const continueButton = document.querySelector("#continue-fingerprint");


/* ================= FINGERPRINT DATA ================= */

const fingerprintDeviceName =
    document.querySelector("#fingerprint-device-name");

const fingerprintForm =
    document.querySelector("#fingerprint-form");

const enterFingerprint =
    document.querySelector("#enter-fingerprint");


const deviceFields = {

    "DC Motor": [
        ["RPM Drop", "rpm_drop_pct", "%"],
        ["Settling Time", "settling_time_s", "s"],
        ["Current Peak", "current_peak_a", "A"],
        ["Current RMS", "current_rms_a", "A"],
        ["Current Rise", "current_rise_pct", "%"],
        ["Speed RMS", "speed_rms_rad_s", "rad/s"],
        ["Overshoot", "overshoot_pct", "%"],
        ["Speed Kurtosis", "speed_kurtosis", ""],
        ["Current Kurtosis", "current_kurtosis", ""],
        ["Current Crest Factor", "current_crest_factor", ""]
    ],

    "Induction Motor": [
        ["RPM", "rpm", "RPM"],
        ["Current", "current", "A"],
        ["Vibration", "vibration", "mm/s"],
        ["Temperature", "temperature", "°C"],
        ["Voltage", "voltage", "V"]
    ],

    "Industrial Pump": [
        ["RPM", "rpm", "RPM"],
        ["Current", "current", "A"],
        ["Vibration", "vibration", "mm/s"],
        ["Temperature", "temperature", "°C"],
        ["Pressure", "pressure", "bar"],
        ["Flow Rate", "flow", "L/min"]
    ]

};

function loadFingerprintForm() {

    const fields = deviceFields[selectedDevice.name];

    fingerprintDeviceName.textContent =
        `${selectedDevice.name} — ${selectedDevice.id}`;

    fingerprintForm.innerHTML = "";


    fields.forEach((field) => {

        const label = field[0];
        const id = field[1];
        const unit = field[2];


        const row = document.createElement("div");

        row.className = "fingerprint-row";


        row.innerHTML = `

            <div class="fingerprint-field-name">

                <span>${label}</span>

            </div>


            <div class="fingerprint-input">

                <label>BEFORE STIMULUS</label>

                <div class="input-box">

                    <input
                        type="number"
                        id="before-${id}"
                        placeholder="Enter value"
                    >

                    <span>${unit}</span>

                </div>

            </div>


            <div class="fingerprint-input">

                <label>AFTER STIMULUS</label>

                <div class="input-box">

                    <input
                        type="number"
                        id="after-${id}"
                        placeholder="Enter value"
                    >

                    <span>${unit}</span>

                </div>

            </div>

        `;


        fingerprintForm.appendChild(row);

    });

}
deviceCards.forEach((card) => {

    card.addEventListener("click", () => {

        deviceCards.forEach((item) => {
            item.classList.remove("selected");
        });

        card.classList.add("selected");


        const name =
            card.querySelector(".device-info h3").textContent;

        const id =
            card.querySelector(".device-info span").textContent
            .replace("Device ID: ", "");


        selectedDevice = {
            name: name,
            id: id
        };


        selectedDeviceName.textContent =
            `${name} — ${id}`;
        loadFingerprintForm();
    });

});

/* ================= CONTINUE TO FINGERPRINT ================= */

if (continueButton) {

    continueButton.addEventListener("click", () => {

        loadFingerprintForm();

        const fingerprint =
            document.querySelector("#fingerprint");

        fingerprint.scrollIntoView({
            behavior: "smooth"
        });

    });

}

/* ================= ENTER FINGERPRINT ================= */

if (enterFingerprint) {

    enterFingerprint.addEventListener("click", () => {

        const dashboard =
            document.querySelector("#dashboard");

        dashboard.scrollIntoView({
            behavior: "smooth"
        });

    });

}

/* ================= NAVIGATION ================= */

navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        const targetId = link.getAttribute("href");

        const target = document.querySelector(targetId);

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


/* ================= EXPLORE BUTTON ================= */

if (exploreButton) {

    exploreButton.addEventListener("click", () => {

        const dashboard = document.querySelector("#dashboard");

        dashboard.scrollIntoView({
            behavior: "smooth"
        });

    });

}


/* ================= BACKGROUND FADE ================= */

window.addEventListener("scroll", () => {

    const scrollY = window.scrollY;

    /*
        Image stays completely visible
        for the first 100px of scrolling.
    */

    const fadeStart = 100;

    /*
        Image becomes completely invisible
        after 700px.
    */

    const fadeEnd = 700;


    let opacity;

    if (scrollY <= fadeStart) {

        opacity = 1;

    } else if (scrollY >= fadeEnd) {

        opacity = 0;

    } else {

        opacity =
            1 -
            (scrollY - fadeStart) /
            (fadeEnd - fadeStart);

    }


    background.style.opacity = opacity;


    /* ================= ACTIVE NAV ================= */

    let currentSection = "home";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
            scrollY >=
            sectionTop - sectionHeight / 3
        ) {

            currentSection = section.id;

        }

    });


    navItems.forEach((item) => {

        item.classList.remove("active");

        const link = item.querySelector("a");

        if (
            link &&
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            item.classList.add("active");

        }

    });

});

/* ================= DEVICE SELECTION ================= */

let selectedDevice = {
    name: "DC Motor",
    id: "M-001"
};

deviceCards.forEach((card) => {

    card.addEventListener("click", () => {

        deviceCards.forEach((item) => {
            item.classList.remove("selected");
        });

        card.classList.add("selected");

        const name = card.querySelector(".device-info h3").textContent;
        const id = card.querySelector(".device-info span").textContent
            .replace("Device ID: ", "");

        selectedDevice = {
            name: name,
            id: id
        };

        selectedDeviceName.textContent =
            `${name} — ${id}`;

    });

});