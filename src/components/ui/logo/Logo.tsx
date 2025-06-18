
import Image from "next/image";

const Logo = () => {
  return (
      <Image
            src={"/logo.jpg"}
            width={50}
            height={50}
            alt=""
           />
  )
}

export default Logo