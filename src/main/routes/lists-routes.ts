import { Router } from "express";
import { adaptExpressRoute as adapt } from '../adapters'
import { makeAddListController, makeLoadListAllController } from "../factories/application/controllers";

export default (router: Router): void => {
    router.get('/lists', adapt(makeLoadListAllController()));
    router.post('/lists', adapt(makeAddListController()));
}