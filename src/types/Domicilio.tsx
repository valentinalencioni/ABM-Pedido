// "calle": "San Martin",
//         "numero": 287,
//         "codigoPostal": 5533,
//         "localidad": "Guaymallen",
//         "numeroDpto": 2,
//         "pisoDpto": 4,
//         "fechaAlta": "2023-09-13T03:00:00.000+00:00",
//         "fechaModificacion": "2023-03-21T03:00:00.000+00:00",
//         "fechaBaja": "2023-05-19T03:00:00.000+00:00"
export interface Domicilio{
    calle: string;
    numero: number;
    codigoPostal: number;
    localidad: string;
    numeroDpto: number;
    pisoDpto: number;
    fechaAlta: Date;
    fechaModificacion: Date;
    fechaBaja: Date;
}