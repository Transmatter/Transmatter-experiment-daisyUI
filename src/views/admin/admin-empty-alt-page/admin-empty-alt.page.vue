<template>
    <div class="flex justify-center">
        <h1 class="my-6 text-3xl font-bold">
            News that have not Alternative text in the images
        </h1>
    </div>
    <NewsDetailsVue :contents="contents"/>
    <div class="w-full sm:w-auto overflow-hidden bg-green-50 rounded-lg my-6 lg:mx-80">
        <div class="p-1">
            <v-pagination 
                v-model="page"
                :pages="pages" 
                :range-size="1" 
                activeColor="#bbf7d0"
                @update:modelValue="getAllEmptyAltNews"
            />
        </div>
    </div>
</template>

<script>
import { useViewModel } from "./admin-empty-alt.viewmodel";
import AdminEmptyAltService from "./admin-empty-alt.service";
import NewsDetailsVue from "@/components/NewsDetails.vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import Nprogress from 'nprogress';

export default {
    name: "Content Page",
    components: {
        NewsDetailsVue,
        VPagination
    },
    data() {
        return {
            page : 1,
            contents: [],
            query : '',
            totalPage: 0 
        }
    },
    methods: {
        getAllEmptyAltNews(){
            Nprogress.start();
            AdminEmptyAltService()
            .getEmptyAltContents(this.page)
            .then(response => {
                this.contents = response.data.data.getAllEmptyAltNews.content;
                Nprogress.done();
            })
        }
    },
    setup() {
        const {
            pages,
            contents,
            isLoading
        } = useViewModel();
        Nprogress.start();
        Nprogress.done();
        return {
            pages,
            contents,
            isLoading
        };
    }
}
</script>