type PageWrapperProps = {
  children: React.ReactNode;
};

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <main className="container max-w-desktop min-h-content px-4 md:px-8 pt-header mt-40 mx-auto">
      {children}
    </main>
  );
}
