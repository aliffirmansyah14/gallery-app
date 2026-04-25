import { Button } from "@/components/ui/button";
import { Menubar, MenubarContent, MenubarItem, MenubarTitle } from "./Menubar";

const Siderbar = () => {
	return (
		<aside className="z-10 max-sm:invisible p-4 border-r border-muted sticky top-16 h-[calc(100dvh-64px)]">
			<div className="flex flex-col gap-3 h-full">
				<div className="space-y-3">
					<h2 className="tracking-tight uppercase text-muted-foreground font-medium">
						Filters
					</h2>
					<Menubar>
						<MenubarTitle className="font-medium ">Date</MenubarTitle>
						<MenubarContent className="gap-1">
							<MenubarItem className="gap-1">
								<input type="checkbox" />
								<span className="tracking-tight">Today</span>
							</MenubarItem>
							<MenubarItem>
								<input type="checkbox" />
								<span className="tracking-tight">This week</span>
							</MenubarItem>
							<MenubarItem>
								<input type="checkbox" />
								<span className="tracking-tight">This month</span>
							</MenubarItem>
							<MenubarItem>
								<input type="checkbox" />
								<span className="tracking-tight">This year</span>
							</MenubarItem>
							<MenubarItem>
								<input type="checkbox" />
								<span className="tracking-tight">All</span>
							</MenubarItem>
						</MenubarContent>
					</Menubar>
					<Menubar>
						<MenubarTitle className="font-medium ">Sort By</MenubarTitle>
						<MenubarContent>
							<MenubarItem>
								<Button className="rounded-md w-full">Dropdown sortby</Button>
							</MenubarItem>
						</MenubarContent>
					</Menubar>
				</div>
				<div className="flex flex-col gap-2 mt-auto">
					<Button className="rounded-md w-full"> Apply Filters</Button>
					<Button className="rounded-md w-full" variant="secondary">
						Reset Filters
					</Button>
				</div>
			</div>
		</aside>
	);
};

export default Siderbar;
