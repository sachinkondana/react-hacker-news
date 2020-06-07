import ApiServices from '../_services/ApiServices';

const NewsActions = {
    getNews: (page = 0)=>{
        return ApiServices.get(`search?tags=front_page&page=${page}`);
    },
}

export default NewsActions;