interface IArrow {
  className: string;
}

const Arrow = ({ className }: IArrow) => {
  return (
    <svg
      className={`${className} transition-transform duration-300 group-hover:translate-x-1.5`}
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.2197 0.96967C11.5126 0.676777 11.9874 0.676777 12.2803 0.96967L19.7803 8.46967C19.921 8.61032 20 8.80109 20 9C20 9.19891 19.921 9.38968 19.7803 9.53033L12.2803 17.0303C11.9874 17.3232 11.5126 17.3232 11.2197 17.0303C10.9268 16.7374 10.9268 16.2626 11.2197 15.9697L17.4393 9.75H1.25C0.835786 9.75 0.5 9.41421 0.5 9C0.5 8.58579 0.835786 8.25 1.25 8.25H17.4393L11.2197 2.03033C10.9268 1.73744 10.9268 1.26256 11.2197 0.96967Z"
        fill="#1E293B"
      />
    </svg>
  );
};

export default Arrow;
