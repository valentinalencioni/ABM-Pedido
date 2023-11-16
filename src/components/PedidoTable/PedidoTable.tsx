import { Pedido } from "../../types/Pedido"
import { PedidoService } from "../../services/PedidoService";
import { useEffect, useState } from "react";
import { ModalType } from "../../types/ModalType";
import { Button, Table } from "react-bootstrap";
import Loader from "../Loader/Loader";
import { EditButton } from "../EditButton/EditButton";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import PedidoModal from "../../PedidoModal/PedidoModal";


const PedidoTable=()=>{
    
    const[pedidos, setPedidos]=useState<Pedido[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);

    
        useEffect(()=> {
        
        const fetchPedidos = async()=>{
            const pedidos = await PedidoService.getPedidos(); 
            setPedidos(pedidos);
            setIsLoading(false);
        }
        fetchPedidos();
    },[refreshData]);

    console.log(JSON.stringify(pedidos,null,2));

    const initializeNewPedido = (): Pedido=>{
        return {
            fechaPedido:null,
            horaEstimadaFinalizacion: null,
            total: 0,
            totalCosto: 0,
            estado: null,
            tipoEnvio: null,
            formaPago: null,
            domicilioEntrega: null,
            fechaAlta: null,
            fechaModificacion: null,
            fechaBaja: null,
            detallesPedidos: null,
            id: 0,
        };
    }; 
    const [pedido, setPedido] = useState<Pedido>(initializeNewPedido);

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title,setTitle]=useState("");

    const handleClick = (newTitle:string, ped:Pedido,modal: ModalType)=>{
        setTitle(newTitle);
        setModalType(modal);
        setPedido(ped);
        setShowModal(true);
    };

    return(
        <>
            <Button onClick={()=> handleClick("Nuevo Pedido", initializeNewPedido(),ModalType.CREATE)}> Nuevo Pedido </Button>
            {isLoading ? <Loader/> :(
            <Table hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Editar</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map( pedido => (
                        <tr key={pedido.id}>
                            <td>{pedido.id}</td>
                            <td><EditButton onClick={()=> handleClick("Editar rubro", pedido, ModalType.UPDATE)}/></td>
                            <td><DeleteButton onClick={()=> handleClick("Borrar rubro", pedido, ModalType.DELETE)}/></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
            
        {showModal && (
            <PedidoModal
            show={showModal}
            onHide={()=>setShowModal(false)}
            title={title}
            modalType={modalType}
            ped={pedido}
            refreshData={setRefreshData}
            />
        )}
        </>
    )
}
export default PedidoTable