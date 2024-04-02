"use client";

import {
  createProductCollection,
  createProductTemplate,
  useCollections,
  useTemplates,
} from "@/app/_lib/api";
import { useAppStore } from "@/app/_lib/store";
import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { RiCloseLargeLine } from "@remixicon/react";
import { useState } from "react";

export default function ModalCreateCollections({ isOpen, onClose, templates }) {
  const { mutateCollections } = useCollections();
  const { mutateTemplates } = useTemplates();

  const [form, setForm] = useState({
    collectionName: { value: "", error: "" },
    codePrefix: { value: "", error: "" },
    selectedTemplateId: {
      value: templates[templates.length - 1]._id,
      error: "",
    },
    newTemplateName: { value: "", error: "" },
    newTemplateNames: { value: ["Price"], error: "" },
  });
  const [formError, setFormError] = useState("");
  const [selectedTab, setSelectedTab] = useState("existingtemplate");
  const [newName, setNewName] = useState("");

  const setCollectionId = useAppStore((state) => state.setCurrentCollectionId);

  const handleFormChange = (name, value) => {
    setFormError("");
    setForm((prevForm) => ({
      ...prevForm,
      [name]: { ...prevForm[name], value, error: "" },
    }));
  };

  const handleNewNameChange = (value) => {
    setFormError("");
    setNewName(value);
    form.newTemplateNames.error = "";
  };

  const handleAddNewName = () => {
    if (newName === "") {
      setForm((prevState) => ({
        ...prevState,
        newTemplateNames: {
          ...prevState.newTemplateNames,
          error: "Please write a name",
        },
      }));
    } else {
      setForm((prevState) => ({
        ...prevState,
        newTemplateNames: {
          value: [...prevState.newTemplateNames.value, newName],
          error: "",
        },
      }));
      setFormError("");
      setNewName("");
    }
  };

  const resetForm = () => {
    setForm({
      collectionName: { value: "", error: "" },
      codePrefix: { value: "", error: "" },
      selectedTemplateId: {
        value: templates[templates.length - 1]._id,
        error: "",
      },
      newTemplateName: { value: "", error: "" },
      newTemplateNames: { value: ["Price"], error: "" },
    });
    setFormError("");
    setSelectedTab("existingtemplate");
    setNewName("");
  };

  const validateForm = () => {
    setFormError("");
    const newForm = { ...form };
    let isValid = true;

    if (!newForm.collectionName.value) {
      newForm.collectionName.error = "Please add a collection name";
      isValid = false;
    } else {
      newForm.collectionName.error = "";
    }

    if (!newForm.codePrefix.value) {
      newForm.codePrefix.error = "Please add a code prefix";
      isValid = false;
    } else {
      newForm.codePrefix.error = "";
    }

    if (selectedTab === "newtemplate") {
      if (!newForm.newTemplateName.value) {
        newForm.newTemplateName.error = "Please add a template name";
        isValid = false;
      } else {
        newForm.newTemplateName.error = "";
      }
      if (!newForm.newTemplateNames.value.length) {
        newForm.newTemplateNames.error = "Please add at least one name";
        isValid = false;
      } else {
        newForm.newTemplateNames.error = "";
      }
    }

    setForm(newForm);
    return isValid;
  };

  const handleCreateCollection = async () => {
    if (!validateForm()) {
      return;
    }

    const newCollection = {};
    newCollection.name = form.collectionName.value;
    newCollection.codePrefix = form.codePrefix.value;

    if (selectedTab === "existingtemplate") {
      newCollection.templateId = form.selectedTemplateId.value;
    } else {
      const _id = await handleCreateTemplate();
      if (_id) newCollection.templateId = _id;
    }

    try {
      const response = await createProductCollection({
        name: newCollection.name,
        templateId: newCollection.templateId,
        codePrefix: newCollection.codePrefix,
      });
      const { _id } = response;
      setCollectionId(_id);
      resetForm();
      mutateCollections();
      mutateTemplates();
      onClose();
    } catch (error) {
      setFormError(error.message);
    }
  };

  const handleCreateTemplate = async () => {
    try {
      const response = await createProductTemplate({
        name: form.newTemplateName.value,
        names: form.newTemplateNames.value,
      });
      const { _id } = response;
      return _id;
    } catch (error) {
      console.error("Error in handleCreateTemplate:", error);
      setFormError(error.message);
      return null;
    }
  };

  return (
    <Modal
      classNames={{
        base: ["bg-background"],
        header: ["p-8", "flex", "justify-end"],
        body: ["px-8", "flex", "flex-col", "gap-8"],
        footer: ["p-8", "flex", "justify-end", "gap-4"],
      }}
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      placement="top"
      hideCloseButton
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            transition: {
              duration: 0.15,
              ease: "easeOut",
            },
          },
          exit: {
            opacity: 0,
            transition: {
              duration: 0.15,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <Button
                onPress={onClose}
                isIconOnly
                color="primary"
                variant="light"
              >
                <RiCloseLargeLine size="2rem" />
              </Button>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-2">
                <p>Create a new Collection</p>
                <Input
                  label="Collection Name"
                  variant="bordered"
                  value={form.collectionName.value}
                  onValueChange={(value) =>
                    handleFormChange("collectionName", value)
                  }
                  isInvalid={!!form.collectionName.error || !!formError}
                  errorMessage={form.collectionName.error}
                ></Input>
                <Input
                  label="Collection Code Prefix"
                  variant="bordered"
                  value={form.codePrefix.value}
                  onValueChange={(value) =>
                    handleFormChange("codePrefix", value)
                  }
                  isInvalid={!!form.codePrefix.error || !!formError}
                  errorMessage={form.codePrefix.error}
                ></Input>
              </div>

              <div className="flex flex-col gap-2">
                <p>Choose a template</p>
                <Tabs
                  className="block"
                  variant="bordered"
                  aria-label="options"
                  selectedKey={selectedTab}
                  onSelectionChange={setSelectedTab}
                >
                  <Tab
                    className="flex flex-col gap-2"
                    key="existingtemplate"
                    title="Existing template"
                  >
                    <Select
                      isRequired
                      aria-label="Template for this Collection"
                      selectedKeys={[form.selectedTemplateId.value]}
                      onChange={(e) =>
                        handleFormChange("selectedTemplateId", e.target.value)
                      }
                      disallowEmptySelection
                      variant="bordered"
                    >
                      {templates.map((template) => (
                        <SelectItem key={template._id} value={template._id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <div className="flex items-center gap-2 flex-wrap">
                      {templates[
                        templates.findIndex(
                          (template) =>
                            template._id === form.selectedTemplateId.value
                        )
                      ].names.map((name, index) => (
                        <Chip
                          key={`${name}${index}`}
                          variant="bordered"
                          radius="md"
                        >
                          {name}
                        </Chip>
                      ))}
                    </div>
                  </Tab>
                  <Tab key="newtemplate" title="Create a new template">
                    <div className="flex flex-col gap-2">
                      <Input
                        label="Template Name"
                        variant="bordered"
                        value={form.newTemplateName.value}
                        onValueChange={(value) =>
                          handleFormChange("newTemplateName", value)
                        }
                        isInvalid={!!form.newTemplateName.error || !!formError}
                        errorMessage={form.newTemplateName.error}
                      ></Input>
                      <div className="flex gap-2 items-center">
                        <Input
                          label="Add a Detail"
                          variant="bordered"
                          value={newName}
                          onValueChange={(value) => handleNewNameChange(value)}
                          isInvalid={
                            !!form.newTemplateNames.error || !!formError
                          }
                          errorMessage={form.newTemplateNames.error}
                        ></Input>
                        <Button
                          onPress={handleAddNewName}
                          variant="light"
                          color="primary"
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {form.newTemplateNames.value.map((name, index) => (
                          <Chip
                            key={`${name}${index}`}
                            variant="bordered"
                            radius="md"
                            onClose={() => {
                              const newTemplateNames = [
                                ...form.newTemplateNames.value,
                              ];
                              newTemplateNames.splice(index, 1);
                              setForm((prevState) => ({
                                ...prevState,
                                newTemplateNames: {
                                  ...prevState.newTemplateNames,
                                  value: newTemplateNames,
                                },
                              }));
                            }}
                          >
                            {name}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="p-8 font-bold text-base"
                onPress={onClose}
                variant="light"
              >
                Cancel
              </Button>
              <Button
                className="p-8 font-bold text-base"
                onPress={handleCreateCollection}
                color="primary"
              >
                Create
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
