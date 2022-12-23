import { newEnforcer } from "casbin";
import {  CanParams, CanReturnType } from "@pankod/refine-core";
import { adapter, model } from "../casbin/accessControl";
import { supabaseClient } from "utility";

export const accessControlProvider = {
  can: async ({ resource, action }: CanParams): Promise<CanReturnType> => {
    const { data } = await supabaseClient.rpc(
      "get_my_claim",
      {
        claim: "role",
      }
    );

    const enforcer = await newEnforcer(model, adapter);
    const can = await enforcer.enforce(data, resource, action);

    return Promise.resolve({
      can,
    });
  }
};
