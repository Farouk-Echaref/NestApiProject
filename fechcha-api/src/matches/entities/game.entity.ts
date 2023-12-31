import { Server, Socket } from "socket.io";
import { MatchesService } from "../matches.service";
import { PrismaService } from "src/prisma/prisma.service";
import { Match, PrismaClient } from "@prisma/client";

interface User {
  id: number;
  socketId: string;
}

interface Player {
  id: number;
  score: number;
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
}

export enum State {
  WAITING,
  PLAYING,
}

//table of games
export class Game{

  state: State;
  server: Server;
  matchesService: MatchesService;
  matchId: number;
  users: User[];
  player1: Player;
  player2: Player;

  constructor(
    server: Server,
    matchesService: MatchesService,
    matchId: number,
    player1Id: number,
    player2Id: number,
  ){
    this.state = State.WAITING;
    this.server = server;
    this.matchesService = matchesService;
    this.matchId = matchId;
    this.users = [];
  }
}

export class GamesCollection {
  games: Game[] = [];

  constructor(
    private readonly server: Server,
    private readonly matchesService: MatchesService,
  ) {}

  private createGame(
    matchId: number,
    player1Id: number,
    player2Id: number,
  ): Game {
    const game = new Game(
      this.server,
      this.matchesService,
      matchId,
      player1Id,
      player2Id,
    );
    this.games.push(game);
    return game;
  }

  private findGame(matchId: number): Game {
    return this.games.find((game) => game.matchId === matchId);
  }

  connectPlayer(match: Match, userId: number, client: Socket) {
    this.removePlayer(client);
    let game = this.findGame(match.matchId);
    if (!game) {
      game = this.createGame(match.matchId, match.homeId, match.adversaryId);
    }
    game.users.push({
      id: userId,
      socketId: client.id,
    });
    client.join(match.matchId.toString());
    if (
      game.state === State.WAITING &&
      game.users.find((user) => user.id === match.homeId) &&
      game.users.find((user) => user.id === match.adversaryId)
    ) {
      game.state = State.PLAYING;
      
      // start game simulation
    }
  }

  removePlayer(client: Socket) {
    this.games.forEach((game) => {
      const user = game.users.find((user) => user.socketId === client.id);
      if (user) {
        game.users = game.users.filter((user) => user.socketId !== client.id);
      }
      client.leave(game.matchId.toString());
      if (game.users.length === 0 && game.state !== State.PLAYING) {
        this.games = this.games.filter((game) => game.matchId !== game.matchId);
      }
    });
  }
}