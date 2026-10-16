import { useState } from "react";
import { DAYS, classes } from "../data/classes";
import { trainers } from "../data/trainers";
import { memberships } from "../data/memberships";

const MainContent = () => {
  const [selectedDay, setSelectedDay] = useState("Mon");

  const visibleClasses = classes.filter(
    (classItem) => classItem.day === selectedDay,
  );

  return (
    <div className="mx-auto w-full max-w-[920px] px-4">
      <section className="py-10 sm:py-12">
        <h2 className="mb-5 text-[clamp(1.45rem,3vw,1.85rem)] font-bold">
          A studio, three commitments
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <article className="rounded-[10px] border border-[#d8d8d8] bg-white p-5">
            <h3 className="mb-1.5 text-[1.05rem] font-bold">
              Personalised training
            </h3>
            <p className="text-[0.95rem] text-gray-600">
              Plans adapted to your level and goals.
            </p>
          </article>
          <article className="rounded-[10px] border border-[#d8d8d8] bg-white p-5">
            <h3 className="mb-1.5 text-[1.05rem] font-bold">Real community</h3>
            <p className="text-[0.95rem] text-gray-600">
              A welcoming space where progress is shared.
            </p>
          </article>
          <article className="rounded-[10px] border border-[#d8d8d8] bg-white p-5">
            <h3 className="mb-1.5 text-[1.05rem] font-bold">
              Flexible schedule
            </h3>
            <p className="text-[0.95rem] text-gray-600">
              Morning, lunch and evening sessions.
            </p>
          </article>
        </div>
      </section>

      <section id="classes" className="py-10 sm:py-12" aria-labelledby="schedule-title">
        <h2
          id="schedule-title"
          className="mb-5 text-[clamp(1.45rem,3vw,1.85rem)] font-bold"
        >
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
                className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
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
              className={`flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-[#d8d8d8] py-4 ${
                index === 0 ? "border-t" : ""
              }`}
            >
              <time
                dateTime={classItem.time}
                className="min-w-14 font-semibold"
              >
                {classItem.time}
              </time>
              <span className="min-w-20 font-bold">{classItem.name}</span>
              <span className="text-[0.95rem] text-gray-600">
                {classItem.coach}
              </span>
              <span className="text-[0.95rem] text-gray-600">
                {classItem.level}
              </span>
              <a
                href="#contact"
                className="ml-auto inline-flex rounded-full border-[1.5px] border-black px-3.5 py-1.5 text-sm font-medium transition hover:bg-black hover:text-white"
              >
                Book
              </a>
            </li>
          ))}

          {visibleClasses.length === 0 && (
            <li className="border-t border-[#d8d8d8] py-4 text-gray-600">
              No classes on this day.
            </li>
          )}
        </ul>
      </section>

      <section id="trainers" className="py-10 sm:py-12" aria-labelledby="team-title">
        <h2
          id="team-title"
          className="mb-5 text-[clamp(1.45rem,3vw,1.85rem)] font-bold"
        >
          Our team
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trainers.map((trainer) => (
            <article key={trainer.id}>
              <img
                src={trainer.photo}
                alt={`Photo of ${trainer.name}`}
                className="mb-3 aspect-square w-full rounded-md bg-[#e4e4e4] object-cover"
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

      <section id="prices" className="py-10 sm:py-12" aria-labelledby="plans-title">
        <h2
          id="plans-title"
          className="mb-5 text-[clamp(1.45rem,3vw,1.85rem)] font-bold"
        >
          Memberships
        </h2>
        <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
          {memberships.map((plan) => (
            <article
              key={plan.id}
              className={`relative flex flex-1 flex-col gap-2.5 rounded-[10px] bg-white p-6 pt-7 ${
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

      <section
        id="contact"
        className="flex flex-col items-center py-10 pb-16 text-center sm:py-12"
        aria-labelledby="contact-title"
      >
        <h2
          id="contact-title"
          className="mb-5 w-full text-[clamp(1.45rem,3vw,1.85rem)] font-bold"
        >
          Come meet us
        </h2>
        <form
          className="flex w-full max-w-md flex-col gap-4 text-left"
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
              className="w-full rounded-lg border border-[#d8d8d8] bg-white px-3.5 py-2.5 focus:outline-2 focus:outline-[#c6d947] focus:outline-offset-1"
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
              className="w-full rounded-lg border border-[#d8d8d8] bg-white px-3.5 py-2.5 focus:outline-2 focus:outline-[#c6d947] focus:outline-offset-1"
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
              className="min-h-28 w-full resize-y rounded-lg border border-[#d8d8d8] bg-white px-3.5 py-2.5 focus:outline-2 focus:outline-[#c6d947] focus:outline-offset-1"
            />
          </div>
          <button
            type="submit"
            className="mx-auto w-fit rounded-full bg-[#c6d947] px-6 py-2.5 text-sm font-semibold text-black transition hover:-translate-y-px hover:bg-[#b5c73a]"
          >
            Send
          </button>
        </form>
      </section>
    </div>
  );
};

export default MainContent;
