import { app } from './app';
import { logging } from './configs/logger';

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'testing') {
  app.listen(port, () => {
    logging.info(`Server is running on port ${port}`);
  });
}
