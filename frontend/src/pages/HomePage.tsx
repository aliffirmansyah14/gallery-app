import ListPicture from "@/features/home/components/ListPicture";
import Searchbar from "@/features/home/components/Searchbar";

const HomePage = () => {
	return (
		<main className="pt-4 py-6 bg-background space-y-4 mx-4">
			<Searchbar />
			<ListPicture />
		</main>
	);
};

export default HomePage;
