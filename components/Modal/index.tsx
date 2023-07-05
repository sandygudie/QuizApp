import React, { useEffect, useRef } from "react";

interface IModalProps {
  handleCloseModal?: () => void;
  children: any;
}

function Index({ children, handleCloseModal }: IModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleCloseModal?.();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="w-11/12 md:w-96 bg-white rounded-xl text-secondary z-40 absolute top-1/2 mt-8 left-2/4 translate-x-2/4 translate-y-2/4 p-6"
    >
      {children}
    </div>
  );
}

export default Index;
