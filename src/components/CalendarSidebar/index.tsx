import React from "react";
import * as UI from "@/libs/ui";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";

const TYPES = [
  {
    label: "Tất cả",
    name: "all",
  },
  {
    label: "Cơ hội",
    name: "co_hoi",
  },
  {
    label: "Báo giá",
    name: "bao_gia",
  },
  {
    label: "Hợp đồng",
    name: "co_hoi",
  },
];

const USERS = [
  {
    label: "Tất cả",
    name: "all",
  },
];

interface ICalendarSidebar {
  onAddEvent?: () => any;
}

function CalendarSidebar(props: ICalendarSidebar) {
  const { onAddEvent } = props;
  const [date, setDate] = React.useState<Date | null>(new Date());

  return (
    <UI.VStack
      sx={{
        ".PrivatePickersSlideTransition-root": {
          minHeight: "200px",
        },
      }}
      bg="white"
      h="calc(100vh - 40px)"
      alignItems="flex-start"
      w="320px"
    >
      <UI.HStack p="20px" w="100%">
        <UI.Button
          onClick={onAddEvent}
          fullWidth
          size="small"
          variant="contained"
        >
          Thêm mới
        </UI.Button>
      </UI.HStack>
      <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
      <UI.Divider sx={{ width: "100%" }} />
      <UI.CKBox sx={{ with: "100%" }} p="10px">
        <UI.FormControl sx={{ with: "100%" }}>
          <UI.FormLabel component="legend">Phân loại công việc</UI.FormLabel>
          <UI.FormGroup>
            {TYPES?.map((x, i) => (
              <UI.FormControlLabel
                key={i}
                control={<UI.Checkbox name={x.name} />}
                label={x.label}
              />
            ))}
          </UI.FormGroup>
        </UI.FormControl>
      </UI.CKBox>

      <UI.CKBox p="10px">
        <UI.FormControl>
          <UI.FormLabel component="legend">Người tham dự</UI.FormLabel>
          <UI.FormGroup>
            {USERS?.map((x, i) => (
              <UI.FormControlLabel
                key={i}
                control={<UI.Checkbox name={x.name} />}
                label={x.label}
              />
            ))}
          </UI.FormGroup>
        </UI.FormControl>
      </UI.CKBox>
    </UI.VStack>
  );
}

export default CalendarSidebar;
