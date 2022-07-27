<template>
    <div class="lg:mx-64 lg:my-6 lg:px-3 border">
        <p class="text-2xl font-bold py-2">{{contentDetail.title}}</p>
        <p class="text-sm py-3 px-3">{{contentDetail.author}}</p>
        <p class="text-sm py-3 px-3">{{contentDetail.public_date}}</p>
        <p class="text-md py-3 px-3 leading-8 text-justify indent-8">{{contentDetail.content}}</p>
        <div class="inline-flex items-baseline" v-for="(image,index) in contentDetail.images" :key="index">
            <div>
                <img class="my-2 mx-3 h-64" :src="image.url" :alt="image.alt"/>
                <div v-if="(this.$store.getters.getRole == 'ROLE_SUPER_ADMIN' || this.$store.getters.getRole == 'ROLE_ADMIN') && this.$store.getters.getStatus == 'VERIFIED'">
                    <input v-model="imagesAlt[index]" class="my-2 mx-3 px-2 py-2 w-80 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" type="text" placeholder="คำอธิบายภาพ"/>
                </div>
            </div>
        </div >
        <div class="grid grid-cols-6 justify-item-end my-6" v-if="(this.$store.getters.getRole == 'ROLE_SUPER_ADMIN' || this.$store.getters.getRole == 'ROLE_ADMIN') && this.$store.getters.getStatus == 'VERIFIED'">
            <ButtomVue @click="getImageContent()" class="mx-2" buttonName="update" />
            <ButtomVue class="invisible" buttonName="update" />
            <ButtomVue class="invisible" buttonName="update" />
            <ButtomVue class="invisible" buttonName="update" />
            <ButtomVue class="invisible" buttonName="update" />
            <ButtomErrorVue @click="deleteId()" buttonName="delete" />
        </div>
    </div>
    <div v-for="comment in contentDetail.comment" :key="comment" class="border hover:bg-green-100 lg:mx-80 my-4">
            <p class="px-6 py-2 text-sm">ผู้เขียน: {{convertAuthor(comment.author)}}</p>
            <p class="px-6 py-2 text-sm indent-8">{{comment.content}}</p>
            <p class="px-6 py-2 text-sm flex justify-end">{{comment.time}}</p>
        </div>
</template>
<script>
import { defineComponent } from "vue"
import ButtomErrorVue from "@/widget/ButtomError.vue";
import ButtomVue from "@/widget/Buttom.vue";
import ContentDetailSerivce from "./content-detail.service"
import Nprogress from 'nprogress';
export default defineComponent({
    name: 'ContentDetailPage',
    components : {
        ButtomVue,
        ButtomErrorVue
    },
    data() {
        return {
            contentDetail: {},
            imagesAlt : [], 
            inputAlt : []
        }
    },
    methods: {
        getImageContent(){
            Nprogress.start()
            for(let i = 0; i < this.imagesAlt.length; i++){
                this.inputAlt.push({'alt' : this.imagesAlt[i]});
            }
            ContentDetailSerivce()
            .updateImateAlt(this.$route.params.id,this.inputAlt)
            .then(() => {
                Nprogress.done()
                this.$router.push('/news/'+this.$route.params.id);
            }).catch(error => {
                console.log(error);
            })
        },
        deleteId(){
            let check = confirm('คุณต้องการลบข้อมูลนี้ใช่หรือไม่');
            if(check){
                Nprogress.start()
                ContentDetailSerivce()
                    .deleteContentById(this.$route.params.id)
                    .then(() => {
                        Nprogress.done()
                        this.$router.push('/')
                    })
            }
        },
        convertAuthor(author){
            if(author == null) {
                return 'ไม่ทราบผู้เขียน'
            }
            if(author.length === 0){
                return 'ไม่ทราบผู้เขียน'
            }
            return author
        }
    },
    created(){
        ContentDetailSerivce()
        .getContentById(this.$route.params.id)
        .then((res) => {
            this.contentDetail = res.data.data.getContent
            this.imagesAlt = this.contentDetail.images.map(image => image.alt)
        })
    }
});
</script>