type CFContext = {
  request: Request;
};

/** Redirección canónica del catálogo anterior, conservando filtros y atribución. */
export const onRequest = ({ request }: CFContext) => {
  const destination = new URL(request.url);
  destination.pathname = "/servicios/diseno-web/inspiracion/";
  return Response.redirect(destination.toString(), 301);
};
