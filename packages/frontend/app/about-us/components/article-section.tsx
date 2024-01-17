export function ArticleSection({
  sectionHeading,
  sectionText,
}: {
  sectionHeading: string;
  sectionText: string;
}) {
  return (
    <section className="flex flex-col items-center gap-y-2 mt-4">
      <h2 className="text-4xl">{sectionHeading}</h2>
      <p className="w-1/2">{sectionText}</p>
    </section>
  );
}
