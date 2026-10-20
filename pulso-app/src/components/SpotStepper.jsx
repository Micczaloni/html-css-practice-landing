// Controlled component: parent owns the number (value),
// we only show it and call onChange when +/- is clicked.
const SpotStepper = ({ value, onChange, min = 1, max = 8 }) => {
  const decrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const increase = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div
      className="inline-flex items-center gap-2"
      aria-label="Number of spots to book"
    >
      <button
        type="button"
        onClick={decrease}
        disabled={value <= min}
        aria-label="Decrease spots"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-black text-sm font-bold transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-black"
      >
        −
      </button>
      <span className="min-w-6 text-center text-sm font-semibold tabular-nums">
        {value}
      </span>
      <button
        type="button"
        onClick={increase}
        disabled={value >= max}
        aria-label="Increase spots"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-black text-sm font-bold transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-black"
      >
        +
      </button>
    </div>
  );
};

export default SpotStepper;
