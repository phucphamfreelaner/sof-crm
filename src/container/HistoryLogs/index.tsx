import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import * as UI from "@/libs/ui";
import { useBoolean } from "ahooks";

import { MdArrowDropDown, MdOutlineArrowLeft } from "react-icons/md";
import { useGetLogByUserQuery } from "@/store/activityLogs";

const Logs = (props: any) => {
  const { userId } = props;
  const [isOpen, setOpen] = useBoolean(true);

  const { data: logsData } = useGetLogByUserQuery(
    { userId, type: "co_hoi" },
    { skip: !userId }
  );

  return (
    <UI.VStack alignItems={"start"} mt={2}>
      <UI.HStack
        spacing={"4px"}
        alignItems="center"
        justifyContent="center"
        w="100%"
      >
        <UI.Typography
          gutterBottom
          sx={{ fontWeight: 600, color: "gray" }}
          variant="body1"
          textAlign="center"
        >
          Lịch sử thao tác
        </UI.Typography>
        <UI.IconButton
          sx={{ position: "relative", top: "-2px" }}
          onClick={setOpen.toggle}
          size="small"
        >
          {isOpen ? (
            <MdArrowDropDown size="28px" color="gray" />
          ) : (
            <MdOutlineArrowLeft size="28px" color="gray" />
          )}
        </UI.IconButton>
      </UI.HStack>
      <UI.Collapse in={isOpen}>
        <Timeline
          sx={{
            m: 0,
            p: 0,
          }}
        >
          {logsData?.data?.map?.((activity, index) => (
            <TimelineItem
              key={activity?._id}
              sx={{
                "&::before": {
                  display: "none",
                },
              }}
            >
              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    border: 0,
                    p: 0,
                  }}
                >
                  <UI.Avatar>UI</UI.Avatar>
                </TimelineDot>
                {logsData?.data?.length - 1 > index && (
                  <TimelineConnector
                    sx={{
                      backgroundColor: "divider",
                      minHeight: 30,
                    }}
                  />
                )}
              </TimelineSeparator>
              <TimelineContent>
                <UI.Typography variant="body2">
                  {activity?.customer?.contact}
                </UI.Typography>
                <UI.Typography variant="body2">
                  METHOD: {activity?.method}
                </UI.Typography>
                <UI.Typography
                  color="textSecondary"
                  sx={{ mt: 1 }}
                  variant="caption"
                >
                  {activity?.created_at}
                </UI.Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </UI.Collapse>
    </UI.VStack>
  );
};

export default Logs;
