import { useForm } from "@mantine/form";
import { TextInput, Box, Text } from "@mantine/core";
import useAuthStore from "../store/auth";

const Code = ({ onClose }: { onClose: () => void }) => {
  const { register, registerCodeValues, authLoader } = useAuthStore();

  const form = useForm({
    initialValues: {
      code: "",
    },

    validate: {
      code: (value) =>
        /^\d{6}$/.test(value) ? null : "Code must be exactly 6 digits",
    },
  });

  const handleSubmit = async (values: { code: any }) => {
    const formData = {
      code: values.code,
      email: registerCodeValues.email,
    };

    await register(formData);
    onClose();
  };

  return (
    <Box maw={400} mx="auto" mt="xl">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Text size="lg" mb="sm" fw={500}>
          Enter the 6-digit code
        </Text>
        <TextInput
          label="Verification Code"
          placeholder="123456"
          maxLength={6}
          {...form.getInputProps("code")}
        />

        <button
          disabled={!!authLoader}
          className="btn btn-primary mt-5"
          type="submit"
        >
          Verify
        </button>
      </form>
    </Box>
  );
};

export default Code;
