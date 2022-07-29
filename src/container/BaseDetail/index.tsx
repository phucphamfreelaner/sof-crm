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
import { useGetCoHoiCSKHByCoHoiIdQuery } from "@/store/coHoiCSKH";

interface IBaseDetail {
  id?: any;
  customerId?: any;
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
  cuocHopCounter?: number;
  baoGiaCounter?: number;
  userId?: string;
}

function BaseDetail(props: IBaseDetail) {
  const {
    id,
    customerId,
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
    cuocHopCounter = 0,
    baoGiaCounter = 0,
    userId,
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

  const {
    isLoading: isLoadingListCoHoiCSKH,
    isFetching: isFetchingListCoHoiCSKH,
    data: listCoHoiCSKHData,
    isSuccess: isSuccessListCoHoiCSKHData,
    refetch: refetchListCoHoiCSKH,
  } = useGetCoHoiCSKHByCoHoiIdQuery({ cohoi_id: id }, { skip: !id });

  const {
    isLoading: isLoadingListNhiemVu,
    isFetching: isFetchingListNhiemVu,
    data: listNhiemVuData,
    refetch,
  } = useGetNhiemVuCohoiQuery({ cohoi_id: id }, { skip: !id });
  const [nhiemVuData, setNhiemVuData] = React.useState(null);
  const [isSuccessLoadNhiemVu, setIsSuccessLoadNhiemVu] = React.useState(false);
  const [isSuccessLoadCoHoiCSKH, setIsSuccessLoadCoHoiCSKH] =
    React.useState(true);

  const reloadCongViecForm = () => {
    setIsSuccessLoadNhiemVu(false);
    setTimeout(() => {
      const timer = setTimeout(() => {
        setIsSuccessLoadNhiemVu(true);
      }, 500);
      return () => clearTimeout(timer);
    });
  };

  const reloadCoHoiCSKHForm = () => {
    setIsSuccessLoadCoHoiCSKH(false);
    setTimeout(() => {
      const timer = setTimeout(() => {
        setIsSuccessLoadCoHoiCSKH(true);
      }, 500);
      return () => clearTimeout(timer);
    });
  };

  const TABLE_PANEL = [
    {
      value: 0,
      content: (
        <GhiChuForm
          onAddNoted={onAddNoted}
          coHoiId={id}
          customerId={customerId}
          isSuccess={isSuccessLoadCoHoiCSKH}
          refetchListCoHoiCSKH={refetchListCoHoiCSKH}
          onReloadForm={() => reloadCoHoiCSKHForm()}
          onCancel={() => setValue(-1)}
        />
      ),
      height: "calc(100vh - 250px)",
    },
    {
      value: 1,
      content: (
        <GhiChuForm
          onAddNoted={onAddNoted}
          coHoiId={id}
          customerId={customerId}
          isSuccess={isSuccessLoadCoHoiCSKH}
          refetchListCoHoiCSKH={refetchListCoHoiCSKH}
          onReloadForm={() => reloadCoHoiCSKHForm()}
          onCancel={() => setValue(-1)}
        />
      ),
      height: "calc(100vh - 250px)",
    },
    {
      value: 2,
      content: (
        <CongViecForm
          onAddTask={onAddTask}
          id={nhiemVuData?.id}
          cohoi_id={id}
          nhiemVuData={nhiemVuData}
          isSuccess={isSuccessLoadNhiemVu}
          refetchListNhiemVu={refetch}
          onCancel={() => setValue(-1)}
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
        px={spacing(2)}
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
            value={value}
            onChange={handleChange}
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
                Cuộc
                <br /> họp
              </UI.Button>
              <UI.Button
                size="small"
                startIcon={
                  <UI.Badge badgeContent={baoGiaCounter} color="secondary">
                    <AiOutlineFileDone size="24px" />
                  </UI.Badge>
                }
                variant="text"
                sx={{ lineHeight: "15px", textAlign: "left" }}
              >
                Báo
                <br />
                giá
              </UI.Button>
            </UI.HStack>
          </UI.Tabs>
          {TABLE_PANEL?.map((x, index) => (
            <TabPanel value={value} key={index} index={x.value}>
              {x.content}
            </TabPanel>
          ))}

          <UI.Divider />
          <UI.CardContent
            sx={{
              padding: spacing(2),
              overflow: "auto !important",
              height:
                keyBy(TABLE_PANEL, "value")?.[value]?.height ||
                "calc(100vh - 150px)",
              paddingBottom: "130px",
            }}
          >
            <UI.CKBox overflow="auto">
              <CongViecList
                listNhiemVuData={listNhiemVuData || []}
                isLoadingListNhiemVu={
                  isLoadingListNhiemVu || isFetchingListNhiemVu
                }
                refetchListNhiemVu={refetch}
                onEditNhiemVu={async (data) => {
                  await setValue(2);
                  await setNhiemVuData(data);
                  await reloadCongViecForm();
                }}
                onChangeTrangThai={() => {
                  setNhiemVuData(null);
                  reloadCongViecForm();
                }}
              />
              <CoHoiCSKHList
                listCoHoiCSKHData={listCoHoiCSKHData || []}
                isLoadingListCoHoiCSKH={
                  isLoadingListCoHoiCSKH || isFetchingListCoHoiCSKH
                }
                refetchListCoHoiCSKH={refetchListCoHoiCSKH}
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
