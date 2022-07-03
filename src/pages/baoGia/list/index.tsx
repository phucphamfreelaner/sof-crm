import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { AiFillPlusCircle } from "react-icons/ai";

function BaoGiaList() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item>
              <Typography variant="h4">Báo Giá</Typography>
            </Grid>
            <Grid item>
              <Button
                size="small"
                startIcon={<AiFillPlusCircle fontSize="small" />}
                variant="contained"
              >
                Thêm mới
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default BaoGiaList;
