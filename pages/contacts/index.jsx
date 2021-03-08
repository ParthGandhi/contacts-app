import { useState } from "react";
import { Formik, Field, Form } from "formik";

import styles from "./contacts.module.scss";

function ContactSummary({ id, name, onClickHandler }) {
  return (
    <div
      key={id}
      className={styles.contactSummary}
      onClick={() => onClickHandler(id)}
    >
      {name}
    </div>
  );
}

function ContactDetails({ id, name, email, phone }) {
  return (
    <div key={id} className={styles.contactDetails}>
      <div>{name}</div>
      {email && (
        <a className={styles.selectedContactEmail} href={`mailto:${email}`}>
          {email}
        </a>
      )}
      {phone && <div>{phone}</div>}
    </div>
  );
}

// how to strictly type this data container
const defaultContactsData = {
  [Math.random()]: {
    name: "parth",
    email: "parthgandhi@outlook.com",
  },
  [Math.random()]: {
    name: "parth2",
    email: "me@parthgandhi.dev",
    phone: "9908577444",
  },
};

function Contacts() {
  const [contactsData, setContactsData] = useState(defaultContactsData);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleSelectContact = (contactId) => {
    setSelectedContact(contactsData[contactId]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectedContact}>
        {" "}
        You have {Object.keys(contactsData).length} friends!
      </div>
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
          phone={selectedContact.phone}
        />
      )}
      <Formik
        className={styles.addContact}
        initialValues={{
          name: "",
          email: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          setContactsData({
            ...contactsData,
            [Math.random()]: {
              name: values.name,
              email: values.email,
            },
          });
          resetForm();
        }}
      >
        {/* add validations */}
        <Form className={styles.addContact}>
          <label htmlFor="name">Name</label>
          <Field id="name" name="name" placeholder-="Name"></Field>
          <label htmlFor="email">Email</label>
          <Field id="email" name="email" placeholder-="Email"></Field>
          <button type="submit">Add</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Contacts;
