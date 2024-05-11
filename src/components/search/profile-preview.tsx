"use client";

import { Drawer, Card, Button } from "@rewind-ui/core";
import { X } from "lucide-react";
import { useSideDrawer } from "@/context/side-draw-context";
import { useEffect, useState } from "react";
import type { profile } from "@/server/db/schema";

export default function ProfilePreview() {
  const { id, open, setOpen } = useSideDrawer();
  const [data, setData] = useState<typeof profile | null>(null);

  /**
   * @todo
   * define the typedef for the profile "data" here...
   */
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/profile?query=${id}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await res.json();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setData(data);
    };

    void fetchData();
  }, [id, open]);

  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Card className="w-full" bordered={false}>
          <Card.Header className="bg-slate-50">
            <h3 className="text-lg font-medium text-slate-800">Login</h3>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setOpen(false)}
              icon
            >
              <X size={16} />
            </Button>
          </Card.Header>

          <Card.Body>
            <div className="mx-auto flex flex-col space-y-4 md:w-[30rem]">
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          </Card.Body>

          <Card.Footer>
            <div className="flex w-full space-x-2">
              <Button
                className="w-full"
                color="black"
                onClick={() => setOpen(false)}
              >
                Login
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </Drawer>
    </>
  );
}
