import React from "react";
import {
  Button,
  Popover,
  Dialog,
  Form,
  TextField,
  Label,
  Input,
  ColorThumb,
  Heading,
  ColorArea,
} from "react-aria-components";
import { ColorSelection } from "./ColorsBar";
import { produce } from "immer";

type Props = {
  triggerRef: React.RefObject<HTMLButtonElement>;
  modalColor: boolean | ColorSelection;
  setModalColor: React.Dispatch<React.SetStateAction<boolean | ColorSelection>>;
  setColors: React.Dispatch<React.SetStateAction<ColorSelection[]>>;
};

export function ColorEditPopover({
  triggerRef,
  modalColor,
  setModalColor,
  setColors,
}: Props) {
  const isEditing = typeof modalColor === "object";
  return (
    <Popover
      triggerRef={triggerRef}
      isOpen={Boolean(modalColor)}
      onOpenChange={setModalColor}
    >
      <Dialog>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const name = formData.get("color-name") as string;
            const hue = formData.get("hue") as string;
            const saturation = formData.get("saturation") as string;
            const color = `hsl(${hue}, ${saturation}%, 50%)`;
            const colorSelection = { name, color, isFavorite: false };

            if (isEditing) {
              const color = modalColor;
              setColors(
                produce((draft) => {
                  const currentColor = draft.find(
                    ({ name }) => name === color.name
                  );
                  if (currentColor) {
                    currentColor.name = name;
                  }
                })
              );
            } else {
              setColors((colors) => [colorSelection, ...colors]);
            }
            setModalColor(false);
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            backgroundColor: "light-dark(ghostwhite, black)",
            padding: 10,
            borderRadius: 4,
          }}
        >
          <Heading slot="title">
            {isEditing ? `Edit color ${modalColor.name}` : "Add new color"}
          </Heading>
          <TextField
            name="color-name"
            autoComplete="off"
            isRequired
            style={{ display: "flex", flexDirection: "column" }}
            defaultValue={isEditing ? modalColor.name : ""}
          >
            <Label>Name</Label>
            <Input autoCapitalize="off" style={{ fontSize: 16 }} />
          </TextField>
          <ColorArea
            xName="hue"
            yName="saturation"
            defaultValue={isEditing ? modalColor.color : "hsl(0, 100%, 50%)"}
            isDisabled={isEditing}
          >
            <ColorThumb />
          </ColorArea>
          <Button type="submit">{isEditing ? "Save" : "Add"}</Button>
        </Form>
      </Dialog>
    </Popover>
  );
}
