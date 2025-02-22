import { CalendarDate } from "@internationalized/date";
import { useState, useRef } from "react";
import {
  Button,
  TooltipTrigger,
  Tooltip,
  Disclosure,
  DisclosurePanel,
  GridList,
  GridListItem,
} from "react-aria-components";
import { Data } from "./Coriander";
import "./ColorsBar.css";
import { ColorEditPopover } from "./ColorEditPopover";
import { ColorControl } from "./ColorControl";
import { ColorGridListItem } from "./ColorGridListItem";

export type ColorSelection = {
  color: string;
  name: string;
  isFavorite?: boolean;
};

type Props = {
  colors: ColorSelection[];
  setColors: React.Dispatch<React.SetStateAction<ColorSelection[]>>;
  date: CalendarDate;
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
};

export function ColorsBar({ colors, setColors, date, data, setData }: Props) {
  const [tooltipKey, setTooltipKey] = useState<string | null>(null);
  const [modalColor, setModalColor] = useState<boolean | ColorSelection>(false);
  const triggerRef = useRef(null);

  const favoriteColors = colors.filter((color) => color.isFavorite !== false);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Disclosure>
        <div
          style={{ display: "flex", gap: 8, justifyContent: "center" }}
          ref={triggerRef}
        >
          <TooltipTrigger delay={500}>
            <Button slot="trigger">🎨</Button>
            <Tooltip>Manage colors</Tooltip>
          </TooltipTrigger>
          {favoriteColors.map((color) => (
            <ColorControl
              key={color.name}
              color={color}
              tooltipKey={tooltipKey}
              setTooltipKey={setTooltipKey}
              date={date}
              data={data}
              setData={setData}
            />
          ))}

          <TooltipTrigger delay={500}>
            <Button
              onPress={() => {
                const newData = new Map(data);
                newData.delete(date.toString());
                setData(newData);
              }}
            >
              🗑
            </Button>
            <Tooltip>Clear currently selected day</Tooltip>
          </TooltipTrigger>
        </div>
        <DisclosurePanel>
          <GridList
            aria-label="Colors"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              padding: 4,
            }}
          >
            <GridListItem textValue="Add new color">
              <Button
                onPress={() => {
                  setModalColor(true);
                }}
                style={{ width: "100%" }}
              >
                Add new color
              </Button>
            </GridListItem>
            {colors.map((color) => (
              <ColorGridListItem
                key={color.name}
                color={color}
                setColors={setColors}
                setModalColor={setModalColor}
                setData={setData}
                tooltipKey={tooltipKey}
                setTooltipKey={setTooltipKey}
                date={date}
                data={data}
              />
            ))}
          </GridList>
        </DisclosurePanel>
      </Disclosure>
      <ColorEditPopover
        triggerRef={triggerRef}
        modalColor={modalColor}
        setModalColor={setModalColor}
        setColors={setColors}
      />
    </div>
  );
}
