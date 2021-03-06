type AppProps = {
  active: boolean;
};

const DropdownArrow = ({ active }: AppProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M7 9.5L12 14.5L17 9.5H7Z" fill={active ? '#FFF' : '#939FA5'} />
    </svg>
  );
};

export default DropdownArrow;
