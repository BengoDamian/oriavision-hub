import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "120px",
        }}
      >
        <div
          style={{
            width: 280,
            height: 280,
            borderRadius: "999px",
            border: "34px solid white",
            position: "relative",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: "999px",
              background: "#7FDBFF",
              position: "absolute",
              top: 36,
              left: 36,
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