import { User_WithCongregation } from "@/lib/types/models/compositions";

export interface DashboardComponentProps {
  currentUser: User_WithCongregation;
}

export type RenderDashboardItem = () => JSX.Element;
