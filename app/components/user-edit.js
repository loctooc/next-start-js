"use client"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

export default function EditUserItem(props) {
    const router = useRouter();
    const { id } = props;
    const [error, setError] = useState([])
    const [user, setUser] = useState()
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [isActive, setIsActive] = useState();
    function handleUpdateUser(e) {
      e.preventDefault();
      let userUpdate = {
        id:id,
        name: name,
        email: email,
        address: address,
        is_active: isActive
      }
      fetch('/api/user', {
        method: 'PUT',
        body: JSON.stringify(userUpdate),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json()).then(data => {
        console.log(data);
        if (data.message == 'success') {
          router.push('/users');
        } else {
          setError(data.error)
        }
        
      });
    }
    useEffect(() => {
      fetch('/api/user?id=' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json()).then(data => {
        if(data.status == 'success') {
          const user = data.user[0];
          setUser(user)
          setName(user.name)
          setAddress(user.address);
          setEmail(user.email);
          setIsActive(user.is_active)
        }
      });
    }, [])
    if(!user) {
      return <p>Loading ...</p>
    }

    return (
        <form onSubmit={handleUpdateUser}>
      <label htmlFor="fname">Name:</label>
      <input type="text" id="fname" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
      {error.name && error.name.length != 0 && error.name.map((e) => <p key={e}>{e}</p>)}
      <label htmlFor="address">Address:</label>
      <input type="text" id="address" name="address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
      {error.address && error.address.length != 0 && error.address.map((e) => <p key={e}>{e}</p>)}
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      {error.email && error.email.length != 0 && error.email.map((e) => <p key={e}>{e}</p>)}
      <label htmlFor="status">Status:</label>
      <select id="status" value={isActive} onChange={(e) => {
          setIsActive(e.target.value);
        }}>
        <option value="">Select status</option>
        <option value={1}>Active</option>
        <option value={0}>Inactive</option>
      </select>
      {error.is_active && error.is_active.length != 0 && error.is_active.map((e) => <p key={e}>{e}</p>)}
      <input type="submit" value="Submit" />
    </form>
    )
}