import { Module } from '@nestjs/common';
import { MatchMakingGateway } from './match-making.gateway';
import { MatchesModule } from 'src/matches/matches.module';


@Module({
  imports: [MatchesModule],
  providers: [MatchMakingGateway]
})
export class MatchMakingModule {}
