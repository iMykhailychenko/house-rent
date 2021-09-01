const endpointsMap = {
    development() {
        return {
            ssr: (path = ''): string => 'http://backend:8000' + path,
            browser: (path = ''): string => 'http://localhost:8000' + path,
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
