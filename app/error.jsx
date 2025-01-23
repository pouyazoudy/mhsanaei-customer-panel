"use client";

import WaveBackground from "@/components/wave-background";

export default function Error({ error, reset }) {
  return (
    <>
      <WaveBackground />
      <div className="fixed inset-0 z-[1010] mx-auto flex min-h-screen max-w-[300px] flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center rounded-2xl bg-[#151F31] px-8 py-6 text-center">
          <h1 className="text-nowrap text-4xl font-bold text-red-500">
            An error occurred
          </h1>
          <p className="mt-4">
            Sorry, something went wrong.
          </p>
          <p>Please try again later.</p>
          <button
            onClick={() => reset()}
            className={`mt-6 flex h-12 w-[190px] items-center justify-center rounded-full border-[1px] border-[#0a7557] bg-[#0a75575c] font-bold text-white`}
          >
            Try Again
          </button>
        </div>
      </div>
    </>
  );
}
