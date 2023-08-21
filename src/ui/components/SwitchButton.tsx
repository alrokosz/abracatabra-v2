import * as Switch from "@radix-ui/react-switch";
import { useState } from "react";

export default function SwitchButton() {
  const [isChecked, setIsChecked] = useState(false);
  console.log({ isChecked });
  const thumbColor = `bg-slate-600 ${
    isChecked ? "bg-red-700 translate-x-5" : ""
  }`;
  const rootColor = isChecked ? "bg-green-500" : "bg-white";

  return (
    // <form>
    <div style={{ display: "flex", alignItems: "center" }}>
      <label
        className="Label"
        htmlFor="airplane-mode"
        style={{ paddingRight: 15 }}
      >
        <span className={`${isChecked ? "text-green-500" : ""}`}>On</span> /{" "}
        <span className={`${!isChecked ? "text-green-500" : ""}`}>Off</span>
      </label>
      <Switch.Root
        className={`w-11 h-6 rounded-full relative border-green-500 border-2 ${rootColor}`}
        id="airplane-mode"
        defaultChecked={false}
        onCheckedChange={() => setIsChecked((isChecked) => !isChecked)}
      >
        <Switch.Thumb
          className={`block w-4 h-4 rounded-full mx-0.5 transition ${thumbColor}`}
        />
      </Switch.Root>
    </div>
    // </form>
  );
}
