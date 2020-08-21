
const url_params = window.location.href;
const url = new URL(url_params);
const topicID = url.searchParams.get("topic");
console.log(url)

let list = new List('#topic-master-list', 'http://localhost/forum/controller/showSelectTopics.php?topic=' + topicID, 3);
console.log(topicID);