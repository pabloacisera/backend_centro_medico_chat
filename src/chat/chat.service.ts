import { Injectable } from '@nestjs/common';

interface Cliente {
  id: string;
  nombre: string;
}

@Injectable()
export class ChatService {
  private clientes: Record<string, Cliente> = {}

  onclientesConectados(cliente: Cliente) {
    this.clientes[cliente.id] = cliente
  }

  onClienteDesconectado(id: string) {
    delete this.clientes[id]
  }

  getClientes() {
    return Object.values(this.clientes)//aqui se obtienen todos los clientes[]
  }
}
