import { Controller, useForm } from "react-hook-form";
import { pictureFormEditSchema, type PictureFormEdit } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface FormEditPictureProps {
	name: string;
	onSuccess?: () => void;
	onEdit: (name: string) => Promise<void>;
	renderButton: (loading: boolean) => React.ReactNode;
}

const FormEditPicture = ({
	name,
	renderButton,
	onSuccess,
	onEdit,
}: FormEditPictureProps) => {
	const form = useForm<PictureFormEdit>({
		resolver: zodResolver(pictureFormEditSchema),
		defaultValues: {
			name,
		},
	});

	const onSubmit = async (data: PictureFormEdit) => {
		try {
			await new Promise(resolve => setTimeout(resolve, 1500));
			await onEdit(data.name);
			onSuccess?.();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<Controller
				name="name"
				control={form.control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor={field.name}>Name</FieldLabel>
						<Input
							{...field}
							id={field.name}
							aria-invalid={fieldState.invalid}
							placeholder="background keren"
						/>

						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>
			{renderButton(form.formState.isSubmitting)}
		</form>
	);
};

export default FormEditPicture;
