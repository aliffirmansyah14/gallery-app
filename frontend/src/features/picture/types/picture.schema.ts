import * as z from "zod";

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];

export const pictureFormSchema = z.object({
	image: z
		.instanceof(File, { message: "Gambar wajib diunggah" })
		.refine(
			file => ACCEPTED_IMAGE_TYPES.includes(file.type),
			"Format file tidak didukung (.jpg, .png, .webp)",
		)
		.refine(file => file.size <= MAX_FILE_SIZE, "Ukuran maksimal 2MB"),
});

export type PictureForm = z.infer<typeof pictureFormSchema>;
