import { useState } from "react";
import { Oval } from "react-loader-spinner";

interface ImageSpinnerProps {
  src: string;
  alt: string;
  width: string;
  height: string;
}

const ImageSpinner = ({ src, alt, width, height }: ImageSpinnerProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = (e: any) => {
    e.currentTarget.src = "https://серебро.рф/img/placeholder.png";
    setLoading(false);
  };

  return (
    <div className={`relative w-${width} h-${height}`}>
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center">
          <Oval color="#00BFFF" height={32} width={32} />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`w-${width} h-${height} rounded object-cover ${
          loading ? "hidden" : "block"
        }`}
      />
    </div>
  );
};

export default ImageSpinner;
