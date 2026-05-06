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
import { useTransition } from "react";
import { deleteFile } from "../services";
import { getCleanErrorMessage } from "@/lib/get-clean-error-message";
import { Spinner } from "@/components/ui/spinner";

interface DeletePictureDialogProps {
	id: string;
	onSuccess?: () => void;
}

const DialogDeletePicture = ({ id, onSuccess }: DeletePictureDialogProps) => {
	const [isPending, startTransition] = useTransition();

	const handleDeletePicture = () => {
		if (!id.trim()) return;

		startTransition(async () => {
			try {
				const result = await deleteFile(id);
				console.log(result.data);

				onSuccess?.();
			} catch (error) {
				const err = getCleanErrorMessage(error);

				console.log(err);
			}
		});
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size="lg"
					className="bg-destructive hover:bg-destructive/40 text-white"
				>
					Delete
				</Button>
			</DialogTrigger>
			<DialogOverlay className="z-51" />
			<DialogContent className="sm:max-w-sm z-52" showCloseButton={false}>
				<DialogHeader className="gap-3">
					<DialogTitle className="text-center">Delete picture?</DialogTitle>
					<DialogDescription>
						Picture akan dihapus secara permanent, apakah anda sudah yakin?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="grid grid-cols-2">
					<DialogClose asChild>
						<Button type="button" disabled={isPending}>
							Close
						</Button>
					</DialogClose>
					<Button
						type="button"
						variant="destructive"
						disabled={isPending}
						onClick={handleDeletePicture}
					>
						{isPending ? (
							<>
								<Spinner className="anime" /> Deleting...
							</>
						) : (
							"Delete"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DialogDeletePicture;
