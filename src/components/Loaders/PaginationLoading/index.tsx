import { SyncLoader } from "react-spinners";

const PaginationLoading = () => {
  return (
    <div
      style={{
        textAlign: "center",
        margin: "20px 0px",
      }}
    >
      <SyncLoader color="#36d7b7" />
    </div>
  );
};

export default PaginationLoading;
