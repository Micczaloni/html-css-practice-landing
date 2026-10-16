const Hero = () => {
  return (
    <section id="home" className="flex flex-col gap-4 px-4 py-16 text-center">
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
