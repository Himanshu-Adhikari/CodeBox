import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const InviteFriend = () => {
  return (
    <div className="flex flex-col items-center mt-8 p-2 border rounded-2xl">
        <Image src={'/mail.png'} alt="mail" width={60} height={60}></Image>
        <h2 className="text-3xl font-game">Invite your Friend</h2>
        <p className="font-game">Enjoying your time here? Invite your friends and grow the GhostBox community together!</p>
        <div className="flex mt-5 items-center gap-4">
            <Input placeholder="Enter Friend's Email .. " className="min-w-sm"></Input>
            <Button variant={'pixel'} className="font-game text-3xl">Invite</Button>
        </div>
    </div>
  )
}

export default InviteFriend