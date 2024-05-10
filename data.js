const data = {
  getContacts: () => {
    return JSON.parse(localStorage.getItem("contacts")) || [];
  },
  getContactsInTrash: () => {
    return JSON.parse(localStorage.getItem("trash")) || [];
  },
  addContact: () => {
    const contacts = data.getContacts();
    const contactFormData = new FormData(addContactFormElement);

    const newContact = {
      id: helper.generateIncrementalId(),
      name: contactFormData.get("name"),
      phone: contactFormData.get("phone"),
      email: contactFormData.get("email"),
      address: contactFormData.get("address"),
      age: Number(contactFormData.get("age")),
    };

    const latestContacts = [...contacts, newContact];
    data.setContacts(latestContacts);
  },
  setContacts: (contact) => {
    localStorage.setItem("contacts", JSON.stringify(contact));
  },
  setContactsInTrash: (contact) => {
    localStorage.setItem("trash", JSON.stringify(contact));
  },
  deleteContactById: (id) => {
    const contactsData = data.getContacts();
    const contactsDataInTrash = data.getContactsInTrash();

    const index = contactsData.findIndex(
      (item) => Number(item.id) === Number(id)
    );

    if (index !== -1) {
      const contactToTrash = { ...contactsData[index] };
      contactToTrash.id = contactsDataInTrash.length + 1;

      contactsDataInTrash.push(contactToTrash);
      contactsData.splice(index, 1);

      data.setContactsInTrash(contactsDataInTrash);
      data.setContacts(contactsData);

      renderContact("all", contactsData);

      console.log("Contact moved to trash and contacts updated.");
    } else {
      console.log("Contact not found.");
    }
  },
  deleteContactInTrash: (id) => {
    const contactsInTrash = data.getContactsInTrash();

    const index = contactsInTrash.findIndex(
      (item) => Number(item.id) === Number(id)
    );

    if (index !== -1) {
      contactsInTrash.splice(index, 1);
      data.setContactsInTrash(contactsInTrash);

      renderContact("trash", contactsInTrash);
    }
  },
  searchByName: (q) => {
    const contacts = data.getContacts();
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(q.toLowerCase())
    );

    return filteredContacts;
  },

  updateById: (id, updatedData) => {
    const contacts = data.getContacts();
    const index = contacts.findIndex((item) => Number(item.id) === Number(id));

    const updatedContact = {
      ...contacts[index],
    };
  },
};
