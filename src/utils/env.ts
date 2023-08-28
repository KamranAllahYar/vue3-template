export function getAppEnvConfig() {
    const ENV = import.meta.env;
    const {
        VITE_APP_TITLE,
    } = ENV;
    return {
        appTitle: VITE_APP_TITLE,
    };
}

/**
 * @description: Development model
 */
export const devMode = 'development';

/**
 * @description: Production mode
 */
export const prodMode = 'production';

/**
 * @description: Get environment variables
 * @returns:
 * @example:
 */
export function getEnv(): string {
    return import.meta.env.MODE;
}

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
    return import.meta.env.DEV;
}

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
    return import.meta.env.PROD;
}
