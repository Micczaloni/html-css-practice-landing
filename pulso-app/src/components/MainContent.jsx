const MainContent = () => {
  return (
    <div className="mx-auto w-full max-w-[920px] px-4 ">
      <section>
        <h2 className="text-2xl font-bold">A studio, three commitments</h2>
        <div className="flex gap-4 ">
          <article className="border-1 border-gray-300 rounded-xl bg-white p-4">
            <h3 className="font-bold text-xl">Personalised training</h3>
            <p>Plans adapted to your level and goals.</p>
          </article>
          <article className="border-1 border-gray-300 rounded-xl bg-white p-4">
            <h3 className="font-bold text-xl">Real community</h3>
            <p>A welcoming space where progress is shared.</p>
          </article>
          <article className="border-1 border-gray-300 rounded-xl bg-white p-4">
            <h3 className="font-bold text-xl">Flexible schedule</h3>
            <p>Morning, lunch and evening sessions.</p>
          </article>
        </div>
      </section>

      {/* <section
        id="classes"
        class="schedule wrap"
        aria-labelledby="schedule-title"
      >
        <h2 id="schedule-title">Class schedule</h2>

        <div class="days" role="tablist" aria-label="Week days">
          <button
            type="button"
            class="days__tab days__tab--active"
            aria-selected="true"
          >
            Mon
          </button>
          <button
            type="button"
            class="days__tab"
            aria-selected="false"
            disabled
          >
            Tue
          </button>
          <button
            type="button"
            class="days__tab"
            aria-selected="false"
            disabled
          >
            Wed
          </button>
          <button
            type="button"
            class="days__tab"
            aria-selected="false"
            disabled
          >
            Thu
          </button>
          <button
            type="button"
            class="days__tab"
            aria-selected="false"
            disabled
          >
            Fri
          </button>
          <button
            type="button"
            class="days__tab"
            aria-selected="false"
            disabled
          >
            Sat
          </button>
        </div>

        <ul class="timetable">
          <li class="timetable__row">
            <time datetime="07:00">07:00</time>
            <span class="timetable__name">HIIT</span>
            <span class="timetable__coach">Marta R.</span>
            <span class="timetable__level">Intermediate</span>
            <a class="btn btn--small" href="#contact">
              Book
            </a>
          </li>
          <li class="timetable__row">
            <time datetime="12:30">12:30</time>
            <span class="timetable__name">Yoga</span>
            <span class="timetable__coach">Sofia L.</span>
            <span class="timetable__level">All levels</span>
            <a class="btn btn--small" href="#contact">
              Book
            </a>
          </li>
          <li class="timetable__row">
            <time datetime="18:30">18:30</time>
            <span class="timetable__name">Strength</span>
            <span class="timetable__coach">Alex K.</span>
            <span class="timetable__level">Intermediate</span>
            <a class="btn btn--small" href="#contact">
              Book
            </a>
          </li>
        </ul>
      </section>
      <section id="trainers" class="team wrap" aria-labelledby="team-title">
        <h2 id="team-title">Our team</h2>
        <div class="team__grid">
          <article class="coach">
            <div
              class="coach__photo"
              role="img"
              aria-label="Photo placeholder for Marta R."
            ></div>
            <h3>Marta R.</h3>
            <span class="tag">HIIT</span>
            <p>High-energy sessions focused on conditioning.</p>
          </article>
          <article class="coach">
            <div
              class="coach__photo"
              role="img"
              aria-label="Photo placeholder for Sofia L."
            ></div>
            <h3>Sofia L.</h3>
            <span class="tag">Yoga</span>
            <p>Calm, precise flows for mobility and recovery.</p>
          </article>
          <article class="coach">
            <div
              class="coach__photo"
              role="img"
              aria-label="Photo placeholder for Alex K."
            ></div>
            <h3>Alex K.</h3>
            <span class="tag">Strength</span>
            <p>Progressive lifting with clear technique cues.</p>
          </article>
          <article class="coach">
            <div
              class="coach__photo"
              role="img"
              aria-label="Photo placeholder for Nina P."
            ></div>
            <h3>Nina P.</h3>
            <span class="tag">Pilates</span>
            <p>Core control and posture for everyday strength.</p>
          </article>
        </div>
      </section>
      <section id="prices" class="plans wrap" aria-labelledby="plans-title">
        <h2 id="plans-title">Memberships</h2>
        <div class="plans__row">
          <article class="plan">
            <h3>Basic</h3>
            <p class="plan__price">
              49&euro;<span>/month</span>
            </p>
            <ul class="plan__list">
              <li>8 classes / month</li>
              <li>Access to open gym</li>
              <li>Locker room</li>
            </ul>
            <a class="btn btn--ghost" href="#contact">
              Choose Basic
            </a>
          </article>
          <article class="plan plan--popular">
            <p class="plan__badge">Most popular</p>
            <h3>Pro</h3>
            <p class="plan__price">
              79&euro;<span>/month</span>
            </p>
            <ul class="plan__list">
              <li>Unlimited classes</li>
              <li>Priority booking</li>
              <li>1 guest pass / month</li>
              <li>Locker room</li>
            </ul>
            <a class="btn btn--accent" href="#contact">
              Choose Pro
            </a>
          </article>
          <article class="plan">
            <h3>Premium</h3>
            <p class="plan__price">
              119&euro;<span>/month</span>
            </p>
            <ul class="plan__list">
              <li>Everything in Pro</li>
              <li>2 PT sessions / month</li>
              <li>Nutrition check-in</li>
              <li>Recovery zone</li>
            </ul>
            <a class="btn btn--ghost" href="#contact">
              Choose Premium
            </a>
          </article>
        </div>
      </section>
      <section
        id="contact"
        class="contact wrap"
        aria-labelledby="contact-title"
      >
        <h2 id="contact-title">Come meet us</h2>
        <form class="contact__form" action="#" method="get">
          <div class="field">
            <label for="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autocomplete="name"
              required
            ></input>
          </div>
          <div class="field">
            <label for="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
            ></input>
          </div>
          <div class="field">
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button class="btn btn--accent" type="submit">
            Send
          </button>
        </form>
      </section> */}
    </div>
  );
};

export default MainContent;
