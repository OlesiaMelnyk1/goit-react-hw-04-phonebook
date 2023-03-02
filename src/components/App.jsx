import { useEffect, useState } from 'react';
import shortid from 'shortid';
import Notiflix from 'notiflix';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { GlobalStyle, PhonebookTitle, ContactsTitle } from './GlobalStyles';
import { Box } from 'components/Box';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = (name, number) => {
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };
    contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? Notiflix.Notify.failure(`${name} is already in contacts`, {
          theme: 'colored',
        })
      : setContacts(prevState => [...prevState, newContact]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  return (
    <Box
      as="section"
      mx="auto"
      my="150px"
      width="400px"
      p={5}
      bg="yellow"
      border="normal"
      borderRadius="normal"
      borderColor="black"
      boxShadow="regular"
    >
      <Box as="div" mb={5}>
        <PhonebookTitle>Phonebook</PhonebookTitle>
        <ContactForm addNewContact={addNewContact} />
      </Box>
      <Box as="div">
        <ContactsTitle>Contacts</ContactsTitle>
        {contacts.length !== 0 ? (
          <>
            <Filter filter={filter} changeFilter={changeFilter} />
            <ContactList
              contacts={filteredContacts()}
              deleteContact={deleteContact}
            />
          </>
        ) : (
          <p>NO CONTACTS in the phonebook</p>
        )}
      </Box>
      <GlobalStyle />
    </Box>
  );
};
