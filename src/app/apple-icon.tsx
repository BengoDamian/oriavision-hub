import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B3B8F",
          borderRadius: "44px",
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: "999px",
            border: "14px solid white",
            position: "relative",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "999px",
              background: "#7FDBFF",
              position: "absolute",
              top: 12,
              left: 12,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}