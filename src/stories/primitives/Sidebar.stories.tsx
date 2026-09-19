import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarDays, Inbox, LayoutDashboard } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "../../components/ui/sidebar";

const meta = {
	title: "Primitives/Sidebar",
	component: Sidebar,
	parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<SidebarProvider>
			<Sidebar>
				<SidebarHeader className="text-sm font-semibold">
					Fresh Tours
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>Operations</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton isActive>
										<LayoutDashboard />
										Dashboard
									</SidebarMenuButton>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton>
										<CalendarDays />
										Availability
									</SidebarMenuButton>
								</SidebarMenuItem>
								<SidebarMenuItem>
									<SidebarMenuButton>
										<Inbox />
										Inbox
									</SidebarMenuButton>
									<SidebarMenuBadge>3</SidebarMenuBadge>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter className="text-xs text-muted-foreground">
					Signed in as Jefry
				</SidebarFooter>
			</Sidebar>
			<SidebarInset>
				<div className="flex items-center gap-2 p-4">
					<SidebarTrigger />
					<span className="text-sm">Content</span>
				</div>
			</SidebarInset>
		</SidebarProvider>
	),
};
