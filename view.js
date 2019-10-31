const indexHTML = (content = '', searchText = '') => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>ML-Image-Searcher</title>
</head>
    <body align="center">
        <div style="margin-bottom: 30px;">
            <input style="text-align:center;" id="searchBox" type="text" placeholder="search text" value="${searchText}"
                onkeypress="return keyPress(event)" required />
            <button onclick="sendRequest()">&#x1F50D; Search</button>
        </div>
        <div>
            ${content}
        </div> 
    </body>
</html>
<script>
keyPress = (e) => {
    if (e.keyCode == 13) {
        sendRequest();
        return false;
    }
}
const sendRequest = () => {
    var tb = document.getElementById("searchBox");
    const searchText = tb.value;
    const Http = new XMLHttpRequest();
    const url = './' + searchText;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
        document.body.innerHTML = Http.responseText;
    }
}
</script >
`;

const resultHTML = (ret, data, searchText) => {
    let htmlOriginal = '<div>';
    let htmlFiltered = '<div>';

    ret.forEach(post => htmlFiltered += `<img src="${post.node.thumbnail_src}" width="170" style="padding:10px">`)
    data.forEach(post => htmlOriginal += `<img src="${post.node.thumbnail_src}" width="170" style="padding:10px">`)

    htmlOriginal += '</div>';
    htmlFiltered += '</div>';

    let table = `
        <table border="1">
            <tr>
                <td>
                    <b>Instagram result filtered based on human hashtags 
                        <a href="https://www.instagram.com/explore/tags/${searchText}" target="_blank"> #${searchText}</a> + ML prediction:</b><br>
                    ${htmlFiltered}
                </td>
                
                <td>
                    <b>Instagram result filtered based on human hashtags 
                        <a href="https://www.instagram.com/explore/tags/${searchText}" target="_blank"> #${searchText}</a> only</b>:
                    ${htmlOriginal}
                </td>
            </tr>    
        
        </table>
    `;

    return { all: table, filtered: htmlFiltered, original: htmlOriginal };
}

module.exports = {
    indexHTML,
    resultHTML
}