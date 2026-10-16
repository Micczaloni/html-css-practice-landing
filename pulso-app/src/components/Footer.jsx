const Footer = () => {
  return (
    <footer className="w-full max-w-full bg-[#ebebeb] pt-8 pb-6 sm:pt-10">
      <div className="mx-auto mb-8 grid w-full min-w-0 max-w-[920px] grid-cols-1 gap-6 px-4 sm:grid-cols-3">
        <div className="min-w-0">
          <p className="mb-1.5 font-bold text-black">PULSO Studio</p>
          <p className="text-[0.95rem] text-gray-600">
            12 Rue du Sport
            <br />
            75011 Paris
          </p>
        </div>
        <div className="min-w-0">
          <p className="mb-1.5 font-bold text-black">Opening hours</p>
          <p className="text-[0.95rem] text-gray-600">
            Mon-Fri 6:30-21:00
            <br />
            Sat-Sun 9:00-14:00
          </p>
        </div>
        <div className="min-w-0">
          <p className="mb-1.5 font-bold text-black">Follow us</p>
          <p className="text-[0.95rem] text-gray-600">
            <a
              href="https://instagram.com"
              rel="noopener noreferrer"
              className="hover:text-black hover:underline"
            >
              Instagram
            </a>
            <br />
            <a
              href="https://tiktok.com"
              rel="noopener noreferrer"
              className="hover:text-black hover:underline"
            >
              TikTok
            </a>
          </p>
        </div>
      </div>
      <p className="px-4 text-center text-sm text-gray-600">
        &copy; 2026 PULSO Studio. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
