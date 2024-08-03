import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
export declare class ChatGateway {
    private readonly chatService;
    constructor(chatService: ChatService);
    server: Server;
    onModuleInit(): void;
    conectarServer(): void;
    manejadorDeMensajes(message: {
        nombre: string;
        mensaje: string;
    }, cliente: Socket): void;
}
