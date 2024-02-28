"use server"
import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'next-auth',
    password: '9999',
  });

async function getAllUser() {
    
      const [results, fields] =  await connection.query(
        'SELECT * FROM `users` order by id desc'
      );
  
      return results;
}

export async function storeUser(user) {
  return await connection.query(
    'INSERT INTO `users` (name, email, address, is_active) VALUES (?,?,?,?)',
    [user.name, user.email, user.address, user.is_active]
  );
}

export async function updateUser(user) {
  return await connection.query(
    'UPDATE `users` SET name = ?, email = ?, address = ?, is_active = ? WHERE id = ?',
    [user.name, user.email, user.address, user.isActive, user.id]
  )
}

export async function getUserById(id) {
  const [results, fields] =  await connection.query(
    'SELECT * FROM `users` WHERE id = ?',
    [id]
  );

  return results;
}

export async function deleteUserById(id) {
  const [results, fields] =  await connection.query(
    'DELETE FROM `users` WHERE id = ?',
    [id]
  );

  return results;
}

export default getAllUser;