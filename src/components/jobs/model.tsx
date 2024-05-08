"use client";
import { useState } from "react";

import { Modal, Card, Button } from "@rewind-ui/core";
import { XMarkIcon } from "@heroicons/react/24/outline";

import CreateForm from "./forms/create-form";

export default function CreateModel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal
        size="md"
        open={open}
        position="center"
        onClose={() => setOpen(false)}
      >
        <Card size="sm" className="w-full">
          <Card.Header
            className="bg-gray-50/50 font-medium py-6 px-6"
            actions={
              <Button
                onClick={() => setOpen(false)}
                size="xs"
                color="gray"
                icon={true}
              >
                <XMarkIcon />
              </Button>
            }
          >
           <p className=" text-2xl font-bold text-center">Create a job</p>
          </Card.Header>
          <Card.Body className="space-y-3">
            <CreateForm />
          </Card.Body>
          <Card.Footer className="justify-end space-x-2 bg-gray-50/50">
           
          </Card.Footer>
        </Card>
      </Modal>

      <Button onClick={() => setOpen(true)} color="green">
        Create job +
      </Button>
    </>
  );
}
