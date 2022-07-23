import React from "react";
import * as UI from "@/libs/ui";

import BaseDetailHeader from "@/components/BaseDetailHeader";
import GuiTinForm from "@/container/GuiTinForm";
import GhiChuForm from "@/container/GhiChuForm";
import CongViecForm from "@/container/CongViecForm";
import {
  AiOutlineCloseCircle,
  AiOutlineDownCircle,
  AiOutlineEdit,
} from "react-icons/ai";
import { isEmpty } from "lodash-es";

interface IBaseDetail {
  isLoading?: boolean;
  children?: React.ReactNode;
  headerTitle?: string;
  headerBreadcrumbs?: any;
  timelineContent?: React.ReactNode;
  detailContent?: React.ReactNode;
  onSendMessage?: (data: any) => any;
  onAddNoted?: (data: any) => any;
  onAddTask?: (data: any) => any;
  isEdit?: boolean;
  closeEdit?: () => any;
  openEdit?: () => any;
  onSave?: (data: any) => any;
  actionMenus?: { label: string; icon: React.ReactNode; onClick?: () => any }[];
}

function BaseDetail(props: IBaseDetail) {
  const {
    children,
    headerBreadcrumbs,
    onSendMessage,
    onAddNoted,
    onAddTask,
    timelineContent,
    isEdit,
    openEdit,
    closeEdit,
    onSave,
    actionMenus,
    detailContent,
    isLoading,
  } = props;
  const { spacing, palette } = UI.useTheme();

  const [value, setValue] = React.useState(-1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return isLoading ? (
    <UI.Center minH="200px">
      <UI.CircularProgress />
    </UI.Center>
  ) : (
    <UI.VStack w="100%" h="calc(100vh - 60px)" bg="#f6f7fa">
      <UI.HStack
        alignItems="flex-start"
        px={spacing(2)}
        pt={spacing(2)}
        spacing={spacing(2)}
        w="100%"
      >
        <UI.Card
          sx={{
            maxWidth: "65vw",
            minWidth: "65vw",
            width: "65vw",
            height: "calc(100vh - 60px)",
          }}
        >
          <UI.CardHeader
            sx={{ p: spacing(1.5) }}
            title={
              <UI.HStack w="100%" justifyContent="space-between">
                <BaseDetailHeader breadcrumbs={headerBreadcrumbs} />
                <UI.HStack>
                  <UI.HStack alignItems="flex-end" justifyContent="flex-end">
                    <UI.LoadingButton
                      loadingPosition="end"
                      form="co-hoi-details"
                      size="small"
                      endIcon={
                        isEdit ? <AiOutlineCloseCircle /> : <AiOutlineEdit />
                      }
                      variant="outlined"
                      onClick={isEdit ? closeEdit : openEdit}
                      color={isEdit ? "error" : "primary"}
                    >
                      {isEdit ? "Cancel" : "Edit"}
                    </UI.LoadingButton>

                    {!isEmpty(actionMenus) && (
                      <UI.Button
                        onClick={handleClick}
                        endIcon={<AiOutlineDownCircle fontSize="small" />}
                        sx={{ m: 1 }}
                        size="small"
                        variant="contained"
                      >
                        Actions
                      </UI.Button>
                    )}
                  </UI.HStack>
                </UI.HStack>
              </UI.HStack>
            }
          />
          <UI.Divider />
          <UI.CKBox overflow="auto">{detailContent}</UI.CKBox>
        </UI.Card>

        <UI.Card
          sx={{
            maxWidth: "100%",
            width: "100%",
            height: "calc(100vh - 60px)",
          }}
        >
          <UI.Tabs
            value={value}
            onChange={handleChange}
            sx={{ ml: 2 }}
            aria-label="basic tabs example"
          >
            <UI.Tab label="Gửi tin" />
            <UI.Tab label="Ghi chú" />
            <UI.Tab label="Lên công việc" />
          </UI.Tabs>
          <TabPanel value={value} index={0}>
            <GuiTinForm onSendMessage={onSendMessage} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <GhiChuForm onAddNoted={onAddNoted} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <CongViecForm onAddTask={onAddTask} />
          </TabPanel>
          <UI.Divider />
          <UI.CardContent sx={{ padding: spacing(2) }}>
            <UI.Typography
              gutterBottom
              sx={{ fontWeight: 600, color: palette.text.secondary }}
              variant="body1"
            >
              Lịch sử thao tác
            </UI.Typography>
            <UI.CKBox overflow="auto">{timelineContent}</UI.CKBox>
          </UI.CardContent>
        </UI.Card>
      </UI.HStack>
      {!isEmpty(actionMenus) && (
        <UI.Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <UI.List dense sx={{ minWidth: 150 }}>
            {actionMenus?.map?.((x) => (
              <UI.ListItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                  x.onClick?.();
                }}
                disablePadding
              >
                <UI.ListItemButton>
                  <UI.ListItemIcon>{x.icon}</UI.ListItemIcon>
                  <UI.ListItemText
                    primary={x.label}
                    sx={{
                      ".MuiListItemText-primary": {
                        fontWeight: 600,
                        color: palette.text.secondary,
                      },
                    }}
                  />
                </UI.ListItemButton>
              </UI.ListItem>
            ))}
          </UI.List>
        </UI.Popover>
      )}
    </UI.VStack>
  );
}

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <UI.Box sx={{ p: 2 }}>{children}</UI.Box>}
    </div>
  );
}

export default BaseDetail;