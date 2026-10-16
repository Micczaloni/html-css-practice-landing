const Hero = () => {
  return (
    <section
      id="home"
      className="mx-auto flex w-full max-w-[920px] flex-col items-center gap-4 px-4 py-14 text-center sm:py-16"
    >
      <h1 className="text-[clamp(2rem,5vw,3.15rem)] leading-tight font-bold tracking-[-0.03em]">
        Train with purpose.
        <br />
        Move with your community.
      </h1>
      <p className="max-w-xl text-[1.05rem] text-gray-600">
        Classes, trainers and plans to fit training into your life.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <a
          href="#classes"
          className="inline-flex rounded-full bg-[#c6d947] px-5 py-2.5 text-[0.95rem] font-semibold text-black transition hover:-translate-y-px hover:bg-[#b5c73a]"
        >
          See schedule
        </a>
        <a
          href="#prices"
          className="inline-flex rounded-full border-[1.5px] border-black bg-white px-5 py-2.5 text-[0.95rem] font-semibold text-black transition hover:-translate-y-px hover:bg-black hover:text-white"
        >
          See memberships
        </a>
      </div>
    </section>
  );
};

export default Hero;
