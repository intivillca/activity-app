// src/index.d.ts
import "express";

interface Locals {
  userID: string;
}

declare module "express" {
  export interface Response {
    locals: Locals;
  }
}
