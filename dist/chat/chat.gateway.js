"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chat_service_1 = require("./chat.service");
let ChatGateway = class ChatGateway {
    constructor(chatService) {
        this.chatService = chatService;
    }
    onModuleInit() {
        this.conectarServer();
    }
    conectarServer() {
        this.server.on('connection', (socket) => {
            const id = socket.handshake.query.id;
            const nombre = socket.handshake.query.nombre;
            console.log('Cliente conectado >>>', nombre, 'con ID:', id);
            socket.data.nombre = nombre;
            socket.data.id = id;
            this.chatService.onclientesConectados({ id, nombre });
            this.server.emit('on-clientes-changed', this.chatService.getClientes());
            socket.on('disconnect', () => {
                console.log('Cliente desconectado <<<', socket.data.nombre);
                this.chatService.onClienteDesconectado(socket.data.id);
                this.server.emit('on-clientes-changed', this.chatService.getClientes());
            });
        });
    }
    manejadorDeMensajes(message, cliente) {
        const nombre = cliente.handshake.query.nombre;
        const mensaje = message.mensaje.toString();
        if (!mensaje) {
            return;
        }
        this.server.emit('on-message', {
            id: cliente.id,
            nombre,
            mensaje
        });
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('enviar-mensaje'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "manejadorDeMensajes", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map