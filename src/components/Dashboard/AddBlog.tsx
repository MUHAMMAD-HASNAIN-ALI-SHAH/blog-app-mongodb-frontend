import {
  Button,
  FileInput,
  Group,
  TextInput,
  Textarea,
  Image,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import useBlogStore from "../../store/blog";

const AddBlog = ({ onClose }: { onClose: any }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const { addBlog, submitionState, getBlogs } = useBlogStore();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      description: "",
      category: "",
      image: null as File | null,
      base64Image: "",
    },

    validate: {
      title: (value) => (value.trim().length > 0 ? null : "Title is required"),
      description: (value) =>
        value.trim().length > 10
          ? null
          : "Description must be at least 10 characters",
      base64Image: (value) => (value ? null : "Image is required"),
      category: (value) => (value.length > 0 ? null : "Category is required"),
    },
  });

  // Convert image to Base64
  const handleImageChange = (file: File | null) => {
    form.setFieldValue("image", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        form.setFieldValue("base64Image", base64String);
        setPreview(base64String);
      };
      reader.readAsDataURL(file);
    } else {
      form.setFieldValue("base64Image", "");
      setPreview(null);
    }
  };

  const handleSubmit = async (values: {
    title: string;
    description: string;
    category: string;
    base64Image: string;
  }) => {
    const data = {
      title: values.title,
      description: values.description,
      category: values.category,
      image: values.base64Image,
    };
    await addBlog(data);
    onClose();
    await getBlogs();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        withAsterisk
        label="Title"
        placeholder="Enter blog title"
        {...form.getInputProps("title")}
      />

      <Textarea
        withAsterisk
        label="Description"
        placeholder="Enter blog description"
        minRows={5}
        autosize
        maxRows={10}
        {...form.getInputProps("description")}
      />

      <Select
        label="Select blog category"
        placeholder="Pick value"
        data={[
          "technology",
          "travel",
          "food",
          "lifestyle",
          "health",
          "education",
          "finance",
          "sports",
          "fashion",
          "entertainment",
        ]}
        {...form.getInputProps("category")}
      />

      <FileInput
        withAsterisk
        label="Upload Image"
        placeholder="Select an image"
        accept="image/*"
        onChange={handleImageChange}
      />
      {form.errors.base64Image && (
        <div style={{ color: "red", fontSize: "14px" }}>
          {form.errors.base64Image}
        </div>
      )}

      {preview && (
        <div className="mt-4 flex justify-center">
          <Image
            src={preview}
            alt="Uploaded preview"
            width={200}
            height={200}
            radius="md"
          />
        </div>
      )}

      <Group justify="flex-end" mt="md">
        <Button type="submit" disabled={!!submitionState}>
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default AddBlog;
