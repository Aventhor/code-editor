import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { v4 } from 'uuid';

@WebSocketGateway({
  path: '/code',
  cors: {
    origin: '*',
  },
})
export class CodeSessionGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  rooms: Record<string, any> = {};

  handleConnection(client: Socket, ...args: any[]): void {
    const { query } = client.handshake;

    const userId: string | undefined = query?.userId as string;
    const roomId: string | undefined = query?.roomId as string;

    if (!userId) return;

    let response;

    if (roomId) {
      response = this.rooms[roomId];
    } else {
      const generatedId = v4();

      const room = {
        id: generatedId,
        settings: {},
        ownerId: userId,
        code: '',
      };
      this.rooms[generatedId] = room;
      response = room;
    }

    client.join(response.id);

    client.emit('connection', response);
  }

  @SubscribeMessage('change-settings')
  onChangeSettings(
    @MessageBody() settingsDto: any,
    @ConnectedSocket() socket: Socket,
  ): WsResponse<number> {
    const userId = socket.handshake.query.userId;
    const room = this.rooms[settingsDto.roomId];

    if (room.ownerId !== userId) {
      throw new WsException('You are not the owner of the room');
    }

    room.maxMemberCount = settingsDto.maxMemberCount;
    this.rooms[settingsDto.roomId] = room;

    return { event: 'change-settings', data: settingsDto };
  }

  @SubscribeMessage('code-change')
  onCodeChange(
    @MessageBody() dto: any,
    @ConnectedSocket() socket: Socket,
  ): void {
    // const userId = socket.handshake.query.userId;
    const room = this.rooms[dto.roomId];
    console.log(dto);
    room.code = dto.code;

    this.rooms[dto.roomId] = room;

    this.server.in(dto.roomId).emit('code-change', dto.code);
  }
}
