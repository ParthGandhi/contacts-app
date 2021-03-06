import { useState } from "react";

function ContactSummary({ id, name, email }) {
  return (
    <div key={id}>
      <div>{name}</div>
      <div>{email}</div>
    </div>
  );
}

// is this the right way to pass default args?
// how to strictly type this data container
const defaultContactsData = [
  {
    id: 1,
    name: "parth",
    email: "parthgandhi@outlook.com",
  },
  {
    id: 2,
    name: "parth2",
    email: "me@parthgandhi.dev",
  },
];

function Contacts({ contactsData }) {
  contactsData = contactsData || defaultContactsData;
  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <div>
      <div>{selectedContact ? selectedContact.name : "Select a contact."}</div>
      <div> You have {contactsData.length} friends!</div>

      {contactsData.map((contactData, index) => (
        <ContactSummary
          id={contactData.id}
          name={contactData.name}
          email={contactData.email}
        />
      ))}
    </div>
  );
}

export default Contacts;
