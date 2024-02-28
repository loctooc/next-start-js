"use client"
import { useRef, useState } from "react";
import { useRouter } from 'next/navigation'

export default function AddUserPage() {
  const router = useRouter();
    const [error, setError] = useState([]);
    const nameUseRef = useRef();
    const emailUseRef = useRef();
    const addressUseRef = useRef();
    const statusUseRef = useRef();
    
     function handleSubmit(e) {
      e.preventDefault()
      let name = nameUseRef.current.value;
      let email = emailUseRef.current.value;
      let address = addressUseRef.current.value;
      let status = statusUseRef.current.value;
      const reqbody = {
        name: name,
        email: email,
        address: address,
        is_active: status
      }
      fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(reqbody),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json()).then(data => {
        if (data.message == 'success') {
          router.push('/users');
        } else {
          setError(data.error)
          console.log(data.error);
        }
        
      });
      }
      
  

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="fname">Name:</label>
      <input type="text" id="fname" name="name" ref={nameUseRef}/>
      {error.name && error.name.length != 0 && error.name.map((e) => <p key={e}>{e}</p>)}
      <label htmlFor="address">Address:</label>
      <input type="text" id="address" name="address" ref={addressUseRef}/>
      {error.address && error.address.length != 0 && error.address.map((e) => <p key={e}>{e}</p>)}
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" ref={emailUseRef}/>
      {error.email && error.email.length != 0 && error.email.map((e) => <p key={e}>{e}</p>)}
      <label htmlFor="status">Status:</label>
      <select id="status" ref={statusUseRef}>
        <option value="">Select status</option>
        <option value={1}>Active</option>
        <option value={0}>Inactive</option>
      </select>
      {error.is_active && error.is_active.length != 0 && error.is_active.map((e) => <p key={e}>{e}</p>)}
      <input type="submit" value="Submit" />
    </form>
  );
}
