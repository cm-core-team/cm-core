import { User_WithCongregation } from "@/lib/types/compositions";

export interface DashboardComponentProps {
  currentUser: User_WithCongregation;
}

export type RenderDashboardItem = () => JSX.Element;
