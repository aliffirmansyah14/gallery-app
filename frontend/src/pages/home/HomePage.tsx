import { useFiles } from "@/features/file/hooks/useFiles";
import ListPicture from "@/features/home/components/ListPicture";
import Searchbar from "@/features/home/components/Searchbar";

const HomePage = () => {
	const { files, loading } = useFiles();
	return (
		<main className="pt-4 py-6 bg-background space-y-4 mx-4">
			<Searchbar />
			{loading ? <div>Loading...</div> : <ListPicture pictures={files} />}
		</main>
	);
};

export default HomePage;
