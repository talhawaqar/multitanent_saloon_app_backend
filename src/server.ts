import app from './app';
const PORT = process.env.PORT || 3000;
import {env} from './config'

app.listen(env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${env.PORT}`);
});
