import { deleteUserById, getUserById, updateUser} from '@/app/lib/getDataUser';
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from "next/cache";

export async function GET(req) {
    const paramsSearch = req.nextUrl.search;
    const arrParams = paramsSearch.split('=');
    const id = arrParams[1];
    const user = await getUserById(id);

    return NextResponse.json({ status: 'success', user: user})
}

export async function POST(req) {
    let error = [];
    const user = await req.json();
    const fetchData = await fetch('http://127.0.0.1:8000/user/create', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const dataReturn = await fetchData.json();
      let id = 0; 
      console.log(dataReturn.message);
      console.log(typeof dataReturn.error);
      const message = dataReturn.message;
      if (message == 'success') {
        id = dataReturn.id;
      } else {
        error = dataReturn.error;
      }

    return NextResponse.json({ message: message, id: id, error: error})
}

export async function PUT(req) {
    const user = await req.json();
    const fetchData = await fetch('http://127.0.0.1:8000/user/update', {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const dataReturn = await fetchData.json();
      const message = dataReturn.message;
      let error = null;
      if (dataReturn.error) {
        error = dataReturn.error;
      }

    return NextResponse.json({ message: message, error: error})
}

export async function DELETE(req) {
    const data = await req.json();
    const id = data.id
    await deleteUserById(id);
    revalidatePath('/users')

    return NextResponse.json({ message: 'success'})
}
