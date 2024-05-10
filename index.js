const addContactFormElement = document.getElementById("form-contact");
const addContactModalElement = document.getElementById("contact-modal");
const tableBodyContactElement = document.getElementById("table-body-contacts");

const toggleModal = () => {
  const addContactButton = document.getElementById("add-contact-button");
  const closeModalButton = document.getElementById("close-modal-button");

  addContactButton.addEventListener("click", () => {
    addContactModalElement.style.display = "block";
  });

  closeModalButton.addEventListener("click", () => {
    addContactModalElement.style.display = "none";
  });
};

const helper = {
  generateIncrementalId: () => {
    const contactsData = data.getContacts();
    return contactsData.length + 1;
  },
};

const table = {
  generateContactRow: (item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.phone}</td>
      <td>${item.email}</td>
      <td>${item.address}</td>
      <td>${item.age}</td>
      <td>
      <a href="/contact/index.html?id=${item.id}" class="rounded-button edit-button" data-id=${item.id}>
        <i  class="fa-regular fa-pen-to-square "></i>
      </a>
      <button class="rounded-button delete-button" data-id=${item.id}>
        <i class="fa-solid fa-trash"></i>
      </button>
      </td>`;
    return row;
  },
  generateTrashRow: (item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.phone}</td>
        <td>${item.email}</td>
        <td>${item.address}</td>
        <td>${item.age}</td>
        <td>
        <div class="rounded-button delete-button trash-delete-button" data-id=${item.id}>
          <i class="fa-solid fa-trash"></i>
        </div>
        </td>`;
    return row;
  },
};

const renderContact = (category, contacts) => {
  const title = category === "all" ? "All Contacts" : "Trash";
  document.querySelector(".main-contact-content_title").textContent = title;
  tableBodyContactElement.innerHTML = "";
  contacts.forEach((contact) => {
    const row =
      category === "all"
        ? table.generateContactRow(contact)
        : table.generateTrashRow(contact);
    tableBodyContactElement.appendChild(row);
  });

  deleteHandlers();
};

const eventListeners = () => {
  addContactFormElement.addEventListener("submit", addContactHandlers);

  const searchForm = document.getElementById("search-form");
  console.log("eventlisten");
  searchForm.addEventListener("submit", searchHandlers);

  const sidebarLabels = document.querySelectorAll(".sidebar-category-label");
  sidebarLabels.forEach((label) => {
    label.addEventListener("click", () => {
      const category = label.getAttribute("data-category");
      const contacts =
        category === "all" ? data.getContacts() : data.getContactsInTrash();

      renderContact(category, contacts);
      setActiveSidebarLabel(label);
    });
  });
};

const addContactHandlers = (event) => {
  event.preventDefault();
  data.addContact();
  addContactModalElement.style.display = "none";

  const contacts = data.getContacts();
  renderContact("all", contacts);
};

const searchHandlers = (event) => {
  event.preventDefault();
  const searchForm = document.getElementById("search-form");
  const searchValue = new FormData(searchForm).get("search-input");
  const filteredContacts = data.searchByName(searchValue);
  renderContact("all", filteredContacts);
};

const deleteHandlers = () => {
  console.log("deleteHandlers");
  document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", function () {
      data.deleteContactById(this.getAttribute("data-id"));
    });
  });
};

function loadInitialContacts() {
  const contacts = data.getContacts();
  renderContact("all", contacts);
}

function setActiveSidebarLabel(activeLabel) {
  document.querySelectorAll(".sidebar-category-label").forEach((label) => {
    label.classList.remove("active-sidebar");
  });
  activeLabel.classList.add("active-sidebar");
}

document.addEventListener("DOMContentLoaded", () => {
  loadInitialContacts();
  toggleModal();
  eventListeners();
});
