"use client";

import { RiMenu5Line, RiCloseLargeLine } from "@remixicon/react";
import {
  Link,
  Button,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import ThemeSwitcher from "./ThemeSwitcher";

export default function FloatingMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      {!isOpen && (
        <Button
          className="fixed bottom-8 right-8"
          onPress={onOpen}
          isIconOnly
          color="primary"
        >
          <RiMenu5Line size="1.5rem" />
        </Button>
      )}
      <Modal
        classNames={{
          wrapper: ["mt-[-5rem]"],
          base: ["bg-background"],
          body: [
            "p-8",
            "flex",
            "flex-col",
            "justify-center",
            "items-center",
            "gap-8",
          ],
          footer: ["p-8", "flex", "justify-between"],
        }}
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        placement="top"
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <Link
                  className="text-2xl uppercase"
                  href="/app/collections"
                  color="foreground"
                >
                  Collections
                </Link>
                <Link
                  className="text-2xl uppercase"
                  href="/app/templates"
                  color="foreground"
                >
                  Templates
                </Link>
                <Link
                  className="text-2xl uppercase"
                  href="/app/account"
                  color="foreground"
                >
                  Account
                </Link>
              </ModalBody>
              <ModalFooter>
                <div className="mb-[0.25rem]">
                  <ThemeSwitcher />
                </div>
                <Button
                  className="fixed bottom-8 right-8"
                  onPress={onClose}
                  isIconOnly
                  color="primary"
                  variant="light"
                >
                  <RiCloseLargeLine size="2rem" />
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
