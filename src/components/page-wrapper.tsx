type PageWrapperProps = {
  children: React.ReactNode;
};

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <main className="container max-w-desktop min-h-content p-8 pt-header mx-auto">
      {children}
    </main>
  );
}
