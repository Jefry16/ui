import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

const meta = {
	title: "Primitives/DropdownMenu",
	component: DropdownMenu,
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
	render: () => (
		<DropdownMenu defaultOpen>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">More actions</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Experience</DropdownMenuLabel>
				<DropdownMenuItem>
					Edit
					<DropdownMenuShortcut>E</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>Duplicate</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuCheckboxItem checked>Featured</DropdownMenuCheckboxItem>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup value="draft">
					<DropdownMenuRadioItem value="draft">Draft</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="published">
						Published
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};
