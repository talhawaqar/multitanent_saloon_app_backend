import app from "./app";
import { env } from "./config";
const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
