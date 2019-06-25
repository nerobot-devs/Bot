import { Command, CommandStore, KlasaMessage, KlasaClient } from "klasa";
import { Role } from "discord.js";

export default class extends Command {
  public constructor(
    client: KlasaClient,
    store: CommandStore,
    file: string[],
    dir: string
  ) {
    super(client, store, file, dir, {
      requiredPermissions: ["EMBED_LINKS"],
      description: (lang): string => lang.get("ROLES_DESCRIPTION", "kick"),
      aliases: ["kickR", "setupkick", "kicksetup", "kickperm"],
      runIn: ["text"],
      subcommands: true,
      usage: "<set|show> (Role:improvedrole)"
    });
  }

  public async set(msg: KlasaMessage, args: [Role]) {
    if (!(await msg.hasAtLeastPermissionLevel(5)))
      return msg.sendLocale("ROLES_NO_PERM", ["kick"]);

    const [role] = args;
    return msg.guild.settings
      .update("roles.kick", role.id, msg.guild)
      .then(result => {
        if (result.errors && result.errors.length) return msg.sendLocale("ERR");
        return msg.sendLocale("ROLES_DONE", ["kick", role]);
      });
  }

  public async show(msg: KlasaMessage) {
    // @ts-ignore
    const roleId = msg.guild.settings.roles.kick;
    if (!roleId) return msg.sendLocale("ROLES_NOT_DEFINED", ["kick"]);

    const role = msg.guild.roles.get(roleId);

    return msg.sendLocale("ROLES_VIEW", ["kick", role]);
  }
}
