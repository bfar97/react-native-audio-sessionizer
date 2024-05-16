#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AudioSessionizer, NSObject)

RCT_EXTERN_METHOD(setCategory:(NSString *)category
                 options:(NSArray<NSNumber *> *)options
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setMode:(NSString *)mode
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setActive:(BOOL)active
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
