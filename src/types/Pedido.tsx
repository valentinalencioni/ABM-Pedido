import { DetallePedido } from "./DetallePedido";
import { Domicilio } from "./Domicilio";
import { EstadoPedido } from "./EstadoPedido";
import { FormaPago } from "./FormaPago";
import { TipoEnvio } from "./TipoEnvio";
// {
//     "fechaPedido": "2023-07-11T03:00:00.000+00:00",
//     "horaEstimadaFinalizacion": "1970-01-02T00:05:03.000+00:00",
//     "total": 9000,
//     "totalCosto": 3000,
//     "estado": "PAGADO",
//     "tipoEnvio": "TAKE_AWAY",
//     "formaPago": "EFECTIVO",
//     "domicilioEntrega": {
//         "calle": "San Martin",
//         "numero": 287,
//         "codigoPostal": 5533,
//         "localidad": "Guaymallen",
//         "numeroDpto": 2,
//         "pisoDpto": 4,
//         "fechaAlta": "2023-09-13T03:00:00.000+00:00",
//         "fechaModificacion": "2023-03-21T03:00:00.000+00:00",
//         "fechaBaja": "2023-05-19T03:00:00.000+00:00"
//     },
//     "fechaAlta": "2023-09-13T03:00:00.000+00:00",
//     "fechaModificacion": "2023-03-21T03:00:00.000+00:00",
//     "fechaBaja": "2023-05-19T03:00:00.000+00:00",
//     "detallesPedidos": [
//         {
           
//             "cantidad": 3,
//             "subtotal": 2000,
//             "subtotalCosto": 1000
//         },
//         {
           
//             "cantidad": 7,
//             "subtotal": 5000,
//             "subtotalCosto": 2500
//         }
//     ]
// }
export interface Pedido{
    fechaPedido:Date|null;
    horaEstimadaFinalizacion: '';
    total: number;
    totalCosto: number;
    estado: EstadoPedido|null;
    tipoEnvio: TipoEnvio|null;
    formaPago: FormaPago|null;
    domicilioEntrega: Domicilio|null;
    fechaAlta: Date|null;
    fechaModificacion: Date|null;
    fechaBaja: Date|null;
    detallesPedidos: DetallePedido[]|null;
    id: number;
}