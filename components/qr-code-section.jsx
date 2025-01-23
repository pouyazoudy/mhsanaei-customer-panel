import { getClientData } from "@/services/api";
import { notFound } from "next/navigation";
import QRCode from "react-qr-code";

export default async function QrCodeSection({ uuid }) {
  if (!uuid) {
    notFound();
  }

  let clientData, inboundData;
  try {
    const response = await getClientData(uuid);
    clientData = response.clientData;
    inboundData = response.inboundData;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    notFound();
  }

  if (!clientData?.obj?.[0]?.email || !inboundData?.vmessConfig) {
    notFound();
  }

  return (
    <div className="mt-6 flex flex-col items-center">
      <div className="w-[200px] rounded-full border border-[#3ad3b97c] bg-[#112421] py-2 text-center text-[#3ad3ba]">
        {clientData.obj[0].email}
      </div>
      <div className="mt-4 flex h-[180px] w-[180px] items-center justify-center rounded-2xl border border-white/20">
        <QRCode 
          value={inboundData.vmessConfig} 
          size={152}
        />
      </div>
    </div>
  );
}