import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import useResponsive from "../../../themes/themes";

type ModalType = {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
};

function ModalComp({ open, handleClose, children }: ModalType) {
  const { isDesktop, isMobile, isTablet } = useResponsive();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          p: 2,
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
}

export default ModalComp;
