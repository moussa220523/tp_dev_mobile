document.addEventListener("deviceready", loadContacts, false);


let currentContact;

function loadContacts() {
    let options = new ContactFindOptions();
    options.filter = "";
    options.multiple = true;
    options.hasPhoneNumber = true;
    let fields = ["displayName", "name", "phoneNumbers", "emails"];
    navigator.contacts.find(fields, showContacts, handleError, options);
}

function showContacts(contacts) {
    let code = '';
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
            let contactDetails = JSON.stringify(contact);
            code += `
                <li>
                    <a href="#contactDetails" onclick='showContactDetails(${contactDetails})'>
                        <img src="img/contact_logo.png" alt="photo de profil du contact">
                        <h1>${contact.displayName || 'No Name'}</h1>
                        <p>${contact.phoneNumbers[0].value}</p>
                    </a>
                </li>
            `;
        }
    }
    document.getElementById('contactList').innerHTML = code;
    $('#contactList').listview('refresh');
}

function showContactDetails(contact) {
    currentContact = contact;
    document.getElementById('contactName').innerText = contact.displayName || 'No Name';
    document.getElementById('contactPhone').innerText = contact.phoneNumbers.map(phone => phone.value).join(', ') || 'No Phone Number';
    document.getElementById('contactEmail').innerText = contact.emails ? contact.emails.map(email => email.value).join(', ') : 'No Email';

    document.getElementById('editButton').setAttribute('href', `#editContactPage`);
    document.getElementById('deleteButton').onclick = deleteContact;
}

function deleteContact() {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce contact?")) {
        navigator.contacts.remove(currentContact, () => {
            alert("Contact supprimé avec succès!");
            $.mobile.changePage("#mainPage");
            loadContacts();
        }, handleError);
    }
}

function addNewContact() {
    let name = document.getElementById('contactNameInput').value;
    let phone = document.getElementById('contactPhoneInput').value;
    let email = document.getElementById('contactEmailInput').value;

    let newContact = navigator.contacts.create();
    newContact.displayName = name;
    newContact.nickname = name;

    let nameField = new ContactName();
    nameField.givenName = name;
    newContact.name = nameField;

    let phoneNumbers = [];
    phoneNumbers[0] = new ContactField('mobile', phone, true);
    newContact.phoneNumbers = phoneNumbers;

    let emails = [];
    emails[0] = new ContactField('email', email, true);
    newContact.emails = emails;

    newContact.save(onSaveSuccess, handleError);
}

function onSaveSuccess(contact) {
    alert("Contact ajouté avec succès!");
    $.mobile.changePage("#mainPage");
    loadContacts();
}

function handleError(error) {
    console.log("Erreur :", error);
}

function showEditContactForm(contact) {
    currentContact = contact;
    document.getElementById('editContactName').value = contact.displayName || 'non trouve';
    document.getElementById('editContactPhone').value = contact.phoneNumbers ? contact.phoneNumbers[0].value : 'non trouve';
    document.getElementById('editContactEmail').value = contact.emails ? contact.emails[0].value : 'non trouve';

    $.mobile.changePage("#editContactPage");
}

function saveContactEdits() {
    let name = document.getElementById('editContactName').value;
    let phone = document.getElementById('editContactPhone').value;
    let email = document.getElementById('editContactEmail').value;

    currentContact.displayName = name;
    currentContact.name.givenName = name;

    currentContact.phoneNumbers[0].value = phone;

    if (currentContact.emails) {
        currentContact.emails[0].value = email;
    } else {
        currentContact.emails = [new ContactField('email', email, true)];
    }

    currentContact.save(() => {
        alert("Contact modifié avec succès!");
        $.mobile.changePage("#contactDetails");
        showContactDetails(currentContact);
    }, handleError);
}

document.getElementById('editButton').addEventListener('click', function() {
    showEditContactForm(currentContact);
});
