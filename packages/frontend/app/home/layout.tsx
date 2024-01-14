import { RootNavMenu } from "@/components/nav/root";

export default function LoginLayout({
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
