
import { GameState } from '../../core/game-state';
import { Logger } from '../../shared/logger';

export const event = 'plugin:pet:unequip';
export const description = 'Unequip an item from your pets gear.';
export const args = 'itemId';
export const socket = (socket, primus, respond) => {

  const petunequip = async({ itemId }) => {
    if(!socket.authToken) return;

    const { playerName } = socket.authToken;
    if(!playerName) return;

    const player = GameState.getInstance().getPlayer(playerName);
    if(!player) return;
    Logger.info('Socket:Pet:Unequip', `${playerName} (${socket.address.ip}) pet unequipping ${itemId}.`);
    
    const message = player.$pets.unequipPetItem(player, itemId);

    if(message) {
      respond({ type: 'error', title: 'Pet Error', notify: message });
    }
  };

  socket.on(event, petunequip);
};