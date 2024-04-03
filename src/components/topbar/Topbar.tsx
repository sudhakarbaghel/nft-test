import { logoSrc } from "@/assets";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./topbar.css";
import Link from "next/link";
type Props = {};

export default function Topbar({}: Props) {
  return (
    <div className="topbar">
      <Link href="/">
        <div className="logoTitle">
          <h1>NFTea</h1>
          <img src={logoSrc} alt="logo" />
        </div>
      </Link>

      <div>
        <ConnectButton />
      </div>
    </div>
  );
}
