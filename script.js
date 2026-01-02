const commandsContainer = document.getElementById("commands");
const categories = document.querySelectorAll(".category");
const themeToggle = document.getElementById("themeToggle");

async function loadCommands(file) {
    commandsContainer.innerHTML = `<div class="commands-wrapper">Загрузка...</div>`;

    const response = await fetch(file);
    const data = await response.json();

    const wrapper = document.createElement("div");
    wrapper.className = "commands-wrapper";

    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "command-card";

        card.innerHTML = `
            <div class="command-header">
                <div class="command-text">${item.command}</div>
                <i class="fa-solid fa-copy copy" title="Скопировать"></i>
            </div>
            <div class="description">${item.description}</div>
        `;

        card.querySelector(".copy").addEventListener("click", () => {
            navigator.clipboard.writeText(item.command);
        });

        wrapper.appendChild(card);
    });

    commandsContainer.innerHTML = "";
    commandsContainer.appendChild(wrapper);
}

/* Переключение категорий */
categories.forEach(btn => {
    btn.addEventListener("click", () => {
        categories.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        loadCommands(btn.dataset.file);
    });
});

/* Тема */
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
});

/* Старт */
loadCommands("Main.json");
