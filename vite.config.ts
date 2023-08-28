import {loadEnv} from 'vite'
import type {UserConfig, ConfigEnv} from 'vite';

import vue from '@vitejs/plugin-vue'
import {createProxy} from "./build/vite/proxy";
import {wrapperEnv} from "./build/utils";
import {resolve} from "path";
function pathResolve(dir: string) {
    return resolve(process.cwd(), '.', dir);
}

export default ({command, mode}: ConfigEnv): UserConfig => {
    const root = process.cwd();
    const env = loadEnv(mode, root);
    const viteEnv = wrapperEnv(env);

    const {VITE_PORT, VITE_PROXY} = viteEnv;
    return {
        plugins: [vue()],
        resolve: {
            alias: [
                {
                    find: /\/#\//,
                    replacement: pathResolve('types') + '/',
                },
                {
                    find: '@',
                    replacement: pathResolve('src') + '/',
                },
            ],
            dedupe: ['vue'],
        },
        server: {
            host: true,
            port: VITE_PORT,
            proxy: createProxy(VITE_PROXY),
        },
        preview: {
            host: true,
            port: VITE_PORT,
            proxy: createProxy(VITE_PROXY),
        },
    }
}
