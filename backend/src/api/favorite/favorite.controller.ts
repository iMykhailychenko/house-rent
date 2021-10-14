import { Controller, HttpCode, HttpStatus, Param, Put, UseGuards } from '@nestjs/common';

import { User } from '../../decorators/users.decorator';
import { AuthGuard } from '../../guards/auth.guards';

import { FavoriteService } from './favorite.service';

@Controller('favorite')
export class FavoriteController {
    constructor(private readonly favoriteService: FavoriteService) {}

    @Put(':postId')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async toggleFavorite(@User('id') userId: number, @Param('postId') postId: number): Promise<void> {
        await this.favoriteService.toggleFavorite(userId, postId);
    }
}
