import { useState } from "react";
import { DAYS, classes } from "../data/classes";
import { trainers } from "../data/trainers";

const MainContent = () => {
  const [selectedDay, setSelectedDay] = useState("Mon");

  const visibleClasses = classes.filter(
    (classItem) => classItem.day === selectedDay,
  );

  return (
    <div className="mx-auto w-full max-w-[920px] px-4">
      <section className="py-8">
        <h2 className="mb-5 text-2xl font-bold">A studio, three commitments</h2>
        <div className="flex flex-col gap-4 sm:flex-row">
          <article className="rounded-xl border border-gray-300 bg-white p-4">
            <h3 className="text-xl font-bold">Personalised training</h3>
            <p className="text-gray-600">
              Plans adapted to your level and goals.
            </p>
          </article>
          <article className="rounded-xl border border-gray-300 bg-white p-4">
            <h3 className="text-xl font-bold">Real community</h3>
            <p className="text-gray-600">
              A welcoming space where progress is shared.
            </p>
          </article>
          <article className="rounded-xl border border-gray-300 bg-white p-4">
            <h3 className="text-xl font-bold">Flexible schedule</h3>
            <p className="text-gray-600">
              Morning, lunch and evening sessions.
            </p>
          </article>
        </div>
      </section>

      <section
        id="classes"
        className="py-8"
        aria-labelledby="schedule-title"
      >
        <h2 id="schedule-title" className="mb-5 text-2xl font-bold">
          Class schedule
        </h2>

        <div
          className="mb-5 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Week days"
        >
          {DAYS.map((day) => {
            const isActive = day === selectedDay;

            return (
              <button
                key={day}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedDay(day)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${
                  isActive
                    ? "bg-[#c6d947] text-black"
                    : "bg-transparent text-gray-500 hover:text-black"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        <ul>
          {visibleClasses.map((classItem, index) => (
            <li
              key={classItem.id}
              className={`flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-gray-300 py-4 ${
                index === 0 ? "border-t" : ""
              }`}
            >
              <time dateTime={classItem.time} className="min-w-14 font-semibold">
                {classItem.time}
              </time>
              <span className="min-w-20 font-bold">{classItem.name}</span>
              <span className="text-sm text-gray-600">{classItem.coach}</span>
              <span className="text-sm text-gray-600">{classItem.level}</span>
              <a
                href="#contact"
                className="ml-auto rounded-full border border-black px-4 py-1.5 text-sm font-medium"
              >
                Book
              </a>
            </li>
          ))}

          {visibleClasses.length === 0 && (
            <li className="border-t border-gray-300 py-4 text-gray-600">
              No classes on this day.
            </li>
          )}
        </ul>
      </section>

      <section id="trainers" className="py-8" aria-labelledby="team-title">
        <h2 id="team-title" className="mb-5 text-2xl font-bold">
          Our team
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trainers.map((trainer) => (
            <article key={trainer.id}>
              <img
                src={trainer.photo}
                alt={`Photo of ${trainer.name}`}
                className="mb-3 aspect-square w-full rounded-md object-cover bg-gray-200"
              />
              <h3 className="text-lg font-bold">{trainer.name}</h3>
              <span className="mt-1 mb-2 inline-block rounded-full bg-[#c6d947] px-2.5 py-0.5 text-xs font-semibold">
                {trainer.specialty}
              </span>
              <p className="text-sm text-gray-600">{trainer.bio}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainContent;
