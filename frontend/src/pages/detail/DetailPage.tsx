import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import DetailPicture from "@/features/picture/components/DetailPicture";
import { usePictureDetail } from "@/features/picture/hooks/usePictureDetail";
import { VisuallyHidden } from "radix-ui";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DetailPage = () => {
	const { id } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		if (!id || id === "undefined") {
			navigate("/", { replace: true });
		}
	}, [id, navigate]);

	const handleClose = () => {
		navigate("/", {
			replace: true,
		});
	};
	const { picture, loading } = usePictureDetail(id || "");

	return (
		<Dialog open={true} onOpenChange={open => !open && handleClose()}>
			<DialogContent
				className="max-w-full sm:max-w-fit p-0 bg-transparent "
				showCloseButton={false}
			>
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
					<DetailPicture picture={picture} onClick={handleClose} />
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
