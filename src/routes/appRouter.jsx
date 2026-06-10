import App from "../App";
import Confirmacion from "../pages/registration-management/Confirmacion";
import DetalleCurso from "../pages/registration-management/DetalleCurso";
import MisCursos from "../pages/registration-management/MisCursos";
import ProcesoInscripcion from "../pages/registration-management/ProcesoInscripcion";

export const routerApp = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "detalle-curso",
        element: <DetalleCurso />
      },
      {
        path: "proceso-inscripcion",
        element: <ProcesoInscripcion />
      },
      {
        path: "mis-cursos",
        element: <MisCursos />
      },
      {
        path: "confirmacion",
        element: <Confirmacion />
      }
    ]
  }
];