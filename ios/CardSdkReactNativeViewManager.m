#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>


@interface RCT_EXTERN_MODULE(CardSdkReactNativeViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(color, NSString)
RCT_EXPORT_VIEW_PROPERTY(config, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(onSuccess, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onReadyCallback, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onFocusCallback, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onBinIdentification, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onInvalidInput, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onError, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onHeightChange, RCTDirectEventBlock)
RCT_EXTERN_METHOD(generateToken:(nonnull NSNumber *)node)
@end

