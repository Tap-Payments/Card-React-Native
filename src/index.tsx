import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
  findNodeHandle,
  type NativeSyntheticEvent,
  LayoutAnimation,
} from 'react-native';
import type { Config } from './models';
import React, {
  useImperativeHandle,
  type Ref,
  forwardRef,
  useRef,
  useCallback,
  type MutableRefObject,
  useState,
} from 'react';

export * from './models';

const LINKING_ERROR =
  `The package 'card-sdk-react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const ComponentName = 'CardSdkReactNativeView';

export const CardSdkReactNativeView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<ITapCardViewNativeProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

export interface ITapCardViewInputRef {
  generateToken: () => void;
}

export type TapCardViewInputRef = Ref<ITapCardViewInputRef>;
export interface ITapCardViewProps {
  style: ViewStyle;
  config: Config;
  ref: TapCardViewInputRef;
  onSuccess: (token: Object) => void;
  onReady: () => void;
  onFocus: () => void;
  onHeightChange: (height: number) => void;
  onBinIdentification: (binIdentification: Object) => void;
  onInvalidInput: (invalid: boolean) => void;
  onError: (error: object) => void;
}

export interface ITapCardViewNativeProps {
  style: ViewStyle;
  config: Config;
  ref: TapCardViewInputRef;
  onSuccess: ({
    nativeEvent: { data },
  }: NativeSyntheticEvent<{ data: Object }>) => void;
  onReadyCallback: () => void;
  onFocusCallback: () => void;
  onHeightChange: ({
    nativeEvent: { data },
  }: NativeSyntheticEvent<{ data: number }>) => void;
  onBinIdentification: ({
    nativeEvent: { data },
  }: NativeSyntheticEvent<{ data: Object }>) => void;
  onInvalidInput: ({
    nativeEvent: { data },
  }: NativeSyntheticEvent<{ data: boolean }>) => void;
  onError: ({
    nativeEvent: { data },
  }: NativeSyntheticEvent<{ data: Object }>) => void;
}

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

function TapCardView(
  {
    style,
    config,
    onSuccess,
    onReady,
    onFocus,
    onHeightChange,
    onBinIdentification,
    onInvalidInput,
    onError,
  }: ITapCardViewProps,
  ref: TapCardViewInputRef
) {
  const viewRef =
    useRef<ITapCardViewInputRef>() as MutableRefObject<ITapCardViewInputRef>;
  const [height, setHeight] = useState(style.height ?? 95);

  const generateToken = useCallback(() => {
    return UIManager.dispatchViewManagerCommand(
      // @ts-ignore
      findNodeHandle(viewRef.current),
      // @ts-ignore
      UIManager.CardSdkReactNativeView.Commands.generateToken,
      []
    );
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      generateToken: () => {
        generateToken();
      },
    }),
    [generateToken]
  );

  const handleOnSuccess = ({
    nativeEvent: { data },
  }: NativeSyntheticEvent<{ data: Object }>) => {
    onSuccess(data);
  };

  const handleOnHeightChange = ({
    nativeEvent: { data },
  }: NativeSyntheticEvent<{ data: number }>) => {
    LayoutAnimation.spring();
    setHeight(data);
    onHeightChange(data);
  };

  const handleOnReady = () => {
    onReady();
  };

  const handleOnFocus = () => {
    onFocus();
  };

  const handleOnBinIdentification = ({
    nativeEvent: { data },
  }: NativeSyntheticEvent<{ data: Object }>) => {
    onBinIdentification(data);
  };
  const handleOnInvalidInput = ({
    nativeEvent: { data },
  }: NativeSyntheticEvent<{ data: boolean }>) => {
    onInvalidInput(data);
  };
  const handleOnError = ({
    nativeEvent: { data },
  }: NativeSyntheticEvent<{ data: object }>) => {
    onError(data);
  };

  return (
    <CardSdkReactNativeView
      style={{ ...style, height: height }}
      config={config}
      ref={viewRef}
      onSuccess={handleOnSuccess}
      onReadyCallback={handleOnReady}
      onFocusCallback={handleOnFocus}
      onHeightChange={handleOnHeightChange}
      onBinIdentification={handleOnBinIdentification}
      onInvalidInput={handleOnInvalidInput}
      onError={handleOnError}
    />
  );
}

export default forwardRef(TapCardView);