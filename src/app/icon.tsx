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
          background:
            "linear-gradient(135deg, #0B3B8F 0%, #125AC5 55%, #36B6FF 100%)",
          borderRadius: "120px",
          position: "relative",
        }}
      >
        <div
          style={{
            width: 340,
            height: 220,
            borderRadius: 999,
            border: "20px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "999px",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 62,
                height: 62,
                borderRadius: "999px",
                background: "#0B3B8F",
              }}
            />
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "999px",
                background: "#7FDBFF",
                position: "absolute",
                top: 28,
                left: 30,
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