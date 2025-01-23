import Link from "next/link";
import { notFound } from "next/navigation";
import { getClientData } from "@/services/api";
import CircleChart from "@/components/circle-chart";
import {
  remainingTimeCalculation,
  volumeCalculation,
} from "@/components/calculation";

export default async function DetailsPage({ params }) {
  const uuid = params.uuid;

  if (!uuid) {
    notFound();
  }

  let clientData;
  try {
    const { clientData: data } = await getClientData(uuid);
    clientData = data;
  } catch (error) {
    console.error("Failed to fetch client data:", error);
    notFound();
  }

  if (!clientData?.obj || clientData.obj.length === 0) {
    notFound();
  }

  const { enable, email, down: download, up: upload, total } = clientData.obj[0];
  const { totalUsed, totalVolume, volumePercentage } = volumeCalculation(
    download,
    upload,
    total,
  );
  const expiryTime = clientData.obj[0]?.expiryTime;
  const { duration, percentageTime } = remainingTimeCalculation(expiryTime);

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-[300px] rounded-2xl bg-[#151F31] shadow-2xl">
        <div className="flex flex-col items-center gap-6 p-6">
          <div className="flex items-center gap-2">
            <div className={`h-[10px] w-[10px] animate-pulse rounded-full ${enable ? "bg-[#008771]" : "bg-red-500"}`} />
            <h2 className="text-2xl font-medium text-white">{email}</h2>
          </div>

          <div className="w-full flex flex-col justify-center items-center ">
            <CircleChart
              value={volumePercentage}
              label={`Usage:  ${totalUsed}GB  /  ${totalVolume}GB`}
            />
            <CircleChart
              value={percentageTime}
              label={`Duration: ${duration}`}
            />
          </div>

          <Link
            href={`/${uuid}/config`}
            className="w-full rounded-full border border-[#F37B24] bg-[#f37a2430] py-2 text-center text-sm font-medium transition-colors hover:bg-[#f37a2440]"
          >
            Show QR Code
          </Link>
        </div>
      </div>
    </div>
  );
}