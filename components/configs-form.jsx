import parseConfigs from "@/utils/parse-configs";
import ConfigsFormStatus from "./configs-form-status";

export default function ConfigsForm() {
  return (
    <form
      action={parseConfigs}
      className="m-4 mx-auto flex w-[300px] flex-col items-center justify-evenly gap-4 rounded-2xl bg-[#151F31] px-12 py-12 shadow-2xl"
    >
      <label
        htmlFor="config-input"
        id="config-label"
        className="mx-4 mb-4 text-center text-2xl font-extrabold"
      >
        Please enter your config
      </label>
      <input
        id="config-input"
        type="text"
        aria-describedby="config-label"
        className="h-12 w-[240px] rounded-full px-6 text-black outline-none"
        placeholder="Enter VMess URL..."
        name="vmessUrl"
      />
      <ConfigsFormStatus />
    </form>
  );
}
