import { Router } from "express";
import { adaptExpressRoute as adapt } from '../adapters'
import { makeAddUserController, makeLoadUserAllController } from "../factories/application/controllers";

export default (router: Router): void => {
    router.get('/users', adapt(makeLoadUserAllController()));
    router.post('/users', adapt(makeAddUserController()));
}