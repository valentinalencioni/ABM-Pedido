import { Pedido} from "../types/Pedido";

const BASE_URL = 'http://localhost:8080';

export const PedidoService={
    getPedidos: async() : Promise<Pedido[]>=>{
        const response = await fetch(`${BASE_URL}/api/v1/pedidos`);
    const data = await response.json();
    return data;
    },
    getPedido: async (id: number): Promise<Pedido> => {
        const response = await fetch(`${BASE_URL}/api/v1/pedidos/${id}`);
        const data = await response.json();
        return data;
    },
    createPedido: async (pedido: Pedido): Promise<Pedido>=> {
        const response = await fetch( `${BASE_URL}/api/v1/pedidos`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        });

        const data = await response.json();
        return data;
    },
    updatePedido: async (id:number,pedido:Pedido):Promise<Pedido>=>{
        const response = await fetch( `${BASE_URL}/api/v1/pedidos/${id}`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        });

        const data = await response.json();
        return data;

    },

    deletePedido: async (id:number):Promise<void>=>{
        await fetch( `${BASE_URL}/api/v1/pedidos/${id}`,{method: "DELETE",});
    } 
}