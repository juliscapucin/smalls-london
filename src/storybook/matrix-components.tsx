import type { ReactNode } from "react";

type MatrixSectionProps = {
  title: string;
  children: ReactNode;
};

function MatrixSection({ title, children }: MatrixSectionProps) {
  return (
    <div className="flex flex-col gap-4 bg-background p-8 text-foreground">
      <section className="flex flex-col gap-4">
        <h3 className="text-title-small leading-title-small tracking-title-small capitalize">
          {title}
        </h3>
        <div className="overflow-x-auto">{children}</div>
      </section>
    </div>
  );
}

export { MatrixSection };
