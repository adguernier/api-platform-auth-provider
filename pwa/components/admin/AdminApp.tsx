"use client";

import { HydraAdmin } from "@api-platform/admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";

export function AdminApp() {
  return (
    <HydraAdmin
      requireAuth
      entrypoint={window.origin}
      dataProvider={dataProvider}
      authProvider={authProvider}
    />
  );
}
