import { interfaces } from "../interfaces/interfaces";
import { id } from "../utils/id";

export class ContainerModule implements interfaces.ContainerModule {
    public id: number|string = id();
    constructor(
        public registry: interfaces.ContainerModuleCallBack
    ) {}
}

export class AsyncContainerModule implements interfaces.AsyncContainerModule {
    public id: number|string = id();
    constructor(
        public registry: interfaces.AsyncContainerModuleCallBack
    ) {}
}
