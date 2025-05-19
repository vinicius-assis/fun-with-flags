import { HeartIcon } from "@heroicons/react/24/solid";

const Footer = () => {
  return (
    <footer className="py-6 mt-8">
      <p className="flex justify-center items-center">
        Made with <HeartIcon className="size-4 mx-1" /> by Vinicius Assis
      </p>
    </footer>
  );
};

export default Footer;
