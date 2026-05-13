import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import FormEditPicture from "./FormEditPicture";
import { useState } from "react";
import type { Picture } from "../types";

interface EditPictureDialogProps {
	picture: Picture;
	onSuccess?: () => void;
	onEdit: (name: string) => Promise<void>;
}

const EditPictureDialog = ({
	picture,
	onSuccess,
	onEdit,
}: EditPictureDialogProps) => {
	const [open, setOpen] = useState<boolean>(false);

	const handleSuccess = () => {
		setOpen(false); // Langsung tutup
		onSuccess?.();
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="secondary" size="lg">
					Edit
				</Button>
			</DialogTrigger>
			<DialogOverlay className="z-51" />
			<DialogContent className="sm:max-w-sm z-52" showCloseButton={false}>
				<DialogHeader>
					<DialogTitle>Edit Picture</DialogTitle>
					<DialogDescription>Ubah nama file gambar ini.</DialogDescription>
				</DialogHeader>

				<FormEditPicture
					name={picture.name}
					onEdit={onEdit}
					onSuccess={handleSuccess}
					renderButton={loading => (
						<DialogFooter className="mt-4">
							<DialogClose asChild>
								<Button type="button" variant="ghost" disabled={loading}>
									Cancel
								</Button>
							</DialogClose>
							<Button disabled={loading} type="submit">
								{loading ? "Saving..." : "Save Changes"}
							</Button>
						</DialogFooter>
					)}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default EditPictureDialog;
