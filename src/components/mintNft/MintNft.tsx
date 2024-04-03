import Link from "next/link"
import "./mintNft.css"

type Props = {}

export default function MintNft({}: Props) {
  return (
    <Link href='/mint'>
    <div className="mintNftButton">
        MINT
    </div>
    </Link>
  )
}