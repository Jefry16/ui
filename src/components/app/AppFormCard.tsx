import { Card, CardContent } from "../ui/card";
import { AppForm, type AppFormProps } from "./AppForm";

export const AppFormCard = (props: AppFormProps) => (
	<Card>
		<CardContent>
			<AppForm {...props} />
		</CardContent>
	</Card>
);
