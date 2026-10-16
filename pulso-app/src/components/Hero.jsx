const Hero = () => {
  return (
    <section className="px-4 text-center flex flex-col gap-4 py-16">
      <h1 className="font-bold text-4xl">
        Train with purpose.
        <br /> Move with your community.
      </h1>
      <p className="">
        Classes, trainers and plans to fit training into your life.
      </p>
      <div className="flex gap-4 justify-center">
        <button type="button">See schedule</button>
        <button type="button">See memberships</button>
      </div>
    </section>
  );
};

export default Hero;
