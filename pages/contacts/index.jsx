import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import styles from "./contacts.module.scss";

function ContactSummary({ id, name, onClickHandler }) {
  return (
    <div key={id} onClick={() => onClickHandler(id)}>
      {name}
    </div>
  );
}

function ContactDetails({ id, name, email, phone }) {
  return (
    <div key={id} className={styles.test}>
      <div>{name}</div>
      <div>Email: {email ? email : "None"}</div>
      <div>Phone: {phone ? phone : "None"}</div>
    </div>
  );
}

// how to strictly type this data container
const defaultContactsData = {
  1: {
    name: "parth",
    email: "parthgandhi@outlook.com",
  },
  2: {
    name: "parth2",
    email: "me@parthgandhi.dev",
  },
};

function Contacts() {
  const [contactsData, setContactsData] = useState(defaultContactsData);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleSelectContact = (contactId) => {
    setSelectedContact(contactsData[contactId]);
  };

  return (
    <div>
      <div>{selectedContact ? selectedContact.name : "Select a contact."}</div>
      <div> You have {contactsData.length} friends!</div>

      {Object.entries(contactsData).map(([contactId, contactData]) => (
        <ContactSummary
          id={contactId}
          name={contactData.name}
          onClickHandler={handleSelectContact}
        />
      ))}

      {selectedContact && (
        <ContactDetails
          id={selectedContact.id}
          name={selectedContact.name}
          email={selectedContact.email}
        />
      )}

      <Popup trigger={<button className="button">New</button>} modal>
        <div>Add a new contact</div>
      </Popup>
    </div>
  );
}

export default Contacts;
