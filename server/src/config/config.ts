const requireEnvVars = ["PORT"] as const;

requireEnvVars.forEach((key) => {
  if (!process.env[key])
    throw new Error(`Missing required environmental variable: ${key}`);
});

export const config = {
  port: process.env.PORT || 3000,
};
