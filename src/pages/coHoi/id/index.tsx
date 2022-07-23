import CoHoiDetailsContainer from "@/container/CoHoiDetail";
import { useGetCoHoiByIdQuery } from "@/store/coHoi";
import { useParams } from "react-router-dom";

function CoHoiDetails() {
  const params = useParams();

  const {
    data: coHoiData,
    isLoading: isLoadingCoHoi,
    refetch: reloadCoHoi,
  } = useGetCoHoiByIdQuery(
    {
      id: params?.coHoiId,
    },
    { skip: !params?.coHoiId }
  );

  return (
    <CoHoiDetailsContainer
      coHoiData={coHoiData}
      isLoadingCoHoi={isLoadingCoHoi}
      reloadCoHoi={reloadCoHoi}
    />
  );
}

export default CoHoiDetails;
