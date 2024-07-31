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
  ColorSlider,
  SliderOutput,
  SliderTrack,
  ColorThumb,
  ColorSwatch,
  Heading,
  TooltipTrigger,
  Tooltip,
} from "react-aria-components";
import { Data } from "./Coriander";

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
  const triggerRef = useRef(null);

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Button
        ref={triggerRef}
        onPress={() => setOpen((open) => !open)}
        style={{
          width: 48,
          height: 48,
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
              const name = formData.get("name") as string;
              const hue = formData.get("hue") as string;
              const color = `hsl(${hue}, 100%, 50%)`;
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
              name="name"
              isRequired
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Label>Name</Label>
              <Input style={{ fontSize: 16 }} />
            </TextField>
            <ColorSlider
              name="hue"
              channel="hue"
              defaultValue="hsl(0, 100%, 50%)"
            >
              <Label />
              <SliderOutput />
              <SliderTrack>
                <ColorThumb />
              </SliderTrack>
            </ColorSlider>
            <Button type="submit">Add</Button>
          </Form>
        </Dialog>
      </Popover>

      {colors.map((color) => (
        <TooltipTrigger delay={500} key={color.name}>
          <Button
            style={{
              padding: 0,
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
            }}
          >
            <ColorSwatch
              color={color.color}
              style={{
                width: 48,
                height: 48,
                borderRadius: 4,
              }}
            />
          </Button>
          <Tooltip>Add {color.name} to today</Tooltip>
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
            width: 48,
            height: 48,
          }}
        >
          🗑
        </Button>
        <Tooltip>Clear today's colors</Tooltip>
      </TooltipTrigger>
    </div>
  );
}
