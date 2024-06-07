import { MutatingDots } from "react-loader-spinner";

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <MutatingDots
        visible
        height="200"
        width="200"
        color="#30323D"
        secondaryColor="#30323D"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
      />
    </div>
  );
}

export default LoadingSpinner;
