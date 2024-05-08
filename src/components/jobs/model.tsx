"use client";
import { useState, type ReactNode } from "react";

import { Modal, Card, Button } from "@rewind-ui/core";
import { XMarkIcon } from "@heroicons/react/24/outline";

import CreateForm from "./forms/create-form";

interface ModelProps {
  content: ReactNode;
}

export default function CreateModel({ content }: ModelProps) {
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
            className="bg-gray-50/50 px-6 py-6 font-medium"
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
            <p className=" text-center text-2xl font-bold">Create a job</p>
          </Card.Header>
          <Card.Body className="space-y-3">
            {/* <CreateForm /> */}
            {content}
          </Card.Body>
          <Card.Footer className="justify-end space-x-2 bg-gray-50/50"></Card.Footer>
        </Card>
      </Modal>

      <Button onClick={() => setOpen(true)} color="green">
        Create job +
      </Button>
    </>
  );
}
