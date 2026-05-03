import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import CreatePictureForm from "./CreatePictureForm";

const CreatePictureDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="px-4 rounded-2xl h-9 cursor-pointer">
					<Plus className="size-6" /> Upload
					<span className="max-sm:hidden">New Image</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Add picture</DialogTitle>
					<DialogDescription>
						Masukkan file gambar untuk diupload.
						<div className="italic text-[10px]">
							* Format image .jpg, .png, .webp
						</div>
					</DialogDescription>
				</DialogHeader>
				<CreatePictureForm />
			</DialogContent>
		</Dialog>
	);
};

export default CreatePictureDialog;
