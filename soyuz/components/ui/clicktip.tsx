import { useState } from "react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"; // Import HoverCard components
import { Button } from "@/components/ui/button"; // Assuming Button is from your UI library

export default function ClickTip() {
  const [isOpen, setIsOpen] = useState(false); // State to control the visibility of the HoverCard

  const handleToggle = () => {
    setIsOpen((prev) => !prev); // Toggle the card visibility
  };

  return (
    <div>
      <Button onClick={handleToggle}>Click Me</Button>

      <HoverCard open={isOpen} onOpenChange={setIsOpen}> {/* Control open/close with state */}
        <HoverCardTrigger asChild>
          <Button>HoverCard Trigger</Button> {/* This could be any clickable element */}
        </HoverCardTrigger>
        <HoverCardContent className="w-72 p-4 bg-gray-800 text-white">
          {/* Content inside the HoverCard */}
          <p>This is a clickable HoverCard content!</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}