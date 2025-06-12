import { FadeLoader } from 'react-spinners';

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <FadeLoader color="#000" />
    </div>
  );
}

export default LoadingSpinner