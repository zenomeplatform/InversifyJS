import { interfaces } from "../interfaces/interfaces";
import { id } from "../utils/id";

export class ContainerModule implements interfaces.ContainerModule {

    public id: number = id();
    public registry: interfaces.ContainerModuleCallBack;

    public constructor(registry: interfaces.ContainerModuleCallBack) {
        this.registry = registry;
    }

}

export class AsyncContainerModule implements interfaces.AsyncContainerModule {

    public id: number = id();
    public registry: interfaces.AsyncContainerModuleCallBack;

    public constructor(registry: interfaces.AsyncContainerModuleCallBack) {
        this.registry = registry;
    }

}
