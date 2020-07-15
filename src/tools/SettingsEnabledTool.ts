import SettingsManager, {Settings} from "../Settings";

class SettingsEnabledTool {
    protected readonly settings: SettingsManager;

    constructor(settings: SettingsManager) {
        this.settings = settings;
    }

    protected onSettingsChanged = (_: Settings) => {
        // By default - do nothing
    };
}

export default SettingsEnabledTool;
