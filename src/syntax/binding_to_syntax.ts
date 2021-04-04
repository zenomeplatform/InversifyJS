import * as ERROR_MSGS from "../constants/error_msgs";
import { BindingTypeEnum } from "../constants/literal_types";
import { interfaces } from "../interfaces/interfaces";
import { BindingInWhenOnSyntax } from "./binding_in_when_on_syntax";
import { BindingWhenOnSyntax } from "./binding_when_on_syntax";

class BindingToSyntax<T> implements interfaces.BindingToSyntax<T> {

    constructor(public _binding: interfaces.Binding<T>) {}

    public to(newable: new (...args: any[]) => T): interfaces.BindingInWhenOnSyntax<T> {
        this._binding.type = BindingTypeEnum.Instance;
        this._binding.newable = newable;
        return new BindingInWhenOnSyntax<T>(this._binding);
    }

    public toConstantValue(value: T): interfaces.BindingWhenOnSyntax<T> {
        this._binding.type = BindingTypeEnum.ConstantValue;
        this._binding.cache = value;
        return new BindingWhenOnSyntax<T>(this._binding);
    }

    public toDynamicValue(dynamicValue: (context: interfaces.Context) => T): interfaces.BindingInWhenOnSyntax<T> {
        this._binding.type = BindingTypeEnum.DynamicValue;
        this._binding.dynamicValue = dynamicValue;
        return new BindingInWhenOnSyntax<T>(this._binding);
    }

    public toConstructor<T2>(newable: interfaces.Newable<T2>): interfaces.BindingWhenOnSyntax<T> {
        this._binding.type = BindingTypeEnum.Constructor;
        this._binding.newable = newable as any;
        return new BindingWhenOnSyntax<T>(this._binding);
    }

    public toFactory<T2>(factory: interfaces.FactoryCreator<T2>): interfaces.BindingWhenOnSyntax<T> {
        this._binding.type = BindingTypeEnum.Factory;
        this._binding.factory = factory;
        return new BindingWhenOnSyntax<T>(this._binding);
    }

    public toProvider<T2>(provider: interfaces.ProviderCreator<T2>): interfaces.BindingWhenOnSyntax<T> {
        this._binding.type = BindingTypeEnum.Provider;
        this._binding.provider = provider;
        return new BindingWhenOnSyntax<T>(this._binding);
    }

    public toSelf(): interfaces.BindingInWhenOnSyntax<T> {
        if (typeof this._binding.serviceIdentifier !== "function")
            throw new Error(ERROR_MSGS.INVALID_TO_SELF_VALUE);

        const self: any = this._binding.serviceIdentifier;
        return this.to(self);
    }

    public toFunction(func: T): interfaces.BindingWhenOnSyntax<T> {
        // toFunction is an alias of toConstantValue
        if (typeof func !== "function")
            throw new Error(ERROR_MSGS.INVALID_FUNCTION_BINDING);

        const bindingWhenOnSyntax = this.toConstantValue(func);
        this._binding.type = BindingTypeEnum.Function;
        return bindingWhenOnSyntax;
    }

    public toAutoFactory<T2>(serviceIdentifier: interfaces.ServiceIdentifier<T2>): interfaces.BindingWhenOnSyntax<T> {
        return this.toFactory(
            ctx => () => ctx.container.get<T2>(serviceIdentifier)
        )
    }

    public toService(service: string | symbol | interfaces.Newable<T> | interfaces.Abstract<T>): void {
        this.toDynamicValue(
            ctx => ctx.container.get<T>(service)
        );
    }

}

export { BindingToSyntax };
