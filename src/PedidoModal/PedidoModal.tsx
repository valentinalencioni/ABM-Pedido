import { Pedido } from "../types/Pedido";
import { PedidoService } from "../services/PedidoService";
import { Button, Form, FormLabel, Modal } from "react-bootstrap";
import { ModalType } from "../types/ModalType";
import * as Yup from 'yup';
import {useFormik} from "formik";
import { toast } from "react-toastify";
import { EstadoPedido } from "../types/EstadoPedido";
import { TipoEnvio } from "../types/TipoEnvio";
import { FormaPago } from "../types/FormaPago";

type PedidoModalProps={
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    ped: Pedido;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}
const PedidoModal=({show,onHide,title,modalType,ped,refreshData}: PedidoModalProps) =>{
    const handleSaveUpdate = async (ped: Pedido) =>{
        try {
            const isNew =ped.id ===0;
            if(isNew){
                await PedidoService.createPedido(ped);
            } else {
                await PedidoService.updatePedido(ped.id,ped);
            }
            toast.success(isNew ? "Pedido creado" : "Pedido actualizado", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState=> !prevState);
        } catch (error) {
            console.error(error);
            toast.error("Ocurrio un error");
        }
    };

    const handleDelete = async () => {
        try {
            await PedidoService.deletePedido(ped.id);
            toast.success("Se elimino con exito",{
                position : "top-center",
            });
            
            onHide();
            refreshData(prevState=> !prevState);

        } catch (error) {
            console.error(error);
            toast.error("Ocurrio un error");
        };
    }
    const domicilioSchema= Yup.object({
        calle: Yup.string().required('Se requiere la calle'),
        numero: Yup.number().integer().min(0),
        codigoPostal: Yup.number().integer().min(0),
        localidad:Yup.string().required('Se requiere la localidad'),
        numeroDpto: Yup.number().integer().min(0),
        pisoDpto: Yup.number().integer().min(0),
        fechaAlta: Yup.date().required('Se requiere la fecha'),
        fechaModificacion:Yup.date().required('Se requiere la fecha'),
        fechaBaja: Yup.date(),
    });
    const detPedidoSchema=Yup.object({
        cantidad: Yup.number().integer().min(0),
        subtotal: Yup.number().integer().min(0),
        subtotalCosto: Yup.number().integer().min(0),
    });
    const validationSchema = ()=> {
        return Yup.object().shape({
            // id: Yup.number().integer().min(0),
            // denominacion: Yup.string().required('Se requiere el nombre del rubro'),
            fechaPedido:Yup.date().required('Se requiere la fecha'),
            horaEstimadaFinalizacion: Yup.string().matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Ingresa una hora válida (formato HH:mm)').required('La hora es obligatoria'),
            total:Yup.number().integer().min(0).required('Se requiere el total'),
            totalCosto: Yup.number().integer().min(0).required('Se requiere el total del costo'),
            estado: Yup.mixed<EstadoPedido>().oneOf(Object.values(EstadoPedido)).required('Se requiere el estado del pedido'),
            tipoEnvio: Yup.mixed<TipoEnvio>().oneOf(Object.values(TipoEnvio)).required('Se requiere el tipo de envío'),
            formaPago: Yup.mixed<FormaPago>().oneOf(Object.values(FormaPago)).required('Se requiere la forma de pago'),
            domicilioEntrega: domicilioSchema.required('El domicilio es obligatorio'),
            fechaAlta: Yup.date().required('Se requiere la fecha'),
            fechaModificacion: Yup.date(),
            fechaBaja: Yup.date(),
            detallesPedidos: detPedidoSchema.required('El detalle del pedido es obligatorio'),
            id: Yup.number().integer().min(0),
        });
    };

    const formik = useFormik({
        initialValues: ped,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Pedido) => handleSaveUpdate(obj), 
    });

    return (
        <>
            {modalType=== ModalType.DELETE ?(
                <>
                    <Modal show={show} onHide={onHide} centered backdrop="static">
                        <Modal.Header>
                            <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>¿Está seguro de la irreversibilidad de sus actos de borrar <br />
                            <strong>{ped.id}</strong>? </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                            <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
                        </Modal.Footer>
                    </Modal>
                </>
            ) : (
                <>
                    <Modal show ={show} onHide={onHide} centered backdrop="static" className="modal-xl">
                        <Modal.Header closeButton>
                            <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                           <Form onSubmit={formik.handleSubmit}>
                                <Form.Group>
                                    <FormLabel> Fecha Pedido </FormLabel>
                                    <Form.Control 
                                        name= "fechaPedido"
                                        type= "date"
                                        value={formik.values.fechaPedido?.toString()}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.fechaPedido && formik.touched.fechaPedido)}
                                    />
                                    <Form.Control.Feedback type= "invalid">
                                            {formik.errors.fechaPedido}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <FormLabel> Hora Estimada Finalizacion </FormLabel>
                                    <Form.Control 
                                        name= "horaEstimadaFinalizacion"
                                        type= "string"
                                        value={formik.values.horaEstimadaFinalizacion?.toString()}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.horaEstimadaFinalizacion && formik.touched.horaEstimadaFinalizacion)}
                                    />
                                    <Form.Control.Feedback type= "invalid">
                                            {formik.errors.horaEstimadaFinalizacion}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <FormLabel> Total </FormLabel>
                                    <Form.Control 
                                        name= "total"
                                        type= "number"
                                        value={formik.values.total}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.total && formik.touched.total)}
                                    />
                                    <Form.Control.Feedback type= "invalid">
                                            {formik.errors.total}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <FormLabel> Total Costo</FormLabel>
                                    <Form.Control 
                                        name= "totalCosto"
                                        type= "number"
                                        value={formik.values.totalCosto}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.totalCosto && formik.touched.totalCosto)}
                                    />
                                    <Form.Control.Feedback type= "invalid">
                                            {formik.errors.totalCosto}
                                    </Form.Control.Feedback>
                                </Form.Group>                                

                                <Form.Group>
                                    <FormLabel> Estado Pedido </FormLabel>
                                    <Form.Control 
                                        name= "estado"
                                        type= "EstadoPedido"
                                        value={formik.values.estado?.toString()}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.estado && formik.touched.estado)}
                                    />
                                    <Form.Control.Feedback type= "invalid">
                                            {formik.errors.estado}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <FormLabel> Tipo de envío </FormLabel>
                                    <Form.Control 
                                        name= "tipoEnvio"
                                        type= "TipoEnvio"
                                        value={formik.values.tipoEnvio?.toString()}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.tipoEnvio && formik.touched.tipoEnvio)}
                                    />
                                    <Form.Control.Feedback type= "invalid">
                                            {formik.errors.tipoEnvio}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <FormLabel> Forma de Pago </FormLabel>
                                    <Form.Control 
                                        name= "formaPago"
                                        type= "FormaPago"
                                        value={formik.values.formaPago?.toString()}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.formaPago && formik.touched.formaPago)}
                                    />
                                    <Form.Control.Feedback type= "invalid">
                                            {formik.errors.formaPago}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    
                                    <FormLabel> Domicilio de entrega</FormLabel>
                                    <Form.Control 
                                        name= "domicilioEntrega"
                                        type= "Domicilio"
                                        value={formik.values.domicilioEntrega?.toString()}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.domicilioEntrega && formik.touched.domicilioEntrega)}
                                    />
                                    <Form.Control.Feedback type= "invalid">
                                            {formik.errors.domicilioEntrega}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <FormLabel> Fecha Alta </FormLabel>
                                    <Form.Control 
                                        name= "fechaAlta"
                                        type= "date"
                                        value={formik.values.fechaAlta?.toString()}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.fechaAlta && formik.touched.fechaAlta)}
                                    />
                                    <Form.Control.Feedback type= "invalid">
                                            {formik.errors.fechaAlta}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <FormLabel> Fecha Modificacion </FormLabel>
                                    <Form.Control 
                                        name= "fechaModificacion"
                                        type= "date"
                                        value={formik.values.fechaModificacion?.toString()}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.fechaModificacion && formik.touched.fechaModificacion)}
                                    />
                                    <Form.Control.Feedback type= "invalid">
                                            {formik.errors.fechaModificacion}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <FormLabel> Fecha Baja </FormLabel>
                                    <Form.Control 
                                        name= "fechaBaja"
                                        type= "date"
                                        value={formik.values.fechaBaja?.toString()}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        // isInvalid={Boolean(formik.errors.fechaBaja && formik.touched.fechaBaja)}
                                    />
                                    {/* <Form.Control.Feedback type= "invalid">
                                            {formik.errors.fechaBaja}
                                    </Form.Control.Feedback> */}
                                </Form.Group>

                                <Form.Group>
                                    <FormLabel> Detalle Pedido </FormLabel>
                                    <Form.Control 
                                        name= "detallesPedidos"
                                        type= "DetallePedido"
                                        value={formik.values.detallesPedidos?.toString()}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.detallesPedidos && formik.touched.detallesPedidos)}
                                    />
                                    <Form.Control.Feedback type= "invalid">
                                            {formik.errors.detallesPedidos}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <FormLabel> ID </FormLabel>
                                    <Form.Control 
                                        name= "ID"
                                        type= "number"
                                        value={formik.values.id}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.id && formik.touched.id)}
                                    />
                                    <Form.Control.Feedback type= "invalid">
                                            {formik.errors.id}
                                    </Form.Control.Feedback>
                                </Form.Group>


                                <Modal.Footer className="mt-4">
                                        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                                        <Button variant="primary" type="submit" disabled={!formik.isValid}>Guardar</Button>
                                </Modal.Footer>
                           </Form>
                        </Modal.Body>
                    </Modal>
                </>
            )}
        </>
    )

};
export default PedidoModal