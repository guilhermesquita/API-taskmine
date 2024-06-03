import { Controller } from "@/application/contracts";
import { AddUserController } from "@/application/controllers";
import { makeDbAddUser } from "../../domain/usecases";
import { makePgTransactionController } from "../decorators";

export const makeAddUserController = (): Controller => {
    const controller = new AddUserController(
        makeDbAddUser(),
    )
    return makePgTransactionController(controller)
}   