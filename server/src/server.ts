import "dotenv/config";
import app from "./app.js";
import { config } from "./config/env.js";

const start = async (): Promise<void> => {
  app.listen(config.port, () =>
    console.log(`Server is running on port ${config.port}`),
  );
};

start();