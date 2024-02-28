
import UserItem from "../components/UserItem";
import getAllUser from "../lib/getDataUser";

export default async function UsersPage() {
    const users = await getAllUser();
  return (
    <>
      <h1>Users Page</h1>
      <a href="/users/create">Create new user</a>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
      </thead>
      <tbody>
        {users.map((user) => <UserItem key={user.id} user={user} />)}
      </tbody>
    </table>
    </>
  );
}
