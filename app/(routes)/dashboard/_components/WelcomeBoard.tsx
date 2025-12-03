import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const WelcomeBoard = () => {
    const {user}=useUser();
  return (
    <div className="flex gap-3 items-center">
      <Image
        src="/gamer.gif"
        alt="gamer"
        height={120}
        width={120}
      />
      <h2 className="font-game text-3xl p-2 border bg-zinc-800 rounded-3xl rounded-bl-none">
        Welcome back, <span className="text-amber-400">{user?.fullName} ! </span>
Gear up — it’s time to level up and create greatness 🎮⚡</h2>
    </div>
  )
}

export default WelcomeBoard;
