const Footer = () => {
  return (
    <footer className="w-full bg-[#0e1013] py-4">
      <div className="container mx-auto text-center">
        <p className="text-gray-300">
          © {new Date().getFullYear()} Templer Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
