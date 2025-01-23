"use client";
import { useFormStatus } from "react-dom";

export default function ConfigsFormStatus() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`h-12 ${pending ? "w-12" : "w-[240px]"} flex items-center justify-center rounded-full border-[1px] border-[#0a7557] bg-[#0a75575c] font-bold text-white`}
    >
      {pending ? (
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-transparent border-t-[#fff]"></div>
      ) : (
        "Submit"
      )}
    </button>
  );
}
