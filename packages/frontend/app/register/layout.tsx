import { RootNavMenu } from "../../components/nav/root";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <RootNavMenu />
      {children}
    </section>
  );
}
