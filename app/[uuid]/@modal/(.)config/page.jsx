import ModalBackdrop from "@/components/modal-backdrop";
import QrCodeSection from "@/components/qr-code-section";
import { Suspense } from "react";

export default function InterceptedConfigPage({ params }) {
  return (
    <>
      <ModalBackdrop />

      <dialog
        className="fixed inset-0 z-[9999] flex w-[260px] flex-col items-center rounded-2xl bg-[#111929] py-8 shadow-lg"
        open
      >
        <div className="flex w-full justify-between px-4 pb-4 text-white">
          <span>QR Code</span>
          <span></span>
        </div>
        <div className="h-[1px] w-full bg-white/20"></div>
        <Suspense
          fallback={
            <div className="flex h-[200px] w-[200px] items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-transparent border-t-[#fff]"></div>
            </div>
          }
        >
          <QrCodeSection uuid={params.uuid} />
        </Suspense>
      </dialog>
    </>
  );
}
