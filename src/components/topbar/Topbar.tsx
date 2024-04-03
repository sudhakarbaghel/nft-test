import { logoSrc } from '@/assets'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import "./topbar.css"
type Props = {}

export default function Topbar({}: Props) {
  return (
    <div className="topbar">
    <div className="logoTitle">
      <h1>NFTea</h1>
      <img src={logoSrc} alt="logo" />
    </div>
    <div>
      <ConnectButton />
    </div>
    </div>
  )
}