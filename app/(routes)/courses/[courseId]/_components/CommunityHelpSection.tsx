import { Button } from "@/components/ui/button"

const CommunityHelpSection = () => {
  return (
    <div className="font-game border-4 p-4 rounded-2xl mt-7 flex flex-col items-center">
        <h2 className="text-3xl">Need help?</h2>
        <p className="text-2xl">
            Ask question in our Community..
        </p>
        <Button className="text-2xl" variant={"pixel"} >Go to Community</Button>
    </div>
  )
}

export default CommunityHelpSection