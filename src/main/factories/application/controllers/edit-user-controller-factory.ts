import { Controller } from "@/application/contracts";
import { EditUserController } from "@/application/controllers";
import { makeDbEditUser } from "../../domain/usecases";
import { makePgTransactionController } from "../decorators";
import { makeEditClientValidation } from "./edit-user-validation-factory";

export const makeEditUserController = (): Controller => {
    const controller = new EditUserController(
        makeDbEditUser(),
        makeEditClientValidation()
    )
    return makePgTransactionController(controller)
}   