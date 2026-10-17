
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

function ContactList({ contacts, setContacts }) {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);

      const query = `?status=${encodeURIComponent(filter)}&search=${encodeURIComponent(search)}`;

      const delay = new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      try {
        const [res] = await Promise.all([
          axios.get(`${API_URL}/contacts${query}`),
          delay
        ]);

        setContacts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [filter, search, setContacts]);

 const handleStatusChange = async (id, newStatus) => {
  try {
    await axios.patch(
      `${API_URL}/contacts/${id}`,
      { status: newStatus }
    );

    setContacts((prev) =>
      prev.map((contact) =>
        contact._id === id
          ? { ...contact, status: newStatus }
          : contact
      )
    );
  } catch (err) {
    console.log('Error updating status:', err);
  }
};

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/contacts/${id}`);

      setContacts((prev) =>
        prev.filter((contact) => contact._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* Search and Filter */}
      <div className='flex flex-col sm:flex-row gap-3 sm:gap-5'>
        <select
          className='p-2 rounded bg-[#00277a] text-white cursor-pointer outline-0'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Interested">Interested</option>
          <option value="Follow-up">Follow-up</option>
          <option value="Closed">Closed</option>
        </select>

        <input
          type="text"
          placeholder='Search by name or company'
          className='p-3 rounded w-full bg-[#eff4ff] outline-0'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Loading and Empty State */}
      {loading ? (
        <div className='w-full min-h-80 flex flex-col items-center justify-center rounded-[5px] p-5 mt-10 gap-4'>
          <img
            src="/loading.png"
            alt="Loading"
            width={60}
            height={60}
          />
          <p className='text-[#00277a] text-2xl font-semibold'>
            Loading...
          </p>
        </div>
      ) : contacts.length === 0 ? (
        <div className='w-full min-h-80 flex flex-col items-center justify-center rounded-[5px] p-5 mt-10 gap-4 bg-[#eff4ff]'>
          <img
            src="/no found.png"
            alt="No contacts found"
            width={200}
            height={200}
          />
          <p className='text-[#00277a] text-xl sm:text-2xl font-semibold text-center'>
            No Contacts found..
          </p>
        </div>
      ) : (
        /* Contact Cards */
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-10 mt-10'>
          {contacts.map((c) => (
            <div key={c._id} className='min-w-0'>
              <div className='bg-[#eff4ff] shadow-md rounded p-4 flex flex-col justify-between hover:shadow-lg transition'>

                <div>
                  <div className='text-gray-500 text-sm flex flex-col sm:flex-row gap-3 sm:gap-2 mb-5 justify-between sm:items-center'>
                    <h3 className='font-bold text-xl sm:text-2xl text-[#00277a] '>
                      {c.name}
                    </h3>

                    <p className='text-[#00277a] p-2 px-4 rounded bg-[#d3e6ff] font-medium self-start sm:self-auto '>
                      {c.company}
                    </p>
                  </div>

                  <div className='text-sm sm:text-base flex flex-col gap-3 border-2 border-[#00277a21] p-3 rounded'>
                    <p className='break-all'>📧 {c.email}</p>
                    <p>📞 {c.phone}</p>
                  </div>
                </div>

                {/* Card Status Dropdown and Delete */}
                <div className='flex flex-col sm:flex-row justify-between gap-3 sm:items-center mt-4'>

                  <select
                    value={c.status}
                    onChange={(e) => handleStatusChange(c._id, e.target.value)}
                    className='w-full sm:w-auto p-2 rounded cursor-pointer outline-0 shadow bg-white'
                  >
                    <option value="Interested">Interested</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Closed">Closed</option>
                  </select>

                  <button
                    onClick={() => handleDelete(c._id)}
                    className='w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer'
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ContactList;
