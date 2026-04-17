function init() {
    const mainDiv = document.getElementById("main");

    const header = document.createElement("header");
    const main = document.createElement("main");
    const footer = document.createElement("footer");

    mainDiv.append(header, main, footer);

    // Панелі
    const left = document.createElement("div");
    left.id = "leftPanel";

    const content = document.createElement("div");
    content.id = "content";

    const right = document.createElement("div");
    right.id = "rightPanel";

    main.append(left, content, right);

    // Loader
    left.innerHTML = '<div class="loader"></div>';
    content.innerHTML = '<div class="loader"></div>';
    right.innerHTML = '<div class="loader"></div>';

    // HEADER кнопки
    ["User Rating", "News", "Contacts", "About"].forEach(text => {
        const btn = document.createElement("button");
        btn.innerText = text;

        btn.onclick = () => {
            content.innerHTML = `<h2>${text}</h2>`;
        };

        header.appendChild(btn);
    });

    // FOOTER
    const currentUsers = document.createElement("div");
    const newUsers = document.createElement("div");

    footer.append(currentUsers, newUsers);

    currentUsers.innerText = "Current users: " + users.length;

    const newList = getNewUsers().map(u => u.firstname).join(", ");
    newUsers.innerText = "New users: " + newList;

    // CONTENT після загрузки
    setTimeout(() => {
        content.innerHTML = `
            <p>No users</p>
            <button id="getUsersBtn">Get Users</button>
        `;

        document.getElementById("getUsersBtn").onclick = loadUsers;
    }, 1000);

    // LEFT PANEL пошук
    setTimeout(() => {
        left.innerHTML = `
            <input type="text" id="searchInput">
            <button id="searchBtn">Search</button>
        `;

        document.getElementById("searchBtn").onclick = searchUsers;
    }, 1000);

    // RIGHT PANEL
    setTimeout(() => {
        right.innerHTML = `
            <div id="sum"></div>
            <label>
                <input type="checkbox" id="editToggle"> Edit table
            </label>
        `;
    }, 1000);
}

document.addEventListener("DOMContentLoaded", init);

let currentUsers = [];

function loadUsers() {
    const content = document.getElementById("content");
    content.innerHTML = '<div class="loader"></div>';

    fetchUsers().then(users => {
        currentUsers = users;

        renderTable(users);
        updateSum();
    });
}

function renderTable(users) {
    const content = document.getElementById("content");

    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const tr = document.createElement("tr");

    const thLast = document.createElement("th");
    thLast.innerText = "Lastname";

    thLast.onclick = () => {
        users.sort((a, b) => a.lastname.localeCompare(b.lastname));
        renderTable(users);
    };

    tr.appendChild(thLast);
    tr.innerHTML += "<th>Firstname</th><th>Score</th>";

    const edit = document.getElementById("editToggle")?.checked;

    if (edit) {
        tr.innerHTML += "<th>Action</th>";
    }

    thead.appendChild(tr);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    users.forEach((user, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${user.lastname}</td>
            <td>${user.firstname}</td>
            <td>${user.score}</td>
        `;

        if (edit) {
            const td = document.createElement("td");
            const btn = document.createElement("button");
            btn.innerText = "Delete";

            btn.onclick = () => {
                users.splice(index, 1);
                renderTable(users);
                updateSum();
            };

            td.appendChild(btn);
            row.appendChild(td);
        }

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    content.innerHTML = "";
    content.appendChild(table);
}

function searchUsers() {
    const text = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(row => {
        if (row.innerText.toLowerCase().includes(text)) {
            row.classList.add("highlight");
        } else {
            row.classList.remove("highlight");
        }
    });
}

function updateSum() {
    const sum = currentUsers.reduce((acc, u) => acc + u.score, 0);
    const sumDiv = document.getElementById("sum");

    if (sumDiv) {
        sumDiv.innerText = "Total score: " + sum;
    }
}