import { Router } from "express";
import { adaptExpressRoute as adapt } from '../adapters'
import { makeAddUserController, makeAuthenticateController, makeEditUserController, makeLoadUserAllController } from "../factories/application/controllers";

export default (router: Router): void => {
    router.get('/users', adapt(makeLoadUserAllController()));
    router.post('/users', adapt(makeAddUserController()));
    router.put('/users/:id', adapt(makeEditUserController()));
    router.post('/auth', adapt(makeAuthenticateController()));
}