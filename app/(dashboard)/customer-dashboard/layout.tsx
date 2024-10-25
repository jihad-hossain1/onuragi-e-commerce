import CustomerSideber from "./_compo/CustomerSideber";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex w-11/12 mx-auto">
      <CustomerSideber />
      <div className="w-full max-sm:mt-16">{children}</div>
    </main>
  );
};

export default Layout;
