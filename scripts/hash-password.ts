/**
 * Erzeugt einen bcrypt-Hash für das Admin-Passwort.
 *
 * Verwendung:
 *   npm run admin:hash -- "MeinSicheresPasswort"
 *   oder interaktiv:  npm run admin:hash
 *
 * Den ausgegebenen Hash als ADMIN_PASSWORD_HASH in die Environment Variables
 * (bzw. .env) eintragen.
 */
import bcrypt from "bcryptjs";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

async function main() {
  let password = process.argv[2];

  if (!password) {
    const rl = createInterface({ input: stdin, output: stdout });
    password = await rl.question("Neues Admin-Passwort: ");
    rl.close();
  }

  if (!password || password.length < 8) {
    console.error("Das Passwort muss mindestens 8 Zeichen lang sein.");
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 12);
  console.log("\nADMIN_PASSWORD_HASH=" + JSON.stringify(hash) + "\n");
}

main();
