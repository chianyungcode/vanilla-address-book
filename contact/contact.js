const getIdFromQueryParams = () => {
  const params = new URLSearchParams(document.location.search);
  const dataId = params.get("id");
  return parseInt(dataId, 10);
};

const load = () => {
  const contactId = getIdFromQueryParams();
  const contact = data.getContactById(contactId);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      renderToDOM(contact);
    });
  } else {
    renderToDOM(contact);
  }
};

function renderToDOM(d) {
  const inputs = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    address: document.getElementById("address"),
    phone: document.getElementById("phone"),
    age: document.getElementById("age"),
  };

  Object.keys(inputs).forEach((key) => {
    inputs[key].value = d[key];
  });

  const saveButton = document.querySelector(".button-save");
  saveButton.removeEventListener("click", handleSaveClick);
  saveButton.addEventListener("click", handleSaveClick);

  function handleSaveClick(e) {
    e.preventDefault();

    const dataToUpdate = {
      id: d.id,
      name: inputs.name.value,
      email: inputs.email.value,
      address: inputs.address.value,
      phone: inputs.phone.value,
      age: inputs.age.value,
    };

    data.updateById(d.id, dataToUpdate);
    window.location.href = "/";
  }
}

document.addEventListener("DOMContentLoaded", load);
