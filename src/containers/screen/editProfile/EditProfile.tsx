import ModalComp from "../../../components/common/Modal/Modal";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { updateProfileAPI } from "../../../services/apis/profile";
import InputFormComp from "../../../components/common/InputForm/InputForm";
import { useForm, SubmitHandler } from "react-hook-form";
import { LAYOUT } from "../../../themes/layout";
import { COLORS } from "../../../themes/colors";
import { toast } from "react-toastify";

type EditProfileType = {
  handleClose: () => void;
  open: boolean;
  data: any;
  onProfileUpdate: () => void;
};

const EditProfileScreen = ({
  handleClose,
  open,
  data,
  onProfileUpdate,
}: EditProfileType) => {
  const store = useSelector((state: any) => state.auth.login.data);
  const { register, reset, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (item) => {
    try {
      const payload = {
        phone: item.phone || data.phone,
        address: item.address || data.address,
        organizationName: item.organizationName || data.organizationName,
      };
      const response = await updateProfileAPI(
        store.token,
        store.user.organizationId,
        payload
      );
      toast.success("Profile Updated Successfully");
      reset();
      handleClose();
      onProfileUpdate();
    } catch (error: any) {
      toast.error("Error updating profile:", error);
    }
  };

  return (
    <ModalComp handleClose={handleClose} open={open}>
      <Box
        sx={[
          LAYOUT.columnCCenter,
          {
            background: COLORS.WHITE,
            p: 2,
            borderRadius: 2,
          },
        ]}
      >
        <Typography textAlign={"center"}>Edit Profile</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputFormComp
            label="Organization Name"
            placeHolder="Enter your organization name"
            {...register("organizationName")}
            defaultValue={data.organizationName}
          />
          <InputFormComp
            label="Phone Number"
            placeHolder="Enter your phone number"
            {...register("phone")}
            maxLength={10}
            defaultValue={data.phone}
          />
          <InputFormComp
            label="Address"
            placeHolder="Enter you address"
            {...register("address")}
            defaultValue={data.address}
          />
          <Box display={"flex"} gap={2} mt={2} alignItems={"center"}>
            <Button type="submit" variant="outlined">
              Submit
            </Button>
            <Button onClick={handleClose} variant="outlined">
              Close
            </Button>
          </Box>
        </form>
      </Box>
    </ModalComp>
  );
};

export default EditProfileScreen;
