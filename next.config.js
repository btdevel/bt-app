const withSass = require('@zeit/next-sass')
const path = require('path');

// module.exports = withSass({
module.exports = ({
    cssModules: true,
    // exportTrailingSlash: true,
    // exportPathMap: function() {
    //     const paths = {
    //         '/': {page: '/'},
    //         'maps/bt1/city': {page: 'maps/bt1/city'}
    //     }
    //     for(let i=0; i<2; i++) {
    //         paths[`/maps/bt1/${i}`] = { page: '/maps/bt1/[level]', query: { level: `${i}` } };
    //     }
    //     console.log(paths)
    //     return paths;
    // }
    webpack: (config, options) => {
        config.resolve.modules.push(path.resolve('./'))

        return config
    },

    // Currently, the indicator is annoying, remove later to check out this auto static optimization
    devIndicators: {
        autoPrerender: false,
    },    
})
