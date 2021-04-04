import { interfaces } from "../interfaces/interfaces";
import { Delegates } from "../utils/delegator";
import { BindingInSyntax } from "./binding_in_syntax";
import { BindingOnSyntax } from "./binding_on_syntax";
import { BindingWhenSyntax } from "./binding_when_syntax";

interface BindingInWhenOnSyntax<T> extends
    interfaces.BindingInSyntax<T>,
    interfaces.BindingWhenSyntax<T>,
    interfaces.BindingOnSyntax<T> {}

class BindingInWhenOnSyntax<T> {

    _bindingInSyntax: interfaces.BindingInSyntax<T>;
    _bindingWhenSyntax: interfaces.BindingWhenSyntax<T>;
    _bindingOnSyntax: interfaces.BindingOnSyntax<T>;

    constructor(readonly _binding: interfaces.Binding<T>) {
        this._bindingWhenSyntax = new BindingWhenSyntax<T>(_binding);
        this._bindingOnSyntax   = new BindingOnSyntax<T>(_binding);
        this._bindingInSyntax   = new BindingInSyntax<T>(_binding);
    }

}

new Delegates(BindingInWhenOnSyntax)
    .method("_bindingInSyntax", "inRequestScope")
    .method("_bindingInSyntax", "inSingletonScope")
    .method("_bindingInSyntax", "inTransientScope")
    .method("_bindingOnSyntax", "onActivation")
    .method("_bindingWhenSyntax", "when")
    .method("_bindingWhenSyntax", "whenTargetNamed")
    .method("_bindingWhenSyntax", "whenTargetIsDefault")
    .method("_bindingWhenSyntax", "whenTargetTagged")
    .method("_bindingWhenSyntax", "whenInjectedInto")
    .method("_bindingWhenSyntax", "whenParentNamed")
    .method("_bindingWhenSyntax", "whenParentTagged")
    .method("_bindingWhenSyntax", "whenAnyAncestorIs")
    .method("_bindingWhenSyntax", "whenNoAncestorIs")
    .method("_bindingWhenSyntax", "whenAnyAncestorNamed")
    .method("_bindingWhenSyntax", "whenAnyAncestorTagged")
    .method("_bindingWhenSyntax", "whenNoAncestorNamed")
    .method("_bindingWhenSyntax", "whenNoAncestorTagged")
    .method("_bindingWhenSyntax", "whenAnyAncestorMatches")
    .method("_bindingWhenSyntax", "whenNoAncestorMatches")

















export { BindingInWhenOnSyntax };
