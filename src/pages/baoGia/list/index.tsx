import { Box, Button, Grid, Typography } from "@mui/material";
import { AiFillPlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
function BaoGiaList() {
  const navigate = useNavigate();
  return (
    <Box sx={{ mb: 4 }}>
      <Grid container justifyContent="space-between" spacing={3}>
        <Grid item>
          <Typography variant="h4">Báo Giá</Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={() => navigate("/bao_gia/new")}
            size="small"
            startIcon={<AiFillPlusCircle fontSize="small" />}
            variant="contained"
          >
            Thêm mới
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BaoGiaList;
