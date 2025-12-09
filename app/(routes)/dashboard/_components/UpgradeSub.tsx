import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
const UpgradeSub = () => {
  return (
    <div className="mt-8 flex flex-col border-2 rounded-2xl items-center " >
        <Image src={'/logo.png'} width={70} height={70} alt="logo" className="mt-2"></Image>
        <h2 className="font-game text-3xl">Upgrade to Pro</h2>
        <p className="text-gray-500 font-game text-xl text-center">Join pro membership and get exclusive access to all courses</p>
        <Link href={'/pricing'} >
        <Button className="font-game text-2xl cursor-pointer m-4"  size={'lg'} variant={"pixel"}>Upgrade</Button>
        </Link>
    </div>
  )
}

export default UpgradeSub