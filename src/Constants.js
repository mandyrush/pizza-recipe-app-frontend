const production = {
    url: 'https://oyster-app-6vjqi.ondigitalocean.app/app'
};

const development = {
    url: 'http://localhost:4000'
};

export const config = process.env.NODE_ENV === 'development' ? development : production;