import ExpoModulesCore
import ExpoUI

public class MySwiftUiViewModule: Module {
  public func definition() -> ModuleDefinition {
    Name("MySwiftUiView")

    ExpoUIView(MySwiftUiViewSwiftUIView.self)

    OnCreate {
      ViewModifierRegistry.register("mySwiftUiViewSwiftUIModifier") { params, appContext, _ in
        return try MySwiftUiViewSwiftUIModifier(from: params, appContext: appContext)
      }
      ViewModifierRegistry.register("RotatingBorderModifier") { params, appContext, _ in
        if #available(iOS 17.0, *) {
          return try RotatingBorderModifier(from: params, appContext: appContext)
        } else {
          return EmptyModifier()
        }
      }
    }

    OnDestroy {
      ViewModifierRegistry.unregister("mySwiftUiViewSwiftUIModifier")
      ViewModifierRegistry.unregister("RotatingBorderModifier")
    }
  }
}
