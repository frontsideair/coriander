import {
  Button,
  Popover,
  GridListItem,
  MenuTrigger,
  Menu,
  MenuItem,
  ToggleButton,
} from "react-aria-components";
import { produce } from "immer";
import { ColorSelection } from "./ColorsBar";
import { Data } from "./Coriander";
import { ColorControl } from "./ColorControl";
import { CalendarDate } from "@internationalized/date";

type Props = {
  isFirst: boolean;
  isLast: boolean;
  color: ColorSelection;
  setColors: React.Dispatch<React.SetStateAction<ColorSelection[]>>;
  setModalColor: React.Dispatch<React.SetStateAction<boolean | ColorSelection>>;
  setData: React.Dispatch<React.SetStateAction<Data>>;
  tooltipKey: string | null;
  setTooltipKey: (key: string | null) => void;
  date: CalendarDate;
  data: Data;
};

export function ColorGridListItem({
  isFirst,
  isLast,
  color,
  setColors,
  setModalColor,
  setData,
  tooltipKey,
  setTooltipKey,
  date,
  data,
}: Props) {
  function moveColor(direction: "up" | "down") {
    const offset = direction === "up" ? -1 : 1;
    setColors(
      produce((draft) => {
        const currentColor = draft.find(({ id }) => id === color.id);
        if (currentColor) {
          const currentIndex = draft.indexOf(currentColor);
          if (currentIndex > 0) {
            draft[currentIndex] = draft[currentIndex + offset];
            draft[currentIndex + offset] = currentColor;
          }
        }
      })
    );
  }

  return (
    <GridListItem
      textValue={color.name}
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
      }}
    >
      <ColorControl
        key={color.name}
        color={color}
        tooltipKey={tooltipKey}
        setTooltipKey={setTooltipKey}
        date={date}
        data={data}
        setData={setData}
      />
      <div style={{ flexGrow: 1, textAlign: "left" }}>{color.name}</div>
      <ToggleButton
        isSelected={color.isFavorite !== false}
        onChange={(isSelected) => {
          setColors(
            produce((draft) => {
              const currentColor = draft.find(({ id }) => id === color.id);
              if (currentColor) {
                currentColor.isFavorite = isSelected;
              }
            })
          );
        }}
      >
        {({ isSelected }) => (isSelected ? "❤️" : "🤍")}
      </ToggleButton>
      <MenuTrigger>
        <Button aria-label="Menu">☰</Button>
        <Popover>
          <Menu
            style={{
              backgroundColor: "light-dark(white, black)",
              border: "1px solid light-dark(black, white)",
            }}
          >
            <MenuItem isDisabled={isFirst} onAction={() => moveColor("up")}>
              Move up
            </MenuItem>
            <MenuItem isDisabled={isLast} onAction={() => moveColor("down")}>
              Move down
            </MenuItem>
            <MenuItem onAction={() => setModalColor(color)}>Edit</MenuItem>
            <MenuItem
              onAction={() => {
                setColors((colors) =>
                  colors.filter(({ name }) => name !== color.name)
                );
                setData(
                  (data) =>
                    new Map(
                      [...data.entries()].map(([key, value]) => {
                        return [
                          key,
                          new Map(
                            [...value.entries()].filter(
                              ([colorKey]) => colorKey !== color.id
                            )
                          ),
                        ];
                      })
                    )
                );
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </Popover>
      </MenuTrigger>
    </GridListItem>
  );
}
