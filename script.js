const commandsContainer = document.getElementById("commands");
const tabs = document.querySelectorAll(".tab");
const themeToggle = document.getElementById("themeToggle");

/* Загрузка команд */
async function loadCommands(file) {
    commandsContainer.innerHTML = "Загрузка...";
    const response = await fetch(file);
    const data = await response.json();

    commandsContainer.innerHTML = "";

    data.forEach(item => {
        const div = document.createElement("div");
        div.className = "command";

        div.innerHTML = `
            <i class="fa-solid fa-file" title="Скопировать"></i>
            <span><b>${item.command}</b> — ${item.description}</span>
        `;

        div.querySelector("i").addEventListener("click", () => {
            navigator.clipboard.writeText(item.command);
        });

        commandsContainer.appendChild(div);
    });
}

/* Переключение вкладок */
tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        loadCommands(tab.dataset.file);
    });
});

/* Тема */
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
});

/* Первая загрузка */
loadCommands("Main.json");
