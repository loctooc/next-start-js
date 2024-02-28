"use client"
import Link from 'next/link';

export default function UserItem(props) {
    const { user } = props;
    function handleDeleteUser() {
      let text = 'are you want to delete user';
      if (confirm(text) == true) {
        let reqbody = {id: user.id}
        fetch('/api/user', {
          method: 'DELETE',
          body: JSON.stringify(reqbody),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => response.json()).then(data => {
          if (data.message == 'success') {
            router.push('/users');
            router.refresh()
          }
        });
      }
    }

    return (
        <tr>
          <td>{user.name}</td>
          <td>{user.address}</td>
          <td>{user.email}</td>
          <td>{user.status}</td>
          <td>
            <Link href={`/users/${user.id}`} >Edit</Link> <button onClick={handleDeleteUser}>Delete</button>
          </td>
        </tr>
    )
}