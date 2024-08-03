interface Cliente {
    id: string;
    nombre: string;
}
export declare class ChatService {
    private clientes;
    onclientesConectados(cliente: Cliente): void;
    onClienteDesconectado(id: string): void;
    getClientes(): Cliente[];
}
export {};
