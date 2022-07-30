import React from "react";
import * as UI from "@/libs/ui";
import { isEmpty, keyBy } from "lodash-es";

import BaseDetailHeader from "@/components/BaseDetailHeader";
import GuiTinForm from "@/container/GuiTinForm";
import GhiChuForm from "@/container/GhiChuForm";
import CongViecForm from "@/container/CongViecForm";
import {
  AiOutlineCloseCircle,
  AiOutlineDownCircle,
  AiOutlineEdit,
  AiOutlineCalendar,
  AiOutlineFileDone,
} from "react-icons/ai";

import CongViecList from "@/container/CongViecList";
import HistoryLogs from "@/container/HistoryLogs";

import { useGetNhiemVuCohoiQuery } from "@/store/nhiemVu";
import CoHoiCSKHList from "../CoHoiCSKHList";
interface IBaseDetail {
  id?: any;
  customerId?: any;
  isLoading?: boolean;
  children?: React.ReactNode;
  headerTitle?: string;
  headerBreadcrumbs?: any;
  detailContent?: React.ReactNode;

  actionMenus?: { label: string; icon: React.ReactNode; onClick?: () => any }[];
  cuocHopCounter?: number;
  baoGiaCounter?: number;
  userId?: string;

  isEdit?: boolean;
  openEdit?: () => any;
  closeEdit?: () => any;

  onCreateNote?: (data?: any) => any;
  onUpdateNote?: (data?: any) => any;
  isLoadingNote?: boolean;
  reloadListNote?: () => any;
  dataNote?: any;

  onCreateMessage?: (data?: any) => any;
  onUpdateMessage?: (data?: any) => any;
  isLoadingMessage?: boolean;
  reloadListMessage?: () => any;
  dataMessage?: any;

  onCreateTask?: (data?: any) => any;
  onUpdateTask?: (data?: any) => any;
  isLoadingTask?: boolean;
  reloadListTask?: () => any;
  dataTask?: any;
}

function BaseDetail(props: IBaseDetail) {
  const {
    id,
    customerId,
    headerBreadcrumbs,
    actionMenus,
    detailContent,
    isLoading,
    cuocHopCounter = 0,
    baoGiaCounter = 0,
    isEdit,
    openEdit,
    closeEdit,
    onCreateNote,
    onUpdateNote,
    isLoadingNote,
    dataNote,
    reloadListNote,
    onCreateMessage,
    onUpdateMessage,
    isLoadingMessage,
    reloadListMessage,
    dataMessage,
    dataTask,
    onCreateTask,
    onUpdateTask,
    reloadListTask,
    isLoadingTask,
  } = props;

  const { spacing, palette } = UI.useTheme();

  const [tabIndex, setTabIndex] = React.useState(-1);

  const handleChangeTab = (__, newValue: number) => setTabIndex(newValue);

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
  const [nhiemVuSelected, setNhiemVuSelected] = React.useState<any>(null);

  const TABLE_PANEL = [
    {
      tabIndex: 0,
      content: (
        <GhiChuForm
          coHoiId={id}
          customerId={customerId}
          onCreateNote={onCreateMessage}
          onUpdateNote={onUpdateMessage}
          isLoadingNote={isLoadingMessage}
          reloadListNote={reloadListMessage}
          onReloadForm={() => reloadListNote()}
        />
      ),
      height: "calc(100vh - 250px)",
    },
    {
      tabIndex: 1,
      content: (
        <GhiChuForm
          coHoiId={id}
          customerId={customerId}
          onCreateNote={onCreateNote}
          onUpdateNote={onUpdateNote}
          isLoadingNote={isLoadingNote}
          reloadListNote={reloadListNote}
          onReloadForm={() => reloadListNote()}
        />
      ),
      height: "calc(100vh - 250px)",
    },
    {
      tabIndex: 2,
      content: (
        <CongViecForm
          id={nhiemVuSelected?.id}
          cohoi_id={id}
          nhiemVuData={nhiemVuSelected}
          refetchListNhiemVu={reloadListTask}
          onCancel={() => {
            setTabIndex(-1);
            setNhiemVuSelected(null);
          }}
          onCreateTask={onCreateTask}
          onUpdateTask={onUpdateTask}
          isLoadingTask={isLoadingTask}
        />
      ),
      height: "calc(100vh - 550px)",
    },
  ];

  return isLoading ? (
    <UI.Center minH="200px">
      <UI.CircularProgress />
    </UI.Center>
  ) : (
    <UI.VStack w="100%" h="calc(100vh - 60px)" bg="#f6f7fa">
      <UI.HStack
        alignItems="flex-start"
        pt={spacing(2)}
        spacing={spacing(2)}
        w="100%"
      >
        <UI.Card
          sx={{
            maxWidth: "60vw",
            minWidth: "60vw",
            width: "60vw",
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
          <UI.CKBox height="calc(100vh - 130px)" overflow="auto">
            {detailContent}
          </UI.CKBox>
        </UI.Card>

        <UI.Card
          sx={{
            maxWidth: "100%",
            width: "100%",
            height: "calc(100vh - 60px)",
          }}
        >
          <UI.Tabs
            value={tabIndex}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
            sx={{ paddingLeft: "16px", paddingRight: "6px", paddingY: "4px" }}
          >
            <UI.Tab label="Gửi tin" />
            <UI.Tab label="Ghi chú" />
            <UI.Tab label="Lên công việc" />

            <UI.HStack w="100%" justifyContent="flex-end" spacing={0}>
              <UI.Button
                size="small"
                startIcon={
                  <UI.Badge badgeContent={cuocHopCounter} color="info">
                    <AiOutlineCalendar size="24px" />
                  </UI.Badge>
                }
                sx={{ lineHeight: "15px", textAlign: "left" }}
                variant="text"
              >
                Cuộc họp
              </UI.Button>
            </UI.HStack>
          </UI.Tabs>
          {TABLE_PANEL?.map((x, index) => (
            <TabPanel tabIndex={tabIndex} key={index} index={x.tabIndex}>
              {x.content}
            </TabPanel>
          ))}

          <UI.Divider />
          <UI.CardContent
            sx={{
              padding: spacing(2),
              overflow: "auto !important",
              height:
                keyBy(TABLE_PANEL, "tabIndex")?.[tabIndex]?.height ||
                "calc(100vh - 150px)",
              paddingBottom: "130px",
            }}
          >
            <UI.CKBox overflow="auto">
              <CongViecList
                listNhiemVuData={dataTask || []}
                isLoadingListNhiemVu={isLoadingTask}
                refetchListNhiemVu={reloadListTask}
                onUpdateTask={onUpdateTask}
                onSelectedTask={(task) => {
                  setNhiemVuSelected(task);
                  setTabIndex(2);
                }}
              />
              <CoHoiCSKHList
                listCoHoiCSKHData={dataNote || []}
                isLoadingListCoHoiCSKH={isLoadingNote}
                refetchListCoHoiCSKH={reloadListNote}
              />
            </UI.CKBox>
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
  const { children, tabIndex, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={tabIndex !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {tabIndex === index && <UI.Box sx={{ p: 2 }}>{children}</UI.Box>}
    </div>
  );
}

export default BaseDetail;
