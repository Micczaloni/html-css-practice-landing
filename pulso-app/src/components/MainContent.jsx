import { useState } from "react";

import { DAYS, classes } from "../data/classes";
import { trainers } from "../data/trainers";
import { memberships } from "../data/memberships";

import SpotStepper from "./SpotStepper";

export default function MainContent() {
  // which day tab is selected — drives the filter below
  const [selectedDay, setSelectedDay] = useState("Mon");

  // how many spots per class id, e.g. { 1: 2, 3: 1 }
  // SpotStepper is controlled: values live here, not inside the stepper
  const [spotsByClass, setSpotsByClass] = useState({});

  // only show classes matching the selected day
  const visibleClasses = classes.filter(
    (classItem) => classItem.day === selectedDay,
  );

  // default to 1 if the user hasn't touched that class yet
  const getSpots = (classId) => spotsByClass[classId] ?? 1;

  const setSpots = (classId, nextValue) => {
    setSpotsByClass((prev) => ({
      ...prev,
      [classId]: nextValue,
    }));
  };

  return (
    <div className="mx-auto w-full min-w-0 max-w-[920px] px-4">
      {/* --- Commitments --- */}
      <section className="py-8 sm:py-10 md:py-12">
        <h2 className="mb-5 text-[clamp(1.35rem,4vw,1.85rem)] font-bold">
          A studio, three commitments
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="min-w-0 w-full rounded-[10px] border border-[#d8d8d8] bg-white p-4 sm:p-5">
            <h3 className="mb-1.5 text-[1.05rem] font-bold">
              Personalised training
            </h3>
            <p className="text-[0.95rem] text-gray-600">
              Plans adapted to your level and goals.
            </p>
          </article>
          <article className="min-w-0 w-full rounded-[10px] border border-[#d8d8d8] bg-white p-4 sm:p-5">
            <h3 className="mb-1.5 text-[1.05rem] font-bold">Real community</h3>
            <p className="text-[0.95rem] text-gray-600">
              A welcoming space where progress is shared.
            </p>
          </article>
          <article className="min-w-0 w-full rounded-[10px] border border-[#d8d8d8] bg-white p-4 sm:p-5">
            <h3 className="mb-1.5 text-[1.05rem] font-bold">
              Flexible schedule
            </h3>
            <p className="text-[0.95rem] text-gray-600">
              Morning, lunch and evening sessions.
            </p>
          </article>
        </div>
      </section>

      {/* --- Class schedule (day filter + SpotStepper) --- */}
      <section
        id="classes"
        className="py-8 sm:py-10 md:py-12"
        aria-labelledby="schedule-title"
      >
        <h2
          id="schedule-title"
          className="mb-5 text-[clamp(1.35rem,4vw,1.85rem)] font-bold"
        >
          Class schedule
        </h2>

        {/* clicking a day updates selectedDay -> list re-filters */}
        <div
          className="mb-5 flex flex-wrap gap-1.5 sm:gap-2"
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
                className={`rounded-full px-3 py-1.5 text-sm font-semibold transition duration-150 sm:px-3.5 ${
                  isActive
                    ? "bg-[#c6d947] text-black hover:bg-[#b5c73a]"
                    : "bg-transparent text-gray-500 hover:bg-[#e8e8e8] hover:text-black"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        <ul className="min-w-0">
          {visibleClasses.map((classItem, index) => (
            <li
              key={classItem.id}
              className={`flex min-w-0 flex-col gap-3 border-b border-[#d8d8d8] py-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2 ${
                index === 0 ? "border-t" : ""
              }`}
            >
              <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 sm:gap-x-4">
                <time
                  dateTime={classItem.time}
                  className="min-w-14 font-semibold"
                >
                  {classItem.time}
                </time>
                <span className="min-w-16 font-bold sm:min-w-20">
                  {classItem.name}
                </span>
                <span className="text-[0.95rem] text-gray-600">
                  {classItem.coach}
                </span>
                <span className="text-[0.95rem] text-gray-600">
                  {classItem.level}
                </span>
              </div>

              {/* value + onChange = controlled pattern (same idea as QuantityStepper) */}
              <div className="flex w-full flex-col items-stretch gap-3 sm:ml-auto sm:w-auto sm:flex-row sm:items-center">
                <SpotStepper
                  value={getSpots(classItem.id)}
                  onChange={(nextValue) => setSpots(classItem.id, nextValue)}
                />
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center rounded-full border-[1.5px] border-black px-3.5 py-1.5 text-sm font-medium transition hover:bg-black hover:text-white sm:w-auto"
                >
                  Book {getSpots(classItem.id)}
                </a>
              </div>
            </li>
          ))}

          {visibleClasses.length === 0 && (
            <li className="border-t border-[#d8d8d8] py-4 text-gray-600">
              No classes on this day.
            </li>
          )}
        </ul>
      </section>

      {/* --- Trainers (mapped from data/trainers.js) --- */}
      <section
        id="trainers"
        className="py-8 sm:py-10 md:py-12"
        aria-labelledby="team-title"
      >
        <h2
          id="team-title"
          className="mb-5 text-[clamp(1.35rem,4vw,1.85rem)] font-bold"
        >
          Our team
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trainers.map((trainer) => (
            <article key={trainer.id} className="min-w-0">
              <img
                src={trainer.photo}
                alt={`Photo of ${trainer.name}`}
                className="mb-3 aspect-square w-full max-w-full rounded-md bg-[#e4e4e4] object-cover"
              />
              <h3 className="text-[1.05rem] font-bold">{trainer.name}</h3>
              <span className="mt-1 mb-2 inline-block rounded-full bg-[#c6d947] px-2.5 py-0.5 text-xs font-semibold">
                {trainer.specialty}
              </span>
              <p className="text-[0.92rem] text-gray-600">{trainer.bio}</p>
            </article>
          ))}
        </div>
      </section>

      {/* --- Memberships --- */}
      <section
        id="prices"
        className="py-8 sm:py-10 md:py-12"
        aria-labelledby="plans-title"
      >
        <h2
          id="plans-title"
          className="mb-5 text-[clamp(1.35rem,4vw,1.85rem)] font-bold"
        >
          Memberships
        </h2>
        {/* equal width cards: 1 col mobile, 3 from md */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-stretch">
          {memberships.map((plan) => (
            <article
              key={plan.id}
              className={`relative flex w-full min-w-0 flex-col gap-2.5 rounded-[10px] bg-white p-5 pt-7 sm:p-6 ${
                plan.popular
                  ? "border-2 border-[#c6d947]"
                  : "border-[1.5px] border-[#d8d8d8]"
              }`}
            >
              {plan.popular && (
                <p className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c6d947] px-2.5 py-0.5 text-xs font-bold whitespace-nowrap">
                  Most popular
                </p>
              )}
              <h3 className="text-[1.05rem] font-bold">{plan.name}</h3>
              <p className="text-[1.65rem] font-bold tracking-tight">
                {plan.price}&euro;
                <span className="text-[0.95rem] font-medium text-gray-600">
                  /month
                </span>
              </p>
              <ul className="mb-4 flex-1 space-y-2">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="relative pl-5 text-[0.95rem] text-gray-600 before:absolute before:left-0 before:font-bold before:text-black before:content-['✓']"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-auto block rounded-full px-4 py-2.5 text-center text-sm font-semibold transition hover:-translate-y-px ${
                  plan.popular
                    ? "bg-[#c6d947] text-black hover:bg-[#b5c73a]"
                    : "border-[1.5px] border-black bg-white text-black hover:bg-black hover:text-white"
                }`}
              >
                Choose {plan.name}
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* --- Contact form (no backend yet, so we just prevent reload) --- */}
      <section
        id="contact"
        className="flex flex-col items-center py-8 pb-14 text-center sm:py-10 sm:pb-16 md:py-12"
        aria-labelledby="contact-title"
      >
        <h2
          id="contact-title"
          className="mb-5 w-full text-[clamp(1.35rem,4vw,1.85rem)] font-bold"
        >
          Come meet us
        </h2>
        <form
          className="flex w-full max-w-md min-w-0 flex-col gap-4 text-left"
          action="#"
          method="get"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-semibold">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="box-border w-full max-w-full rounded-lg border border-[#d8d8d8] bg-white px-3.5 py-2.5 focus:outline-2 focus:outline-[#c6d947] focus:outline-offset-1"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="box-border w-full max-w-full rounded-lg border border-[#d8d8d8] bg-white px-3.5 py-2.5 focus:outline-2 focus:outline-[#c6d947] focus:outline-offset-1"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-semibold">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="box-border min-h-28 w-full max-w-full resize-y rounded-lg border border-[#d8d8d8] bg-white px-3.5 py-2.5 focus:outline-2 focus:outline-[#c6d947] focus:outline-offset-1"
            />
          </div>
          <button
            type="submit"
            className="mx-auto w-full max-w-xs rounded-full bg-[#c6d947] px-6 py-2.5 text-sm font-semibold text-black transition hover:-translate-y-px hover:bg-[#b5c73a] sm:w-fit sm:max-w-none"
          >
            Send
          </button>
        </form>
      </section>
    </div>
  );
}
