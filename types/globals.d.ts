/* eslint-disable @typescript-eslint/no-empty-object-type */

  import { User } from "./type";

declare global {
    interface CustomJwtSessionClaims extends User {}
}