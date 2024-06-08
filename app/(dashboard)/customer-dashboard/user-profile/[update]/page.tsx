import React from 'react'
import Form from './_compo/Form';
import { fetchUser } from '@/utils/users/fetchuser';

const UserProfileUpdatePage = async ({ params }) => {
    const id = params?.update;
    const user = await fetchUser(id);

    return (
        <main className="max-w-screen-xl mx-auto p-4 min-h-[80vh]">
            <h4 className='text-3xl font-semibold text-center my-10'>Profile Update</h4>

            <Form user={user} />

        </main>
    )
}

export default UserProfileUpdatePage