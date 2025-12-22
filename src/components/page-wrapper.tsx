type PageWrapperProps = {
  children: React.ReactNode;
};

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <main className="container max-w-desktop min-h-content px-4 md:px-8 pt-header mx-auto">
      {children}
    </main>
  );
}
