import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

/** Returns visitors to the page they came from; falls back to Home on a direct landing. */
const BackButton = () => {
  const { pathname, key } = useLocation();
  const navigate = useNavigate();
  if (pathname === "/") return null;
  const goBack = () => (key !== "default" && window.history.length > 1 ? navigate(-1) : navigate("/"));
  return (
    <div className="container pt-4">
      <button
        type="button"
        onClick={goBack}
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-secondary"
      >
        <ArrowLeft size={15} aria-hidden="true" />
        Back
      </button>
    </div>
  );
};

export default BackButton;
