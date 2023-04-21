import { registerAs } from "@nestjs/config";

export default registerAs("mongo", () => {
  const uri = process.env.DBSTR;
  return { uri };
});
