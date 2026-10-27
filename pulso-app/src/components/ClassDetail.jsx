import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { trainers } from "../data/trainers";

// Single class page — same idea as BrewHaus product detail, but we use numeric id
export default function ClassDetail() {
  const { id } = useParams();
  const [classItem, setClassItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadClass() {
      setLoading(true);
      setError(null);
      try {
        // goes through Vite proxy (dev) or Vercel rewrite (prod) → Express
        const response = await fetch(`/api/classes/${id}`);
        if (response.status === 404) {
          setError("No such class");
          setClassItem(null);
          return;
        }
        if (!response.ok) throw new Error("Failed to load class");
        const data = await response.json();
        setClassItem(data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong loading this class.");
      } finally {
        setLoading(false);
      }
    }

    loadClass();
  }, [id]);

  // photo/bio still live in the frontend trainers file — not in the DB yet
  const coach = classItem
    ? trainers.find((t) => t.name === classItem.coach)
    : null;

  if (loading) {
    return (
      <div className="mx-auto max-w-[640px] px-4 py-16 text-gray-600">
        Loading class…
      </div>
    );
  }

  if (error || !classItem) {
    return (
      <div className="mx-auto max-w-[640px] px-4 py-16">
        <p className="text-gray-600">{error ?? "Class not found."}</p>
        <Link
          to="/#classes"
          className="mt-4 inline-block font-semibold text-black underline"
        >
          ← Back to schedule
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-[640px] px-4 py-10 sm:py-14">
      <Link
        to="/#classes"
        className="text-sm font-medium text-gray-600 hover:text-black"
      >
        ← Back to schedule
      </Link>

      <header className="mt-6">
        <p className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
          {classItem.day} · {classItem.time}
        </p>
        <h1 className="mt-1 text-[clamp(1.75rem,5vw,2.35rem)] font-bold">
          {classItem.name}
        </h1>
        <p className="mt-2 text-gray-600">
          with {classItem.coach} · {classItem.level}
        </p>
      </header>

      {coach?.photo && (
        <img
          src={coach.photo}
          alt={`Coach ${classItem.coach}`}
          className="mt-6 aspect-[4/3] w-full max-w-md rounded-md bg-[#e4e4e4] object-cover"
        />
      )}

      <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <div>
          <dt className="font-semibold text-gray-500">Duration</dt>
          <dd className="font-medium">{classItem.duration} min</dd>
        </div>
        <div>
          <dt className="font-semibold text-gray-500">Room capacity</dt>
          <dd className="font-medium">{classItem.spots} spots</dd>
        </div>
        <div>
          <dt className="font-semibold text-gray-500">Level</dt>
          <dd className="font-medium">{classItem.level}</dd>
        </div>
      </dl>

      <p className="mt-6 text-[1.05rem] leading-relaxed text-gray-700">
        {classItem.description}
      </p>

      {coach?.bio && (
        <p className="mt-4 text-[0.95rem] text-gray-600">
          <span className="font-semibold text-black">{classItem.coach}</span>
          {" — "}
          {coach.bio}
        </p>
      )}

      <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <Link
          to="/#prices"
          className="inline-flex items-center justify-center rounded-full bg-[#c6d947] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#b5c73a]"
        >
          View membership plans
        </Link>
      </div>
    </article>
  );
}
