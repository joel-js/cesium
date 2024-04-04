import rotateEntityClockwise from './rotateEntityClockwise';
import rotateEntityToNorth from './rotateEntityToNorth';

const rotateEntity = (entity, opt) => {
  window.addEventListener('keydown', async (event) => {
    if (event.key === 'r' || event.key === 'R') { // Checks if 'R' or 'r' is pressed
      if (entity) {
        switch (opt) {
          case 'clockwise':
            rotateEntityClockwise(entity);
            break;
          case 'north':
            rotateEntityToNorth(entity);
            break;
          default:
            console.warn("Invalid rotation option specified.");
        }
      } else {
        console.warn("Waiting for entity to be created...");
        // Optionally, you could set up a retry mechanism here
      }
    }
  });
};

export default rotateEntity;