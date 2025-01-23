import ConfigForm from "@/components/configs-form";
import WaveBackground from "@/components/wave-background";

export default async function HomePage() {
  return (
    <>
      <WaveBackground />
      <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-around ">
        <ConfigForm />
      </div>
    </>
  );
}
