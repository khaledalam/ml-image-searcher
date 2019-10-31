const axios = require('axios').default;
const { resultHTML } = require('./view');

const instagramUsername = 'AreYouKhaled';

const getIGSearchURL = (searchText = instagramUsername) => 'https://www.instagram.com/explore/tags/'
    + searchText + '/?__a=1&is_video=true';

module.exports.getImages = async (searchText = instagramUsername) => {

    searchText = searchText.toLowerCase() || instagramUsername;

    try {
        const response = await axios.get(getIGSearchURL(searchText));

        let data = response.data.graphql.hashtag.edge_hashtag_to_media.edges;

        let ret = [];
        data.filter(post => post.node.__typename.toLowerCase() == 'graphimage').forEach(item => {

            let caption = item.node.accessibility_caption

            if (caption) {
                if (caption.toLowerCase().indexOf(searchText) != -1) {
                    ret.push(item);
                }
            }
        });

        if (ret.length == 0) ret = data;

        // make both results equals
        if (data.length > ret.length) data = data.slice(0, ret.length);

        const html = resultHTML(ret, data, searchText);

        // console.log(ret);

        // original Data: result based on humans hashtags only
        // filtered Data: result based on humans hashtags and ML prediction 
        // html All: both results in html table
        return {
            originalData: data,
            filteredData: ret,
            htmlOriginalData: html.original,
            htmlFilteredData: html.filtered,
            htmlAll: html.all,
        };

    } catch (error) {
        console.error(error);
        return { error: error };
    }

}

