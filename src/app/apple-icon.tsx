import { ImageResponse } from "next/og";

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
          background: "white",
          borderRadius: "40px",
          position: "relative",
        }}
      >
        <div
          style={{
            width: 120,
            height: 78,
            borderRadius: 999,
            border: "10px solid #0B3B8F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "999px",
              background: "#0B3B8F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "999px",
                background: "#7FDBFF",
                position: "absolute",
                top: 8,
                left: 8,
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}