import React from 'react'
import { useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {
  const [contacts, setContacts]=useState([])
  return (
    <div className="p-8 max-w-360 mx-auto grid grid-cols-3 gap-17.5">
    
    <div className='col-span-1 space-y-4'>
      <h1 className='text-[32px] font-bold mb-10 text-[#00277a]'> Contact Management</h1>
      <ContactForm  contacts={contacts} setContacts={setContacts}/>
    </div>

    <div className='col-span-2'>
      <ContactList setContacts={setContacts} contacts={contacts}/>
    </div>
  
    
    </div>
  )
}

export default App