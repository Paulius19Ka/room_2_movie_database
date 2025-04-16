import { Skeleton } from "@mui/material";

type SkeletonBlockProps = {
  variant: "login" | "register" | "addMovie" | "editMovie" | "home"; // 🆕 pridėtas "home"
};

const SkeletonBlock = ({ variant }: SkeletonBlockProps) => {
  switch (variant) {
    case "login":
      return (
        <>
          <Skeleton height={50} width="40%" sx={{ bgcolor: "var(--skeleton-main)" }} />
          <Skeleton height={200} width="100%" sx={{ bgcolor: "var(--skeleton-main)" }} />
          <Skeleton height={40} width="20%" sx={{ bgcolor: "var(--skeleton-main)" }} />
        </>
      );

    case "register":
      return (
        <>
          <Skeleton height={50} width="40%" sx={{ bgcolor: "var(--skeleton-main)" }} />
          <Skeleton height={500} width="100%" sx={{ bgcolor: "var(--skeleton-main)" }} />
          <Skeleton height={40} width="20%" sx={{ bgcolor: "var(--skeleton-main)" }} />
        </>
      );

    case "addMovie":
      return (
        <>
          <Skeleton height={50} width="40%" sx={{ bgcolor: "var(--skeleton-main)" }} />
          <Skeleton height={600} width="100%" sx={{ bgcolor: "var(--skeleton-main)" }} />
          <Skeleton height={40} width="20%" sx={{ bgcolor: "var(--skeleton-main)" }} />
        </>
      );

    case "editMovie":
      return (
        <>
          <Skeleton height={50} width="40%" sx={{ bgcolor: "var(--skeleton-main)" }} />
          <Skeleton height={30} width="60%" sx={{ bgcolor: "var(--skeleton-main)", mb: 2 }} />
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} height={80} width="100%" sx={{ bgcolor: "var(--skeleton-main)", mb: 2 }} />
          ))}
          <Skeleton height={40} width="30%" sx={{ bgcolor: "var(--skeleton-main)" }} />
        </>
      );

    case "home": 
      return (
        <>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{ width: 250, display: "flex", flexDirection: "column", gap: "10px", marginBottom: 16 }}
            >
              <Skeleton variant="rectangular" width="100%" height={360} sx={{ bgcolor: "var(--skeleton-main)" }} />
              <Skeleton width="80%" sx={{ bgcolor: "var(--skeleton-main)" }} />
              <Skeleton width="60%" sx={{ bgcolor: "var(--skeleton-main)" }} />
            </div>
          ))}
        </>
      );

    default:
      return null;
  }
};

export default SkeletonBlock;