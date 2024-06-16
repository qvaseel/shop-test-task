import { IMenuButton } from "@/types/types";

const CardsButton = ({ isActive, onClick }: IMenuButton) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-[10px] rounded-r-[6px] ${
        isActive ? "bg-[#94A3B8]" : "bg-[#CBD5E1]"
      }`}
    >
      <svg
        className="hover:scale-125 transition-all"
        width="18"
        height="19"
        viewBox="0 0 18 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 3.5C0 1.84315 1.34315 0.5 3 0.5H5.25C6.90685 0.5 8.25 1.84315 8.25 3.5V5.75C8.25 7.40685 6.90685 8.75 5.25 8.75H3C1.34315 8.75 0 7.40685 0 5.75V3.5ZM9.75 3.5C9.75 1.84315 11.0931 0.5 12.75 0.5H15C16.6569 0.5 18 1.84315 18 3.5V5.75C18 7.40685 16.6569 8.75 15 8.75H12.75C11.0931 8.75 9.75 7.40685 9.75 5.75V3.5ZM0 13.25C0 11.5931 1.34315 10.25 3 10.25H5.25C6.90685 10.25 8.25 11.5931 8.25 13.25V15.5C8.25 17.1569 6.90685 18.5 5.25 18.5H3C1.34315 18.5 0 17.1569 0 15.5V13.25ZM9.75 13.25C9.75 11.5931 11.0931 10.25 12.75 10.25H15C16.6569 10.25 18 11.5931 18 13.25V15.5C18 17.1569 16.6569 18.5 15 18.5H12.75C11.0931 18.5 9.75 17.1569 9.75 15.5V13.25Z"
          fill="#1E293B"
        />
      </svg>
    </button>
  );
};

export default CardsButton;
