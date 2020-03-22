const withSass = require('@zeit/next-sass')
// module.exports = withSass({
module.exports = ({
    cssModules: true
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
})