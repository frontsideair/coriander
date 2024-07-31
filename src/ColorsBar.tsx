import { CalendarDate } from "@internationalized/date";
import { useState, useRef } from "react";
import {
  Button,
  Popover,
  Dialog,
  Form,
  TextField,
  Label,
  Input,
  ColorThumb,
  ColorSwatch,
  Heading,
  TooltipTrigger,
  Tooltip,
  ColorArea,
} from "react-aria-components";
import { Data } from "./Coriander";
import "./ColorsBar.css";

export type ColorSelection = {
  color: string;
  name: string;
};

type Props = {
  colors: ColorSelection[];
  setColors: React.Dispatch<React.SetStateAction<ColorSelection[]>>;
  date: CalendarDate;
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
};

export function ColorsBar({ colors, setColors, date, data, setData }: Props) {
  const [isOpen, setOpen] = useState(false);
  const [tooltipKey, setTooltipKey] = useState<string | null>(null);
  const triggerRef = useRef(null);

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Button
        ref={triggerRef}
        onPress={() => setOpen((open) => !open)}
        style={{
          width: 32,
          height: 32,
          borderWidth: 0,
        }}
      >
        +
      </Button>
      <Popover triggerRef={triggerRef} isOpen={isOpen} onOpenChange={setOpen}>
        <Dialog>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const name = formData.get("color-name") as string;
              const hue = formData.get("hue") as string;
              const saturation = formData.get("saturation") as string;
              const color = `hsl(${hue}, ${saturation}%, 50%)`;
              const colorSelection = { name, color };
              setColors([colorSelection, ...colors]);
              setOpen(false);
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
            <Heading slot="title">Add new color</Heading>
            <TextField
              name="color-name"
              autoComplete="off"
              isRequired
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Label>Name</Label>
              <Input autoCapitalize="off" style={{ fontSize: 16 }} />
            </TextField>
            <ColorArea
              xName="hue"
              yName="saturation"
              defaultValue="hsl(0, 100%, 50%)"
            >
              <ColorThumb />
            </ColorArea>
            <Button type="submit">Add</Button>
          </Form>
        </Dialog>
      </Popover>

      {colors.map((color) => (
        <TooltipTrigger
          key={color.name}
          delay={500}
          isOpen={tooltipKey === color.name}
          onOpenChange={(open) => setTooltipKey(open ? color.name : null)}
        >
          <Button
            style={{
              padding: 0,
              margin: 0,
              border: 0,
              background: "none",
            }}
            onPress={() => {
              const dateKey = date.toString();
              const dateData = data.get(dateKey) ?? new Map();
              const count = (dateData.get(color.color) ?? 0) + 1;
              dateData.set(color.color, count);
              const newData = new Map(data);
              newData.set(dateKey, dateData);
              setData(newData);
              setTooltipKey(color.name);
            }}
          >
            <ColorSwatch
              color={color.color}
              style={{
                width: 32,
                height: 32,
                borderRadius: 4,
              }}
            />
          </Button>
          <Tooltip>{color.name}</Tooltip>
        </TooltipTrigger>
      ))}

      <TooltipTrigger delay={500}>
        <Button
          onPress={() => {
            const newData = new Map(data);
            newData.delete(date.toString());
            setData(newData);
          }}
          style={{
            width: 32,
            height: 32,
            borderWidth: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          🗑
        </Button>
        <Tooltip>Clear today's colors</Tooltip>
      </TooltipTrigger>
    </div>
  );
}
