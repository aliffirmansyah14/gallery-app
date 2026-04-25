import { Button } from "@/components/ui/button";
import { Plus, Settings, User } from "lucide-react";

const Header = () => {
	return (
		<div className="w-full h-16 sticky top-0 z-20 bg-background border-b border-muted flex items-center">
			<header className="w-full mx-auto px-4">
				<div className="flex justify-between items-center">
					<h1 className="font-bold text-2xl">
						Aii<span className="text-xl font-medium">cloud</span>
					</h1>
					<div className="flex justify-center items-center gap-1">
						<Button
							variant="secondary"
							className="rounded-md size-9 dark:bg-transparent dark:hover:bg-accent dark:text-white text-gray-500 max-sm:hidden"
						>
							<Settings />
						</Button>
						<Button
							variant="secondary"
							className="ounded-md size-9 dark:bg-transparent dark:hover:bg-accent dark:text-white text-gray-500"
						>
							<User />
						</Button>
						<Button className="px-4 rounded-2xl h-9">
							<Plus className="size-6" /> Upload
							<span className="max-sm:hidden">New Image</span>
						</Button>
					</div>
				</div>
			</header>
		</div>
	);
};

export default Header;
