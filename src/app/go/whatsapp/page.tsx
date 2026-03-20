import GoRedirect from "@/components/GoRedirect";

export const dynamic = "error";
export const dynamicParams = false;

export default function Page() {
  return (
    <GoRedirect
      to="https://wa.me/5491127575675?text=Hola%20Oriavision%21%20Vi%20la%20p%C3%A1gina%20y%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20herramientas%20y%20servicios.%20%C2%BFMe%20ayudan%3F"
      label="WhatsApp"
    />
  );
}