import { Controller } from "@/application/contracts";
import { AddUserController } from "@/application/controllers";
import { makeDbAddUser } from "../../domain/usecases";
import { makePgTransactionController } from "../decorators";
import { makeAddClientValidation } from "./add-user-validation-factory";

export const makeAddUserController = (): Controller => {
    const controller = new AddUserController(
        makeDbAddUser(),
        makeAddClientValidation()
    )
    return makePgTransactionController(controller)
}   