import Tap_Card_SDK
@objc(CardSdkReactNativeViewManager)
class CardSdkReactNativeViewManager: RCTViewManager {
    
    override func view() -> (CardSdkReactNativeView) {
        return CardSdkReactNativeView()
    }
    
    @objc override static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    @objc func generateToken(_ node:NSNumber) {
        DispatchQueue.main.async {
            let myLabel = self.bridge.uiManager.view(forReactTag: node) as! CardSdkReactNativeView
            myLabel.generateToken()
        }
    }
    
}

class CardSdkReactNativeView : UIView {
    
    var tapCardView: TapCardView!
    let controller = RCTPresentedViewController()
    
    @objc var onReadyCallback: RCTDirectEventBlock?
    @objc var onFocusCallback: RCTDirectEventBlock?
    @objc var onBinIdentification: RCTDirectEventBlock?
    @objc var onInvalidInput: RCTDirectEventBlock?
    @objc var onSuccess: RCTDirectEventBlock?
    @objc var onError: RCTDirectEventBlock?
    @objc var onHeightChange: RCTDirectEventBlock?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        commonInit()
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        commonInit()
    }
    
    //MARK: - Private methods
    /// Used as a consolidated method to do all the needed steps upon creating the view
    private func commonInit() {
        tapCardView = TapCardView()
        self.addSubview(tapCardView)
        setupConstraints()
    }
    
    private func setupConstraints() {
        // Defensive coding
        guard let tapCardView = self.tapCardView else {
            return
        }
        
        // Preprocessing needed setup
        tapCardView.translatesAutoresizingMaskIntoConstraints = false
        
        // Define the web view constraints
        let top  = tapCardView.topAnchor.constraint(equalTo: self.topAnchor)
        let left = tapCardView.leftAnchor.constraint(equalTo: self.leftAnchor)
        let right = tapCardView.rightAnchor.constraint(equalTo: self.rightAnchor)
        let bottom = tapCardView.bottomAnchor.constraint(equalTo: self.bottomAnchor)
        NSLayoutConstraint.activate([left, right, top, bottom])
        
    }
    
    @objc var color: String = "" {
        didSet {
            self.backgroundColor = .clear
        }
    }
    
    @objc func generateToken() {
        tapCardView.generateTapToken()
    }
    
    
    
    
    @objc var config: [String:Any] = [:] {
        didSet {
            tapCardView.initTapCardSDK(configDict: config, delegate: self, presentScannerIn: controller)
        }
    }
}


extension CardSdkReactNativeView: TapCardViewDelegate {
    func onSuccess(data: String) {
        guard let onSuccess = onSuccess else{
            return
        }
        onSuccess(["data": data])
    }
    
   
    func onReady() {
        guard let onReadyCallback = onReadyCallback else{
            return
        }
        onReadyCallback([:])
    }
    func onFocus() {
        guard let onFocusCallback = onFocusCallback else{
            return
        }
        onFocusCallback([:])
    }
    func onBinIdentification(data: String) {
        guard let onBinIdentification = onBinIdentification else{
            return
        }
        onBinIdentification(["data": data])
    }
    func onInvalidInput(invalid: Bool) {
        guard let onInvalidInput = onInvalidInput else{
            return
        }
        onInvalidInput(["data": invalid])
    }
    func onError(data: String) {
        guard let onError = onError else{
            return
        }
        onError(["data": data])
    }
    func onHeightChange(height: Double) {
        guard let onHeightChange = onHeightChange else{
            return
        }
        onHeightChange(["data": height])
    }
}
