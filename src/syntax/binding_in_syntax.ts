import { BindingScopeEnum } from "../constants/literal_types";
import { interfaces } from "../interfaces/interfaces";
import { BindingWhenOnSyntax } from "./binding_when_on_syntax";

class BindingInSyntax<T> implements interfaces.BindingInSyntax<T> {

    constructor(
        private _binding: interfaces.Binding<T>
    ) {}

    public inRequestScope(): interfaces.BindingWhenOnSyntax<T> {
        this._binding.scope = BindingScopeEnum.Request;
        return new BindingWhenOnSyntax<T>(this._binding);
    }

    public inSingletonScope(): interfaces.BindingWhenOnSyntax<T> {
        this._binding.scope = BindingScopeEnum.Singleton;
        return new BindingWhenOnSyntax<T>(this._binding);
    }

    public inTransientScope(): interfaces.BindingWhenOnSyntax<T> {
        this._binding.scope = BindingScopeEnum.Transient;
        return new BindingWhenOnSyntax<T>(this._binding);
    }

}

export { BindingInSyntax };
