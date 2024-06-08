import React from 'react'

const UserProfileUpdatePage = ({ params }) => {
    const id = params?.update;

    return (
        <div>UserProfileUpdatePage {id} </div>
    )
}

export default UserProfileUpdatePage