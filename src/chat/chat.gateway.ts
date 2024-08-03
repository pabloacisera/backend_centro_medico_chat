import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ transports: ['websocket'] })
export class ChatGateway {

  constructor(
    private readonly chatService: ChatService
  ) { }

  @WebSocketServer()
  public server: Server;

  onModuleInit() {
    this.conectarServer()
  }

  conectarServer() {
    this.server.on('connection', (socket: Socket) => {
      const id = socket.handshake.query.id as string;
      const nombre = socket.handshake.query.nombre as string;
      console.log('Cliente conectado >>>', nombre, 'con ID:', id);

      // Guardar el nombre e id en el socket para identificación futura
      socket.data.nombre = nombre;
      socket.data.id = id;

      this.chatService.onclientesConectados({ id, nombre });

      /**listado de clientes */

      this.server.emit('on-clientes-changed', this.chatService.getClientes())

      socket.on('disconnect', () => {
        console.log('Cliente desconectado <<<', socket.data.nombre);
        this.chatService.onClienteDesconectado(socket.data.id);
        this.server.emit('on-clientes-changed', this.chatService.getClientes())
      });
    });
  }

  @SubscribeMessage('enviar-mensaje')
  manejadorDeMensajes(@MessageBody() message: { nombre: string, mensaje: string },
    @ConnectedSocket() cliente: Socket) {
    const nombre = cliente.handshake.query.nombre;
    const mensaje = message.mensaje.toString(); // Asegúrate de que esto sea una cadena y no un objeto

    if (!mensaje) {
      return;
    }

    this.server.emit('on-message', {
      id: cliente.id,
      nombre,
      mensaje // Asegúrate de que esto sea una cadena
    });
  }
}




