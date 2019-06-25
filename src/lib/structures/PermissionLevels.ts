import { PermissionLevels, KlasaMessage } from "klasa";
import { Role } from "discord.js";
import { NeroGuildSchema } from "./schemas/guildSchema";

export default new PermissionLevels()
  // Everyone
  .add(0, (): boolean => true)

  // Warn Permission
  .add(
    2,
    ({ guild, member }: KlasaMessage): boolean => {
      if (!guild) return false;
      const settings = guild.settings as NeroGuildSchema;

      return member.roles.some(
        (role: Role): boolean => role.id === settings.roles.warn.id
      );
    },
    {
      fetch: true
    }
  )

  // Kick Permission
  .add(
    3,
    ({ guild, member }: KlasaMessage): boolean => {
      if (!guild) return false;
      const settings = guild.settings as NeroGuildSchema;

      return (
        member.roles.some(
          (role: Role): boolean => role.id === settings.roles.kick.id
        ) || member.permissions.has("KICK_MEMBERS")
      );
    },
    {
      fetch: true
    }
  )

  // Ban Permission
  .add(
    4,
    ({ guild, member }: KlasaMessage): boolean => {
      if (!guild) return false;
      const settings = guild.settings as NeroGuildSchema;

      return (
        member.roles.some(
          (role: Role): boolean => role.id === settings.roles.ban.id
        ) || member.permissions.has("BAN_MEMBERS")
      );
    },
    {
      fetch: true
    }
  )

  // Manage Guild
  .add(
    5,
    ({ guild, member }: KlasaMessage): boolean => {
      if (!guild) return false;
      const settings = guild.settings as NeroGuildSchema;

      return (
        member.roles.some(
          (role: Role): boolean => role.id === settings.roles.manager.id
        ) || member.permissions.has("MANAGE_GUILD")
      );
    },
    {
      fetch: true
    }
  )

  // Administrator
  .add(
    6,
    ({ guild, member }: KlasaMessage): boolean => {
      if (!guild) return false;
      const settings = guild.settings as NeroGuildSchema;

      return (
        member.roles.some(
          (role: Role): boolean => role.id === settings.roles.admin.id
        ) || member.permissions.has("ADMINISTRATOR")
      );
    },
    {
      fetch: true
    }
  )

  // Guild Owner
  .add(
    7,
    ({ guild, author }: KlasaMessage): boolean => {
      if (!guild) return false;

      return author.id === guild.ownerID;
    },
    {
      fetch: true
    }
  )

  // Bot Owner
  .add(
    9,
    ({ author, client }: KlasaMessage): boolean =>
      // @ts-ignore
      client.owners.some((id: string): boolean => author.id === id),
    {
      break: true
    }
  )

  // Bot Owner (Silent)
  .add(10, ({ author, client }: KlasaMessage): boolean =>
    // @ts-ignore
    client.owners.some((id: string): boolean => author.id === id)
  );
