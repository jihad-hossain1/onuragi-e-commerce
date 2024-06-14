"use client";

import React from "react";
import Form from "./_compo/Form";

const UserProfileUpdatePage = ({ params }) => {
  const id = params?.update;
  const [user, setUser] = React.useState<any>();

  React.useEffect(() => {
    (async () => {
      const user = await fetch(`/api/v1/users/${id}`);
      const data = await user.json();
      if (data) {
        setUser(data);
      }
    })();
  }, [id]);

  return (
    <main className="max-w-screen-xl mx-auto p-4 min-h-[80vh]">
      <h4 className="text-3xl font-semibold text-center my-10">
        Profile Update
      </h4>

      <Form user={user} />
    </main>
  );
};

export default UserProfileUpdatePage;
