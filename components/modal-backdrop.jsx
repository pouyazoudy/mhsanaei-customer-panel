"use client";

import { useRouter } from "next/navigation";

export default function ModalBackdrop() {
  const router = useRouter();

  return (
    <div
      className="absolute left-0 top-0 flex h-[100%] w-[100%] items-center justify-center bg-black/85 z-[100]"
      onClick={router.back}
    />
  );
}
