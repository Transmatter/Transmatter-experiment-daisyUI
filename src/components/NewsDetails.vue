<template>
        <div v-for="content in contents" :key="content.id" class="border hover:bg-green-100 lg:mx-80">
            <p class="px-6 py-2 text-sm">ผู้เขียน: {{convertAuthor(content.author)}}</p>
            <p class="px-6 py-1 text-sm">{{content.type}}</p>
            <p class="px-6 py-6 text-xl font-bold hover:text-green-800">
                <router-link :to="'/news/' + content.id">
                    {{content.title}}
                </router-link>
            </p>
            <p class="px-6 py-2 text-sm line-clamp-3 indent-8">{{content.content}}</p>
            <p class="px-6 py-2 text-sm flex justify-end">{{getDate(content.public_date)}}</p>
        </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
    props: {
        contents: {
            type: Array,
            required: true
        }
    },
    methods : {
        getDate(dateString){
            return dayjs(dateString).locale('th').format('DD MMMM YYYY');
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
    }
}
</script>