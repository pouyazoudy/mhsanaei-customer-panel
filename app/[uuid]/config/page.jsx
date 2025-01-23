import QRCode from "react-qr-code";
import { notFound } from "next/navigation";
import { getClientData } from "@/services/api";

export default async function ConfigPage({ params }) {
  const uuid = params.uuid;

  if (!uuid) {
    notFound();
  }

  let clientData, inboundData;
  try {
    const response = await getClientData(uuid);
    clientData = response.clientData;
    inboundData = response.inboundData;
  } catch (error) {
    console.error("Failed to fetch client data:", error);
    notFound();
  }

  if (!clientData?.obj || clientData.obj.length === 0) {
    notFound();
  }

  const { email } = clientData.obj[0];

  return (
    <div className="flex h-screen items-center justify-center bg-[#050A13]/80">
      <div className="flex w-[260px] flex-col items-center justify-center rounded-2xl bg-[#111929] py-8">
        <div className="space-x-24 px-4 pb-4 text-white">
          <span>QR Code</span>
        </div>
        <div className="h-[1px] w-full bg-white/20"></div>
        <div className="flex flex-col items-center justify-center">
          <div className="mx-auto mt-6 w-[200px] rounded-full border-[1px] border-[#3ad3b97c] bg-[#112421] text-center text-[#3ad3ba]">
            {email}
          </div>
          <div className="mt-4 flex h-[180px] w-[180px] items-center justify-center rounded-2xl border-[1px] border-white/20">
            <QRCode value={inboundData.vmessConfig} size={152} />
          </div>
        </div>
      </div>
    </div>
  );
}