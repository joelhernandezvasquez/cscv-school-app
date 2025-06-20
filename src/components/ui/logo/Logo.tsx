
import Image from "next/image";

interface Props{
    width?:number,
    height?:number
}

const Logo = ({width,height}:Props) => {
  return (
      <Image
            src={"/logo.jpg"}
            width={width ?? 55}
            height={height ?? 55}
            alt=""
    />
  )
}

export default Logo