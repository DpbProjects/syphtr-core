"use client";

import { useSideDrawer } from "@/context/side-draw-context"; // Import the context hook
import { Button } from "@rewind-ui/core";

interface DrawToggleButtonProps {
  id: number;
}

export default function DrawerToggleButton({ id }: DrawToggleButtonProps) {
  // Access the context
  const { open, setOpen, setId } = useSideDrawer();

  // Toggle the state when the button is clicked
  const toggleDrawer = async () => {
    setOpen(!open);
    setId(id);
  };

  return (
    <Button onClick={toggleDrawer}>
      {/* {open ? "Close Drawer" : "Open Drawer"} */}
      View profile
    </Button>
  );
}
