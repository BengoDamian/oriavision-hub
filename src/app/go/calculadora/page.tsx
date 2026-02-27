import GoRedirect from "@/components/GoRedirect";

export const dynamic = "error";
export const dynamicParams = false;

export default function Page() {
  return <GoRedirect to="https://calculadoraml.oriavision.com.ar" label="Calculadora ML" />;
}