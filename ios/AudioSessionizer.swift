import AVFoundation

@objc(AudioSessionizer)
class AudioSessionizer: NSObject {
    
    // MARK: - Properties
    private let audioSession = AVAudioSession.sharedInstance()
    
    // MARK: - Public Methods
    @objc
    func setCategory(_ category: String, options: [Int], resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        var categoryOptions = AVAudioSession.CategoryOptions()
        for rawValue in options {
            let option = AVAudioSession.CategoryOptions(rawValue: UInt(rawValue))
            categoryOptions.insert(option)
        }
        
        var categoryValue: AVAudioSession.Category
                
        switch category {
        case "ambient":
            categoryValue = .ambient
        case "playback":
            categoryValue = .playback
        case "record":
            categoryValue = .record
        case "playAndRecord":
            categoryValue = .playAndRecord
        // Add more cases as needed for other category strings
        default:
            // If the category string is not recognized, use a default category or handle the error accordingly
            print("Unknown category string. Using default category.")
            categoryValue = .ambient
        }
        
        do {
            print("setting category:: ", category, categoryOptions)
            try audioSession.setCategory(categoryValue, options: categoryOptions)
            resolve(nil)
        } catch {
            print("error setting audio session category", error)
            reject("CATEGORY_ERROR", "Failed to set audio session category.", error)
        }
    }
    
    @objc
    func setMode(_ mode: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        var modeValue: AVAudioSession.Mode
                
        switch mode {
        case "default":
            modeValue = .default
        case "gameChat":
            modeValue = .gameChat
        case "measurement":
            modeValue = .measurement
        case "moviePlayback":
            modeValue = .moviePlayback
        case "spokenAudio":
            modeValue = .spokenAudio
        case "videoChat":
            modeValue = .videoChat
        case "videoRecording":
            modeValue = .videoRecording
        case "voiceChat":
            modeValue = .voiceChat
        case "voicePrompt":
            modeValue = .voicePrompt
        // Add more cases as needed for other category strings
        default:
            // If the category string is not recognized, use a default category or handle the error accordingly
            print("Unknown category string. Using default category.")
            modeValue = .default
        }
        
        do {
            try audioSession.setMode(modeValue)
            resolve(nil)
        } catch {
            reject("MODE_ERROR", "Failed to set audio session mode.", error)
        }
    }
    
    @objc
    func setActive(_ active: Bool, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        do {
            try audioSession.setActive(active, options: AVAudioSession.SetActiveOptions.notifyOthersOnDeactivation)
            resolve(nil)
        } catch {
            reject("ACTIVE_ERROR", "Failed to set the active state of the audio session.", error)
        }
    }
}
