import graphqlClient from '@/service/GraphQLClient';

const AdminEmptyAltService = () => {
    const getEmptyAltContents = (page=1) => {
        const query = `
        query($filter:PageFilter) {
            getAllEmptyAltNews(filter:$filter){
                number
                totalPages
                totalElements
                content { 
                    id
                    type
                    source
                    title
                    author
                    content
                    public_date
                }
            }
        }
        `;

        const graphql = {
            query: query,
            variables: {
            	filter: {
		            page: page,
		            size: 3
	            }
            }
        }
        return graphqlClient(graphql);
    };
    return { getEmptyAltContents };
}

export default AdminEmptyAltService;