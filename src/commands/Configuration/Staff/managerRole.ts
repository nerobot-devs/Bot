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
      description: (lang): string => lang.get("ROLES_DESCRIPTION", "manager"),
      aliases: [
        "manager",
        "managerr",
        "setupmanager",
        "managersetup",
        "managerperm"
      ],
      runIn: ["text"],
      subcommands: true,
      usage: "<set|show|reset> (Role:improvedrole)"
    });
  }

  public async set(msg: KlasaMessage, args: [Role]) {
    if (!(await msg.hasAtLeastPermissionLevel(6)))
      return msg.sendLocale("ROLES_NO_PERM", ["manager"]);

    const [role] = args;
    return msg.guild.settings
      .update("roles.staff.manager", role.id, msg.guild)
      .then(result => {
        if (result.errors && result.errors.length) return msg.sendLocale("ERR");
        return msg.sendLocale("ROLES_DONE", ["manager", role]);
      })
      .catch(() => msg.sendLocale("ERR"));
  }

  public async show(msg: KlasaMessage) {
    // @ts-ignore
    const roleId = msg.guild.settings.roles.staff.manager;
    if (!roleId) return msg.sendLocale("ROLES_NOT_DEFINED", ["manager"]);

    const role = msg.guild.roles.get(roleId);

    return msg.sendLocale("ROLES_VIEW", ["manager", role]);
  }

  public async reset(msg: KlasaMessage) {
    if (!(await msg.hasAtLeastPermissionLevel(6)))
      return msg.sendLocale("ROLES_NO_PERM", ["manager"]);

    return msg.guild.settings
      .reset("roles.staff.manager")
      .then(result => {
        if (result.errors && result.errors.length) return msg.sendLocale("ERR");
        return msg.sendLocale("ROLES_RESET", ["manager"]);
      })
      .catch(() => msg.sendLocale("ERR"));
  }
}
