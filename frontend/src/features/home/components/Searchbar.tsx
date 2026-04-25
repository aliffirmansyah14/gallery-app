import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Searchbar = () => {
	return (
		<div className="relative">
			<div className="absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground">
				<Search className="size-4" />
			</div>
			<Input
				type="text"
				className="pl-10 py-5 bg-secondary dark:bg-accent rounded-md"
				placeholder="Search..."
			/>
		</div>
	);
};

export default Searchbar;
