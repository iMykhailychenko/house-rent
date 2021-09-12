import env from './env.config';

const prefix = '/api/v1';

const endpointsMap = {
    development() {
        return {
            ssr: (path = ''): string => env.backand + prefix + path,
            browser: (path = ''): string => env.host + prefix + path,
        };
    },

    production() {
        return this.development();
    },

    test() {
        return this.development();
    },
};

endpointsMap.test = endpointsMap.development;

const endpoint =
    typeof window !== 'undefined' ? endpointsMap[process.env.NODE_ENV]().browser : endpointsMap[process.env.NODE_ENV]().ssr;

export default endpoint;
