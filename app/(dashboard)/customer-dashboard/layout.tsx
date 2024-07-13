import CustomerSideber from "./_compo/CustomerSideber";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex container mx-auto">
      <CustomerSideber />
      <div className="w-full">{children}</div>
    </main>
  );
};

export default Layout;
