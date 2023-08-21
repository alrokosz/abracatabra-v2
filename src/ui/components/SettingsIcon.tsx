import { Settings } from "react-feather";
import Link from "next/link";

export default function SettingsIcon() {
  return (
    <button className="bg-inherit">
      <Link href={"/settings"}>
        <Settings />
      </Link>
    </button>
  );
}
