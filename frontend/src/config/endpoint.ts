const prefix = '/api/v1';

const endpointsMap = {
    development() {
        return {
            ssr: (path = ''): string => 'http://backend:8000' + prefix + path,
            browser: (path = ''): string => 'http://house-rent.com' + prefix + path,
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
