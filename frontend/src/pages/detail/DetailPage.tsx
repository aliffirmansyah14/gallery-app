import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogOverlay,
	DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import ActionButtonDetailPicture from "@/features/picture/components/ActionButtonDetailPicture";
import DetailPicture from "@/features/picture/components/DetailPicture";
import { usePictureDetail } from "@/features/picture/hooks/usePictureDetail";
import { VisuallyHidden } from "radix-ui";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DetailPage = () => {
	const navigate = useNavigate();

	const { id } = useParams();
	const { picture, loading, handleDelete, handleUpdate, isPending } =
		usePictureDetail(id || "");

	const handleClose = () => {
		navigate("/", {
			replace: true,
		});
	};

	useEffect(() => {
		if (!id || id === "undefined" || (!loading && !picture)) {
			handleClose();
		}
	}, [id, navigate, picture, loading]);

	return (
		<Dialog open={true} onOpenChange={open => !open && handleClose()}>
			<DialogOverlay />
			<DialogContent
				className="max-w-full sm:max-w-fit p-0 bg-transparent "
				showCloseButton={false}
			>
				{/* tidak akan tampil di layar  */}
				<VisuallyHidden.Root>
					<DialogTitle>Detail Gambar {picture?.name}</DialogTitle>
					<DialogDescription>Detail Gambar {picture?.name}</DialogDescription>
				</VisuallyHidden.Root>

				{loading && (
					<div className="absolute top-1/2 left-1/2 -translate-1/2">
						<Spinner className="size-10 text-white" />
					</div>
				)}
				{!loading && picture && (
					<>
						<DetailPicture picture={picture} onClick={handleClose} />
						<ActionButtonDetailPicture
							isPending={isPending}
							onDelete={handleDelete}
							onEdit={async name => {
								// ambil yang data yang sesuai
								const { id, createdAt, size, ...data } = { ...picture };

								await handleUpdate({
									...data,
									name,
								});
							}}
							onClose={handleClose}
							picture={picture}
						/>
					</>
				)}
			</DialogContent>
		</Dialog>
		// <div
		// 	onClick={() => {
		// 		handleClose();
		// 	}}
		// 	className="fixed inset-0 z-50 bg-black/90 overflow-hidden"
		// >
		// 	{loading && <Spinner />}
		// 	{!loading && picture && <DetailPicture picture={picture} />}
		// </div>
	);
};

export default DetailPage;
