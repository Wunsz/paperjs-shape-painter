import 'paper';

export type SettingsChangedListener = (settings: Settings) => void;

export interface Settings {
    style: Partial<paper.Style>;
    snappingDistance: number;
    customData: any;
    selectionColorMatchingItem: boolean;
}

class SettingsManager {
    public settings: Settings = {...defaultSettings};
    private listeners: Set<SettingsChangedListener> = new Set();

    /**
     * Update settings by merging all given settings and merging styles separately.
     *
     * @param settings New settings
     * @param mergeStyle Should style be merged or overwritten (default overwrites)
     */
    update = (settings: Partial<Settings>, mergeStyle: boolean = false) => {
        const style = settings.style ?? this.settings.style;

        this.settings = {
            ...this.settings,
            ...settings,
            style: mergeStyle ? {...this.settings.style, ...style} : style,
        };

        this.listeners.forEach(listener => listener(this.settings));
    };

    /**
     * Reset settings to default values
     */
    reset = () => {
        this.settings = {...defaultSettings};
    };

    addOnChangeListener = (listener: SettingsChangedListener): SettingsChangedListener => {
        this.listeners.add(listener)
        return listener;
    };

    removeOnChangeListener = (listener: SettingsChangedListener) => {
        this.listeners.delete(listener);
    };
}

export const defaultSettings: Settings = {
    style: {},
    snappingDistance: 10,
    selectionColorMatchingItem: false,
    customData: undefined
}

export default SettingsManager;
