import heroImg from "../assets/hero-studio.webp";

const Hero = () => {
  // id="home" so the logo link can jump back to the top
  return (
    <section
      id="home"
      className="mx-auto flex w-full max-w-[920px] flex-col items-center gap-4 px-4 py-10 text-center sm:py-14 md:py-16"
    >
      <h1 className="max-w-full text-[clamp(1.85rem,6vw,3.15rem)] leading-tight font-bold tracking-[-0.03em]">
        Train with purpose.
        <br />
        Move with your community.
      </h1>
      <p className="max-w-xl px-1 text-base text-gray-600 sm:text-[1.05rem]">
        Classes, trainers and plans to fit training into your life.
      </p>

      <img
        src={heroImg}
        alt="Bright PULSO fitness studio with mats and training equipment"
        className="mt-2 aspect-[16/9] w-full max-w-full rounded-[10px] object-cover"
      />

      {/* stacked on phone, side by side from sm up */}
      <div className="mt-2 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
        <a
          href="#classes"
          className="inline-flex w-full items-center justify-center rounded-full bg-[#c6d947] px-5 py-2.5 text-[0.95rem] font-semibold text-black transition hover:-translate-y-px hover:bg-[#b5c73a] sm:w-auto"
        >
          See schedule
        </a>
        <a
          href="#prices"
          className="inline-flex w-full items-center justify-center rounded-full border-[1.5px] border-black bg-white px-5 py-2.5 text-[0.95rem] font-semibold text-black transition hover:-translate-y-px hover:bg-black hover:text-white sm:w-auto"
        >
          See memberships
        </a>
      </div>
    </section>
  );
};

export default Hero;
