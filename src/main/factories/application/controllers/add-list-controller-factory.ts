import { Controller } from "@/application/contracts";
import { AddListController } from "@/application/controllers";
import { makeDbAddList } from "../../domain/usecases";
import { makePgTransactionController } from "../decorators";
import { makeAddListValidation } from "./add-list-validation-factory";

export const makeAddListController = (): Controller => {
    const controller = new AddListController(
        makeDbAddList(),
        makeAddListValidation()
    )
    return makePgTransactionController(controller)
}   