import { Controller, useForm } from "react-hook-form";
import { pictureFormSchema, type PictureForm } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError } from "@/components/ui/field";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Image } from "lucide-react";
import { usePictureContext } from "../hooks/usePictureContext";

interface CreatePictureFormProps {
	onSuccess?: () => void;
}

const CreatePictureForm = ({ onSuccess }: CreatePictureFormProps) => {
	const { handleUpload, isUploading } = usePictureContext();

	const form = useForm<PictureForm>({
		resolver: zodResolver(pictureFormSchema),
		defaultValues: {},
	});

	const onSubmit = async (data: PictureForm) => {
		try {
			await handleUpload(data.image);
			onSuccess?.();
		} catch (error) {
			// nanti ada toast
		}
	};
	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
			<Controller
				name="image"
				control={form.control}
				render={({
					field: { ref, name, onBlur, onChange, value },
					fieldState,
				}) => (
					<Field data-invalid={fieldState.invalid}>
						<input
							ref={ref}
							id={name}
							type="file"
							onBlur={onBlur}
							accept="image/png,image/jpeg,image/webp"
							onChange={e => {
								const file = e.target.files?.[0];
								if (file) {
									onChange(file);
								}
							}}
							className="hidden"
							disabled={isUploading}
						/>
						<label
							htmlFor={name}
							className={clsx(
								"grid place-items-center min-h-30 rounded-xl border-2 border-dashed border-primary hover:bg-accent cursor-pointer focus-visible:ring-0 w-full",
								{
									"border-red-500 bg-destructive/20 hover:text-destructive hover:bg-destructive/10":
										fieldState.invalid,
								},
							)}
						>
							<div className="grid gap-2">
								{!value ? (
									<div className="flex flex-col items-center gap-1">
										<Image className="size-10" />
										<div className="text-sm">Upload image</div>
									</div>
								) : (
									<div className="text-sm truncate">{value.name} </div>
								)}
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</div>
						</label>
					</Field>
				)}
			/>
			<DialogFooter>
				<Button
					disabled={isUploading}
					type="submit"
					className="w-full h-10 rounded-lg"
				>
					{isUploading ? "Uploading..." : "Submit"}
				</Button>
			</DialogFooter>
		</form>
	);
};

export default CreatePictureForm;
