import ListPicture from "@/features/home/components/ListPicture";
import Searchbar from "@/features/home/components/Searchbar";
import { usePictureContext } from "@/features/picture/hooks/usePictureContext";

const HomePage = () => {
	const { pictures, loading } = usePictureContext();
	return (
		<main className="pt-4 py-6 bg-background space-y-4 mx-4">
			<Searchbar />
			{loading ? <div>Loading...</div> : <ListPicture pictures={pictures} />}
		</main>
	);
};

export default HomePage;
