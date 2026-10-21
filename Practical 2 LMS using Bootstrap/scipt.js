document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme === "dark" ? "dark" : "light";

    document.documentElement.setAttribute("data-bs-theme", initialTheme);

    if (themeToggle) {
        const updateThemeToggle = (theme) => {
            const isDark = theme === "dark";
            themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
            themeToggle.setAttribute("aria-pressed", String(isDark));
        };

        updateThemeToggle(initialTheme);
        themeToggle.addEventListener("click", () => {
            const nextTheme = document.documentElement.getAttribute("data-bs-theme") === "dark"
                ? "light"
                : "dark";

            document.documentElement.setAttribute("data-bs-theme", nextTheme);
            localStorage.setItem("theme", nextTheme);
            updateThemeToggle(nextTheme);
        });
    }

    let currentHour = new Date().getHours();

    let greetingMessage = "";

    if (currentHour >= 5 && currentHour < 12) {
        greetingMessage = "Good Morning";
    } else {
        greetingMessage = "Good Afternoon";
    }
    document.getElementById("greeting").textContent = greetingMessage;

});