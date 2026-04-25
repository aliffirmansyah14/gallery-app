import { cn } from "@/lib/utils";

export const Menubar = ({
	className,
	...props
}: React.ComponentProps<"div">) => {
	return <div className={cn("space-y-2", className)} {...props} />;
};
export const MenubarTitle = ({
	className,
	...props
}: React.ComponentProps<"div">) => {
	return <div className={cn("font-heading", className)} {...props} />;
};
export const MenubarContent = ({
	className,
	...props
}: React.ComponentProps<"ul">) => {
	return <ul className={cn("flex flex-col gap-2", className)} {...props} />;
};
export const MenubarItem = ({
	className,
	...props
}: React.ComponentProps<"li">) => {
	return <li className={cn("flex items-center gap-1", className)} {...props} />;
};
