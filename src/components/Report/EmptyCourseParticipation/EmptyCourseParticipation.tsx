const EmptyCourseParticipation = () => {
  return (
    <section className="mt-4 flex flex-col items-center text-center gap-3 py-12 px-6 rounded-2xl shadow-[0px_2px_6px_0px_rgba(144,146,148,0.20)] bg-white">
      <span className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F5F8FF] text-[#5655D7]">
        <svg
          className="w-7.5 h-7.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z"></path>
          <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20"></path>
        </svg>
      </span>
      <h3 className="font-bold text-[#11141A]">Pick a course to get started</h3>

      <p className="text-[#4D5154] text-[1rem] w-80 font-medium">
        Choose a course or retreat above to see who&apos;s completed it and
        who&apos;s still on your call list. Only active students are counted.
      </p>
    </section>
  );
};

export default EmptyCourseParticipation;
