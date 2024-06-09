// src/index.d.ts
import "express";

interface Locals {
  userID: number;
}

declare module "express" {
  export interface Response {
    locals: Locals;
  }
}
