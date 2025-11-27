// LoadingExample.jsx
import { ClipLoader } from "react-spinners";

function Loading({ loading }) {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
      <ClipLoader color="#36d7b7" loading={loading} size={50} />
    </div>
  );
}

export default Loading;