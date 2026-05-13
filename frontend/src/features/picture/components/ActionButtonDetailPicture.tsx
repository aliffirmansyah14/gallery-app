import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { Portal } from "radix-ui";
import DialogDeletePicture from "./DeletePictureDialog";
import type { Picture } from "../types";
import { getTemporaryUrl } from "../services";
import EditPictureDialog from "./EditPictureDialog";

interface ActionButtonDetailPictureProps {
	picture: Picture;
	onEdit: (name: string) => Promise<void>;
	onDelete: () => Promise<void>;
	onClose: () => void;
	isPending: boolean;
}

const ActionButtonDetailPicture = ({
	picture,
	onClose,
	onEdit,
	onDelete,
	isPending,
}: ActionButtonDetailPictureProps) => {
	const handleDownloadPicture = async () => {
		try {
			const url = await getTemporaryUrl(picture.url);

			const a = document.createElement("a");
			a.href = url;
			a.hidden = true;
			a.download = `${picture.name || "gambar"}.jpg`;
			document.body.appendChild(a); // Tambahkan ke DOM sebentar (opsional tapi aman)
			a.click();

			// Bersihkan memori
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		} catch (error) {
			console.error("Gagal mengunduh gambar:", error);
		}
	};

	return (
		<Portal.Root>
			<div className="fixed z-51 p-3 isolate w-full top-0 flex justify-between pointer-events-auto">
				<Button variant="secondary" size="icon-lg" onClick={onClose}>
					<X className="size-6" />
				</Button>
				<div className="flex items-center gap-2">
					<Button
						size="icon-lg"
						variant="secondary"
						onClick={handleDownloadPicture}
					>
						<Download className="size-6" />
					</Button>
					<div className="w-0.5 bg-secondary self-stretch" />
					<div className="grid grid-cols-2 gap-1">
						<EditPictureDialog picture={picture} onEdit={onEdit} />
						<DialogDeletePicture
							isPending={isPending}
							onDelete={onDelete}
							onSuccess={onClose}
						/>
					</div>
				</div>
			</div>
		</Portal.Root>
	);
};

export default ActionButtonDetailPicture;
