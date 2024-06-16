import useAuth from "@/hooks/useAuth";

interface IUserInfo {
  fullName: string | undefined;
  roles: Array<string>;
}

const UserInfo = ({ fullName, roles }: IUserInfo) => {
  const { handleLogout } = useAuth();
  return (
    <div className="mt-auto p-5">
      <div className="flex space-x-2 mb-4">
        {roles.map((role: string, index) => {
          return (
            <span className="bg-gray-300 px-2 py-1 rounded text-sm" key={index}>
              {role}
            </span>
          );
        })}
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm w-40">{fullName}</div>
        <button onClick={handleLogout}>
          <svg
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 2C2.17157 2 1.5 2.67157 1.5 3.5L1.5 17C1.5 17.8284 2.17157 18.5 3 18.5H9C9.82843 18.5 10.5 17.8284 10.5 17V13.25C10.5 12.8358 10.8358 12.5 11.25 12.5C11.6642 12.5 12 12.8358 12 13.25V17C12 18.6569 10.6569 20 9 20H3C1.34315 20 -8.9407e-08 18.6569 0 17L5.81145e-07 3.5C6.70552e-07 1.84315 1.34315 0.5 3 0.5L9 0.5C10.6569 0.5 12 1.84315 12 3.5V7.25C12 7.66421 11.6642 8 11.25 8C10.8358 8 10.5 7.66421 10.5 7.25V3.5C10.5 2.67157 9.82843 2 9 2L3 2ZM13.7197 6.71967C14.0126 6.42678 14.4874 6.42678 14.7803 6.71967L17.7803 9.71967C18.0732 10.0126 18.0732 10.4874 17.7803 10.7803L14.7803 13.7803C14.4874 14.0732 14.0126 14.0732 13.7197 13.7803C13.4268 13.4874 13.4268 13.0126 13.7197 12.7197L15.4393 11L4.5 11C4.08579 11 3.75 10.6642 3.75 10.25C3.75 9.83579 4.08579 9.5 4.5 9.5L15.4393 9.5L13.7197 7.78033C13.4268 7.48744 13.4268 7.01256 13.7197 6.71967Z"
              fill="#0F172A"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
