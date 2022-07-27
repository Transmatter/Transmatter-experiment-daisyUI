<template>
    <div class="p-1.5 w-full sm:w-auto overflow-hidden bg-white rounded-lg my-6 lg:mx-80">
        <div class="space-y-2 sm:space-y-0 sm:flex sm:-mx-1">
            <select @change="getContentBySourceAndCategory" v-model="select" name="news_category" class="px-2 mx-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80">
                <option value="{&quot;source&quot;: &quot;all&quot;,&quot;type&quot;: &quot;all&quot;}">ข่าวทั้งหมด</option>
                <option value="{&quot;source&quot;:&quot;ไทยรัฐออนไลน์&quot;,&quot;type&quot;:&quot;all&quot;}">ไทยรัฐ:ทั้งหมด</option>
                <option value="{&quot;source&quot;:&quot;ไทยรัฐออนไลน์&quot;,&quot;type&quot;:&quot;วิเคราะห์เศรษฐกิจ&quot;}">ไทยรัฐ:เศรษฐกิจ</option>
                <option value="{&quot;source&quot;:&quot;ไทยรัฐออนไลน์&quot;,&quot;type&quot;:&quot;การเงิน&quot;}">ไทยรัฐ:การเงิน</option>
                <option value="{&quot;source&quot;:&quot;ไทยรัฐออนไลน์&quot;,&quot;type&quot;:&quot;นโยบาย&quot;}">ไทยรัฐ:นโยบาย</option>
                <option value="{&quot;source&quot;:&quot;ไทยรัฐออนไลน์&quot;,&quot;type&quot;:&quot;การตลาด&quot;}">ไทยรัฐ:การตลาด</option>
                <option value="{&quot;source&quot;:&quot;ไทยรัฐออนไลน์&quot;,&quot;type&quot;:&quot;การลงทุน&quot;}">ไทยรัฐ:การลงทุน</option>
                <option value="{&quot;source&quot;:&quot;สนุกออนไลน์&quot;,&quot;type&quot;:&quot;เอ็นเตอร์เทน&quot;}">สนุก:บันเทิง</option>
                <option value="{&quot;source&quot;:&quot;เด็กดี&quot;,&quot;type&quot;:&quot;ชีวิตวัยรุ่น&quot;}">เด็กดี:ชีวิตวัยรุ่น</option>
            </select>
            <div class="flex flex-col mt-8 space-y-3 sm:space-y-0 sm:flex-row sm:justify-center sm:-mx-2">
                <input v-model="query" type="text" class="px-4 py-2 text-gray-700 bg-white border rounded-md sm:mx-2 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" placeholder="หาข่าวอื่นๆ">
                <button @click="searchContent()" class="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-600 rounded-md sm:mx-2 hover:bg-green-600 focus:outline-none focus:bg-green-600">
                    Search
                </button>
            </div>
        </div>
    </div>
    <div v-if="contents.length != 0">
        <NewsDetailsVue :contents="contents"/>
        <div class="w-full sm:w-auto overflow-hidden bg-green-50 rounded-lg my-6 lg:mx-80">
            <div class="p-1">
                <v-pagination 
                v-model="page"
                :pages="pages" 
                :range-size="1" 
                activeColor="#bbf7d0"
                @update:modelValue="getContentBySourceAndCategory"
            />
            </div>
        </div>
    </div>
    <div v-else>
        <img class="mx-auto" src="../../../assets/not_found_image.png" alt="not found icon">
        <p class="text-3xl font-bold text-center">Opp! Something Went Wrong!!</p>
    </div>

</template>

<script>
import { useViewModel } from "./content.viewmodel";
import NewsDetailsVue from "@/components/NewsDetails.vue";
import ButtomVue from "@/widget/Buttom.vue";
import ContentService from "./content.service";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import Nprogress from 'nprogress';

export default {
    name: "Content Page",
    components: {
        NewsDetailsVue,
        ButtomVue,
        VPagination
    },
    data(){
        return {
            page : 1,
            pages : 1,
            contents: [],
            query : '',
            totalPage: 0, 
            select : '' 
        }
    },
    setup() {
        const {
            fetchSpecificContent,
            contents,
            pages,
            isLoading
        } = useViewModel();

        return {
            fetchSpecificContent,
            pages,
            contents,
            isLoading
        };
    },
    methods : {
        getAllContents(){
            Nprogress.start();
            ContentService()
                .getAllContents(this.page)
                .then((res) => {
                    this.contents = res.data.data.getAllContents.content
                    this.pages = res.data.data.getAllContents.totalPages
                    Nprogress.done();
            });
        },
        getContent(value) {
            Nprogress.start();
            if(value==="all"){
                ContentService()
                .getAllContents(this.page)
                .then((res) => {
                    this.contents = res.data.data.getAllContents.content
                    this.pages = res.data.data.getAllContents.totalPages
                    Nprogress.done();
                });
            } else {
                ContentService()
                .getContents(value,this.page)
                .then((res) => {
                    this.contents = res.data.data.getNewsBySource.content
                    this.pages = res.data.data.getNewsBySource.totalPages
                    Nprogress.done();
                });
            }
        },
        searchContent(){
            ContentService()
            .searchContent(this.query,this.page)
            .then((res) => {
                this.contents = res.data.data.searchNews.content
                    Nprogress.done();
            });
        },
        getContentBySourceAndCategory(){
            if(typeof this.select == 'string'){
                this.select = JSON.parse(this.select)
            }
            if(this.select.source == 'all' && this.select.type == 'all'){
                this.getAllContents();
            } else if(this.select.source === 'ไทยรัฐออนไลน์' && this.select.type === 'all'){
                this.getContent('ไทยรัฐออนไลน์');
            } else {
                ContentService()
                .getNewsBySourceAndCategory(this.select.source,this.select.type,this.page)
                .then((res) => {
                    this.contents = res.data.data.getNewsBySourceAndType.content
                    Nprogress.done();
                });
            }
        }

    }
}
</script>