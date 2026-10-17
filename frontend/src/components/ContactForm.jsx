
import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function ContactForm({ contacts, setContacts }) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('Interested');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) return alert('Name and Email are required');

    try {
      const res = await axios.post('http://localhost:5000/contacts', {
        name,
        company,
        email,
        phone,
        status,
      });

      setContacts([res.data, ...contacts]);
      setName('');
      setCompany('');
      setEmail('');
      setPhone('');
      setStatus('Interested');
    } catch (err) {
      console.log('Full error:', err);
      console.log('Message:', err.message);
      console.log('Response status:', err.response?.status);
      console.log('Response data:', err.response?.data);
      console.log('Request URL:', err.config?.url);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full space-y-4 sm:space-y-5 md:space-y-6'
      autoComplete='off'
    >
      <input
        type='text'
        placeholder='Name'
        className='bg-[#eff4ff] p-3 sm:p-3.5 rounded w-full min-w-0 text-[#0c002b] outline-0 text-sm sm:text-base focus:ring-2 focus:ring-[#00277a]'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type='text'
        placeholder='Company'
        className='bg-[#eff4ff] p-3 sm:p-3.5 rounded w-full min-w-0 text-[#0c002b] outline-0 text-sm sm:text-base focus:ring-2 focus:ring-[#00277a]'
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        type='email'
        placeholder='Email'
        className='bg-[#eff4ff] p-3 sm:p-3.5 rounded w-full min-w-0 text-[#0c002b] outline-0 text-sm sm:text-base focus:ring-2 focus:ring-[#00277a]'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type='tel'
        placeholder='Phone'
        className='bg-[#eff4ff] p-3 sm:p-3.5 rounded w-full min-w-0 text-[#0c002b] outline-0 text-sm sm:text-base focus:ring-2 focus:ring-[#00277a]'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <select
        value={status}
        className='bg-[#eff4ff] p-3 sm:p-3.5 rounded w-full min-w-0 text-[#0c002b] outline-0 cursor-pointer text-sm sm:text-base focus:ring-2 focus:ring-[#00277a]'
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value='Interested'>Interested</option>
        <option value='Follow-up'>Follow-up</option>
        <option value='Closed'>Closed</option>
      </select>

      <button
        type='submit'
        className='text-white px-4 py-3 rounded hover:bg-[#001a52] bg-[#00277a] transition w-full mt-4 sm:mt-6 cursor-pointer text-sm sm:text-base font-medium'
      >
        Submit
      </button>
    </form>
  );
}

export default ContactForm;
