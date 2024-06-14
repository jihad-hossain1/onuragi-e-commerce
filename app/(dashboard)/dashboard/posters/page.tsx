"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const PosterPage = () => {
  const [posters, setPosters] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const posters = await fetch("/api/v1/banner/poster");
      const data = await posters.json();
      setPosters(data);
    })();
  }, []);
  return (
    <main className="max-w-screen-xl mx-auto p-2">
      <h4 className="text-2xl text-center">Poster Page</h4>
      <section>
        <Link href={"/dashboard/posters/au-poster"} className="btn">
          Add Poster
        </Link>

        <div className="mt-10">
          {posters?.map(
            (
              poster: { _id: string; title: string; image: string },
              index: number
            ) => (
              <div
                key={index}
                className="p-3 border rounded-lg shadow flex flex-col gap-2"
              >
                <div className="flex justify-between">
                  <h4>{poster?.title}</h4>
                  <Link
                    href={`/dashboard/posters/au-poster/${poster?._id}`}
                    className="text-xs px-3 py-1 rounded-lg "
                    style={{
                      backgroundColor: "rgb(236 72 153)",
                      color: "white",
                    }}
                  >
                    Update
                  </Link>
                </div>

                <Image
                  src={poster?.image}
                  width={200}
                  height={200}
                  alt="Poster"
                />
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
};

export default PosterPage;
