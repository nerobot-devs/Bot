import { Schema, SchemaFolder, Settings } from "klasa";
import { NeroModActionType } from "./guildSchema";

export interface NeroPunishment {
  modId?: string;
  reason?: string;
  culprit?: string;
  type: NeroModActionType;
}

export interface NeroWarn extends NeroPunishment {
  type: 6;
}

export interface NeroMemberSchema extends Settings {
  warns: {
    active: NeroWarn[];
    archived: NeroWarn[];
  };
  muted: boolean;
}

// @ts-ignore
export const schema: NeroMemberSchema = new Schema()
  .add(
    "warns",
    (folder): SchemaFolder =>
      folder
        .add("active", "any", { array: true })
        .add("archived", "any", { array: true })
  )
  .add("muted", "boolean");
