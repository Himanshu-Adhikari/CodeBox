import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
const Hero = () => {
  return (
    <div className="w-full relative h-screen overflow-hidden cursor-pointer">
      <Image src={'/banner.gif'} alt="banner" width={1000} height={1000} loading="eager" className="w-full h-full object-cover absolute inset-0"></Image>
      <div className="absolute w-full flex flex-col items-center mt-24"><h2 className="font-game font-bold text-7xl">Start Your</h2>
      <h1 className="font-bold font-game text-9xl text-yellow-300 hover:scale-120 transition translate-0.5 "
      style={{textShadow:"4px 4px 0 #000, -2px -2px 0 #000, -2px -2px 0 #000, -2px -2px 0 #000"}}>Coding Journey </h1>
      
      <h2 className="font-game text-4xl mt-4">Beginner or seasoned pro — this is your next must-try challenge!</h2>
      <Link href={'/sign-in'}>
      <Button className="font-game text-3xl p-4 mt-7" variant={"pixel"}>Get Started</Button>
      </Link>
      </div>

    </div>
  )
}

export default Hero